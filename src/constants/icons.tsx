import React from 'react';

// SVG Icons (Heroicons or similar simple icons)
// Actual simplified GitHub icon
export const ActualGitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
  </svg>
);

export const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
  </svg>
);

export const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const ExternalLinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

export const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const EnlargeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);

export const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const BookOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a12.053 12.053 0 01-4.5 0M12 3c-3.314 0-6 2.686-6 6s2.686 6 6 6c3.314 0 6-2.686 6-6S15.314 3 12 3zm0 0a2.25 2.25 0 00-2.25 2.25M12 3a2.25 2.25 0 012.25 2.25m0 0A2.25 2.25 0 0112 5.25M12 5.25A2.25 2.25 0 009.75 3m0 0A2.25 2.25 0 007.5 5.25m2.25 0V3" />
  </svg>
);

// Programming language and tool icons
export const PythonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M8.84 1.875c-.96 0-1.77.72-1.77 1.68v1.32h3.6V6.12H3.72c-.96 0-1.77.72-1.77 1.68v8.4c0 .96.81 1.68 1.77 1.68h2.4v-2.04c0-1.2.87-2.16 2.07-2.16h6.18c.87 0 1.56-.72 1.56-1.56V3.55c0-.96-.81-1.68-1.77-1.68L8.84 1.875zm.39 1.08h4.14c.21 0 .39.18.39.39s-.18.39-.39.39H9.23c-.21 0-.39-.18-.39-.39s.18-.39.39-.39z"/>
    <path d="M15.16 22.125c.96 0 1.77-.72 1.77-1.68v-1.32h-3.6v1.245h6.95c.96 0 1.77-.72 1.77-1.68v-8.4c0-.96-.81-1.68-1.77-1.68h-2.4v2.04c0 1.2-.87 2.16-2.07 2.16H9.63c-.87 0-1.56.72-1.56 1.56v6.72c0 .96.81 1.68 1.77 1.68l5.32.01zm-.39-1.08h-4.14c-.21 0-.39-.18-.39-.39s.18-.39.39-.39h4.14c.21 0 .39.18.39.39s-.18.39-.39.39z"/>
  </svg>
);

export const JavaScriptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.114-.484.637-.99 1.204-.99.563 0 .934.24 1.187.847.211.507.211.78.211 1.299h1.262c0-.796-.142-1.372-.411-1.821-.704-1.134-1.846-1.49-2.908-1.49-.742 0-1.521.302-2.047.906-.526.633-.526 1.372-.395 1.997.263 1.064 1.222 1.75 2.171 2.155.552.248 1.316.42 1.316.999 0 .58-.462 1.075-1.195 1.075-.66 0-1.099-.302-1.349-.847-.184-.41-.184-.778-.184-1.188h-1.262c.026.58.184 1.204.578 1.75.605 1.075 1.751 1.37 2.763 1.37 1.565 0 2.618-.817 2.618-2.155-.026-.949-.447-1.686-1.349-2.155z"/>
  </svg>
);

export const CppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12.005 0L23 7v10l-10.995 7L1 17V7l11.005-7zm6.007 14.472V9.528L12 12l6.012 2.472zm-8.484-1.64l2.122 2.121-1.414 1.414-2.121-2.121V16L4 14v-4l4.11-2 2.121-2.121 1.414 1.414-2.122 2.121c-.788.788-.788 2.071 0 2.829l-.003-.001z"/>
  </svg>
);

export const DataScienceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export const LatexIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
  </svg>
);

export const GitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.714.713 1.87 0 2.584-.719.717-1.881.717-2.6 0-.719-.714-.719-1.87 0-2.584.177-.18.387-.316.617-.403V8.835c-.23-.087-.44-.223-.617-.403-.545-.544-.676-1.342-.396-2.009L7.636 4.707.452 11.892c-.603.604-.603 1.582 0 2.187l10.48 10.477c.604.604 1.582.604 2.187 0L23.546 13.12c.603-.605.603-1.583 0-2.187"/>
  </svg>
);

export const CodeBracketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
</svg>
);

export const PdfFileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

