import React, { useRef } from 'react'; 
import SectionWrapper from '../components/SectionWrapper';
import PublicationCard from '../components/PublicationCard';
import ContributionItem from '../components/ContributionItem'; // Import new component
import { 
  PUBLICATIONS_DATA, 
  CONFERENCE_POSTERS_DATA, 
  PRESENTATIONS_DATA, 
  ChevronLeftIcon 
} from '../constants';
import { Publication, ConferenceContribution } from '../types';
import useScrollAnimation from '../hooks/useScrollAnimation';
import useStarryBackground from '../hooks/useStarryBackground'; 

interface AllPublicationsViewProps {
  showPortfolioView: () => void;
}

const AllPublicationsView: React.FC<AllPublicationsViewProps> = ({ showPortfolioView }) => {
  const [backButtonRef, backButtonInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
  const [mainContentRef, mainContentInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  // For the title of "Further Contributions", SectionWrapper handles its own title animation.
  // This ref is for the container holding the two columns, if specific animation for the block is needed.
  // However, the current animation applies to individual columns below.
  // const [furtherContributionsContainerRef, furtherContributionsContainerInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
  const [postersColumnRef, postersColumnInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  const [presentationsColumnRef, presentationsColumnInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });


  const canvasRef = useRef<HTMLCanvasElement>(null); 
  
  useStarryBackground(canvasRef); 

  return (
    <div className="relative min-h-screen overflow-hidden"> 
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      <div className="relative z-10 min-h-screen overflow-y-auto scrollbar-hide"> 
        <SectionWrapper id="all-publications-page" title="All Publications" className="bg-transparent pt-24 pb-16"> 
          <div 
            ref={backButtonRef}
            className={`mb-10 text-center sm:text-left ${backButtonInView ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            <button
              onClick={showPortfolioView}
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-star_white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-md"
              aria-label="Back to portfolio homepage"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Back to Portfolio
            </button>
          </div>

          <div 
            ref={mainContentRef}
            className={`max-w-4xl mx-auto ${mainContentInView ? 'animate-reveal-up' : 'opacity-0'}`} // Changed animation
          >
            {PUBLICATIONS_DATA.length > 0 ? (
              <div className="space-y-8">
                {PUBLICATIONS_DATA.map((publication: Publication) => (
                  <div key={publication.id}>
                    <PublicationCard publication={publication} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-neutral-dark text-lg">No publications have been added yet.</p>
            )}
          </div>
        </SectionWrapper>

        {/* Further Contributions Section */}
        {/* SectionWrapper's title will be animated by its own logic if title prop is used. */}
        {/* If a separate animation for the entire "Further Contributions" block is needed, wrap it in a div with a ref. */}
        <SectionWrapper id="further-contributions" title="Further Contributions" className="bg-transparent pt-0 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 md:gap-y-0">
              {/* Column 1: Conference Posters */}
              <div 
                ref={postersColumnRef}
                className={`${postersColumnInView ? 'animate-slide-in-left' : 'opacity-0'}`}
              >
                <h3 className="text-2xl font-bold text-primary mb-6 font-poppins text-center md:text-left">Conference Posters</h3>
                {CONFERENCE_POSTERS_DATA.length > 0 ? (
                  <div className="space-y-6">
                    {CONFERENCE_POSTERS_DATA.map((poster: ConferenceContribution, index: number) => (
                      <div key={poster.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                        <ContributionItem item={poster} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-dark text-center md:text-left">No conference posters to display yet.</p>
                )}
              </div>

              {/* Column 2: Presentations */}
              <div 
                ref={presentationsColumnRef}
                className={`${presentationsColumnInView ? 'animate-slide-in-from-right' : 'opacity-0'}`}
              >
                <h3 className="text-2xl font-bold text-primary mb-6 font-poppins text-center md:text-left">Presentations</h3>
                {PRESENTATIONS_DATA.length > 0 ? (
                  <div className="space-y-6">
                    {PRESENTATIONS_DATA.map((presentation: ConferenceContribution, index: number) => (
                       <div key={presentation.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                        <ContributionItem item={presentation} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-dark text-center md:text-left">No presentations to display yet.</p>
                )}
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default AllPublicationsView;