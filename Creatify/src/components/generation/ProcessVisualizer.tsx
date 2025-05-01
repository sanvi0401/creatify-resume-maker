import { motion } from 'framer-motion';
import { Bot, FileText, Sparkles } from 'lucide-react';

interface ProcessVisualizerProps {
  formData: FormData;
}

export function ProcessVisualizer({ formData }: ProcessVisualizerProps) {
  const processes = [
    {
      icon: Bot,
      title: "AI Analysis",
      description: "Processing your professional data",
      gradient: "from-emerald-500 to-cyan-500"
    },
    {
      icon: Sparkles,
      title: "Template Optimization",
      description: "Adapting layout for your career path",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: FileText,
      title: "LaTeX Generation",
      description: "Creating your professional document",
      gradient: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {processes.map((process, index) => (
        <motion.div
          key={process.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6 h-full overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${process.gradient} opacity-10`} />
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            />

            <div className="relative">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <process.icon className="w-6 h-6 text-white" />
              </motion.div>

              <h3 className="text-lg font-semibold text-white mb-2">{process.title}</h3>
              <p className="text-sm text-zinc-400">{process.description}</p>

              <motion.div
                className="absolute top-4 right-4 w-20 h-20"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${process.gradient} opacity-10 rounded-full blur-xl`} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}