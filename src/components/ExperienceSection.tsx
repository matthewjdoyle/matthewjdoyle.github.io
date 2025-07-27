import React from 'react';
import SectionWrapper from './SectionWrapper';
import TimelineItem from './TimelineItem';
import { EXPERIENCE_DATA } from '../constants';
import { TimelineEntry } from '../types';

interface ExperienceSectionProps {
  id: string;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ id }) => {
  return (
    <SectionWrapper id={id} title="Work Experience" className="bg-neutral-DEFAULT"> {/* Dark section background */}
      <div className="relative">
        {EXPERIENCE_DATA.map((entry: TimelineEntry, index: number) => (
          <div key={entry.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
            <TimelineItem entry={entry} isLast={index === EXPERIENCE_DATA.length - 1} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ExperienceSection;