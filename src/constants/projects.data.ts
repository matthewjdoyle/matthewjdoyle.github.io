import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-q-turbulence-vis',
    title: 'Visualising Quantum Turbulence',
    description: 'Development and implementation of advanced visualisation techniques for quantum turbulence in superfluid ^4He from 1.4 K to the zero-temperature limit.',
    imageUrl: '/VisualisationExperimentEdited.png',
    tags: ["Quantum Turbulence", "Superfluidity", "Data Visualization", "Python", "VTK", "ParaView", "Computational Physics"],
    // repoUrl: '#',
    date: "2022 - 2024",
    detailedDescription: [
        "Article Coming Soon.",
        "",
        ""
    ],
  },
  {
    id: 'proj-q-turbulence-sim-t0',
    title: 'Simulating Quantum Turbulence in the T \\to 0 Limit',
    description: 'High-performance simulations of quantum turbulence in the zero-temperature limit using the vortex filament model. Investigating the statistical properties of vortex tangles and energy decay mechanisms.',
    imageUrl: '/VortexTangle.png',
    tags: ["Quantum Turbulence", "Vortex Filament Model", "C++", "MPI", "HPC", "Superfluid Helium", "Computational Physics", "Statistical Mechanics"],
    liveUrl: 'https://link.springer.com/article/10.1007/s10909-024-03073-6',
    // repoUrl: '#',
    date: "2020 - 2024",
    detailedDescription: [
        "Article Coming Soon.",
        "",
        ""
    ]
  },
  {
    id: 'proj-cern-reconstruction',
    title: 'Particle Trajectory Reconstruction for a Proposed CERN Collider',
    description: 'Developing and evaluating algorithms for reconstructing particle trajectories from detector hits for a future high-luminosity collider experiment at CERN. Focus on pattern recognition and track fitting in dense environments.',
    imageUrl: '/CLIC.png',
    tags: ["Particle Physics", "CERN", "Physics Simulation", "Particle Track Reconstruction", "C++", "ROOT", "Algorithm Development"],
    // repoUrl: '#',
    date: "2019 - 2020",
    detailedDescription: [
        "Article Coming Soon.",
        "",
        ""
    ]
  },
   {
    id: 'proj-marching-cubes-fermi',
    title: 'Marching Cubes for Fermi-Surfaces',
    description: 'Implementation and optimization of the Marching Cubes algorithm to extract and visualize 3D Fermi-surfaces from electronic band structure data.',
    imageUrl: '/FermiSurfaces.png',
    tags: ["Solid State Physics", "Computational Materials Science", "Marching Cubes", "Algorithm Implementation", "Python", "VTK", "Data Visualization", "Fermi Surface"],
    // liveUrl: '#', 
    // repoUrl: '#', 
    date: "2019", 
    detailedDescription: [
        "Article Coming Soon.",
        "",
        ""
    ]
  },
];