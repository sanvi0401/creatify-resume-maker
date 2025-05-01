import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { cn } from '@/lib/utils';
import { LatexBlock } from './types';

interface PreviewBlockProps extends LatexBlock {}

export function PreviewBlock({ content, type, display }: PreviewBlockProps) {
  switch (type) {
    case 'section':
      return (
        <h2 className="text-2xl font-bold text-zinc-900 mt-8 mb-4 border-b pb-2">
          {content}
        </h2>
      );

    case 'subsection':
      return (
        <h3 className="text-xl font-semibold text-zinc-900 mt-6 mb-3">
          {content}
        </h3>
      );

    case 'math':
      return display ? (
        <div className="my-4 flex justify-center">
          <BlockMath math={content} />
        </div>
      ) : (
        <InlineMath math={content} />
      );

    case 'itemize':
      return (
        <ul className="list-disc pl-5 space-y-2 my-4">
          {content.split('\\item').filter(Boolean).map((item, i) => (
            <li key={i} className="text-zinc-800">
              {item.trim()}
            </li>
          ))}
        </ul>
      );

    case 'enumerate':
      return (
        <ol className="list-decimal pl-5 space-y-2 my-4">
          {content.split('\\item').filter(Boolean).map((item, i) => (
            <li key={i} className="text-zinc-800">
              {item.trim()}
            </li>
          ))}
        </ol>
      );

    default:
      return (
        <p className={cn(
          "text-zinc-800 leading-relaxed",
          display ? "my-4" : "inline"
        )}>
          {content}
        </p>
      );
  }
}