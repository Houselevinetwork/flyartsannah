import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a short delay for better UX
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-gradient-to-br from-[#1B2932] to-[#2E4755] text-white rounded-lg shadow-2xl border border-white/20 p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#B08747] rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Install Fly ArtSannah</h3>
              <p className="text-sm text-white/70">Quick access from your home screen</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            className="text-white/70 hover:text-white hover:bg-white/10 -mt-1 -mr-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={handleInstall}
            className="flex-1 bg-[#B08747] hover:bg-[#8B6935] text-white"
          >
            Install App
          </Button>
          <Button
            onClick={handleDismiss}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Not Now
          </Button>
        </div>
      </div>
    </div>
  );
};
