import { LucideIcon } from 'lucide-react';

interface StepHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export function StepHeader({ icon: Icon, title, subtitle }: StepHeaderProps) {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex p-3 rounded-full bg-emerald-500/10">
        <Icon className="w-8 h-8 text-emerald-400" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-zinc-400">{subtitle}</p>
      </div>
    </div>
  );
}