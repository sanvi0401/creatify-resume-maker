import { motion } from 'framer-motion';
import { BuilderSteps } from './BuilderSteps';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BuilderProps {
  onClose: () => void;
}

export function Builder({ onClose }: BuilderProps) {
  return (
    <motion.div
      initial={{ scale: 0, borderRadius: '1rem' }}
      animate={{ 
        scale: 1, 
        borderRadius: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }}
      className="fixed inset-0 gradient-background"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="h-full flex flex-col items-center justify-center px-4"
      >
        <BuilderSteps />
      </motion.div>
    </motion.div>
  );
}