export enum TokenType {
  Command = 'command',
  Text = 'text',
  Group = 'group',
  Option = 'option',
  InlineMath = 'inline-math',
  DisplayMath = 'display-math',
  Whitespace = 'whitespace'
}

export interface Token {
  type: TokenType;
  value: string;
}

export interface Environment {
  name: string;
  content: Token[];
  options?: string[];
}

export interface LatexDocument {
  preamble: Token[];
  body: Token[];
  environments: Environment[];
}