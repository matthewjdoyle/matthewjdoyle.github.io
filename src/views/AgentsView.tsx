
import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { ChevronLeftIcon } from '../constants';

interface AgentsViewProps {
  showPortfolioView: () => void;
}

const AgentsView: React.FC<AgentsViewProps> = ({ showPortfolioView }) => {
  return (
    <SectionWrapper id="agents-view" title="AI Agents Hub" className="bg-transparent pt-24 pb-16">
       <div className="mb-10 text-center sm:text-left">
        <button
          onClick={showPortfolioView}
          className="inline-flex items-center bg-primary hover:bg-primary-dark text-star_white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-md"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back to Portfolio
        </button>
      </div>
      <div className="text-center text-neutral-dark p-8 bg-neutral-light rounded-lg">
        <h3 className="text-2xl font-bold text-primary mb-4">Coming Soon!</h3>
        <p className="text-lg">This section for interactive AI agents is currently under development. Please check back later!</p>
      </div>
    </SectionWrapper>
  );
};

export default AgentsView;
