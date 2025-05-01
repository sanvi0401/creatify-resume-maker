import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { LatexBlock } from './types';

export class LatexRenderer {
  static renderBlock(block: LatexBlock): JSX.Element | string {
    switch (block.type) {
      case 'math':
        return block.display ? 
          <BlockMath math={block.content} /> :
          <InlineMath math={block.content} />;
      
      case 'command':
        return this.renderCommand(block);
      
      case 'text':
        return block.content;
      
      default:
        return '';
    }
  }

  private static renderCommand(block: LatexBlock): JSX.Element | string {
    switch (block.name) {
      case 'section':
        return <h2 className="text-2xl font-bold mt-8 mb-4">{block.content}</h2>;
      
      case 'subsection':
        return <h3 className="text-xl font-semibold mt-6 mb-3">{block.content}</h3>;
      
      case 'textbf':
        return <strong>{block.content}</strong>;
      
      case 'textit':
        return <em>{block.content}</em>;
      
      case 'underline':
        return <u>{block.content}</u>;
      
      case 'href':
        return <a href={block.options?.[0]} className="text-blue-600 hover:underline">{block.content}</a>;
      
      default:
        return block.content;
    }
  }
}