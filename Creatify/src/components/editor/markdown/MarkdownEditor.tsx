import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-full font-mono text-sm resize-none p-6",
        "bg-zinc-800 border-zinc-700/50 text-white",
        "focus:ring-1 focus:ring-emerald-500/20",
        "placeholder:text-zinc-500",
        "scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-700"
      )}
      placeholder="# Start typing your resume in Markdown..."
      spellCheck={false}
    />
  );
}