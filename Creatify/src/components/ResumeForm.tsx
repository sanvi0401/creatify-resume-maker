import { Github, Linkedin, User, Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from '@/types';

interface ResumeFormProps {
  data: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function ResumeForm({ data, onChange }: ResumeFormProps) {
  return (
    <Card className="p-6 space-y-6 border-2 border-primary/10 shadow-lg animate-in slide-in-from-left">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <Input
                id="name"
                name="name"
                value={data.name}
                onChange={onChange}
                placeholder="John Doe"
                className="pl-10"
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-primary/50" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <div className="relative">
              <Input
                id="title"
                name="title"
                value={data.title}
                onChange={onChange}
                placeholder="Software Engineer"
                className="pl-10"
              />
              <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-primary/50" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={onChange}
                placeholder="john@example.com"
                className="pl-10"
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-primary/50" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <Input
                id="location"
                name="location"
                value={data.location}
                onChange={onChange}
                placeholder="New York, NY"
                className="pl-10"
              />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-primary/50" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <div className="relative">
            <Input
              id="linkedin"
              name="linkedin"
              value={data.linkedin}
              onChange={onChange}
              placeholder="https://linkedin.com/in/username"
              className="pl-10"
            />
            <Linkedin className="absolute left-3 top-2.5 h-5 w-5 text-primary/50" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub Profile</Label>
          <div className="relative">
            <Input
              id="github"
              name="github"
              value={data.github}
              onChange={onChange}
              placeholder="https://github.com/username"
              className="pl-10"
            />
            <Github className="absolute left-3 top-2.5 h-5 w-5 text-primary/50" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="about">Professional Summary</Label>
          <Textarea
            id="about"
            name="about"
            value={data.about}
            onChange={onChange}
            placeholder="Write a compelling summary about your professional experience and skills..."
            className="min-h-[150px] resize-none"
          />
        </div>
      </div>

      <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary" size="lg">
        Download Resume
      </Button>
    </Card>
  );
}