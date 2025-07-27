import React from 'react';
import SectionWrapper from './SectionWrapper';
import { SKILLS_DATA } from '../constants';
import { SkillCategory, Skill } from '../types';

interface SkillBadgeProps {
  skill: Skill;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => (
  <div className="flex items-center space-x-2 bg-neutral-light p-3 rounded-lg shadow-md hover:shadow-[0_0_10px_var(--color-secondary)] transition-all duration-300 transform hover:scale-105">
    {skill.icon && React.cloneElement(skill.icon, { className: `w-6 h-6 ${skill.icon.props.className || ''}` })} {/* Preserve existing icon classes if any */}
    <span className="text-neutral-darker font-medium">{skill.name}</span> {/* neutral-darker is light text */}
  </div>
);

interface SkillsSectionProps {
  id: string;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ id }) => {
  return (
    <SectionWrapper id={id} title="My Skills" className="bg-neutral-DEFAULT"> {/* Dark section background */}
      <div className="space-y-12">
        {SKILLS_DATA.map((category: SkillCategory, index: number) => (
          <div key={category.id} className={`animate-fade-in-up`} style={{animationDelay: `${index * 0.1}s`}}>
            <h3 className="text-2xl font-semibold mb-6 text-primary font-poppins">{category.name}</h3> {/* primary color for category titles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.skills.map((skill: Skill) => (
                <SkillBadge key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;