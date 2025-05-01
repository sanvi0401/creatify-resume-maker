import { BlockType, LatexBlock } from './types';

export class LatexParser {
  private static readonly COMMANDS = {
    section: true,
    subsection: true,
    textbf: true,
    textit: true,
    begin: true,
    end: true,
    item: true
  };

  constructor(private latex: string) {}

  parse(): LatexBlock[] {
    const blocks: LatexBlock[] = [];
    let currentBlock = '';
    
    const lines = this.latex.split('\n');

    for (const line of lines) {
      if (line.trim().startsWith('\\')) {
        const command = this.parseCommand(line.trim());
        if (command) {
          if (currentBlock) {
            blocks.push({ type: 'text', content: currentBlock.trim() });
            currentBlock = '';
          }
          blocks.push(command);
        }
      } else if (line.includes('$')) {
        const parts = line.split('$');
        for (let i = 0; i < parts.length; i++) {
          if (i % 2 === 0) {
            if (parts[i].trim()) {
              blocks.push({ type: 'text', content: parts[i].trim() });
            }
          } else {
            blocks.push({ type: 'math', content: parts[i].trim(), display: false });
          }
        }
      } else if (line.trim()) {
        currentBlock += ' ' + line;
      }
    }

    if (currentBlock.trim()) {
      blocks.push({ type: 'text', content: currentBlock.trim() });
    }

    return blocks;
  }

  private parseCommand(line: string): LatexBlock | null {
    const commandMatch = line.match(/\\(\w+)(?:\{([^}]*)\})?/);
    if (!commandMatch) return null;

    const [_, command, content] = commandMatch;
    
    if (!LatexParser.COMMANDS[command]) return null;

    if (command === 'begin') {
      const envMatch = content.match(/(itemize|enumerate)/);
      if (envMatch) {
        return {
          type: envMatch[1] as BlockType,
          content: line.substring(line.indexOf('}') + 1).trim()
        };
      }
    }

    return {
      type: command as BlockType,
      content: content || ''
    };
  }
}