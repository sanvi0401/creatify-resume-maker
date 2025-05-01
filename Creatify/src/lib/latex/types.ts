export type BlockType = 
  | 'section' 
  | 'subsection' 
  | 'text' 
  | 'math' 
  | 'itemize' 
  | 'enumerate';

export interface LatexBlock {
  type: BlockType;
  content: string;
  display?: boolean;
}