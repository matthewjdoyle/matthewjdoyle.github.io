

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PortfolioView from './views/PortfolioView';
import AllResearchView from './views/AllResearchView';
import AllLinksView from './views/AllLinksView';
import AllPublicationsView from './views/AllPublicationsView';
import ProjectDetailView from './views/ProjectDetailView';
import AboutDetailView from './views/AboutDetailView';
import WebPortfolioView from './views/WebPortfolioView';
// import AgentsView from './views/AgentsView'; // Removed AgentsView
import OpenToWorkPopup from './components/OpenToWorkPopup';
import { NAV_LINKS, PROJECTS_DATA, ABOUT_ME_DETAILED_PARAGRAPHS } from './constants';

export type ViewName = 'portfolio' | 'allResearch' | 'allLinks' | 'allPublications' | 'projectView' | 'aboutDetail' | 'webPortfolio'; // Removed 'agents'

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewName>('portfolio');
  const [activeView, setActiveView] = useState<ViewName>('portfolio');
  const [targetSection, setTargetSection] = useState<string | null>('hero');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [viewHistory, setViewHistory] = useState<ViewName[]>(['portfolio']);
  
  const [animationClass, setAnimationClass] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const [showOpenToWorkPopup, setShowOpenToWorkPopup] = useState(false);

  const EXIT_ANIMATION_DURATION = 300;
  const ENTER_ANIMATION_DURATION = 800;

  useEffect(() => {
    const popupShown = sessionStorage.getItem('portfolioOpenToWorkPopupShown');
    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowOpenToWorkPopup(true);
        sessionStorage.setItem('portfolioOpenToWorkPopupShown', 'true');
      }, 15000); 
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseOpenToWorkPopup = () => {
    setShowOpenToWorkPopup(false);
  };

  const handleContactFromPopup = () => {
    navigateTo('portfolio', 'contact'); 
    handleCloseOpenToWorkPopup();
  };


  const startNavigation = (newView: ViewName, direction: 'forward' | 'backward', newSectionId?: string | null, newProjectId?: string | null) => {
    if (isTransitioning && activeView !== newView) return; 

    if (newView === activeView && !isTransitioning) { 
        if (newView === 'portfolio' && newSectionId !== undefined && newSectionId !== targetSection) {
            setTargetSection(newSectionId); 
        } else {
            window.scrollTo(0, 0); 
        }
        if (currentView !== newView) {
            setCurrentView(newView);
            if (direction === 'forward' && (!viewHistory.length || viewHistory[viewHistory.length - 1] !== newView)) {
                setViewHistory(prev => [...prev, newView]);
            }
        }
        return;
    }
    
    setIsTransitioning(true);
    
    const exitAnim = direction === 'forward' ? 'animate-slide-out-left' : 'animate-slide-out-right';
    setAnimationClass(exitAnim);

    if (direction === 'forward' && currentView !== newView && (!viewHistory.length || viewHistory[viewHistory.length-1] !== newView)) {
        setViewHistory(prev => [...prev, newView]);
    }

    setCurrentView(newView); 

    setTimeout(() => {
      setActiveView(newView); 
      
      if (newSectionId !== undefined) setTargetSection(newSectionId);
      if (newProjectId !== undefined) setSelectedProjectId(newProjectId);
      
      const enterAnim = direction === 'forward' ? 'animate-slide-in-from-right' : 'animate-slide-in-from-left';
      setAnimationClass(enterAnim);
      
      window.scrollTo(0, 0);

      setTimeout(() => {
        setAnimationClass('');
        setIsTransitioning(false);
      }, ENTER_ANIMATION_DURATION);

    }, EXIT_ANIMATION_DURATION);
  };

  const navigateTo = (view: ViewName, sectionId?: string, projectId?: string) => {
    startNavigation(view, 'forward', sectionId, projectId);
  };

  const goBack = () => {
    if (viewHistory.length > 1 && !isTransitioning) {
      const newHistory = [...viewHistory];
      newHistory.pop(); 
      const previousView = newHistory[newHistory.length - 1];
      
      let newTargetSection: string | null = null;
      const newProjectId: string | null = null; 

      if (previousView === 'portfolio') {
        const cameFromView = activeView; 
        if (cameFromView === 'projectView') newTargetSection = 'projects';
        else if (cameFromView === 'aboutDetail') newTargetSection = 'about';
        else newTargetSection = 'hero'; 
      }
      
      setViewHistory(newHistory); 
      startNavigation(previousView, 'backward', newTargetSection, newProjectId);
    }
  };
  
  const showPortfolioView = (sectionId?: string) => navigateTo('portfolio', sectionId === undefined ? 'hero' : sectionId);
  const showAllResearchView = () => navigateTo('allResearch');
  const showAllLinksView = () => navigateTo('allLinks');
  const showAllPublicationsView = () => navigateTo('allPublications');
  const showProjectDetailView = (projectId: string) => navigateTo('projectView', undefined, projectId);
  const showAboutDetailView = () => navigateTo('aboutDetail');
  const showWebPortfolioView = () => navigateTo('webPortfolio');
  // const showAgentsView = () => navigateTo('agents'); // Removed showAgentsView

  useEffect(() => {
    if (activeView === 'portfolio' && targetSection && !isTransitioning && animationClass === '') {
      const element = document.getElementById(targetSection);
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        });
      }
    }
  }, [activeView, targetSection, isTransitioning, animationClass]);


  const renderActiveView = () => {
    switch (activeView) {
      case 'portfolio':
        return <PortfolioView 
                  showAllResearchView={showAllResearchView} 
                  showProjectDetailView={showProjectDetailView}
                  showAboutDetailView={showAboutDetailView} 
                  showWebPortfolioView={showWebPortfolioView}
                  showAllPublicationsView={showAllPublicationsView}
                  showAllLinksView={showAllLinksView}
                />;
      case 'allResearch':
        return <AllResearchView 
                  showPortfolioView={() => showPortfolioView('hero')} 
                  showProjectDetailView={showProjectDetailView}
                />;
      case 'allLinks':
        return <AllLinksView showPortfolioView={() => showPortfolioView('hero')} />;
      case 'allPublications':
        return <AllPublicationsView showPortfolioView={() => showPortfolioView('hero')} />;
      case 'webPortfolio':
        return <WebPortfolioView showPortfolioView={() => showPortfolioView('hero')} />;
      // case 'agents': // Removed case for agents
      //   return <AgentsView showPortfolioView={() => showPortfolioView('hero')} />;
      case 'projectView':
        const project = PROJECTS_DATA.find(p => p.id === selectedProjectId);
        if (!project) {
          if (!isTransitioning) {
            console.warn(`Project with id "${selectedProjectId}" not found, navigating back.`);
            setTimeout(() => goBack(), 0);
          }
          return null; 
        }
        return <ProjectDetailView project={project} goBack={goBack} />;
      case 'aboutDetail':
        return <AboutDetailView 
                  goBack={goBack} 
                  detailedParagraphs={ABOUT_ME_DETAILED_PARAGRAPHS} 
                />;
      default:
        console.error(`Unknown view: ${activeView}. Defaulting to portfolio.`);
        // To satisfy TypeScript, ensure all required props are passed if default is PortfolioView
        return <PortfolioView 
                  showAllResearchView={showAllResearchView} 
                  showProjectDetailView={showProjectDetailView} 
                  showAboutDetailView={showAboutDetailView}
                  showWebPortfolioView={showWebPortfolioView}
                  showAllPublicationsView={showAllPublicationsView}
                  showAllLinksView={showAllLinksView}
                />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-space_deep text-neutral-dark font-sans overflow-x-hidden">
      <Navbar 
        navLinks={NAV_LINKS} 
        currentView={currentView} 
        showPortfolioView={showPortfolioView} 
        showAllLinksView={showAllLinksView}
        showAllPublicationsView={showAllPublicationsView}
        showAllResearchView={showAllResearchView} 
        showAboutDetailView={showAboutDetailView}
        showWebPortfolioView={showWebPortfolioView}
        // showAgentsView={showAgentsView} // Removed showAgentsView
      />
      <main className={`flex-grow pt-16 ${animationClass}`}>
        {renderActiveView()}
      </main>
      <Footer />
      {showOpenToWorkPopup && (
        <OpenToWorkPopup
          onClose={handleCloseOpenToWorkPopup}
          onContact={handleContactFromPopup}
        />
      )}
    </div>
  );
};

export default App;