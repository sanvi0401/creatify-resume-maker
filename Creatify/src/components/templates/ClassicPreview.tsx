import { motion } from 'framer-motion';

export function ClassicPreview() {
  return (
    <motion.div 
      className="flex flex-col gap-4 p-6 h-full"
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.15
          }
        }
      }}
    >
      {/* Header with photo */}
      <motion.div
        className="flex items-center gap-4"
        variants={{
          initial: { x: -50, opacity: 0 },
          animate: { x: 0, opacity: 1 }
        }}
      >
        <motion.div 
          className="w-16 h-16 rounded-full bg-purple-500/20"
          animate={{
            borderRadius: ["50%", "30%", "50%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <div className="space-y-2">
          <motion.div 
            className="h-4 w-32 bg-purple-500/20 rounded"
            variants={{
              initial: { width: 0 },
              animate: { width: 128 }
            }}
          />
          <motion.div 
            className="h-3 w-24 bg-purple-500/20 rounded"
            variants={{
              initial: { width: 0 },
              animate: { width: 96 }
            }}
          />
        </div>
      </motion.div>

      {/* Content sections */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="space-y-2"
          variants={{
            initial: { x: -50, opacity: 0 },
            animate: { 
              x: 0, 
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
              }
            }
          }}
        >
          <motion.div 
            className="h-3 w-full bg-purple-500/20 rounded"
            style={{ width: `${100 - (i * 20)}%` }}
          />
          <motion.div 
            className="h-3 w-full bg-purple-500/10 rounded"
            style={{ width: `${70 - (i * 15)}%` }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}