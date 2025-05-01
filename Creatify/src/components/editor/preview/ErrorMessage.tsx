import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border border-red-200 rounded-lg p-4"
    >
      <div className="flex items-center space-x-2">
        <AlertCircle className="w-5 h-5 text-red-500" />
        <p className="text-sm font-medium text-red-600">Compilation Error</p>
      </div>
      <p className="text-xs mt-2 text-red-500">{error}</p>
    </motion.div>
  );
}