import React, { useState, useEffect, useRef, useCallback } from 'react';
import SectionWrapper from './SectionWrapper';
import ProjectCard from './ProjectCard';
import FullScreenModal from './FullScreenModal';
import { PROJECTS_DATA, ChevronLeftIcon, ChevronRightIcon } from '../constants';
import { Project } from '../types';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface ProjectsSectionProps {
  id: string;
  showAllResearchView: () => void;
  showProjectDetailView: (projectId: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ id, showAllResearchView, showProjectDetailView }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [effectiveItemsPerPage, setEffectiveItemsPerPage] = useState(1);
  const [enlargedContent, setEnlargedContent] = useState<{ embedUrl: string; title: string } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemWidthRef = useRef<number>(0);

  const [titleRef, titleInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  const [contentBlockRef, contentBlockInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -80px 0px" });

  const totalProjects = PROJECTS_DATA.length;

  const handleEnlarge = (embedUrl: string, title: string) => {
    setEnlargedContent({ embedUrl, title });
  };

  const closeEnlarged = () => {
    setEnlargedContent(null);
  };

  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const updateItemsPerPage = useCallback(() => {
    const newItemsPerPage = getItemsPerPage();
    setEffectiveItemsPerPage(newItemsPerPage);
  }, []);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [updateItemsPerPage]);
  
  useEffect(() => {
    if (scrollContainerRef.current && scrollContainerRef.current.children[0]) {
        const firstChild = scrollContainerRef.current.children[0] as HTMLElement;
        itemWidthRef.current = firstChild.offsetWidth;
    }
  }, [effectiveItemsPerPage, totalProjects]);


  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || itemWidthRef.current === 0) return;
    const { scrollLeft } = scrollContainerRef.current;
    const gap = 8; 
    const newIndex = Math.round(scrollLeft / (itemWidthRef.current + (effectiveItemsPerPage > 1 ? gap : 0) ) );
    setCurrentIndex(newIndex);
  }, [itemWidthRef, effectiveItemsPerPage]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      let debounceTimer: number; 
      const debouncedHandler = () => {
        clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(handleScroll, 100);
      };
      container.addEventListener('scroll', debouncedHandler, { passive: true });
      handleScroll(); 
      return () => {
        clearTimeout(debounceTimer);
        container.removeEventListener('scroll', debouncedHandler);
      }
    }
  }, [handleScroll]);


  const scrollToProject = (index: number) => {
    if (!scrollContainerRef.current || itemWidthRef.current === 0) return;
    const gap = 8; 
    const targetScrollLeft = index * (itemWidthRef.current + (effectiveItemsPerPage > 1 ? gap : 0));
    scrollContainerRef.current.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollToProject(newIndex);
    }
  };
  
  const goToNext = () => {
    const maxIndex = Math.max(0, totalProjects - effectiveItemsPerPage);
    if (currentIndex < maxIndex) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToProject(newIndex);
    }
  };
  

  if (totalProjects === 0) {
    return (
      <div id={id} className="py-16 md:py-24 scroll-mt-16 bg-neutral-DEFAULT w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
           <div ref={titleRef} className={`${titleInView ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16 text-neutral-darker font-poppins">
              Featured Research
              </h2>
          </div>
          <div ref={contentBlockRef} className={`${contentBlockInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <p className="text-center text-neutral-dark">No research projects to display yet.</p>
              <div className="text-center mt-12">
              <button
                  onClick={showAllResearchView}
                  className="bg-secondary hover:bg-secondary-dark text-star_white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-secondary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
              >
                  View All Research Contributions
              </button>
              </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Calculate navigation states
  const maxIndex = Math.max(0, totalProjects - effectiveItemsPerPage);
  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < maxIndex;
  const showNavigation = totalProjects > effectiveItemsPerPage;


  return (
    <>
      <div id={id} className="py-16 md:py-24 scroll-mt-16 bg-neutral-DEFAULT w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div ref={titleRef} className={`${titleInView ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16 text-neutral-darker font-poppins">
              Featured Research
            </h2>
          </div>

        <div ref={contentBlockRef} className={`${contentBlockInView ? 'animate-slide-in-from-right' : 'opacity-0'}`}>
          <div className="relative w-full">
              {showNavigation && (
              <button
                  onClick={goToPrevious}
                  disabled={!canScrollPrev}
                  aria-label="Previous research project"
                  className="absolute left-0 lg:-left-16 top-1/2 -translate-y-1/2 z-20 p-2 bg-primary/60 hover:bg-primary text-star_white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                  <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              )}
              
              <div
              ref={scrollContainerRef}
              className={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide py-4 -mx-2 ${showNavigation ? 'px-10 sm:px-12 md:px-16' : 'px-2'}`}
              >
              {PROJECTS_DATA.map((project: Project) => (
                  <div
                  key={project.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-start px-2 outline-none"
                  >
                  <ProjectCard project={project} onReadMore={showProjectDetailView} onEnlarge={handleEnlarge} />
                  </div>
              ))}
              </div>

              {showNavigation && (
              <button
                  onClick={goToNext}
                  disabled={!canScrollNext}
                  aria-label="Next research project"
                  className="absolute right-0 lg:-right-16 top-1/2 -translate-y-1/2 z-20 p-2 bg-primary/60 hover:bg-primary text-star_white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                  <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              )}
          </div>

          {totalProjects > effectiveItemsPerPage && (
              <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.max(0, totalProjects - effectiveItemsPerPage + 1) }).map((_, index) => {
                  const isActive = index === currentIndex;
                  return (
                  <button
                      key={`dot-${index}`}
                      onClick={() => scrollToProject(index)}
                      aria-label={`Go to project set starting at ${index + 1}`}
                      className={`w-3 h-3 rounded-full transition-all duration-300
                      ${isActive ? 'bg-primary scale-125' : 'bg-ui_border hover:bg-primary/70'}
                      `}
                  />
                  );
              })}
              </div>
          )}

          <div className="text-center mt-12">
              <button
              onClick={showAllResearchView}
              className="bg-secondary hover:bg-secondary-dark text-star_white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-secondary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
              >
              View All Research Contributions
              </button>
          </div>
        </div>
      </div>
    </div>

    {enlargedContent && (
      <FullScreenModal
        isOpen={true}
        onClose={closeEnlarged}
        embedUrl={enlargedContent.embedUrl}
        title={enlargedContent.title}
        type="iframe"
      />
    )}
  </>
  );
};

export default ProjectsSection;