import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface FullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  embedUrl: string;
  title: string;
  type?: 'iframe' | 'image' | 'auto';
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ 
  isOpen, 
  onClose, 
  embedUrl, 
  title, 
  type = 'auto' 
}) => {
  // Auto-detect content type if not specified
  const isImage = type === 'image' || (type === 'auto' && /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(embedUrl));

  // Handle escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999,
    padding: '20px'
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '25px',
    right: '25px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#dc2626',
    border: '2px solid white',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000000,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
    transition: 'all 0.2s ease'
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    maxWidth: '95vw',
    maxHeight: '95vh',
    width: isImage ? 'auto' : '95vw',
    height: isImage ? 'auto' : '95vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const iframeStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)'
  };

  const imageStyle: React.CSSProperties = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)'
  };

  const modalContent = (
    <div 
      style={overlayStyle}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Elegant close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={closeButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#b91c1c';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#dc2626';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="Close modal"
      >
        ×
      </button>

      {/* Content container */}
      <div 
        style={contentStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {isImage ? (
          <img
            src={embedUrl}
            alt={`${title} - Full Screen View`}
            style={imageStyle}
            id="modal-title"
          />
        ) : (
          <iframe
            src={embedUrl}
            title={`${title} - Full Screen View`}
            style={iframeStyle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            id="modal-title"
          />
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default FullScreenModal; 