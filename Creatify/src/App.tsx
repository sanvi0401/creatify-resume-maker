import { useState, useEffect } from 'react';
import { Landing } from './components/Landing';
import { Builder } from './components/builder/Builder';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <LoadingScreen />
      ) : showBuilder ? (
        <Builder onClose={() => setShowBuilder(false)} />
      ) : (
        <Landing onStart={() => setShowBuilder(true)} />
      )}
    </AnimatePresence>
  );
}