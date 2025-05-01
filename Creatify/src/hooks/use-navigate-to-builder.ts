import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useNavigateToBuilder() {
  const [isExpanding, setIsExpanding] = useState(false);
  const { toast } = useToast();

  const startBuilder = () => {
    setIsExpanding(true);
    toast({
      title: "Starting your journey",
      description: "Let's create something amazing together!",
    });
  };

  return { startBuilder, isExpanding };
}