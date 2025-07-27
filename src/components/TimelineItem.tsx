import React from 'react';
import { TimelineEntry } from '../types';

interface TimelineItemProps {
  entry: TimelineEntry;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ entry, isLast = false }) => {
  return (
    <div className="relative pl-12 pb-8">
      {/* Timeline line */}
      {!isLast && <div className="absolute left-[22px] top-2 bottom-0 w-0.5 bg-ui_border"></div>}
      
      {/* Dot */}
      <div className="absolute left-4 top-1 w-3 h-3 bg-primary rounded-full border-2 border-neutral-DEFAULT"></div> {/* Border matches section bg */}

      {/* Logo (optional) */}
      {entry.logoUrl && (
         <img src={entry.logoUrl} alt={`${entry.institution} logo`} className="absolute left-0 -top-1 w-10 h-10 rounded-full shadow-md bg-neutral-light p-0.5 border-2 border-ui_border"/>
      )}
      
      <div className="ml-0"> 
        <h3 className="text-xl font-semibold text-primary-light font-poppins">{entry.title}</h3>
        <p className="text-md font-medium text-neutral-darker">{entry.institution}</p> {/* neutral-darker is light text */}
        <p className="text-sm text-neutral-dark mb-2">{entry.period}</p> {/* neutral-dark is lighter text */}
        <ul className="list-disc list-outside ml-5 space-y-1 text-neutral-dark">
          {entry.description.map((item, index) => (
            <li key={index} className="text-sm leading-relaxed">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimelineItem;