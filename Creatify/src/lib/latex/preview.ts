// Simple LaTeX to HTML converter
export class LatexPreview {
  private static escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  static convert(latex: string): string {
    // Remove LaTeX preamble
    latex = latex.replace(/\\documentclass.*?\\begin\{document\}/s, '');
    latex = latex.replace(/\\end\{document\}/, '');

    // Convert common LaTeX commands to HTML
    return latex
      // Sections
      .replace(/\\section\*?\{([^}]+)\}/g, '<h2 class="text-2xl font-bold mb-4">$1</h2>')
      .replace(/\\subsection\*?\{([^}]+)\}/g, '<h3 class="text-xl font-semibold mb-3">$1</h3>')
      
      // Text formatting
      .replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>')
      .replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>')
      .replace(/\\underline\{([^}]+)\}/g, '<u>$1</u>')
      
      // Lists
      .replace(/\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/g, (_, items) => {
        return `<ul class="list-disc pl-5 space-y-2">${
          items.split('\\item').slice(1).map(item => 
            `<li>${LatexPreview.escapeHtml(item.trim())}</li>`
          ).join('')
        }</ul>`;
      })
      
      // Links and special elements
      .replace(/\\href\{([^}]+)\}\{([^}]+)\}/g, '<a href="$1" class="text-blue-600 hover:underline">$2</a>')
      .replace(/\\color\{([^}]+)\}\{([^}]+)\}/g, '<span class="text-$1-600">$2</span>')
      
      // Line breaks and spacing
      .replace(/\\\\|\\newline/g, '<br>')
      .replace(/\\vspace\{[^}]+\}/g, '<div class="my-4"></div>')
      .replace(/\\hspace\{[^}]+\}/g, '<span class="mx-2"></span>')
      
      // Clean up any remaining LaTeX commands
      .replace(/\\[a-zA-Z]+(\[[^\]]*\])?\{[^}]*\}/g, '')
      .replace(/\\[a-zA-Z]+/g, '')
      .trim();
  }
}