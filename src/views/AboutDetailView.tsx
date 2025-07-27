import React, { useEffect, useRef } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { ChevronLeftIcon, YOUR_NAME, LightbulbIcon, BookOpenIcon, CodeBracketIcon } from '../constants'; // Added BookOpenIcon
import useScrollAnimation from '../hooks/useScrollAnimation';
import useStarryBackground from '../hooks/useStarryBackground'; 

interface AboutDetailViewProps {
  goBack: () => void;
  detailedParagraphs: string[];
}

const AboutDetailView: React.FC<AboutDetailViewProps> = ({ goBack, detailedParagraphs }) => {
  const [backButtonRef, backButtonInView] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -20px 0px", triggerOnce: false });
  const [articleRef, articleInView] = useScrollAnimation<HTMLElement>({ threshold: 0.1, rootMargin: "0px 0px -50px 0px", triggerOnce: true }); // <article> element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useStarryBackground(canvasRef);

  const pageContent = [
    {
      type: 'paragraph',
      text: detailedParagraphs[0],
    },
    {
      type: 'image',
      src: "/portrait.JPEG",
      alt: "Dr. Matthew Doyle, Kaisaniemi Botanic Garden, Helsinki, Finland (2023)",
      borderColor: "border-primary", 
      shadowColor: "hover:shadow-[0_0_25px_var(--color-primary)]"
    },
    {
      type: 'paragraph_with_image_aside',
      text: detailedParagraphs[1],
      imageSrc: "/Rotating_Cryostat.JPG",
      imageAlt: "Rotating Cryostat, Manchester, UK (2024)",
      imageBorderColor: "border-viridis_yellow_heading", 
      imageShadowColor: "hover:shadow-[0_0_25px_var(--color-secondary)]"
    },
    {
      type: 'paragraph',
      text: detailedParagraphs[2],
    },
    {
      type: 'image',
      src: "/VortexTangleArrows.png",
      alt: "A Vortex Tangle Between Two Rough Flat Surfaces",
      borderColor: "border-electric_blue", 
      shadowColor: "hover:shadow-[0_0_25px_var(--color-electric_blue)]"
    },
    {
      type: 'paragraph',
      text: detailedParagraphs[3],
    },
    {
      type: 'highlight_box',
      title: "My Core Values",
      text: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Continuous Learning & Growth",
            "Collaboration & Teamwork", 
            "Creativity & Curiosity",
            "Openness & Transparency",
            "Concise & Clear Communication",
            "Logical & Efficient"
          ].map((value, index) => (
            <div 
              key={index}
              className="p-4 bg-space_navy/60 border border-neutral-light/20 rounded-lg backdrop-blur-sm hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-shadow duration-300"
            >
              <h4 className="text-star_white font-medium text-base text-center">
                {value}
              </h4>
            </div>
          ))}
        </div>
      ),
      iconComponent: BookOpenIcon,
      iconColor: "text-secondary",
      borderColor: "border-secondary",
      bgColor: "bg-space_deep/80 backdrop-blur-sm",
      shadowColor: ""
    },
    {
      type: 'highlight_box', // Changed from 'joke'
      title: "Looking for Collaborations!",
      text: "I welcome discussions about new ideas, collaborations, and opportunities. Whether you're seeking expertise in physics, software development, or education, or if you simply have an intriguing question about my research and projects, I encourage you to reach out via email. I'm passionate about connecting with others and exploring ways we can work together.",
      iconComponent: LightbulbIcon, // Kept LightbulbIcon
      iconColor: "text-viridis_yellow_heading", 
      borderColor: "border-primary", 
      bgColor: "bg-space_deep/80 backdrop-blur-sm", 
      shadowColor: "hover:shadow-[0_0_20px_var(--color-primary)]"
    },
    {
      type: 'paragraph',
      text: detailedParagraphs[4],
    },
  ];

  const renderContentItem = (item: any, index: number) => {
    if (!item || (item.type === 'paragraph' && !item.text)) return null;

    const itemKey = `content-item-${index}`;

    if (item.text && typeof item.text === 'string' && item.text.startsWith('## ')) {
      return <h2 key={itemKey} className="text-2xl md:text-3xl font-semibold text-primary-light mt-8 mb-4 font-poppins">{item.text.substring(3)}</h2>;
    }
    if (item.text && typeof item.text === 'string' && item.text.startsWith('### ')) {
      return <h3 key={itemKey} className="text-xl md:text-2xl font-semibold text-primary mt-6 mb-3 font-poppins">{item.text.substring(4)}</h3>;
    }
    
    switch (item.type) {
      case 'paragraph':
        return <p key={itemKey}>{item.text}</p>;
      case 'image':
        const isVortexTangleImage = item.src.includes('VortexTangleArrows.png');
        const objectFitClass = isVortexTangleImage ? 'object-contain' : 'object-cover';
        const containerClass = isVortexTangleImage 
          ? 'my-8 md:my-10 flex justify-center' 
          : 'my-8 md:my-10';
        const imageClass = isVortexTangleImage
          ? `h-auto max-h-[400px] md:max-h-[450px] ${objectFitClass} rounded-lg shadow-xl ${item.borderColor} border-4`
          : `w-full h-auto max-h-[400px] md:max-h-[450px] ${objectFitClass} rounded-lg shadow-xl ${item.borderColor} border-4`;
        
        return (
          <div key={itemKey} className={containerClass}>
            <img 
              src={item.src} 
              alt={item.alt} 
              className={imageClass}
            />
          </div>
        );
      case 'highlight_box':
        const Icon = item.iconComponent;
        // Match title color to border color
        const titleColor = item.borderColor === 'border-primary' ? 'text-primary' : 'text-secondary';
        return (
          <div key={itemKey} className={`my-8 md:my-10 p-6 md:p-8 ${item.bgColor} rounded-xl border-2 ${item.borderColor} shadow-xl ${item.shadowColor}`}>
            {/* Centered title and icon */}
            <div className="flex items-center justify-center gap-x-3 mb-6">
              {Icon && <Icon className={`w-8 h-8 md:w-10 md:h-10 ${item.iconColor} flex-shrink-0`} />}
              <p className={`${titleColor} font-poppins font-semibold text-lg`}>{item.title}</p>
            </div>
            {/* Content below */}
            <div className="text-star_white text-md">{item.text}</div>
          </div>
        );
      case 'paragraph_with_image_aside':
        return (
          <div key={itemKey} className="my-8 md:my-12 md:flex md:items-start md:gap-x-8 lg:gap-x-12">
            <div className={`md:w-2/3 ${!item.imageSrc ? 'md:w-full' : ''} space-y-4`}>
              {item.text && <p>{item.text}</p>}
            </div>
            {item.imageSrc && (
                <div className="md:w-1/3 mt-6 md:mt-0">
                    <img 
                        src={item.imageSrc} 
                        alt={item.imageAlt}
                        className={`w-full h-auto max-h-[350px] md:max-h-[450px] object-cover rounded-lg shadow-xl ${item.imageBorderColor} border-4`}
                    />
                </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
        <div className="relative z-10 min-h-screen overflow-y-auto scrollbar-hide">
            <SectionWrapper id="about-detail-page" title={`More About ${YOUR_NAME.split(' ')[1]}`} className="pt-8 md:pt-12 bg-transparent"> {/* Ensure SectionWrapper is transparent */}
                <div 
                ref={backButtonRef}
                className={`mb-8 md:mb-10 text-center sm:text-left ${backButtonInView ? 'animate-slide-in-left' : 'opacity-0'}`}
                >
                <button
                    onClick={goBack}
                    className="inline-flex items-center bg-primary hover:bg-primary-dark text-star_white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300 ease-in-out transform hover:scale-105 text-md"
                    aria-label="Go back to previous page"
                >
                    <ChevronLeftIcon className="w-5 h-5 mr-2" />
                    Back
                </button>
                </div>

                <article 
                ref={articleRef}
                className={`max-w-4xl mx-auto bg-space_navy/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl ${articleInView ? 'animate-reveal-up' : 'opacity-0'}`}
                >
                <div className="text-neutral-dark leading-relaxed space-y-6 text-base md:text-lg">
                    {pageContent.map((item, index) => (detailedParagraphs.length > 0 || item.type === 'highlight_box' || item.type === 'image') ? renderContentItem(item, index) : null )}
                    {detailedParagraphs.length === 0 && (!pageContent.some(item => item.type === 'highlight_box' || item.type === 'image')) && <p>Detailed information about me is coming soon!</p>}
                </div>
                
                </article>
            </SectionWrapper>
        </div>
    </div>
  );
};

export default AboutDetailView;