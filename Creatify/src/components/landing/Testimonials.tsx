import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      text: "The AI suggestions helped me highlight my achievements in a way I never could have done on my own.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      text: "Got three interview calls within a week of using my new resume. The ATS optimization really works!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      text: "The modern templates and real-time preview made creating my portfolio-style resume a breeze.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Loved by Professionals</h2>
          <p className="text-xl text-zinc-400">Join thousands who've landed their dream jobs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-6 rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-zinc-300 mb-4">{testimonial.text}</p>
              <div>
                <p className="font-medium text-white">{testimonial.name}</p>
                <p className="text-sm text-zinc-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}