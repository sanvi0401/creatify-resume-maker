import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, Sparkles } from 'lucide-react';
import { AIHistory } from './AIHistory';
import { AIMessage } from './types';

export function AIAssistant() {
  const [aiPrompt, setAiPrompt] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const handleAIPrompt = () => {
    if (!aiPrompt.trim()) return;
    
    setMessages(prev => [...prev, {
      text: aiPrompt,
      type: 'user',
      timestamp: new Date()
    }]);
    
    setIsThinking(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I've analyzed your resume and here are my suggestions...",
        type: 'ai',
        timestamp: new Date()
      }]);
      setAiPrompt('');
      setIsThinking(false);
    }, 2000);
  };

  return (
    <div className="relative space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-emerald-400">
          <motion.div
            animate={{
              rotate: isThinking ? 360 : 0,
            }}
            transition={{
              duration: 2,
              repeat: isThinking ? Infinity : 0,
              ease: "linear"
            }}
          >
            <Bot className="w-5 h-5" />
          </motion.div>
          <span className="font-medium">AI Assistant</span>
        </div>
        
        <AnimatePresence>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center space-x-2 text-emerald-400"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              <span className="text-sm">Analyzing resume...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-4">
        <div className="relative">
          <Textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Ask AI to help improve your resume..."
            className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-400 resize-none pr-24"
            rows={3}
            disabled={isThinking}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Button
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={handleAIPrompt}
              disabled={isThinking}
            >
              {isThinking ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="h-[120px]">
          <AIHistory messages={messages} />
        </div>
      </div>

      {isThinking && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </div>
  );
}