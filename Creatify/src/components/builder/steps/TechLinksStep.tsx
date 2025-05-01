import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

interface TechLinksStepProps {
  github: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export function TechLinksStep({ github, onChange, onNext }: TechLinksStepProps) {
  return (
    <div className="space-y-4">
      <Input
        value={github}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://github.com/username"
        className="bg-zinc-800/50 border-zinc-700"
      />
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}