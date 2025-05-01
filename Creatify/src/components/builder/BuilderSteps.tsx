import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, Code, User, Github, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FormData } from '@/types';
import { StepIndicator } from './StepIndicator';
import { StepHeader } from './StepHeader';
import { TemplateStep } from './steps/TemplateStep';
import { CareerTypeStep } from './steps/CareerTypeStep';
import { TechLinksStep } from './steps/TechLinksStep';
import { NonTechLinksStep } from './steps/NonTechLinksStep';
import { GeneratingStep } from './steps/GeneratingStep';
import { ResumeEditor } from '../editor/ResumeEditor';

export function BuilderSteps() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [showEditor, setShowEditor] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    template: '',
    careerType: '',
    github: '',
    linkedin: '',
    links: [],
    about: ''
  });

  const steps = [
    {
      title: 'Choose Your Style',
      subtitle: 'Select a template that matches your personality',
      icon: User,
      component: (
        <TemplateStep
          selectedTemplate={formData.template}
          onSelect={(template) => {
            setFormData({ ...formData, template });
            setCurrentStep(prev => prev + 1);
          }}
        />
      )
    },
    {
      title: 'Select Career Path',
      subtitle: 'Help us tailor your resume to your industry',
      icon: Code,
      component: (
        <CareerTypeStep
          selected={formData.careerType}
          onSelect={(careerType) => {
            setFormData({ ...formData, careerType });
            setCurrentStep(prev => prev + 1);
          }}
        />
      )
    },
    {
      title: 'Add LinkedIn Profile',
      subtitle: 'Connect your professional network',
      icon: Linkedin,
      component: (
        <div className="space-y-4">
          <input
            type="text"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
            className="w-full bg-zinc-800/50 border-zinc-700 rounded-lg p-4 text-white"
          />
          <div className="flex justify-end">
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    {
      title: formData.careerType === 'tech' ? 'Connect GitHub' : 'Add Professional Links',
      subtitle: formData.careerType === 'tech' 
        ? 'Import your projects and contributions'
        : 'Add your portfolio and professional links',
      icon: formData.careerType === 'tech' ? Github : Linkedin,
      component: formData.careerType === 'tech' ? (
        <TechLinksStep
          github={formData.github}
          onChange={(github) => setFormData({ ...formData, github })}
          onNext={() => setCurrentStep(prev => prev + 1)}
        />
      ) : (
        <NonTechLinksStep
          links={formData.links}
          onChange={(links) => setFormData({ ...formData, links })}
          onNext={() => setCurrentStep(prev => prev + 1)}
        />
      )
    },
    {
      title: 'Tell Your Story',
      subtitle: 'Share what makes you unique',
      icon: User,
      component: (
        <div className="space-y-4">
          <textarea
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            placeholder="Tell us about your professional journey..."
            className="w-full h-32 bg-zinc-800/50 border-zinc-700 rounded-lg p-4 text-white resize-none"
          />
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setCurrentStep(prev => prev + 1);
                setTimeout(() => setShowEditor(true), 2000);
              }}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    {
      title: 'Generating Resume',
      subtitle: 'Creating your professional resume',
      icon: Loader2,
      component: <GeneratingStep formData={formData} />
    }
  ];

  if (showEditor) {
    return <ResumeEditor formData={formData} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
      
      <div className="mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <StepHeader
              icon={steps[currentStep].icon}
              title={steps[currentStep].title}
              subtitle={steps[currentStep].subtitle}
            />
            
            <div className="mt-8">
              {steps[currentStep].component}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}