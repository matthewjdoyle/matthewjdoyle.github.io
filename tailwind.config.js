/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '60': '60', // For popup overlay
        '70': '70', // For popup content
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        lacquer: ['Lacquer', 'cursive'], 
        jetbrains: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        space_deep: 'var(--color-space-deep)',
        space_navy: 'var(--color-space-navy)',
        space_purple: 'var(--color-space-purple)', 
        electric_blue: 'var(--color-electric-blue)',
        nebula_pink: 'var(--color-nebula-pink)', 
        star_white: 'var(--color-star-white)',
        star_yellow: 'var(--color-star-yellow)',
        ui_dark: 'var(--color-ui-dark)',
        ui_light_text: 'var(--color-ui-light-text)',
        ui_border: 'var(--color-ui-border)',
        viridis_yellow_heading: 'var(--color-viridis-yellow-heading)',

        primary: {
          DEFAULT: 'var(--color-electric-blue)', 
          light: '#B589D6',
          dark: '#7B3FB8',
        },
        secondary: {
          DEFAULT: 'var(--color-nebula-pink)', 
          light: '#84d992',
          dark: '#4bb05a',
        },
        neutral: { 
          light: 'var(--color-ui-dark)',
          DEFAULT: 'var(--color-space-navy)',
          dark: 'var(--color-ui-light-text)',
          darker: 'var(--color-star-white)',
        }
      },
      backgroundImage: {
        'hero-pattern': "url('https://www.transparenttextures.com/patterns/stardust.png')", 
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-out-left': 'slideOutLeft 0.3s ease-in-out forwards',
        'slide-in-from-right': 'slideInFromRight 0.8s ease-out forwards',
        'slide-out-right': 'slideOutRight 0.3s ease-in-out forwards',
        'slide-in-from-left': 'slideInFromLeft 0.8s ease-out forwards',
        'reveal-up': 'revealUp 0.6s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards',
        'fade-in-word': 'fadeInWord 0.5s ease-out forwards',
        'carousel-item-fade-in': 'carouselItemFadeIn 0.5s ease-out forwards',
        'carousel-item-slide-in-right': 'carouselItemSlideInFromRight 0.5s ease-out forwards',
        'carousel-item-slide-out-left': 'carouselItemSlideOutToLeft 0.3s ease-in forwards',
        'carousel-item-slide-in-left': 'carouselItemSlideInFromLeft 0.5s ease-out forwards',
        'carousel-item-slide-out-right': 'carouselItemSlideOutToRight 0.3s ease-in forwards',
        'fade-in-overlay': 'fadeInOverlay 0.3s ease-out forwards',
        'fade-in-scale-up': 'fadeInScaleUp 0.4s ease-out 0.1s forwards',
        'fast-slide-in-from-bottom': 'fastSlideInFromBottom 0.4s ease-out forwards',
        'animated-glowing-border': 'animated-glowing-border 10s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' }
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' }
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeInWord: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        carouselItemFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        carouselItemSlideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        carouselItemSlideOutToLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        carouselItemSlideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        carouselItemSlideOutToRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        fadeInOverlay: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInScaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0px)' },
        },
        fastSlideInFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(50%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'animated-glowing-border': {
          '0%, 100%': {
            borderColor: 'var(--color-electric-blue)',
            boxShadow: '0 0 15px var(--color-electric-blue), 0 0 25px var(--color-electric-blue)'
          },
          '25%': {
            borderColor: 'var(--color-nebula-pink)',
            boxShadow: '0 0 15px var(--color-nebula-pink), 0 0 25px var(--color-nebula-pink)'
          },
          '50%': {
            borderColor: 'var(--color-viridis-yellow-heading)',
            boxShadow: '0 0 15px var(--color-viridis-yellow-heading), 0 0 25px var(--color-viridis-yellow-heading)'
          },
          '75%': {
            borderColor: 'var(--color-space-purple)',
            boxShadow: '0 0 15px var(--color-space-purple), 0 0 25px var(--color-space-purple)'
          },
        }
      }
    }
  },
  plugins: [],
} 