// Site Logo Icon
export const SiteLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <path id="ellipsePath" d="M10,50 A40,25 0 1,1 90,50 A40,25 0 1,1 10,50 Z" />
    </defs>
    <g transform="rotate(45 50 50)">
      <ellipse cx="50" cy="50" rx="40" ry="25" stroke="var(--color-electric-blue)" strokeWidth="6"/>
      <circle cx="43" cy="50" r="7" fill="var(--color-electric-blue)"/> 
      <circle cx="50" cy="43" r="7" fill="var(--color-nebula-pink)"/>
      <circle cx="57" cy="50" r="7" fill="var(--color-electric-blue)"/>
      <circle cx="50" cy="57" r="7" fill="var(--color-nebula-pink)"/>
      
      <circle r="5" fill="var(--color-viridis-yellow-heading)">
        <animateMotion 
          dur="20.4s" 
          repeatCount="indefinite" 
          keyPoints="0;0;0.5;0.5;0;0" 
          keyTimes="0;0.14706;0.15686;0.64706;0.65686;1"
        >
          <mpath href="#ellipsePath"/>
        </animateMotion>
      </circle>
      <circle r="5" fill="var(--color-viridis-yellow-heading)">
        <animateMotion 
          dur="20.4s" 
          repeatCount="indefinite" 
          keyPoints="0.5;0.5;1;1;0.5;0.5" 
          keyTimes="0;0.14706;0.15686;0.64706;0.65686;1"
        >
          <mpath href="#ellipsePath"/>
        </animateMotion>
      </circle>
    </g>
  </svg>
);

// Custom tutoring logo with green/education theme - distinct colors
export const TutoringLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="rotate(45 50 50)">
      <ellipse cx="50" cy="50" rx="40" ry="25" stroke="#10b981" strokeWidth="6"/>
      <circle cx="43" cy="50" r="7" fill="#10b981"/> 
      <circle cx="50" cy="43" r="7" fill="#fbbf24"/>
      <circle cx="57" cy="50" r="7" fill="#10b981"/>
      <circle cx="50" cy="57" r="7" fill="#fbbf24"/>
    </g>
  </svg>
);

// Custom web design logo with purple/creative theme - distinct colors
export const WebDesignLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="rotate(45 50 50)">
      <ellipse cx="50" cy="50" rx="40" ry="25" stroke="#8b5cf6" strokeWidth="6"/>
      <circle cx="43" cy="50" r="7" fill="#8b5cf6"/> 
      <circle cx="50" cy="43" r="7" fill="#f59e0b"/>
      <circle cx="57" cy="50" r="7" fill="#8b5cf6"/>
      <circle cx="50" cy="57" r="7" fill="#f59e0b"/>
    </g>
  </svg>
);

// Social Media Icons
export const TwitterXIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const YouTubeIconElement: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M21.0251 6.84159C20.8001 5.99659 20.1201 5.31659 19.2751 5.09159C17.6001 4.66659 12.0001 4.66659 12.0001 4.66659C12.0001 4.66659 6.40012 4.66659 4.72512 5.09159C3.88012 5.31659 3.20012 5.99659 2.97512 6.84159C2.55012 8.51659 2.55012 12.0016 2.55012 12.0016C2.55012 12.0016 2.55012 15.4866 2.97512 17.1616C3.20012 18.0066 3.88012 18.6866 4.72512 18.9116C6.40012 19.3366 12.0001 19.3366 12.0001 19.3366C12.0001 19.3366 17.6001 19.3366 19.2751 18.9116C20.1201 18.6866 20.8001 18.0066 21.0251 17.1616C21.4501 15.4866 21.4501 12.0016 21.4501 12.0016C21.4501 12.0016 21.4501 8.51659 21.0251 6.84159ZM9.75012 14.8666V9.13659L15.0001 12.0016L9.75012 14.8666Z" fill="currentColor"/>
  </svg>
);

export const BlueskyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" {...props}>
    <path d="M439.8 358.7C436.5 358.3 433.1 357.9 429.8 357.4C433.2 357.8 436.5 358.3 439.8 358.7zM320 291.1C293.9 240.4 222.9 145.9 156.9 99.3C93.6 54.6 69.5 62.3 53.6 69.5C35.3 77.8 32 105.9 32 122.4C32 138.9 41.1 258 47 277.9C66.5 343.6 136.1 365.8 200.2 358.6C203.5 358.1 206.8 357.7 210.2 357.2C206.9 357.7 203.6 358.2 200.2 358.6C106.3 372.6 22.9 406.8 132.3 528.5C252.6 653.1 297.1 501.8 320 425.1C342.9 501.8 369.2 647.6 505.6 528.5C608 425.1 533.7 372.5 439.8 358.6C436.5 358.2 433.1 357.8 429.8 357.3C433.2 357.7 436.5 358.2 439.8 358.6C503.9 365.7 573.4 343.5 593 277.9C598.9 258 608 139 608 122.4C608 105.8 604.7 77.7 586.4 69.5C570.6 62.4 546.4 54.6 483.2 99.3C417.1 145.9 346.1 240.4 320 291.1z"/>
  </svg>
);

export const ClipboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.75m0 0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25V6.75m0 0A2.25 2.25 0 006.75 4.5h-1.5a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H15M13.5 6h-3" />
  </svg>
); 

// Export alias for backward compatibility
export const GithubIcon = ActualGitHubIcon; 