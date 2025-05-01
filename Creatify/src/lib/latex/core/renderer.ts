import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { CHTML } from 'mathjax-full/js/output/chtml.js';
import { Token, TokenType } from './types';

export class LatexRenderer {
  private static mjDocument: any;
  private static mjTypeset: any;

  private static initMathJax() {
    if (!this.mjDocument) {
      const tex = new TeX({ packages: ['base', 'ams', 'newcommand', 'autoload'] });
      const chtml = new CHTML({ fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2' });
      const doc = mathjax.document('', { InputJax: tex, OutputJax: chtml });
      
      this.mjDocument = doc;
      this.mjTypeset = (math: string) => doc.convert(math, { display: true });
    }
  }

  static renderMath(math: string, isDisplay: boolean): string {
    this.initMathJax();
    try {
      const rendered = this.mjTypeset(math);
      return isDisplay ? 
        `<div class="flex justify-center my-4">${rendered}</div>` :
        `<span class="inline-block align-middle">${rendered}</span>`;
    } catch (error) {
      console.error('Math rendering error:', error);
      return `<span class="text-red-500">[Math Error: ${math}]</span>`;
    }
  }

  static renderTokens(tokens: Token[]): string {
    return tokens.map(token => {
      switch (token.type) {
        case TokenType.Command:
          return this.renderCommand(token.value);
        case TokenType.Text:
          return this.escapeHtml(token.value);
        case TokenType.InlineMath:
          return this.renderMath(token.value, false);
        case TokenType.DisplayMath:
          return this.renderMath(token.value, true);
        case TokenType.Group:
          return `<span class="latex-group">${this.renderTokens([{ type: TokenType.Text, value: token.value }])}</span>`;
        case TokenType.Whitespace:
          return token.value;
        default:
          return '';
      }
    }).join('');
  }

  private static renderCommand(command: string): string {
    switch (command) {
      case 'section':
        return '<h2 class="text-2xl font-bold mt-8 mb-4">';
      case 'subsection':
        return '<h3 class="text-xl font-semibold mt-6 mb-3">';
      case 'textbf':
        return '<strong>';
      case 'textit':
        return '<em>';
      case 'underline':
        return '<u>';
      // Add more commands as needed
      default:
        return '';
    }
  }

  private static escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}