import { motion } from 'framer-motion';
import { FormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Globe, Briefcase, User } from 'lucide-react';

interface EditorSidebarProps {
  formData: FormData;
}

export function EditorSidebar({ formData }: EditorSidebarProps) {
  const links = [
    ...(formData.github ? [{ icon: Github, url: formData.github, label: 'GitHub' }] : []),
    ...(formData.linkedin ? [{ icon: Linkedin, url: formData.linkedin, label: 'LinkedIn' }] : []),
    ...formData.links.map(link => ({ icon: Globe, url: link, label: new URL(link).hostname }))
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 space-y-6"
    >
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-400">Template</h3>
        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white capitalize">{formData.template}</p>
              <p className="text-xs text-zinc-400">Professional Template</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-400">Professional Links</h3>
        <div className="space-y-2">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 text-zinc-400 hover:text-white transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{link.label}</span>
              </motion.a>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-400">Career Type</h3>
        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white capitalize">{formData.careerType}</p>
              <p className="text-xs text-zinc-400">Career Path</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}