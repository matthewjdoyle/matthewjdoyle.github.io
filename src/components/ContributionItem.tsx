import React from 'react';
import { ConferenceContribution } from '../types';
import { ExternalLinkIcon } from '../constants';
import LaTeXRenderer from './LaTeXRenderer';

interface ContributionItemProps {
  item: ConferenceContribution;
}

const ContributionItem: React.FC<ContributionItemProps> = ({ item }) => {
  return (
    <div className="bg-neutral-light p-4 rounded-lg shadow-md hover:shadow-[0_0_10px_var(--color-secondary)] transition-all duration-300 transform hover:scale-[1.02]">
      <h4 className="text-md font-semibold text-viridis_yellow_heading mb-1 font-poppins">
        <LaTeXRenderer 
          text={item.title}
          className="text-md font-semibold text-viridis_yellow_heading font-poppins"
        />
      </h4>
      <p className="text-sm text-neutral-darker font-medium">{item.conference}</p>
      <p className="text-xs text-neutral-dark mb-2">
        {item.date}
        {item.location && <span className="italic"> - {item.location}</span>}
      </p>
      
      {item.description && (
        <p className="text-xs text-neutral-dark mb-2 leading-relaxed">{item.description}</p>
      )}

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-secondary hover:text-secondary-light text-xs font-medium transition-colors duration-300"
          aria-label={`View details for ${item.title}`}
        >
          <ExternalLinkIcon className="w-3.5 h-3.5 mr-1" />
          View Details/Resource
        </a>
      )}
    </div>
  );
};

export default ContributionItem;
