import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit2, Pin, PinOff, Trash2 } from 'lucide-react';

interface ConversationLongPressModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPinned: boolean;
  onRename: () => void;
  onPin: () => void;
  onDelete: () => void;
}

export const ConversationLongPressModal = ({ 
  isOpen, 
  onClose,
  isPinned,
  onRename,
  onPin,
  onDelete
}: ConversationLongPressModalProps) => {
  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bottom-0 top-auto translate-y-0 slide-in-from-bottom animate-slide-in-bottom rounded-t-3xl rounded-b-none border-0 p-0">
        <div className="px-6 pt-6 pb-2">
          <div className="w-12 h-1 bg-border mx-auto rounded-full mb-4" />
          <h3 className="text-center font-semibold text-lg mb-2">Conversation Actions</h3>
        </div>
        
        <div className="flex flex-col gap-1 pb-6">
          <Button
            variant="ghost"
            onClick={() => handleAction(onRename)}
            className="w-full justify-start text-left h-auto py-4 px-6 rounded-none hover:bg-muted"
          >
            <Edit2 className="h-5 w-5 mr-3" />
            Rename
          </Button>

          <Button
            variant="ghost"
            onClick={() => handleAction(onPin)}
            className="w-full justify-start text-left h-auto py-4 px-6 rounded-none hover:bg-muted"
          >
            {isPinned ? (
              <>
                <PinOff className="h-5 w-5 mr-3" />
                Unpin
              </>
            ) : (
              <>
                <Pin className="h-5 w-5 mr-3" />
                Pin
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={() => handleAction(onDelete)}
            className="w-full justify-start text-left h-auto py-4 px-6 rounded-none hover:bg-muted text-destructive"
          >
            <Trash2 className="h-5 w-5 mr-3" />
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
