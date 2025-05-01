import { FormData } from '@/types';

// This will be replaced with the server response
const SERVER_LATEX_TEMPLATE = `\\documentclass[11pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{hyperref}
\\usepackage{fontawesome5}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{fontawesome5}
\\usepackage{xcolor}

\\definecolor{primary}{RGB}{34, 197, 94}
\\definecolor{secondary}{RGB}{100, 116, 139}

\\geometry{a4paper, margin=1in}

\\titleformat{\\section}
  {\\color{primary}\\Large\\bfseries}
  {}{0em}{}[\\titlerule]

\\begin{document}

\\begin{center}
  {\\huge \\textbf{\\color{primary}Professional Resume}}
\\end{center}

\\vspace{1em}

% This section will be populated by the server
\\section*{Professional Links}
\\begin{itemize}[leftmargin=*]
  \\item[\\faGithub] \\href{https://github.com}{GitHub}
  \\item[\\faLinkedin] \\href{https://linkedin.com}{LinkedIn}
\\end{itemize}

\\section*{About}
A passionate professional with expertise in...

\\end{document}`;

export function generateInitialLatex(formData: FormData): string {
  // In a real implementation, this would make an API call to get the LaTeX template
  // For now, we'll use the placeholder template
  return SERVER_LATEX_TEMPLATE;
}

export async function updateLatexFromServer(formData: FormData): Promise<string> {
  // This would be an API call to get the updated LaTeX code
  // For now, we'll return the template
  return SERVER_LATEX_TEMPLATE;
}