import { FileText, Braces, Code } from 'lucide-react';

export const loadingSteps = [
  {
    icon: FileText,
    text: "Loading Markdown Parser",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-400",
    barColor: "bg-emerald-500",
    pulseColor: "bg-emerald-500/20"
  },
  {
    icon: Braces,
    text: "Initializing Components",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-400",
    barColor: "bg-purple-500",
    pulseColor: "bg-purple-500/20"
  },
  {
    icon: Code,
    text: "Setting up Preview Engine",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
    barColor: "bg-blue-500",
    pulseColor: "bg-blue-500/20"
  }
] as const;