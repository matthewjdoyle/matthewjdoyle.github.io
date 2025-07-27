import React from 'react';
import SectionWrapper from './SectionWrapper';
import { ABOUT_ME_TEXT_1, ABOUT_ME_TEXT_2, YOUR_NAME, YOUR_FIRST_NAME } from '../constants';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface AboutSectionProps {
  id: string;
  onReadMore: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ id, onReadMore }) => {
  const [imgContainerRef, imgInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.25, rootMargin: "0px 0px -80px 0px" });
  const [textContentRef, textInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.25, rootMargin: "0px 0px -80px 0px" });

  return (
    <SectionWrapper id={id} className="bg-neutral-DEFAULT">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
          <div
            ref={imgContainerRef}
            className={`md:w-1/3 md:mt-2 ${imgInView ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            <img
              src="/portrait.JPEG"
              alt={YOUR_NAME}
              className="rounded-lg shadow-[0_0_15px_var(--color-electric-blue)] w-full max-w-xs sm:max-w-sm mx-auto md:max-w-none object-cover aspect-square"
            />
          </div>
          <div
            ref={textContentRef}
            className={`md:w-2/3 space-y-6 text-lg text-neutral-dark leading-relaxed ${textInView ? 'animate-slide-in-from-right' : 'opacity-0'}`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darker font-poppins mb-6 md:mb-8">
              About Me
            </h2>
            <p>
              {ABOUT_ME_TEXT_1}
            </p>
            <p>
              {ABOUT_ME_TEXT_2}
            </p>
            <div className="pt-4">
              <button
                onClick={onReadMore}
                className="bg-primary hover:bg-primary-dark text-star_white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-md"
                aria-label={`Read more about ${YOUR_FIRST_NAME}`}
              >
                Read More About {YOUR_FIRST_NAME} &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;