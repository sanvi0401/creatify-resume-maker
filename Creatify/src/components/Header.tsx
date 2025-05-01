import { Briefcase } from 'lucide-react';

export function Header() {
  return (
    <div className="relative py-16 bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-white/5" />
      <div className="relative max-w-6xl mx-auto space-y-4 text-center px-6">
        <Briefcase className="w-16 h-16 mx-auto mb-6 animate-pulse" />
        <h1 className="text-5xl font-bold tracking-tight">Resume Builder</h1>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Create a stunning professional resume that stands out. Add your details and watch your resume come to life in real-time.
        </p>
      </div>
    </div>
  );
}