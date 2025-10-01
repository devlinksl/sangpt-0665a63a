import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Type, Edit3, Volume2, Share2, RotateCcw, ChevronRight } from 'lucide-react';

interface LongPressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
  onSelectText: () => void;
  onReadAloud: () => void;
  onRegenerate: () => void;
}

export const LongPressModal = ({ 
  isOpen, 
  onClose,
  onCopy,
  onSelectText,
  onReadAloud,
  onRegenerate
}: LongPressModalProps) => {
  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bottom-0 top-auto translate-y-0 slide-in-from-bottom animate-slide-in-bottom rounded-t-3xl rounded-b-none border-0 p-0">
        <div className="px-6 pt-6 pb-2">
          <div className="w-12 h-1 bg-border mx-auto rounded-full mb-6" />
        </div>
        
        <div className="px-6 pb-6 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start text-left h-14 px-4 rounded-xl hover:bg-muted"
            onClick={() => handleAction(onCopy)}
          >
            <Copy className="w-5 h-5 mr-3" />
            <span className="text-base">Copy</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left h-14 px-4 rounded-xl hover:bg-muted"
            onClick={() => handleAction(onSelectText)}
          >
            <Type className="w-5 h-5 mr-3" />
            <span className="text-base">Select text</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left h-14 px-4 rounded-xl hover:bg-muted"
            onClick={onClose}
          >
            <Edit3 className="w-5 h-5 mr-3" />
            <span className="text-base">Edit in a page</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left h-14 px-4 rounded-xl hover:bg-muted"
            onClick={() => handleAction(onReadAloud)}
          >
            <Volume2 className="w-5 h-5 mr-3" />
            <span className="text-base">Read this aloud</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left h-14 px-4 rounded-xl hover:bg-muted"
            onClick={onClose}
          >
            <Share2 className="w-5 h-5 mr-3" />
            <span className="text-base">Share</span>
          </Button>

          <div className="pt-2 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-between text-left h-14 px-4 rounded-xl hover:bg-muted"
              onClick={() => handleAction(onRegenerate)}
            >
              <div className="flex items-center">
                <RotateCcw className="w-5 h-5 mr-3" />
                <span className="text-base">Regenerate</span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
