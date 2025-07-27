import React, { useState } from 'react';
import { Publication } from '../types';
import { ExternalLinkIcon, BookOpenIcon, PdfFileIcon } from '../constants';
import LaTeXRenderer from './LaTeXRenderer';

interface PublicationCardProps {
  publication: Publication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  const [isAbstractVisible, setIsAbstractVisible] = useState(false);

  const toggleAbstract = () => {
    setIsAbstractVisible(!isAbstractVisible);
  };

  return (
    <div className="bg-neutral-light rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_var(--color-primary)]">
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-viridis_yellow_heading font-poppins">
          <LaTeXRenderer 
            text={publication.title}
            className="text-xl md:text-2xl font-semibold text-viridis_yellow_heading font-poppins"
          />
        </h3>
        <p className="text-sm text-neutral-dark italic mb-1">{publication.authors}</p>
        <p className="text-md text-neutral-darker font-medium mb-4">{publication.journal}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
          {publication.doiUrl && (
            <a
              href={publication.doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-secondary hover:text-secondary-light font-medium text-sm transition-colors duration-300"
              aria-label={`Read full text of ${publication.title} on DOI`}
            >
              <ExternalLinkIcon className="w-4 h-4 mr-1.5" />
              DOI
            </a>
          )}
          {publication.arxivUrl && (
            <a
              href={publication.arxivUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-secondary hover:text-secondary-light font-medium text-sm transition-colors duration-300"
              aria-label={`View ${publication.title} on arXiv`}
            >
              <BookOpenIcon className="w-4 h-4 mr-1.5" />
              arXiv
            </a>
          )}
          {publication.pdfUrl && (
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-secondary hover:text-secondary-light font-medium text-sm transition-colors duration-300"
              aria-label={`Download PDF for ${publication.title}`}
            >
              <PdfFileIcon className="w-4 h-4 mr-1.5" />
              PDF
            </a>
          )}
        </div>

        {publication.abstract && (
          <>
            <button
              onClick={toggleAbstract}
              className="text-sm text-primary hover:text-primary-dark font-medium mb-2 transition-colors duration-300"
              aria-expanded={isAbstractVisible}
            >
              {isAbstractVisible ? 'Hide Abstract' : 'Show Abstract'}
            </button>
            {isAbstractVisible && (
              <div className="mt-2 p-4 bg-space_deep/20 rounded-md border border-ui_border/50">
                <p className="text-sm text-neutral-dark leading-relaxed whitespace-pre-wrap">
                  {publication.abstract}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PublicationCard;