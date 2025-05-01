import { motion } from 'framer-motion';
import { Code, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CareerTypeStepProps {
  selected: string;
  onSelect: (type: string) => void;
}

export function CareerTypeStep({ selected, onSelect }: CareerTypeStepProps) {
  const options = [
    {
      id: 'tech',
      title: 'Technology',
      description: 'Software development, IT, data science, and other tech roles',
      icon: Code,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'non-tech',
      title: 'Other Industries',
      description: 'Business, creative, healthcare, education, and other professions',
      icon: Briefcase,
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = selected === option.id;

        return (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option.id)}
            className={cn(
              "relative h-48 rounded-xl overflow-hidden p-6 text-left transition-all",
              "border border-zinc-800 hover:border-zinc-700",
              isSelected && 'ring-2 ring-emerald-500'
            )}
          >
            <div className={cn(
              "absolute inset-0 opacity-10 bg-gradient-to-br",
              option.gradient
            )} />
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{option.title}</h3>
              <p className="text-sm text-zinc-400">{option.description}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}