import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Globe, Twitter, Linkedin, Terminal, Code, Cpu, Database, Cloud } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DeveloperProfileProps {
  onClose: () => void;
}

export function DeveloperProfile({ onClose }: DeveloperProfileProps) {
  const [activeTab, setActiveTab] = useState('skills');

  const skills = [
    { name: 'Frontend', icon: Terminal, items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
    { name: 'Backend', icon: Code, items: ['Node.js', 'Python', 'GraphQL', 'REST APIs'] },
    { name: 'Database', icon: Database, items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'] },
    { name: 'DevOps', icon: Cloud, items: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'] },
    { name: 'Architecture', icon: Cpu, items: ['Microservices', 'Event-Driven', 'DDD', 'CQRS'] }
  ];

  const projects = [
    {
      name: 'ResumeForge',
      description: 'AI-powered resume builder with real-time collaboration',
      tech: ['React', 'TypeScript', 'Node.js', 'OpenAI'],
      gradient: 'from-emerald-500 to-cyan-500'
    },
    {
      name: 'DevFlow',
      description: 'Developer workflow automation platform',
      tech: ['Next.js', 'GraphQL', 'PostgreSQL'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'CloudScale',
      description: 'Serverless deployment and scaling solution',
      tech: ['AWS', 'Docker', 'Kubernetes'],
      gradient: 'from-blue-500 to-indigo-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 w-full max-w-6xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-center space-x-6">
            <motion.div
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-1"
              animate={{
                rotate: [0, 10, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="w-full h-full bg-zinc-900 rounded-xl flex items-center justify-center">
                <Code className="w-12 h-12 text-emerald-400" />
              </div>
            </motion.div>
            
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-2"
              >
                Senior Software Engineer
              </motion.h2>
              <div className="flex items-center space-x-4">
                {[
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Globe, href: '#', label: 'Website' }
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="space-y-8">
          {/* Tabs */}
          <div className="flex space-x-4 border-b border-zinc-800">
            {['skills', 'projects'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 text-sm font-medium capitalize transition-colors relative",
                  activeTab === tab ? "text-emerald-400" : "text-zinc-400 hover:text-white"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'skills' ? (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white">{skill.name}</h3>
                      </div>
                      <div className="space-y-2">
                        {skill.items.map((item, i) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.1) + (i * 0.05) }}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span className="text-zinc-300">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative h-[200px] rounded-xl overflow-hidden cursor-pointer"
                  >
                    <div className={cn(
                      "absolute inset-0 opacity-20 bg-gradient-to-br",
                      project.gradient
                    )} />
                    <div className="absolute inset-0 p-6 flex flex-col">
                      <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
                      <p className="text-zinc-400 mb-4 flex-1">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}