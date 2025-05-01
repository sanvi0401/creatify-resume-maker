import { Button } from '@/components/ui/button';
import { FileText, RefreshCcw, Download, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ToolbarProps {
  latexCode: string;
  isCompiling: boolean;
  onDownload: () => void;
}

export function Toolbar({ latexCode, isCompiling, onDownload }: ToolbarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(latexCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-12 bg-zinc-100 border-b flex items-center justify-between px-4">
      <div className="flex items-center">
        <FileText className="w-5 h-5 text-zinc-600 mr-2" />
        <span className="text-sm text-zinc-600">Preview</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className={cn(
            "text-zinc-600 hover:text-zinc-900",
            copied && "text-green-600"
          )}
        >
          {copied ? (
            <>
              <span className="text-xs mr-1">Copied!</span>
              <Copy className="w-4 h-4" />
            </>
          ) : (
            <>
              <span className="text-xs mr-1">Copy LaTeX</span>
              <Copy className="w-4 h-4" />
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onDownload}
          className="text-zinc-600 hover:text-zinc-900"
        >
          <span className="text-xs mr-1">Download</span>
          <Download className="w-4 h-4" />
        </Button>

        {isCompiling && (
          <div className="flex items-center text-sm text-zinc-500">
            <RefreshCcw className="w-4 h-4 mr-1 animate-spin" />
            <span className="text-xs">Compiling...</span>
          </div>
        )}
      </div>
    </div>
  );
}