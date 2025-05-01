import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumePreview } from './ResumePreview';

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="relative py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Craft Your Future with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400 block lg:inline">
                {" "}Professional Resumes
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto lg:mx-0">
              Create stunning, professional resumes that help you stand out and land your dream job.
            </p>
            <Button
              size="lg"
              onClick={onStart}
              className="bg-emerald-500 hover:bg-emerald-600 text-white group w-full sm:w-auto"
            >
              Build Your Resume
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <div className="w-full max-w-lg mx-auto lg:max-w-none">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
}