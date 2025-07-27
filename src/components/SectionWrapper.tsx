import React from 'react';

interface SectionWrapperProps {
  id: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`py-16 md:py-24 scroll-mt-16 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {title && (
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16 text-neutral-darker font-poppins">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;