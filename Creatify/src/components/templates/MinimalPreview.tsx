import { motion } from 'framer-motion';

export function MinimalPreview() {
  return (
    <motion.div 
      className="relative h-full p-6 overflow-hidden"
      initial="initial"
      animate="animate"
    >
      {/* Floating lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-amber-500/30"
          style={{
            left: '10%',
            width: '80%',
            top: `${20 + (i * 15)}%`
          }}
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: 1,
            transition: {
              delay: i * 0.2,
              duration: 0.8,
              ease: "easeOut"
            }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-amber-500/40"
            animate={{
              x: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
      ))}

      {/* Floating dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full bg-amber-500/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2
          }}
        />
      ))}
    </motion.div>
  );
}