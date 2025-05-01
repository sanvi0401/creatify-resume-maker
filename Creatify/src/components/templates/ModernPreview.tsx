import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ModernPreview() {
  return (
    <motion.div 
      className="grid grid-cols-3 gap-3 p-6 h-full"
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {/* Header */}
      <motion.div
        className="col-span-3 h-12 bg-emerald-500/20 rounded-lg"
        variants={{
          initial: { scaleX: 0 },
          animate: { scaleX: 1 }
        }}
      />
      
      {/* Skills Grid */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="h-20 bg-emerald-500/20 rounded-lg overflow-hidden"
          variants={{
            initial: { scale: 0, opacity: 0 },
            animate: { 
              scale: 1, 
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
              }
            }
          }}
        >
          <motion.div
            className="h-full w-full bg-emerald-500/10"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}