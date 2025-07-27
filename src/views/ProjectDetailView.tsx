import React, { useRef } from 'react'; // Added useRef
import { Project } from '../types';
import SectionWrapper from '../components/SectionWrapper';
import { ChevronLeftIcon, ExternalLinkIcon, ActualGitHubIcon as GitHubIcon } from '../constants';
import useScrollAnimation from '../hooks/useScrollAnimation';
import useStarryBackground from '../hooks/useStarryBackground'; // Import the new hook
import LaTeXRenderer from '../components/LaTeXRenderer';

interface ProjectDetailViewProps {
  project: Project;
  goBack: () => void;
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project, goBack }) => {
  const [backButtonRef, backButtonInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -20px 0px", triggerOnce: false });
  const [articleRef, articleInView] = useScrollAnimation<HTMLElement>({ threshold: 0.1, rootMargin: "0px 0px -50px 0px", triggerOnce: false }); // <article> element
  const canvasRef = useRef<HTMLCanvasElement>(null); // Add canvas ref

  useStarryBackground(canvasRef); // Use the hook

  return (
    <div className="relative min-h-screen overflow-hidden"> {/* Outer container, removed bg-neutral-DEFAULT */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      <div className="relative z-10 min-h-screen overflow-y-auto scrollbar-hide"> {/* Content wrapper */}
        <SectionWrapper id={`project-${project.id}-detail`} className="pt-8 md:pt-12 bg-transparent"> {/* Ensure SectionWrapper is transparent */}
          {/* Custom title with LaTeX support */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 font-poppins">
              <LaTeXRenderer 
                text={project.title}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-poppins"
              />
            </h1>
          </div>
          
          <div 
            ref={backButtonRef}
            className={`mb-8 md:mb-10 text-center sm:text-left ${backButtonInView ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            <button
              onClick={goBack}
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-star_white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-md"
              aria-label="Go back to previous page"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Back
            </button>
          </div>

          <article 
            ref={articleRef}
            className={`max-w-4xl mx-auto bg-space_navy/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl ${articleInView ? 'animate-reveal-up' : 'opacity-0'}`}
          >
            {project.date && (
              <p className="text-sm text-neutral-dark mb-3 text-right font-mono">{project.date}</p>
            )}
            
            <img src={project.imageUrl} alt={project.title} className="w-full h-auto max-h-[450px] object-cover rounded-lg mb-6 md:mb-8 shadow-lg border-4 border-neutral-light/30" /> {/* Made image border more subtle */}

            <div className="mb-6 md:mb-8">
              <h4 className="text-sm font-semibold text-primary mb-2">Keywords/Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="bg-space_purple text-star_white text-xs px-3 py-1.5 rounded-full shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-neutral-dark leading-relaxed space-y-4 text-base md:text-lg">
              {project.detailedDescription && project.detailedDescription.length > 0 ? (
                project.detailedDescription.map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl md:text-3xl font-semibold text-primary-light mt-6 mb-3 font-poppins">
                        <LaTeXRenderer 
                          text={paragraph.substring(3)}
                          className="text-2xl md:text-3xl font-semibold text-primary-light font-poppins"
                        />
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl md:text-2xl font-semibold text-primary mt-4 mb-2 font-poppins">
                        <LaTeXRenderer 
                          text={paragraph.substring(4)}
                          className="text-xl md:text-2xl font-semibold text-primary font-poppins"
                        />
                      </h3>
                    );
                  }
                  const imgMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
                  if (imgMatch) {
                      return (
                          <figure key={index} className="my-4">
                              <img src={imgMatch[2]} alt={imgMatch[1]} className="max-w-full h-auto rounded-md shadow-md mx-auto" />
                              {imgMatch[1] && <figcaption className="text-center text-sm text-neutral-dark mt-2">{imgMatch[1]}</figcaption>}
                          </figure>
                      );
                  }
                  return (
                    <div key={index} className="text-neutral-dark leading-relaxed text-base md:text-lg">
                      <LaTeXRenderer 
                        text={paragraph}
                        className="text-neutral-dark leading-relaxed text-base md:text-lg"
                        inline={false}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="text-neutral-dark leading-relaxed text-base md:text-lg">
                  <LaTeXRenderer 
                    text={project.description}
                    className="text-neutral-dark leading-relaxed text-base md:text-lg"
                    inline={false}
                  />
                </div>
              )}
            </div>

            {(project.liveUrl || project.repoUrl) && (
              <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-ui_border/50 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4"> {/* Subtle border */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center sm:justify-start text-md bg-secondary hover:bg-secondary-dark text-star_white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-secondary)] transition-all duration-300 ease-in-out transform hover:scale-105"
                    aria-label={`View Publication/Details for ${project.title}`}
                  >
                    <ExternalLinkIcon className="w-5 h-5 mr-2" />
                    Publication/Details
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center sm:justify-start text-md bg-primary hover:bg-primary-dark text-star_white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300 ease-in-out transform hover:scale-105"
                    aria-label={`View Code/Paper for ${project.title}`}
                  >
                    <GitHubIcon className="w-5 h-5 mr-2" />
                    Code/Paper
                  </a>
                )}
              </div>
            )}
          </article>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default ProjectDetailView;