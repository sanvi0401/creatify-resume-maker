import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Plus, X } from 'lucide-react';

interface NonTechLinksStepProps {
  links: string[];
  onChange: (links: string[]) => void;
  onNext: () => void;
}

export function NonTechLinksStep({ links, onChange, onNext }: NonTechLinksStepProps) {
  const [newLink, setNewLink] = useState('');

  const addLink = () => {
    if (newLink) {
      onChange([...links, newLink]);
      setNewLink('');
    }
  };

  const removeLink = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {links.map((link, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={link}
              readOnly
              className="bg-zinc-800/50 border-zinc-700"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeLink(index)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          placeholder="Add portfolio, website, or other relevant links"
          className="bg-zinc-800/50 border-zinc-700"
          onKeyDown={(e) => e.key === 'Enter' && addLink()}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={addLink}
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

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