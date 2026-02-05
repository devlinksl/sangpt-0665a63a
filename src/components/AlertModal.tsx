 import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
 } from '@/components/ui/alert-dialog';
 import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
 
 interface AlertModalProps {
   isOpen: boolean;
   onClose: () => void;
   title?: string;
   description?: string;
   variant?: 'default' | 'destructive' | 'success' | 'warning';
 }
 
 export const AlertModal = ({ 
   isOpen, 
   onClose, 
   title, 
   description, 
   variant = 'default' 
 }: AlertModalProps) => {
   const icons = {
     default: <Info className="h-6 w-6 text-foreground" />,
     destructive: <AlertCircle className="h-6 w-6 text-destructive" />,
     success: <CheckCircle className="h-6 w-6 text-primary" />,
     warning: <AlertTriangle className="h-6 w-6 text-destructive" />,
   };
 
   return (
     <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
       <AlertDialogContent className="max-w-sm rounded-2xl">
         <AlertDialogHeader className="flex flex-col items-center text-center gap-3">
           <div className="p-3 rounded-full bg-muted">
             {icons[variant]}
           </div>
           {title && (
             <AlertDialogTitle className="text-lg font-semibold">
               {title}
             </AlertDialogTitle>
           )}
           {description && (
             <AlertDialogDescription className="text-muted-foreground">
               {description}
             </AlertDialogDescription>
           )}
         </AlertDialogHeader>
         <AlertDialogFooter className="mt-4 sm:justify-center">
           <AlertDialogAction 
             onClick={onClose}
             className="w-full sm:w-auto min-w-[100px] rounded-full"
           >
             OK
           </AlertDialogAction>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
   );
 };