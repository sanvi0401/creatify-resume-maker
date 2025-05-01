import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { loadingSteps } from './LoadingSteps';

export function CompilerInitializer() {
  return (
    <div className="fixed inset-0 gradient-background flex items-center justify-center">
      {/* Animated background effects */}
      <motion.div
        className="absolute inset-0 -z-10 gradient-glow"
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

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative space-y-12 p-8 max-w-md w-full">
        {/* Central rotating icon */}
        <motion.div 
          className="w-24 h-24 mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-full h-full">
            <motion.div
              className="absolute inset-0 rounded-xl bg-emerald-500/20 backdrop-blur-sm"
              animate={{
                rotate: [0, 90, 180, 270, 360],
                borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <Sparkles className="absolute inset-0 m-auto w-12 h-12 text-emerald-400" />
          </div>
        </motion.div>

        {/* Loading steps */}
        <div className="space-y-6">
          {loadingSteps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.5 }}
                className="box p-4 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className={`w-10 h-10 rounded-lg ${step.bgColor} flex items-center justify-center`}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      <Icon className={`w-5 h-5 ${step.textColor}`} />
                    </motion.div>
                    <span className="text-white">{step.text}</span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.5 + 1.5 }}
                  >
                    <motion.div
                      className={`w-5 h-5 rounded-full ${step.pulseColor}`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                  </motion.div>
                </div>

                {/* Progress bar */}
                <motion.div
                  className="h-1 bg-zinc-800 rounded-full mt-4 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.5 }}
                >
                  <motion.div
                    className={`h-full ${step.barColor}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech visualization */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {['[MD]', '{JSON}', '<JSX/>'].map((text, i) => (
            <motion.div
              key={i}
              className="font-mono text-sm px-3 py-1 rounded-md bg-zinc-800/50 text-zinc-400 border border-zinc-700/50"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {text}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}