import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MarkdownPreview } from './markdown/MarkdownPreview';

interface PreviewPaneProps {
  markdown: string;
}

export function PreviewPane({ markdown }: PreviewPaneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-100 rounded-lg shadow-xl overflow-hidden flex flex-col h-full"
    >
      <div className="h-12 bg-white border-b flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <FileText className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="ml-2 text-sm font-medium text-zinc-600">Preview</span>
        </div>
        
        <Button
          size="sm"
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <div className="flex-1 overflow-auto bg-zinc-50">
        <MarkdownPreview markdown={markdown} />
      </div>
    </motion.div>
  );
}