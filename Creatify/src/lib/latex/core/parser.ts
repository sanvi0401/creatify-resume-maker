import { Token, TokenType } from './types';

export class LatexParser {
  private pos = 0;
  private input: string;
  private tokens: Token[] = [];

  constructor(input: string) {
    this.input = input;
  }

  parse(): Token[] {
    while (this.pos < this.input.length) {
      if (this.input[this.pos] === '\\') {
        this.parseCommand();
      } else if (this.input[this.pos] === '$') {
        this.parseMath();
      } else if (this.input[this.pos] === '{') {
        this.parseGroup();
      } else if (this.input[this.pos] === '[') {
        this.parseOption();
      } else if (/\s/.test(this.input[this.pos])) {
        this.parseWhitespace();
      } else {
        this.parseText();
      }
    }
    return this.tokens;
  }

  private parseCommand(): void {
    this.pos++; // Skip backslash
    let command = '';
    while (this.pos < this.input.length && /[a-zA-Z]/.test(this.input[this.pos])) {
      command += this.input[this.pos++];
    }
    this.tokens.push({ type: TokenType.Command, value: command });
  }

  private parseMath(): void {
    this.pos++; // Skip first $
    let math = '';
    let isDisplayMath = false;

    if (this.pos < this.input.length && this.input[this.pos] === '$') {
      isDisplayMath = true;
      this.pos++;
    }

    while (this.pos < this.input.length) {
      if (this.input[this.pos] === '$') {
        if (isDisplayMath && this.pos + 1 < this.input.length && this.input[this.pos + 1] === '$') {
          this.pos += 2;
          break;
        } else if (!isDisplayMath) {
          this.pos++;
          break;
        }
      }
      math += this.input[this.pos++];
    }

    this.tokens.push({
      type: isDisplayMath ? TokenType.DisplayMath : TokenType.InlineMath,
      value: math
    });
  }

  private parseGroup(): void {
    this.pos++; // Skip opening brace
    let content = '';
    let depth = 1;

    while (this.pos < this.input.length && depth > 0) {
      if (this.input[this.pos] === '{') depth++;
      if (this.input[this.pos] === '}') depth--;
      if (depth > 0) content += this.input[this.pos];
      this.pos++;
    }

    this.tokens.push({ type: TokenType.Group, value: content });
  }

  private parseOption(): void {
    this.pos++; // Skip opening bracket
    let content = '';
    while (this.pos < this.input.length && this.input[this.pos] !== ']') {
      content += this.input[this.pos++];
    }
    this.pos++; // Skip closing bracket
    this.tokens.push({ type: TokenType.Option, value: content });
  }

  private parseWhitespace(): void {
    let space = '';
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      space += this.input[this.pos++];
    }
    this.tokens.push({ type: TokenType.Whitespace, value: space });
  }

  private parseText(): void {
    let text = '';
    while (this.pos < this.input.length && 
           !/[\\\$\{\}\[\]\s]/.test(this.input[this.pos])) {
      text += this.input[this.pos++];
    }
    this.tokens.push({ type: TokenType.Text, value: text });
  }
}