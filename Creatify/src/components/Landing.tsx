import { motion } from 'framer-motion';
import { Navigation } from './landing/Navigation';
import { HeroSection } from './landing/HeroSection';
import { SystemFlow } from './landing/SystemFlow';

interface LandingProps {
  onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-purple-900/20 to-zinc-900 text-white">
      {/* Animated glow effect */}
      <motion.div
        className="fixed inset-0 -z-10 bg-emerald-500/20 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <Navigation />
      <main>
        <HeroSection onStart={onStart} />
        <SystemFlow />
      </main>
    </div>
  );
}