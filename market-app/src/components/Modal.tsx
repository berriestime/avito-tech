import { MouseEventHandler } from 'react';

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  const handleClickOutside: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!event.target) return;
    const target = event.target as HTMLElement;
    if (!target.closest('.modal')) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? '' : 'hidden'
      } flex items-center justify-center min-h-screen text-center p-4`}
      onClick={handleClickOutside}
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="modal bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
        {children}
      </div>
    </div>
  );
};

const ModalHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 rounded-t">
      {children}
    </div>
  );
};

const ModalBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

const ModalFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="text-right">{children}</div>;
};

export { Modal, ModalHeader, ModalBody, ModalFooter };
