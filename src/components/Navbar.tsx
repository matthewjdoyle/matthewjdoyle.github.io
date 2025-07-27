

import React, { useState, useEffect } from 'react';
import { NavLink as NavLinkType } from '../types';
import { SiteLogoIcon } from '../constants';
import type { ViewName } from '../App'; 

interface NavbarProps {
  navLinks: NavLinkType[];
  currentView: ViewName;
  showPortfolioView: (sectionId?: string) => void;
  showAllLinksView: () => void;
  showAllPublicationsView: () => void; 
  showAllResearchView: () => void;
  showAboutDetailView: () => void;
  showWebPortfolioView: () => void;
  // showAgentsView: () => void; // Removed for agents view
}

const Navbar: React.FC<NavbarProps> = ({ 
  navLinks, 
  currentView, 
  showPortfolioView, 
  showAllLinksView, 
  showAllPublicationsView,
  showAllResearchView,
  showAboutDetailView,
  showWebPortfolioView,
  // showAgentsView // Removed
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (currentView === 'portfolio') {
        let currentActiveSection = 'hero'; 
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 64; 

        navLinks.forEach(link => {
          if (link.id !== 'all-links' && link.id !== 'all-publications' && link.id !== 'all-research-page-link' && link.id !== 'all-web-portfolio-page-link' && link.id !== 'agents-page-link') { 
            const sectionElement = document.getElementById(link.id);
            if (sectionElement) {
              const rect = sectionElement.getBoundingClientRect();
              if (rect.top <= navbarHeight + 20 && rect.bottom >= navbarHeight - 20) {
                currentActiveSection = link.id;
              }
            }
          }
        });
        if (window.scrollY < 50 && document.getElementById('hero')?.getBoundingClientRect().top === 0) {
            currentActiveSection = 'hero';
        }
        setActiveSection(currentActiveSection);
      } else if (currentView === 'allLinks') {
        setActiveSection('all-links');
      } else if (currentView === 'allPublications') {
        setActiveSection('all-publications');
      } else if (currentView === 'allResearch') { 
        setActiveSection('all-research-page-link');
      } else if (currentView === 'webPortfolio') {
        setActiveSection('all-web-portfolio-page-link');
      // } else if (currentView === 'agents') { // Removed for agents view
      //   setActiveSection('agents-page-link');
      } else if (currentView === 'aboutDetail') {
        setActiveSection('about');
      } else {
        setActiveSection(''); 
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks, currentView]);


  const handleNavClick = (id: string) => {
    if (id === 'all-links') {
      showAllLinksView();
    } else if (id === 'all-publications') {
      showAllPublicationsView();
    } else if (id === 'all-research-page-link') { 
      showAllResearchView();
    } else if (id === 'all-web-portfolio-page-link') {
      showWebPortfolioView();
    // } else if (id === 'agents-page-link') { // Removed for agents view
    //   showAgentsView();
    } else if (id === 'about') {
      showAboutDetailView();      
    } else {
      showPortfolioView(id);
    }
    setIsOpen(false);
  };
  
  const handleBrandClick = () => {
    showPortfolioView('hero');
    setIsOpen(false);
  }

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-space_navy/90 backdrop-blur-md shadow-lg py-3' 
      : 'bg-transparent py-5'
  }`;
  
  const linkBaseClasses = `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer`;
  
  const activeLinkClasses = isScrolled 
    ? 'bg-primary text-viridis_yellow_heading' 
    : 'bg-primary/70 text-viridis_yellow_heading md:bg-primary md:text-viridis_yellow_heading';
  
  const inactiveLinkClasses = isScrolled 
    ? 'text-neutral-darker hover:bg-primary/80 hover:text-viridis_yellow_heading' 
    : 'text-star_white hover:bg-star_white/10 hover:text-viridis_yellow_heading';
  
  const mobileButtonClasses = `inline-flex items-center justify-center p-2 rounded-md ${
    isScrolled ? 'text-star_white hover:bg-neutral-light' : 'text-star_white hover:bg-star_white/10'
  } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-star_white`;

  const mobileMenuBgClasses = isScrolled ? 'bg-space_navy/95' : 'bg-space_deep/95 backdrop-blur-sm';


  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleBrandClick(); }}
              aria-label="Homepage - Dr. Matthew Doyle"
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              <SiteLogoIcon 
                className={`h-10 w-10 transition-all duration-300 ${isScrolled ? 'filter drop-shadow-[0_0_5px_var(--color-secondary-light)]' : 'filter drop-shadow-[0_0_3px_rgba(0,0,0,0.7)]'}`}
              />
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={(link.id.endsWith('-page-link') || link.id === 'about') ? '#' : `#${link.id}`} 
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                  className={`${linkBaseClasses} 
                    ${activeSection === link.id ? activeLinkClasses : inactiveLinkClasses}
                  `}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={mobileButtonClasses}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden transition-all duration-300 ease-in-out`} id="mobile-menu">
        <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${mobileMenuBgClasses}`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={(link.id.endsWith('-page-link') || link.id === 'about') ? '#' : `#${link.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
              className={`${linkBaseClasses} block
                ${activeSection === link.id 
                  ? (isScrolled ? 'bg-primary text-viridis_yellow_heading' : 'bg-primary/70 text-viridis_yellow_heading')
                  : (isScrolled
                      ? 'text-neutral-darker hover:bg-primary/80 hover:text-viridis_yellow_heading'
                      : 'text-star_white hover:bg-star_white/10 hover:text-viridis_yellow_heading'
                    )
                }
              `}
              aria-current={activeSection === link.id ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;