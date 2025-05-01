import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData } from '@/types';
import { EditorToolbar } from './EditorToolbar';
import { EditorSidebar } from './EditorSidebar';
import { EditorMain } from './EditorMain';
import { PreviewPane } from './PreviewPane';
import { CompilerInitializer } from '../loading/CompilerInitializer';
import { ProcessVisualizer } from '../generation/ProcessVisualizer';
import { generateInitialMarkdown } from '@/lib/markdown/generator';

interface ResumeEditorProps {
  formData: FormData;
}

export function ResumeEditor({ formData }: ResumeEditorProps) {
  const [markdown, setMarkdown] = useState(generateInitialMarkdown(formData));
  const [isInitializing, setIsInitializing] = useState(true);
  const [showProcesses, setShowProcesses] = useState(true);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsInitializing(false);
    }, 3000);

    const processTimer = setTimeout(() => {
      setShowProcesses(false);
    }, 5000);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(processTimer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isInitializing ? (
        <CompilerInitializer />
      ) : showProcesses ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-900 flex items-center justify-center p-8"
        >
          <ProcessVisualizer formData={formData} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-900"
        >
          <EditorToolbar />
          <div className="h-[calc(100vh-64px)] grid grid-cols-[280px_1fr_1fr] gap-6 p-6">
            <EditorSidebar formData={formData} />
            <EditorMain markdown={markdown} setMarkdown={setMarkdown} />
            <PreviewPane markdown={markdown} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}