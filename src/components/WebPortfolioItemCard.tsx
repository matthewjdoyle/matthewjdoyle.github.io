

import React, { useState } from 'react';
import { WebPortfolioItem } from '../types';
import { ExternalLinkIcon, EnlargeIcon } from '../constants';
import FullScreenModal from './FullScreenModal';

interface WebPortfolioItemCardProps {
  item: WebPortfolioItem;
  showEnlargeButton?: boolean; // New prop to control enlarge button visibility
}

const WebPortfolioItemCard: React.FC<WebPortfolioItemCardProps> = ({ 
  item, 
  showEnlargeButton = true // Default to true for backward compatibility
}) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const aspectRatio = item.aspectRatio || '16/9';
  const isImageEmbed = /\.(jpeg|jpg|gif|png|svg)$/i.test(item.embedUrl) || item.embedUrl.includes('via.placeholder.com');

  // Small/compact iframe content for the card
  const iframeContent = isImageEmbed ? `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${item.title}</title>
      <style>
        body { margin: 0; background-color: #000; display: flex; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }
        img { max-width: 100%; max-height: 100%; object-fit: contain; }
      </style>
    </head>
    <body>
      <img src="${item.embedUrl}" alt="${item.title}" />
    </body>
    </html>
  ` : `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=0.6">
      <title>${item.title}</title>
      <style>
        body { 
          margin: 0; 
          transform: scale(0.7); 
          transform-origin: top left; 
          width: 142.86%; 
          height: 142.86vh; 
          overflow: hidden;
        }
        html { overflow: hidden; }
      </style>
    </head>
    <body>
      <iframe src="${item.embedUrl}" width="100%" height="100%" frameborder="0" style="border: none;"></iframe>
    </body>
    </html>
  `

  return (
    <>
      <div className="bg-space_navy/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_var(--color-primary)] transform hover:-translate-y-1 flex flex-col">
        {/* Preview area: fixed 16/9 aspect ratio, no hover zoom */}
        <div className="relative aspect-video flex-shrink-0 group">
            <iframe
              srcDoc={iframeContent}
              title={item.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              {showEnlargeButton && (
                <button
                  onClick={() => setIsEnlarged(true)}
                  className="absolute top-2 right-2 p-2 bg-black/70 hover:bg-primary text-star_white rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary z-10"
                  aria-label={`Enlarge ${item.title} preview`}
                >
                  <EnlargeIcon className="w-5 h-5" />
                </button>
              )}
            </div>
        </div>
        <div className="p-4 md:p-5 flex flex-col overflow-hidden">
          <h3 className="text-xl font-bold mb-2 text-viridis_yellow_heading font-poppins" style={{ minHeight: '32px', maxHeight: '64px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.title}</h3>
          <p className="text-neutral-dark text-sm mb-4" style={{ flexGrow: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{item.description}</p>
          
          {item.tags && item.tags.length > 0 && (
            <div className="mb-4" style={{ flexShrink: 0 }}>
              <div className="flex flex-wrap gap-2">
                {item.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="bg-space_purple text-star_white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t border-ui_border/30 flex items-center justify-between gap-x-2" style={{ flexShrink: 0 }}>
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center bg-secondary hover:bg-secondary-dark text-star_white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-[0_0_12px_var(--color-secondary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-sm"
              aria-label={`Visit live site for ${item.title}`}
            >
              <ExternalLinkIcon className="w-4 h-4 mr-2" />
              Visit Site
            </a>
          </div>
        </div>
      </div>

      {showEnlargeButton && (
        <FullScreenModal
          isOpen={isEnlarged}
          onClose={() => setIsEnlarged(false)}
          embedUrl={item.embedUrl}
          title={item.title}
          type="iframe"
        />
      )}
    </>
  );
};

export default WebPortfolioItemCard;