import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot } from 'lucide-react';
import { AIHistory } from './AIHistory';

interface AIMessage {
  text: string;
  type: 'user' | 'ai';
  timestamp: Date;
}

export function AIAssistant() {
  const [aiPrompt, setAiPrompt] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([]);

  const handleAIPrompt = () => {
    if (!aiPrompt.trim()) return;
    
    setMessages(prev => [...prev, {
      text: aiPrompt,
      type: 'user',
      timestamp: new Date()
    }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I've analyzed your resume and here are my suggestions...",
        type: 'ai',
        timestamp: new Date()
      }]);
      setAiPrompt('');
    }, 1000);
  };

  return (
    <div className="grid grid-cols-[1fr_250px] gap-4">
      <div className="relative">
        <Textarea
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="Ask AI to help improve your resume..."
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 resize-none pr-12"
          rows={2}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={handleAIPrompt}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="h-[120px]">
        <AIHistory messages={messages} />
      </div>
    </div>
  );
}