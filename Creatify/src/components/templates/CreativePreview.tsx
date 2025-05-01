import { motion } from 'framer-motion';

export function CreativePreview() {
  return (
    <motion.div 
      className="relative h-full p-6"
      initial="initial"
      animate="animate"
    >
      {/* Floating shapes */}
      <motion.div
        className="absolute inset-0"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 72}deg) translateY(-50px)`
            }}
          >
            <motion.div
              className="w-24 h-24 rounded-2xl bg-blue-500/20"
              animate={{
                rotate: [0, 360],
                borderRadius: ["16%", "50%", "16%"],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.4
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Pulsing center */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl" />
        <motion.div
          className="absolute inset-0 rounded-full bg-indigo-500/20"
          animate={{
            rotate: [0, 180, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
    </motion.div>
  );
}