import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { FormData } from '@/types';
import { cn } from '@/lib/utils';

interface ResumePreviewProps {
  data: FormData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const hasContent = Object.values(data).some(value => value.length > 0);

  return (
    <Card className={cn(
      "p-8 bg-white dark:bg-zinc-950 border-2 shadow-lg transition-all duration-300 animate-in slide-in-from-right",
      hasContent ? "border-primary/20" : "border-muted"
    )}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="border-b pb-6">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {data.name || "Your Name"}
          </h2>
          <p className="text-xl text-muted-foreground mt-2">{data.title || "Professional Title"}</p>
          
          <div className="mt-4 space-y-2">
            {data.email && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{data.email}</span>
              </div>
            )}
            {data.location && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{data.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Professional Summary</h3>
          <p className="text-muted-foreground leading-relaxed">
            {data.about || "Your professional summary will appear here..."}
          </p>
        </div>

        {/* Connect Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Connect</h3>
          <div className="space-y-3">
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn Profile</span>
              </a>
            )}
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>GitHub Profile</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}