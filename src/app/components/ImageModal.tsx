// src/Components/ImageModal.tsx

import React from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative w-[70%] h-[70%]"> {/* Set the modal dimensions to 70% */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white p-2 rounded-full z-50" // Ensure button is on top
        >
          &times;
        </button>
        <img
          src={imageSrc}
          alt="Full size"
          className="w-full h-full object-contain" // Use 'object-contain' to maintain aspect ratio
        />
      </div>
    </div>
  );
};

export default ImageModal;
