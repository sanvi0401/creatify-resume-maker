import { motion } from 'framer-motion';
import { useLatexCompiler } from '@/lib/latex';
import { cn } from '@/lib/utils';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

interface PreviewContentProps {
  latexCode: string;
}

export function PreviewContent({ latexCode }: PreviewContentProps) {
  const { output, error, isCompiling } = useLatexCompiler(latexCode);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white shadow-lg rounded-lg p-8",
        isCompiling && "opacity-50"
      )}
    >
      {isCompiling && <Loader />}
      <div 
        className="prose prose-zinc max-w-none"
        dangerouslySetInnerHTML={{ __html: output }}
      />
    </motion.div>
  );
}