import React from 'react';
import SectionWrapper from './SectionWrapper';
import { SOCIAL_LINKS, CONTACT_MESSAGE } from '../constants';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface ContactSectionProps {
  id: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ id }) => {
  const [titleRef, titleInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, rootMargin: "0px 0px -50px 0px" });
  const [contentRef, contentInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.15, rootMargin: "0px 0px -80px 0px" });

  const emailLink = SOCIAL_LINKS.find(link => link.id === 'email');

  return (
    <SectionWrapper id={id} className="bg-neutral-DEFAULT"> {/* Title removed */}
      <div ref={titleRef} className={`${titleInView ? 'animate-slide-in-left' : 'opacity-0'}`}>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16 text-neutral-darker font-poppins">
          Get In Touch
        </h2>
      </div>

      <div ref={contentRef} className={`text-center max-w-2xl mx-auto ${contentInView ? 'animate-slide-in-from-right' : 'opacity-0'}`}>
        <p className="text-lg text-neutral-dark mb-8 leading-relaxed">
          {CONTACT_MESSAGE}
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {emailLink && (
            <a
              key={emailLink.id}
              href={emailLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-neutral-darker hover:text-primary transition-colors duration-300 group"
            >
              {React.cloneElement(emailLink.icon, { className: "w-10 h-10 mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-[0_0_8px_var(--color-primary)]" })}
              <span className="text-sm font-medium">{emailLink.name}</span>
            </a>
          )}
        </div>
        
        {/* Optional: Contact Form Placeholder - Themed for dark mode */}
        {/*
        <div className="mt-12 p-8 bg-neutral-light rounded-lg shadow-xl"> 
          <h3 className="text-2xl font-semibold text-primary mb-6 font-poppins">Send me a cosmic signal</h3>
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-darker text-left">Your Name</label>
              <input type="text" name="name" id="name" autoComplete="name" className="mt-1 block w-full px-3 py-2 bg-space_purple border border-ui_border text-neutral-darker rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-darker text-left">Your Email Coordinates</label>
              <input type="email" name="email" id="email" autoComplete="email" className="mt-1 block w-full px-3 py-2 bg-space_purple border border-ui_border text-neutral-darker rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-darker text-left">Your Message</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 bg-space_purple border border-ui_border text-neutral-darker rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-star_white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-light focus:ring-primary transition-all duration-300 hover:shadow-[0_0_15px_var(--color-primary)]">
                Launch Message
              </button>
            </div>
          </form>
        </div>
        */}
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;