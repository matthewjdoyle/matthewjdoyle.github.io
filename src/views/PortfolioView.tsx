

import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { HeroSection } from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
// import SkillsSection from '../components/SkillsSection'; // Removed
import ProjectsSection from '../components/ProjectsSection';
import WebPortfolioSection from '../components/WebPortfolioSection'; // Import new section
// import ExperienceSection from '../components/ExperienceSection'; // Removed
// import EducationSection from '../components/EducationSection'; // Removed
import ContactSection from '../components/ContactSection';
import SectionWrapper from '../components/SectionWrapper';

interface PortfolioViewProps {
  showAllResearchView: () => void;
  showProjectDetailView: (projectId: string) => void;
  showAboutDetailView: () => void; 
  showWebPortfolioView: () => void;
  showAllPublicationsView: () => void;
  showAllLinksView: () => void;
}

const PortfolioView: React.FC<PortfolioViewProps> = ({ 
  showAllResearchView, 
  showProjectDetailView, 
  showAboutDetailView,
  showWebPortfolioView,
  showAllPublicationsView,
  showAllLinksView
}) => {

  // Scroll animation for the resources button block
  const [resourcesRef, resourcesInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  return (
    <>
      <HeroSection 
        id="hero" 
        showAllResearchView={showAllResearchView} 
        showWebPortfolioView={showWebPortfolioView}
      />
      <AboutSection 
        id="about" 
        onReadMore={showAboutDetailView}
      />
      <ProjectsSection 
        id="projects"
        showAllResearchView={showAllResearchView} 
        showProjectDetailView={showProjectDetailView}
      />
      <WebPortfolioSection 
        id="web-portfolio-showcase" 
        showWebPortfolioView={showWebPortfolioView}
      />

      {/* Resources section with buttons to publications and links pages */}
      <SectionWrapper id="resources" className="bg-neutral-DEFAULT">
        <div
          ref={resourcesRef}
          className={`flex flex-col sm:flex-row items-center justify-center gap-6 mt-4 ${resourcesInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <button
            onClick={showAllPublicationsView}
            className="bg-secondary hover:bg-secondary-dark text-star_white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-secondary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
          >
            My Publications
          </button>
          <button
            onClick={showAllLinksView}
            className="bg-primary hover:bg-primary-dark text-star_white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
          >
            All My Links
          </button>
        </div>
      </SectionWrapper>
      {/* <SkillsSection id="skills" /> */}
      {/* <ExperienceSection id="experience" /> */}
      {/* <EducationSection id="education" /> */}
      <ContactSection id="contact" />
    </>
  );
};

export default PortfolioView;