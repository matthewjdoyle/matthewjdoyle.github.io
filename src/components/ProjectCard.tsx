import React from 'react';
import { Project } from '../types';
import { ExternalLinkIcon, GithubIcon, BookOpenIcon, EnlargeIcon } from '../constants';
import LaTeXRenderer from './LaTeXRenderer';

interface ProjectCardProps {
  project: Project;
  onReadMore: (projectId: string) => void;
  onEnlarge: (embedUrl: string, title: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onReadMore, onEnlarge }) => {
  const { id, title, description, imageUrl, tags, liveUrl, repoUrl, embedUrl } = project;

  return (
    <div className="bg-space_navy/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_var(--color-primary)] transform hover:-translate-y-1 flex flex-col">
      {/* Preview area: fixed 16/9 aspect ratio, no hover zoom */}
      <div className="relative aspect-video flex-shrink-0 group">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {embedUrl && (
            <button
              onClick={() => onEnlarge(embedUrl, title)}
              className="absolute top-2 right-2 p-2 bg-black/70 hover:bg-primary text-star_white rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary z-10"
              aria-label={`Enlarge ${title} preview`}
            >
              <EnlargeIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      <div className="p-4 md:p-5 flex flex-col overflow-hidden">
        <h3 className="text-xl font-bold mb-2 text-viridis_yellow_heading font-poppins" style={{ minHeight: '32px', maxHeight: '64px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          <LaTeXRenderer text={title} />
        </h3>
        <div className="text-neutral-dark text-sm mb-4" style={{ flexGrow: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          <LaTeXRenderer text={description} />
        </div>
        
        {tags && tags.length > 0 && (
          <div className="mb-4" style={{ flexShrink: 0 }}>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 4).map((tag) => (
                <span key={tag} className="bg-space_purple text-star_white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-ui_border/30 flex items-center justify-between gap-x-2" style={{ flexShrink: 0 }}>
          <button
            onClick={() => onReadMore(id)}
            className="flex-1 inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-star_white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-[0_0_12px_var(--color-primary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-sm"
          >
            <BookOpenIcon className="w-4 h-4 mr-2" />
            Read More
          </button>
          
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-neutral-dark hover:text-secondary transition-colors duration-200" aria-label="Visit live site">
              <ExternalLinkIcon className="w-5 h-5" />
            </a>
          )}
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-neutral-dark hover:text-white transition-colors duration-200" aria-label="View source code on GitHub">
              <GithubIcon className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;