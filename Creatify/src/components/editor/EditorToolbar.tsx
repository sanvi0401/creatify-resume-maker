import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Settings, Save, Share } from 'lucide-react';

export function EditorToolbar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 border-b border-zinc-800 flex items-center justify-between px-6"
    >
      <div className="flex items-center space-x-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center"
        >
          <Settings className="w-5 h-5 text-emerald-400" />
        </motion.div>
        <span className="text-lg font-semibold text-white">Resume Editor</span>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" className="text-zinc-400">
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </motion.div>
  );
}