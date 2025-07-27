import React from 'react';

export interface NavLink {
  id: string;
  label: string;
}

export interface SocialLink {
  id:string;
  name: string;
  url: string;
  // Changed to a more specific type that guarantees className compatibility for HTML/SVG elements
  icon: React.ReactElement<React.HTMLAttributes<HTMLElement> | React.SVGAttributes<SVGElement>>;
  category: string; // Added category for grouping
}

export interface Project {
  id: string;
  title: string;
  description: string; // Short description for cards
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  embedUrl?: string; // URL for the iframe src in the enlarged view
  detailedDescription?: string[]; // For the full article content on the detail page
  date?: string; // Optional date for the project
}

export interface WebPortfolioItem {
  id: string;
  title: string;
  description: string;
  embedUrl: string; // URL for the iframe src
  liveUrl: string;  // URL for the "Visit Site" button
  tags: string[];
  aspectRatio?: string; // e.g., '16/9', '4/3', '1/1', defaults to 16/9
}

export interface Skill {
  id: string;
  name: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  level?: number; // Optional: percentage 0-100
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface TimelineEntry {
  id: string;
  title: string; // Role or Degree
  institution: string; // Company or School
  period: string; // e.g., "Jan 2020 - Present" or "2016 - 2020"
  description: string[]; // Bullet points
  logoUrl?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  doiUrl?: string;
  arxivUrl?: string;
  pdfUrl?: string;
  abstract?: string;
}

export interface ConferenceContribution {
  id: string;
  title: string;
  conference: string; // Name of the conference/event
  date: string; // e.g., "Oct 2023" or "2023-10-15"
  location?: string; // Optional location
  url?: string; // Optional link to PDF, slides, or abstract
  description?: string; // Optional short description
}
