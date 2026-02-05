 import { useState, useCallback, createContext, useContext, ReactNode } from 'react';
 import { AlertModal } from '@/components/AlertModal';
 
 interface AlertState {
   isOpen: boolean;
   title?: string;
   description?: string;
   variant?: 'default' | 'destructive' | 'success' | 'warning';
 }
 
 interface AlertContextType {
   alert: (options: Omit<AlertState, 'isOpen'>) => void;
 }
 
 const AlertContext = createContext<AlertContextType | null>(null);
 
 export const AlertProvider = ({ children }: { children: ReactNode }) => {
   const [alertState, setAlertState] = useState<AlertState>({
     isOpen: false,
   });
 
   const alert = useCallback((options: Omit<AlertState, 'isOpen'>) => {
     setAlertState({
       isOpen: true,
       ...options,
     });
   }, []);
 
   const handleClose = useCallback(() => {
     setAlertState(prev => ({ ...prev, isOpen: false }));
   }, []);
 
   return (
     <AlertContext.Provider value={{ alert }}>
       {children}
       <AlertModal
         isOpen={alertState.isOpen}
         onClose={handleClose}
         title={alertState.title}
         description={alertState.description}
         variant={alertState.variant}
       />
     </AlertContext.Provider>
   );
 };
 
 export const useAlert = () => {
   const context = useContext(AlertContext);
   if (!context) {
     throw new Error('useAlert must be used within an AlertProvider');
   }
   return context;
 };