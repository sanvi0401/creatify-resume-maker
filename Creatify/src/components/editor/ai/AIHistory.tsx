import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIMessage } from './types';

interface AIHistoryProps {
  messages: AIMessage[];
}

export function AIHistory({ messages }: AIHistoryProps) {
  if (messages.length === 0) {
    return (
      <div className="h-full border border-zinc-700/50 rounded-lg p-4 bg-zinc-800/50">
        <div className="text-sm text-zinc-400 text-center">
          No conversation history yet
        </div>
      </div>
    );
  }

  return (
    <div className="h-full border border-zinc-700/50 rounded-lg bg-zinc-800/50 overflow-hidden flex flex-col">
      <div className="p-3 border-b border-zinc-700/50">
        <h3 className="text-sm font-medium text-zinc-300">History</h3>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3"
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              message.type === 'ai' 
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-purple-500/20 text-purple-400"
            )}>
              {message.type === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-zinc-200 break-words">{message.text}</p>
              <p className="text-xs text-zinc-500 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}