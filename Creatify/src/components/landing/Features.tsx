import { motion } from 'framer-motion';
import { Bot, FileText, Sparkles } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Writing",
      description: "Our AI helps you write compelling content that highlights your achievements and skills effectively."
    },
    {
      icon: FileText,
      title: "ATS-Optimized",
      description: "Ensure your resume passes Applicant Tracking Systems with our optimized formats and keywords."
    },
    {
      icon: Sparkles,
      title: "Real-time Preview",
      description: "See your changes instantly with our live preview feature. Perfect your resume in real-time."
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-purple-500 p-0.5 mb-6">
                    <div className="w-full h-full rounded-lg bg-zinc-900 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-zinc-400">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}