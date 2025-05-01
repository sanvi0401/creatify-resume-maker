import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, FileText, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MarkdownEditor } from './markdown/MarkdownEditor';
import { AIAssistant } from './ai/AIAssistant';
import { ScanOverlay } from './ScanOverlay';

interface EditorMainProps {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

export function EditorMain({ markdown, setMarkdown }: EditorMainProps) {
  const [copied, setCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Resume Editor</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "transition-colors",
              copied ? "text-green-400 border-green-400/20" : "text-zinc-400"
            )}
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
      
      <div className="relative flex-1 rounded-lg overflow-hidden border border-zinc-700/50">
        <MarkdownEditor value={markdown} onChange={setMarkdown} />
        {isScanning && <ScanOverlay />}
      </div>

      <AIAssistant 
        onScanStart={() => setIsScanning(true)} 
        onScanEnd={() => setIsScanning(false)} 
      />
    </motion.div>
  );
}