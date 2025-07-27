import React from 'react';
import SectionWrapper from './SectionWrapper';
import TimelineItem from './TimelineItem';
import { EDUCATION_DATA } from '../constants';
import { TimelineEntry } from '../types';

interface EducationSectionProps {
  id: string;
}

const EducationSection: React.FC<EducationSectionProps> = ({ id }) => {
  return (
    <SectionWrapper id={id} title="Education" className="bg-neutral-DEFAULT"> {/* Dark section background, was bg-white */}
      <div className="relative">
        {EDUCATION_DATA.map((entry: TimelineEntry, index: number) => (
          <div key={entry.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
            <TimelineItem entry={entry} isLast={index === EDUCATION_DATA.length - 1} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default EducationSection;