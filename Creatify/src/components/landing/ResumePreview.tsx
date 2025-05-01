import React from 'react';
import { motion } from 'framer-motion';
import { FileText, User, Briefcase, Mail, Phone } from 'lucide-react';

const icons = [Briefcase, Mail, Phone];

export function ResumePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full aspect-[4/3] md:aspect-[3/2]"
    >
      {/* Interactive Resume Preview */}
      <div className="relative z-10 h-full bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 overflow-hidden">
        {/* Animated particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-emerald-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Header section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <motion.div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-purple-500/20 p-2 mb-4"
            animate={{
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <User className="w-full h-full text-white/70" />
          </motion.div>
          
          <motion.div 
            className="h-6 w-32 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-lg mb-2"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="h-4 w-24 bg-white/10 rounded-lg"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>

        {/* Content sections */}
        {icons.map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className="mb-4"
          >
            <motion.div
              className="flex items-center space-x-2 mb-2"
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center">
                <Icon className="w-3 h-3 text-white/50" />
              </div>
              <motion.div 
                className="h-3 bg-white/10 rounded flex-1"
                style={{ width: `${70 - (i * 10)}%` }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </motion.div>
          </motion.div>
        ))}

        {/* Scanning effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent"
          animate={{
            y: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 blur-3xl -z-10" />
    </motion.div>
  );
}