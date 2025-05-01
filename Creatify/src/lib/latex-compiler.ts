import { useEffect, useState } from 'react';

// This would normally be a server-side API call
// For now, we'll simulate compilation with a basic HTML structure
export function compileLatex(latex: string): string {
  // Basic conversion of common LaTeX elements to HTML
  return latex
    .replace(/\\section\*?{([^}]+)}/g, '<h2 class="text-xl font-bold mb-4">$1</h2>')
    .replace(/\\subsection\*?{([^}]+)}/g, '<h3 class="text-lg font-semibold mb-3">$1</h3>')
    .replace(/\\textbf{([^}]+)}/g, '<strong>$1</strong>')
    .replace(/\\textit{([^}]+)}/g, '<em>$1</em>')
    .replace(/\\begin{itemize}([\s\S]*?)\\end{itemize}/g, (_, items) => {
      return `<ul class="list-disc pl-5 space-y-2">${
        items.split('\\item').slice(1).map(item => 
          `<li class="text-zinc-700">${item.trim()}</li>`
        ).join('')
      }</ul>`;
    })
    .replace(/\\href{([^}]+)}{([^}]+)}/g, '<a href="$1" class="text-blue-600 hover:underline">$2</a>')
    .replace(/\\color{([^}]+)}{([^}]+)}/g, '<span class="text-$1-600">$2</span>')
    .replace(/\\documentclass.*?\n/g, '')
    .replace(/\\usepackage.*?\n/g, '')
    .replace(/\\begin{document}/g, '')
    .replace(/\\end{document}/g, '')
    .replace(/\\newline/g, '<br>')
    .replace(/\\\\/, '<br>');
}

export function useLatexCompiler(latex: string) {
  const [compiledOutput, setCompiledOutput] = useState<string>('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const compile = async () => {
      try {
        setIsCompiling(true);
        setError(null);

        // Debounce compilation to avoid excessive updates
        timeoutId = setTimeout(() => {
          const compiled = compileLatex(latex);
          setCompiledOutput(compiled);
          setIsCompiling(false);
        }, 300);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Compilation failed');
        setIsCompiling(false);
      }
    };

    compile();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [latex]);

  return { compiledOutput, isCompiling, error };
}