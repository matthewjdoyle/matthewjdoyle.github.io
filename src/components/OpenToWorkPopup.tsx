import React, { useEffect, useState } from 'react';
import { LinkedInIcon, TwitterXIcon, BlueskyIcon, ClipboardIcon, EmailIcon, BookOpenIcon } from '../constants/icons';

interface OpenToWorkPopupProps {
  onClose: () => void;
  onContact: () => void;
}

const OpenToWorkPopup: React.FC<OpenToWorkPopupProps> = ({ onClose, onContact }) => {
  const [copyLinkText, setCopyLinkText] = useState("Copy Portfolio Link");
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden'; 

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = ''; 
    };
  }, [onClose]);

  const skills = [
    "AI & Machine Learning Integration",
    "Full-Stack Web Development (React, Node.js, TypeScript)",
    "Data Science & Computational Physics (Python, C++)",
    "Advanced Problem-Solving & Algorithm Design",
    "Technical Leadership & Scientific Communication",
  ];

  const portfolioUrl = typeof window !== 'undefined' ? window.location.origin : 'https://matthewd0yle.com/';
  const shareText = encodeURIComponent("Check out this impressive portfolio by Dr. Matthew Doyle!");
  const shareTextWithLink = encodeURIComponent(`Check out this impressive portfolio by Dr. Matthew Doyle: ${portfolioUrl}`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopyLinkText("Link Copied!");
      setShowCopySuccess(true);
      setTimeout(() => {
        setCopyLinkText("Copy Portfolio Link");
        setShowCopySuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
      setCopyLinkText("Copy Failed - Try Again");
      setTimeout(() => setCopyLinkText("Copy Portfolio Link"), 2000);
    }
  };
  
  const handleEmailMe = () => {
    window.open('mailto:contact@matthewd0yle.com', '_blank');
    onClose();
  };

  const socialShareButtons = [
    { 
      id: 'linkedin', 
      Icon: LinkedInIcon, 
      label: 'LinkedIn', 
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`,
      hoverColor: 'hover:shadow-[0_0_15px_#0077B5]',
      description: 'Share on LinkedIn'
    },
    { 
      id: 'twitter', 
      Icon: TwitterXIcon, 
      label: 'X (Twitter)', 
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(portfolioUrl)}&text=${shareText}`,
      hoverColor: 'hover:shadow-[0_0_15px_var(--color-secondary)]',
      description: 'Share on X'
    },
    { 
      id: 'bluesky', 
      Icon: BlueskyIcon, 
      label: 'Bluesky', 
      url: `https://bsky.app/intent/compose?text=${shareTextWithLink}`,
      hoverColor: 'hover:shadow-[0_0_15px_var(--color-viridis-yellow-heading)]',
      description: 'Share on Bluesky'
    }
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4 animate-fade-in-overlay"
      onClick={onClose} 
      role="dialog"
      aria-modal="true"
      aria-labelledby="openToWorkPopupTitle"
    >
      <div
        className="relative bg-neutral-light/30 backdrop-blur-xl p-7 sm:p-10 rounded-2xl w-full max-w-2xl animate-fast-slide-in-from-bottom flex flex-col gap-6 sm:gap-7 border-2 border-transparent animate-animated-glowing-border max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-darker hover:text-star_white transition-colors duration-200 p-1.5 rounded-full hover:bg-neutral-DEFAULT/50 focus:outline-none focus:ring-2 focus:ring-star_white/50"
          aria-label="Close popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <h2 
            id="openToWorkPopupTitle" 
            className="text-3xl sm:text-4xl font-bold text-viridis_yellow_heading mb-4 font-poppins"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
          >
            🚀 Ready for New Challenges!
          </h2>
          <p className="text-neutral-darker text-lg sm:text-xl leading-relaxed max-w-xl mx-auto">
            I'm actively seeking innovative opportunities where I can leverage my unique blend of 
            <span className="text-secondary font-semibold"> scientific expertise</span> and 
            <span className="text-primary font-semibold"> modern tech skills</span> to solve complex problems.
          </p>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-star_white mb-4 font-poppins text-center">Core Expertise:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-start">
                <span className="text-secondary mr-3 mt-1 flex-shrink-0 text-lg">✓</span>
                <span className="text-neutral-dark text-sm sm:text-base">{skill}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://matthewd0yle.com/cv/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-star_white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-[0_0_20px_var(--color-primary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
            onClick={(e) => e.stopPropagation()} 
          >
            <BookOpenIcon className="w-6 h-6" />
            View Full CV
          </a>
          <button
            onClick={handleEmailMe}
            className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-star_white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-[0_0_20px_var(--color-secondary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
          >
            <EmailIcon className="w-6 h-6" />
            Email Me Directly
          </button>
        </div>

        <div className="pt-6 border-t border-star_white/20">
          <h3 className="text-lg sm:text-xl font-semibold text-star_white mb-4 text-center">Help Spread the Word!</h3>
          <p className="text-neutral-dark text-center mb-6 text-sm sm:text-base">
            Found my work interesting? Share this portfolio with your network:
          </p>
          
          {/* Copy Link Button - More Prominent */}
          <div className="mb-6">
            <button
              onClick={handleCopyLink}
              className={`
                w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-semibold text-lg
                transition-all duration-300 ease-in-out transform hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-star_white/30
                ${showCopySuccess 
                  ? 'bg-gradient-to-r from-secondary to-secondary-dark text-star_white shadow-[0_0_20px_var(--color-secondary)]' 
                  : 'bg-gradient-to-r from-space_purple to-ui_dark hover:from-ui_dark hover:to-space_purple text-star_white shadow-lg hover:shadow-[0_0_20px_var(--color-space-purple)]'
                }
              `}
              aria-label="Copy portfolio link to clipboard"
            >
              <ClipboardIcon className={`w-6 h-6 transition-transform duration-300 ${showCopySuccess ? 'scale-110' : ''}`} />
              <span className="relative">
                {copyLinkText}
                {showCopySuccess && (
                  <span className="absolute -top-1 -right-2 text-xs">✨</span>
                )}
              </span>
            </button>
          </div>

          {/* Social Share Buttons - Consistent with AllLinksView */}
          <div className="flex justify-center gap-4">
            {socialShareButtons.map(({ id, Icon, label, url, hoverColor, description }) => (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  relative group w-14 h-14 flex items-center justify-center
                  bg-neutral-light p-3 rounded-lg shadow-md
                  ${hoverColor}
                  transition-all duration-300 transform hover:-translate-y-1
                  focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50
                `}
                aria-label={description}
                onClick={(e) => e.stopPropagation()}
              >
                <Icon className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                <span
                  role="tooltip"
                  className="
                    absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                    px-3 py-2
                    bg-neutral-DEFAULT/90 backdrop-blur-md text-neutral-darker text-xs font-medium
                    rounded-md shadow-lg border border-neutral-light/20
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 ease-in-out
                    pointer-events-none whitespace-nowrap z-10
                  "
                >
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenToWorkPopup;
