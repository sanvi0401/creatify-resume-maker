import { motion } from 'framer-motion';

export function LoadingScreen() {
  const letters = "Creatify".split("");
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-zinc-900 via-purple-900/20 to-zinc-900 flex items-center justify-center">
      <div className="relative">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 -z-10 bg-emerald-500/20 blur-[100px]"
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

        {/* Text animation */}
        <div className="flex items-center space-x-[2px]">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-6xl md:text-8xl font-black bg-gradient-to-br from-white to-white/40 text-transparent bg-clip-text"
              style={{ fontFamily: "'Cal Sans', sans-serif" }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Loading bar */}
        <motion.div
          className="h-0.5 bg-zinc-800 rounded-full mt-8 overflow-hidden w-[200px] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              delay: 1,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}