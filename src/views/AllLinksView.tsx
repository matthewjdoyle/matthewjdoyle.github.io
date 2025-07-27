import React, { useRef } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { SOCIAL_LINKS, ChevronLeftIcon } from '../constants';
import { SocialLink } from '../types';
import useScrollAnimation from '../hooks/useScrollAnimation';
import useStarryBackground from '../hooks/useStarryBackground';

interface AllLinksViewProps {
  showPortfolioView: () => void;
}

// Custom SiteLogoIcon specifically for the links page
const LinkPageSiteLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <path id="linksPageEllipsePath" d="M10,50 A40,25 0 1,1 90,50 A40,25 0 1,1 10,50 Z" />
    </defs>
    <g transform="rotate(45 50 50)">
      <ellipse cx="50" cy="50" rx="40" ry="25" stroke="var(--color-electric-blue)" strokeWidth="6"/>
      {/* Central Diamond Dots */}
      <circle cx="43" cy="50" r="7" fill="var(--color-electric-blue)"/> 
      <circle cx="50" cy="43" r="7" fill="var(--color-nebula-pink)"/>
      <circle cx="57" cy="50" r="7" fill="var(--color-electric-blue)"/>
      <circle cx="50" cy="57" r="7" fill="var(--color-nebula-pink)"/>
      
      {/* Outer Extrema Dots with slow continuous animation */}
      <circle r="5" fill="var(--color-viridis-yellow-heading)">
        <animateMotion 
          dur="30s" 
          repeatCount="indefinite"
        >
          <mpath href="#linksPageEllipsePath"/>
        </animateMotion>
      </circle>
      <circle r="5" fill="var(--color-viridis-yellow-heading)">
        <animateMotion 
          dur="30s" 
          repeatCount="indefinite" 
          begin="-15s"
        >
          <mpath href="#linksPageEllipsePath"/>
        </animateMotion>
      </circle>
    </g>
  </svg>
);

const AllLinksView: React.FC<AllLinksViewProps> = ({ showPortfolioView }) => {
  const [backButtonRef, backButtonInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useStarryBackground(canvasRef);

  const personalProjectCategories = ['Personal Projects & Services'];
  
  const leftColumnLinks = SOCIAL_LINKS.filter(link => !personalProjectCategories.includes(link.category));
  const rightColumnLinks = SOCIAL_LINKS.filter(link => personalProjectCategories.includes(link.category));

  const renderLinkItem = (link: SocialLink, index: number, isRightColumn: boolean) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [itemRef, itemInView] = useScrollAnimation<HTMLAnchorElement>({ threshold: 0.1, rootMargin: "0px 0px -20px 0px", triggerOnce: true });
    const iconElement = link.icon;
    let iconSpecificClasses = "";
    
    // Check if this is one of our custom logo links
    const isCustomLogo = link.id === 'tutoring' || link.id === 'webdesign';

    if (link.id === 'orcid') {
      iconSpecificClasses = `${iconElement.props.className || ''} group-hover:scale-110 transition-transform duration-300 ease-in-out`;
    } else if (isCustomLogo) {
      // Custom logos get larger size and no color override
      const baseClasses = (iconElement.props.className || '')
        .replace(/w-\d+/g, '')
        .replace(/h-\d+/g, '')
        .replace(/mb-[\d.]+/g, '')
        .trim();
      iconSpecificClasses = `w-12 h-12 ${baseClasses} group-hover:scale-110 transition-transform duration-300 ease-in-out`.trim();
    } else {
      const baseClasses = (iconElement.props.className || '')
        .replace(/w-\d+/g, '')
        .replace(/h-\d+/g, '')
        .replace(/mb-[\d.]+/g, '')
        .trim();
      iconSpecificClasses = `w-8 h-8 text-secondary ${baseClasses} group-hover:scale-110 transition-transform duration-300 ease-in-out`.trim();
    }

    const tooltipBaseClasses = `
      absolute top-1/2 -translate-y-1/2
      px-3 py-2
      bg-neutral-DEFAULT/80 backdrop-blur-md text-neutral-darker text-xs font-medium text-left
      rounded-md shadow-lg border border-neutral-light/20
      opacity-0 invisible group-hover:opacity-100 group-hover:visible
      transition-all duration-300 ease-in-out
      pointer-events-none whitespace-nowrap z-10
    `;

    const tooltipPositionClasses = isRightColumn 
      ? `right-full mr-3 transform group-hover:translate-x-0 -translate-x-2`
      : `left-full ml-3 transform group-hover:translate-x-0 translate-x-2`;

         // Consistent styling for all link buttons with white border
     const containerClasses = `
       relative group w-16 h-16 flex items-center justify-center
       bg-transparent p-2 rounded-lg border-2 border-white
       hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
       transition-all duration-300 transform hover:-translate-y-1
       focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
       ${itemInView ? 'animate-slide-in-left' : 'opacity-0'} 
     `;

    return (
      <a
        key={link.id}
        ref={itemRef}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.name}
        className={containerClasses}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {React.cloneElement(iconElement, { className: iconSpecificClasses, 'aria-hidden': 'true' })}
        <span
          role="tooltip"
          className={`${tooltipBaseClasses} ${tooltipPositionClasses}`}
        >
          {link.name}
        </span>
      </a>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      <div className="relative z-10 min-h-screen overflow-y-auto scrollbar-hide">
        <SectionWrapper id="all-links-page" title="All My Links" className="bg-transparent min-h-screen pt-24 pb-16">
          <div
            ref={backButtonRef}
            className={`mb-10 text-center sm:text-left ${backButtonInView ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            <button
              onClick={showPortfolioView}
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-star_white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-md"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Back to Portfolio
            </button>
          </div>

          <div className="flex flex-wrap w-full gap-x-4 gap-y-8 items-start">
            {/* Left Column Wrapper */}
            <div className="flex flex-col items-start space-y-4">
              {leftColumnLinks.map((link, index) => renderLinkItem(link, index, false))}
            </div>

            {/* Center Site Logo - Larger, no hover animation, slower continuous movement */}
            <div className="flex-1 flex justify-center">
              <div className="flex items-center justify-center w-40 h-40">
                <LinkPageSiteLogoIcon 
                  className="w-36 h-36 text-secondary" 
                  aria-label="Site Logo"
                />
              </div>
            </div>

            {/* Right Column Wrapper */}
            {rightColumnLinks.length > 0 && (
              <div className="flex flex-col items-end space-y-4">
                {rightColumnLinks.map((link, index) => renderLinkItem(link, index, true))}
              </div>
            )}
          </div>
          
          {SOCIAL_LINKS.length === 0 && (
            <p className="text-neutral-dark text-lg text-center mt-8">No links have been added yet.</p>
          )}
        </SectionWrapper>
      </div>
    </div>
  );
};

export default AllLinksView; 