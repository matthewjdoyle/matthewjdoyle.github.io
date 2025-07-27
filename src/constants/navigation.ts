import React from 'react';
import { NavLink, SocialLink } from '../types';
import {
  ActualGitHubIcon,
  LinkedInIcon,
  EmailIcon,
  ExternalLinkIcon,
  TwitterXIcon,
  YouTubeIconElement,
  BlueskyIcon,
  TutoringLogoIcon,
  WebDesignLogoIcon
} from './icons';

export const NAV_LINKS: NavLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'all-research-page-link', label: 'Research' },
  { id: 'all-web-portfolio-page-link', label: 'Web Portfolio'},
  { id: 'all-publications', label: 'Publications' },
  { id: 'all-links', label: 'Links' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub Profile',
    url: 'https://github.com/matthewjdoyle',
    icon: React.createElement(ActualGitHubIcon, { className: "w-6 h-6" }),
    category: 'Professional & Academic'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Profile',
    url: 'https://linkedin.com/in/matthewd0yle',
    icon: React.createElement(LinkedInIcon, { className: "w-6 h-6" }),
    category: 'Professional & Academic'
  },
  {
    id: 'orcid',
    name: 'ORCID Profile (Academic ID)',
    url: 'https://orcid.org/0000-0002-6994-1832',
    icon: React.createElement('i', {
      className: "fab fa-orcid text-3xl text-secondary",
    }),
    category: 'Professional & Academic'
  },
  {
    id: 'tutoring',
    name: 'My Tutoring Services Site',
    url: 'https://matthewd0yle.com/tutor',
    icon: React.createElement(TutoringLogoIcon, { className: "w-6 h-6" }),
    category: 'Personal Projects & Services'
  },
  // {
  //   id: 'webdesign',
  //   name: 'My Web Design Services Site',
  //   url: 'https://webdesign.matthewd0yle.com',
  //   icon: React.createElement(WebDesignLogoIcon, { className: "w-6 h-6" }),
  //   category: 'Personal Projects & Services'
  // },
  // {
  //   id: 'twitter',
  //   name: 'Twitter (X) Profile',
  //   url: 'https://x.com/YOUR_TWITTER_HANDLE',
  //   icon: React.createElement(TwitterXIcon, { className: "w-6 h-6" }),
  //   category: 'Social Media'
  // },
  // {
  //   id: 'youtube',
  //   name: 'YouTube Channel',
  //   url: 'https://youtube.com/YOUR_YOUTUBE_CHANNEL_ID',
  //   icon: React.createElement(YouTubeIconElement, { className: "w-6 h-6" }),
  //   category: 'Social Media'
  // },
  {
    id: 'bluesky',
    name: 'Bluesky Profile',
    url: 'https://bsky.app/profile/matthewd0yle.bsky.social',
    icon: React.createElement(BlueskyIcon, { className: "w-6 h-6" }),
    category: 'Social Media'
  },
  {
    id: 'email',
    name: 'Email Me Directly',
    url: 'mailto:matt@matthewd0yle.com',
    icon: React.createElement(EmailIcon, { className: "w-6 h-6" }),
    category: 'Contact'
  },
]; 