import { Generator } from 'latex.js';

export class LatexCompiler {
  private generator: Generator;

  constructor() {
    this.generator = new Generator({ 
      hyphenate: false,
      documentClass: 'article' 
    });
  }

  async compile(latex: string): Promise<string> {
    try {
      const doc = await this.generator.parse(latex);
      return doc.htmlDocument().documentElement.innerHTML;
    } catch (error) {
      throw new Error(`LaTeX compilation failed: ${error.message}`);
    }
  }
}