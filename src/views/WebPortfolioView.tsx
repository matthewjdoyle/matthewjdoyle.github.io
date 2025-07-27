import React, { useRef } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import WebPortfolioItemCard from '../components/WebPortfolioItemCard';
import { WEB_PORTFOLIO_DATA, ChevronLeftIcon } from '../constants';
import { WebPortfolioItem } from '../types';
import useScrollAnimation from '../hooks/useScrollAnimation';
import useStarryBackground from '../hooks/useStarryBackground';

interface WebPortfolioViewProps {
  showPortfolioView: () => void;
}

const WebPortfolioView: React.FC<WebPortfolioViewProps> = ({ showPortfolioView }) => {
  const [backButtonRef, backButtonInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
  const [contentRef, contentInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useStarryBackground(canvasRef);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      <div className="relative z-10 min-h-screen overflow-y-auto scrollbar-hide">
        <SectionWrapper id="web-portfolio" title="Web Development Portfolio" className="bg-transparent min-h-screen pt-24">
          <div 
            ref={backButtonRef}
            className={`mb-10 text-center sm:text-left ${backButtonInView ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            <button
              onClick={showPortfolioView}
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-star_white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-md"
              aria-label="Back to main portfolio"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Back to Main Portfolio
            </button>
          </div>
          <div 
            ref={contentRef}
            className={`${contentInView ? 'animate-slide-in-from-right' : 'opacity-0'}`}
          >
            {WEB_PORTFOLIO_DATA.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {WEB_PORTFOLIO_DATA.map((item: WebPortfolioItem) => (
                  <div key={item.id}>
                    <WebPortfolioItemCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-neutral-dark text-lg">No web portfolio projects have been added yet.</p>
            )}
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default WebPortfolioView; 