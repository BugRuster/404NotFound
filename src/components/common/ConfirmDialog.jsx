// src/components/common/ConfirmDialog.jsx
import React from 'react';
import { Button } from './Button';
import { X } from 'lucide-react';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger' 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
          onClick={onClose}
        />

        {/* Dialog */}
        <div className="relative bg-white rounded-lg max-w-md w-full shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              {message}
            </p>

            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={onClose}
              >
                {cancelText}
              </Button>
              <Button
                variant={type === 'danger' ? 'secondary' : 'primary'}
                className={type === 'danger' ? 'text-red-600 hover:text-red-700' : ''}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;