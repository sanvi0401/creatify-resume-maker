import { motion } from 'framer-motion';

export function ScanOverlay() {
  return (
    <>
      {/* Vertical scan line */}
      <motion.div
        className="absolute top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent"
        animate={{
          left: ['0%', '100%'],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
        animate={{
          top: ['0%', '100%'],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Scanning focus point */}
      <motion.div
        className="absolute w-4 h-4"
        animate={{
          left: ['0%', '100%'],
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full rounded-full bg-emerald-500/20 animate-ping" />
        <div className="absolute inset-0 w-2 h-2 m-auto rounded-full bg-emerald-500" />
      </motion.div>

      {/* Overall scanning effect */}
      <motion.div
        className="absolute inset-0 bg-emerald-500/5"
        animate={{
          opacity: [0, 0.2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </>
  );
}