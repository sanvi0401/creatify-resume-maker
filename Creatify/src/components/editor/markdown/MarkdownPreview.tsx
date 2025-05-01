import { useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { PagedContent } from './PagedContent';

interface MarkdownPreviewProps {
  markdown: string;
}

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  const html = DOMPurify.sanitize(marked(markdown));
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      const links = previewRef.current.getElementsByTagName('a');
      Array.from(links).forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    }
  }, [html]);

  return (
    <div ref={previewRef}>
      <PagedContent html={html} />
    </div>
  );
}