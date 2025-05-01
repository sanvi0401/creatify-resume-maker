import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface AssistantBotProps {
  currentStep: string;
}

export function AssistantBot({ currentStep }: AssistantBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messages = {
    template: "Choose a template that matches your style! Each one is optimized for different career paths. 🎨",
    career: "Let me know your career path so I can help optimize your resume for your industry! 💼",
    links: "Add your professional links so employers can learn more about you! 🔗",
    about: "Tell me about yourself! I'll help you craft a compelling professional summary. ✨",
    generating: "I'm working my magic to create your perfect resume! ⚡️"
  };

  useEffect(() => {
    if (currentStep && messages[currentStep]) {
      setIsTyping(true);
      setMessage('');
      
      const text = messages[currentStep];
      let index = 0;
      
      const typingInterval = setInterval(() => {
        setMessage(prev => prev + text[index]);
        index++;
        
        if (index === text.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    }
  }, [currentStep]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 w-[300px] shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-medium text-white">AI Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="min-h-[60px] text-zinc-300">
              {message}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ▋
                </motion.span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="bg-zinc-900 border border-zinc-800 rounded-full p-4 shadow-lg flex items-center space-x-2"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-emerald-400" />
        </motion.div>
        <span className="text-white font-medium pr-2">Need help?</span>
      </motion.button>
    </div>
  );
}