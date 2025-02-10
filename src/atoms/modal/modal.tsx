import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

interface ModalComposition {
    Header: React.FC<{ children: React.ReactNode }>;
    Body: React.FC<{ children: React.ReactNode }>;
    Footer: React.FC<{ children: React.ReactNode }>;
}

const Modal: React.FC<ModalProps> & ModalComposition = ({ isOpen, onClose, children }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg">
                {children}
            </div>
        </div>,
        document.body
    );
};

Modal.Header = ({ children }) => (
    <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">{children}</h2>
    </div>
);

Modal.Body = ({ children }) => (
    <div className="p-4">{children}</div>
);

Modal.Footer = ({ children }) => (
    <div className="p-4 border-t flex justify-end gap-2">{children}</div>
);

export default Modal;
