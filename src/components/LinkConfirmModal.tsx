import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface LinkConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const LinkConfirmModal = ({ isOpen, onClose, url }: LinkConfirmModalProps) => {
  const handleConfirm = () => {
    // Make sure brackets aren't included when opening the link
    const cleanUrl = url.replace(/^\[|\]$/g, '');
    window.open(cleanUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Open External Link
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-2">You are about to open:</p>
          <p className="text-sm font-mono bg-muted p-3 rounded-lg break-all">
            {url.replace(/^\[|\]$/g, '')}
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-blue-500 hover:bg-blue-600 text-white">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
