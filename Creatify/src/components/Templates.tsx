import { motion, AnimatePresence } from 'framer-motion';
import { X, Layout, Palette, Sparkles, Layers } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ModernPreview } from './templates/ModernPreview';
import { ClassicPreview } from './templates/ClassicPreview';
import { MinimalPreview } from './templates/MinimalPreview';
import { CreativePreview } from './templates/CreativePreview';

interface TemplatesProps {
  onClose: () => void;
}

export function Templates({ onClose }: TemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      icon: Layout,
      description: 'Perfect for tech professionals and digital creatives',
      longDescription: 'Optimized for digital-first careers with interactive elements and modern layout techniques. Ideal for software engineers, UX designers, and digital marketers.',
      gradient: 'from-emerald-500 to-cyan-500',
      features: ['Interactive sections', 'Skill meters', 'Project showcase'],
      benefits: ['Stands out in digital applications', 'Highlights technical skills', 'Mobile-optimized']
    },
    {
      id: 'classic',
      name: 'Classic',
      icon: Layers,
      description: 'Traditional format for corporate and executive roles',
      longDescription: 'Designed for corporate environments with a focus on hierarchy and readability. Perfect for managers, executives, and traditional industry professionals.',
      gradient: 'from-purple-500 to-pink-500',
      features: ['ATS-optimized', 'Clear hierarchy', 'Executive summary'],
      benefits: ['High ATS score', 'Traditional appeal', 'Print-ready']
    },
    {
      id: 'minimal',
      name: 'Minimal',
      icon: Palette,
      description: 'Clean design for creative and artistic professionals',
      longDescription: 'Minimalist approach that lets your work speak for itself. Ideal for photographers, architects, and creative directors who value simplicity.',
      gradient: 'from-amber-500 to-orange-500',
      features: ['Whitespace focus', 'Portfolio integration', 'Visual hierarchy'],
      benefits: ['Elegant presentation', 'Content focus', 'Versatile layout']
    },
    {
      id: 'creative',
      name: 'Creative',
      icon: Sparkles,
      description: 'Bold design for innovative and artistic roles',
      longDescription: 'Dynamic and expressive layout that breaks conventional rules. Perfect for art directors, game designers, and creative professionals who want to stand out.',
      gradient: 'from-blue-500 to-indigo-500',
      features: ['Unique layout', 'Interactive elements', 'Custom sections'],
      benefits: ['Memorable design', 'Portfolio focus', 'Creative expression']
    }
  ];

  const PreviewContent = ({ template }) => {
    switch (template.id) {
      case 'modern':
        return <ModernPreview />;
      case 'classic':
        return <ClassicPreview />;
      case 'minimal':
        return <MinimalPreview />;
      case 'creative':
        return <CreativePreview />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 w-full max-w-6xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white">Choose Your Template</h2>
            <p className="text-zinc-400 mt-2">Select a design that matches your professional style</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((template, index) => {
            const Icon = template.icon;
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
                onClick={() => setSelectedTemplate(template.id)}
                className={cn(
                  "group relative h-80 rounded-xl overflow-hidden cursor-pointer",
                  "border border-zinc-800 transition-all duration-300",
                  (isSelected || isHovered) && "border-zinc-600 scale-[1.02]"
                )}
              >
                <AnimatePresence mode="wait">
                  {(isSelected || isHovered) ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-10"
                    >
                      <PreviewContent template={template} />
                      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <p className="text-sm text-white/90 mb-4">{template.longDescription}</p>
                        <Button 
                          className={cn(
                            "w-full",
                            `bg-${template.preview?.primary || 'emerald'}-500`,
                            `hover:bg-${template.preview?.primary || 'emerald'}-600`,
                            "text-white"
                          )}
                        >
                          Use Template
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="p-8 h-full flex flex-col">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-6",
                        `bg-${template.preview?.primary || 'emerald'}-500/10`
                      )}>
                        <Icon className={cn(
                          "w-6 h-6",
                          `text-${template.preview?.primary || 'emerald'}-500`
                        )} />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{template.name}</h3>
                      <p className="text-zinc-400 mb-6">{template.description}</p>
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2">
                          {template.features.map(feature => (
                            <span
                              key={feature}
                              className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                `bg-${template.preview?.primary || 'emerald'}-500/10`,
                                `text-${template.preview?.primary || 'emerald'}-400`
                              )}
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
      </motion.div>
    </motion.div>
  );
}