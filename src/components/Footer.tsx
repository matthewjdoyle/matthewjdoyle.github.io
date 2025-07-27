import React from 'react';
import { YOUR_NAME } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-space_deep text-neutral-dark py-12 border-t border-ui_border"> {/* Deep space bg, light text */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
        {/* Social links removed from here */}
        <p className="text-sm">
          &copy; {currentYear} {YOUR_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;