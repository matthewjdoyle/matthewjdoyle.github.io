import React from 'react';
import { SkillCategory, Skill } from '../types';
import { 
  PythonIcon, JavaScriptIcon, CppIcon, DataScienceIcon, 
  CodeBracketIcon, BookOpenIcon, LatexIcon, GitIcon 
} from './icons';

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'core_programming',
    name: 'Core Programming',
    skills: [
      { id: 'python', name: 'Python', icon: React.createElement(PythonIcon, { className: "text-blue-400" }) },
      { id: 'javascript_ts', name: 'JavaScript/TypeScript', icon: React.createElement(JavaScriptIcon, { className: "text-yellow-400" }) },
      { id: 'cpp', name: 'C++', icon: React.createElement(CppIcon, { className: "text-sky-500" }) },
    ],
  },
  {
    id: 'scientific_computing',
    name: 'Scientific Computing & Data',
    skills: [
      { id: 'numpy_scipy', name: 'NumPy/SciPy', icon: React.createElement(DataScienceIcon, { className: "text-green-500" }) },
      { id: 'pandas', name: 'Pandas', icon: React.createElement(DataScienceIcon, { className: "text-green-500 opacity-80" }) },
      { id: 'matplotlib_seaborn', name: 'Matplotlib/Seaborn', icon: React.createElement(DataScienceIcon, { className: "text-orange-500" }) },
      { id: 'sql', name: 'SQL', icon: React.createElement(CodeBracketIcon, { className: "text-indigo-400" }) }, 
      { id: 'statistics', name: 'Statistical Analysis', icon: React.createElement(DataScienceIcon, { className: "text-purple-500" }) },
    ],
  },
  {
    id: 'physics_math',
    name: 'Physics & Mathematics',
    skills: [
      { id: 'general_relativity', name: 'General Relativity', icon: React.createElement(BookOpenIcon, { className: "text-teal-400" }) },
      { id: 'qft', name: 'Quantum Field Theory', icon: React.createElement(BookOpenIcon, { className: "text-teal-400 opacity-80" }) },
      { id: 'mathematical_physics', name: 'Mathematical Physics', icon: React.createElement(BookOpenIcon, { className: "text-cyan-400" }) },
      { id: 'latex', name: 'LaTeX', icon: React.createElement(LatexIcon, { className: "text-gray-300" }) },
    ],
  },
  {
    id: 'dev_tools',
    name: 'Development Tools & Methodologies',
    skills: [
      { id: 'git', name: 'Git & GitHub', icon: React.createElement(GitIcon, { className: "text-red-500" }) },
      { id: 'docker', name: 'Docker', icon: React.createElement(CodeBracketIcon, { className: "text-blue-300" }) }, 
      { id: 'linux', name: 'Linux/Unix', icon: React.createElement(CodeBracketIcon, { className: "text-gray-300" }) }, 
      { id: 'hpc', name: 'HPC Environments', icon: React.createElement(CodeBracketIcon, { className: "text-orange-300" }) }, 
      { id: 'agile', name: 'Agile Methodologies', icon: React.createElement(CodeBracketIcon, { className: "text-yellow-300" }) }, 
    ],
  },
];
