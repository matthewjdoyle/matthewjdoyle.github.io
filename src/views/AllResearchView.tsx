import React, { useState, useRef } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import ProjectCard from '../components/ProjectCard';
import FullScreenModal from '../components/FullScreenModal';
import { PROJECTS_DATA, ChevronLeftIcon } from '../constants';
import { Project } from '../types';
import useScrollAnimation from '../hooks/useScrollAnimation';
import useStarryBackground from '../hooks/useStarryBackground';

interface AllResearchViewProps {
  showPortfolioView: () => void;
  showProjectDetailView: (projectId: string) => void;
}

const AllResearchView: React.FC<AllResearchViewProps> = ({ showPortfolioView, showProjectDetailView }) => {
  const [backButtonRef, backButtonInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
  const [contentRef, contentInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [enlargedProject, setEnlargedProject] = useState<{ embedUrl: string; title: string } | null>(null);

  useStarryBackground(canvasRef);

  const handleEnlarge = (embedUrl: string, title: string) => {
    setEnlargedProject({ embedUrl, title });
  };

  const handleCloseEnlarged = () => {
    setEnlargedProject(null);
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
        <div className="relative z-10 min-h-screen overflow-y-auto scrollbar-hide">
          <SectionWrapper id="all-research" title="All Research Contributions" className="bg-transparent min-h-screen pt-24">
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
            <div 
              ref={contentRef}
              className={`${contentInView ? 'animate-slide-in-from-right' : 'opacity-0'}`}
            >
              {PROJECTS_DATA.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {PROJECTS_DATA.map((project: Project) => (
                    <div key={project.id} >
                      <ProjectCard 
                        project={project} 
                        onReadMore={showProjectDetailView}
                        onEnlarge={handleEnlarge}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-neutral-dark text-lg">No research projects have been added yet.</p>
              )}
            </div>
          </SectionWrapper>
        </div>
      </div>
      
      <FullScreenModal
        isOpen={!!enlargedProject}
        onClose={handleCloseEnlarged}
        embedUrl={enlargedProject?.embedUrl || ''}
        title={enlargedProject?.title || ''}
        type="auto"
      />
    </>
  );
};

export default AllResearchView;