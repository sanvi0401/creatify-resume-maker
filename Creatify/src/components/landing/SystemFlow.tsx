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
      gradient: "from-emerald-500 to-cyan-500"
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
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Code,
      title: "Markdown Generation",
      description: "Professional-grade Markdown code is generated",
      details: [
        "Industry-standard templates",
        "Custom styling options",
        "Cross-platform compatibility"
      ],
      gradient: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative rounded-2xl border border-white/10 bg-zinc-900 p-6 h-full overflow-hidden">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-20 rounded-2xl`} />
                
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.3,
                  }}
                />

                <div className="relative">
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.div
                      className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center"
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
                      <step.icon className="w-5 h-5 text-white" />
                    </motion.div>
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
    </section>
  );
}