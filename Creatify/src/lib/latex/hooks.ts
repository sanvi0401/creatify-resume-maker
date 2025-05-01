import { useState, useEffect } from 'react';
import { LatexParser } from './parser';
import { LatexRenderer } from './renderer';
import { LatexBlock } from './types';

export function useLatexPreview(latex: string) {
  const [blocks, setBlocks] = useState<LatexBlock[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let mounted = true;

    const compile = async () => {
      try {
        setIsCompiling(true);
        setError(null);

        timeoutId = setTimeout(() => {
          const parser = new LatexParser(latex);
          const parsedBlocks = parser.parse();
          
          if (mounted) {
            setBlocks(parsedBlocks);
            setIsCompiling(false);
          }
        }, 300);

      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Preview generation failed');
          setIsCompiling(false);
        }
      }
    };

    compile();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [latex]);

  return {
    blocks,
    isCompiling,
    error,
    renderer: LatexRenderer
  };
}