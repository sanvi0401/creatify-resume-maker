import { motion } from 'framer-motion';
import { Bot, FileText, Sparkles, ArrowRight, Briefcase, Code, Wand2, CheckCircle } from 'lucide-react';

export function SystemFlow() {
  const steps = [
    {
      icon: Bot,
      title: "AI Analysis",
      description: "Our AI analyzes your experience and career goals",
      details: [
        "Natural language processing of your input",
        "Industry-specific keyword identification",
        "Career path optimization"
      ],
      gradient: "from-emerald-500/20 to-cyan-500/20",
      animation: (
        <motion.div
          className="absolute right-4 top-4 w-12 h-12"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-xl" />
          <Bot className="w-6 h-6 text-emerald-400 absolute inset-0 m-auto" />
        </motion.div>
      )
    },
    {
      icon: Wand2,
      title: "Smart Formatting",
      description: "Content is automatically structured and formatted",
      details: [
        "ATS-optimized layout generation",
        "Professional section organization",
        "Dynamic content adaptation"
      ],
      gradient: "from-purple-500/20 to-pink-500/20",
      animation: (
        <motion.div
          className="absolute right-4 top-4 w-12 h-12"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Sparkles className="w-6 h-6 text-purple-400 absolute inset-0 m-auto" />
        </motion.div>
      )
    },
    {
      icon: Code,
      title: "LaTeX Generation",
      description: "Professional-grade LaTeX code is generated",
      details: [
        "Industry-standard templates",
        "Custom styling options",
        "Cross-platform compatibility"
      ],
      gradient: "from-blue-500/20 to-indigo-500/20",
      animation: (
        <motion.div
          className="absolute right-4 top-4 overflow-hidden"
        >
          <motion.div
            className="text-xs font-mono text-blue-400/70"
            animate={{
              y: [-100, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            {`\\begin{document}\n  \\section{}\n  \\item{}\n\\end{document}`}
          </motion.div>
        </motion.div>
      )
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/0 via-zinc-900 to-zinc-900/0" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 mb-4"
          >
            <Briefcase className="w-4 h-4 mr-2" />
            How It Works
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4">Intelligent Resume Creation</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Our system combines AI technology with professional templates to create the perfect resume
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <motion.path
              d="M300 100 L500 200 L700 100"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-10 rounded-2xl`} />
                  <div className="relative">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-zinc-400 mb-4">{step.description}</p>
                    
                    <div className="space-y-2">
                      {step.details.map((detail, i) => (
                        <motion.div
                          key={detail}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.2) + (i * 0.1) }}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm text-zinc-300">{detail}</span>
                        </motion.div>
                      ))}
                    </div>

                    {step.animation}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.3 }}
                  >
                    <ArrowRight className="w-8 h-8 text-emerald-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}