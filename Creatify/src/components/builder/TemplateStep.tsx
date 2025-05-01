import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Palette, Sparkles, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ModernPreview } from '@/components/templates/ModernPreview';
import { ClassicPreview } from '@/components/templates/ClassicPreview';
import { MinimalPreview } from '@/components/templates/MinimalPreview';
import { CreativePreview } from '@/components/templates/CreativePreview';

interface TemplateStepProps {
  selectedTemplate: string;
  onSelect: (template: string) => void;
}

export function TemplateStep({ selectedTemplate, onSelect }: TemplateStepProps) {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      icon: Layout,
      description: 'Perfect for tech professionals and digital creatives',
      longDescription: 'Optimized for digital-first careers with interactive elements and modern layout techniques.',
      gradient: 'from-emerald-500 to-cyan-500',
      features: ['Interactive sections', 'Skill meters', 'Project showcase'],
      preview: ModernPreview
    },
    {
      id: 'classic',
      name: 'Classic',
      icon: Layers,
      description: 'Traditional format for corporate and executive roles',
      longDescription: 'Designed for corporate environments with a focus on hierarchy and readability.',
      gradient: 'from-purple-500 to-pink-500',
      features: ['ATS-optimized', 'Clear hierarchy', 'Executive summary'],
      preview: ClassicPreview
    },
    {
      id: 'minimal',
      name: 'Minimal',
      icon: Palette,
      description: 'Clean design for creative and artistic professionals',
      longDescription: 'Minimalist approach that lets your work speak for itself.',
      gradient: 'from-amber-500 to-orange-500',
      features: ['Whitespace focus', 'Portfolio integration', 'Visual hierarchy'],
      preview: MinimalPreview
    },
    {
      id: 'creative',
      name: 'Creative',
      icon: Sparkles,
      description: 'Bold design for innovative and artistic roles',
      longDescription: 'Dynamic and expressive layout that breaks conventional rules.',
      gradient: 'from-blue-500 to-indigo-500',
      features: ['Unique layout', 'Interactive elements', 'Custom sections'],
      preview: CreativePreview
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {templates.map((template, index) => {
        const Icon = template.icon;
        const Preview = template.preview;
        const isSelected = selectedTemplate === template.id;
        const isHovered = hoveredTemplate === template.id;

        return (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setHoveredTemplate(template.id)}
            onHoverEnd={() => setHoveredTemplate(null)}
            className={cn(
              "group relative h-80 rounded-xl overflow-hidden cursor-pointer",
              "border border-zinc-800 transition-all duration-300",
              (isSelected || isHovered) && "border-zinc-600 scale-[1.02]"
            )}
            onClick={() => onSelect(template.id)}
          >
            <AnimatePresence mode="wait">
              {(isSelected || isHovered) ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10"
                >
                  <Preview />
                  <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <p className="text-sm text-white/90 mb-4">{template.longDescription}</p>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(template.id);
                      }}
                      className={cn(
                        "w-full bg-gradient-to-r",
                        template.gradient,
                        "text-white"
                      )}
                    >
                      Use Template
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="relative p-8 h-full flex flex-col">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-6",
                    "bg-white/10"
                  )}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{template.name}</h3>
                  <p className="text-zinc-400 mb-6">{template.description}</p>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {template.features.map(feature => (
                        <span
                          key={feature}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}