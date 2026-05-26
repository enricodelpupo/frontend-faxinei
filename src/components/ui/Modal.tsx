import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  headerColor?: string; // CSS class for header background (e.g. 'bg-primary-600')
}

export function Modal({ isOpen, onClose, title, children, headerColor = "bg-primary-600" }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-white/20 relative z-10 flex flex-col max-h-[90vh]">
        
        {title && (
          <div className={`p-6 sm:p-8 text-white flex justify-between items-start relative overflow-hidden ${headerColor}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10 w-full pr-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h3>
            </div>
            <button 
              onClick={onClose} 
              className="text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-2 transition-all absolute top-6 right-6 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
