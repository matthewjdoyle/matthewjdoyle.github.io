import React, { useEffect, useRef } from 'react';

interface LaTeXRendererProps {
  text: string;
  className?: string;
  inline?: boolean;
}

// Simple LaTeX-like renderer for common scientific notation
const LaTeXRenderer: React.FC<LaTeXRendererProps> = ({ text, className = '', inline = true }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const processedHTML = processLaTeXLikeText(text);
      containerRef.current.innerHTML = processedHTML;
    }
  }, [text]);

  return inline ? (
    <span ref={containerRef} className={className} />
  ) : (
    <div ref={containerRef} className={className} />
  );
};

// Function to process LaTeX-like text and convert to HTML
function processLaTeXLikeText(text: string): string {
  let processed = text;

  // Handle superscripts: ^{...} or ^x
  processed = processed.replace(/\^{([^}]+)}/g, '<sup>$1</sup>');
  processed = processed.replace(/\^([a-zA-Z0-9])/g, '<sup>$1</sup>');

  // Handle subscripts: _{...} or _x
  processed = processed.replace(/_{([^}]+)}/g, '<sub>$1</sub>');
  processed = processed.replace(/_([a-zA-Z0-9])/g, '<sub>$1</sub>');

  // Handle common symbols
  processed = processed.replace(/\\rightarrow/g, '→');
  processed = processed.replace(/\\leftarrow/g, '←');
  processed = processed.replace(/\\to/g, '→');
  processed = processed.replace(/\\infty/g, '∞');
  processed = processed.replace(/\\alpha/g, 'α');
  processed = processed.replace(/\\beta/g, 'β');
  processed = processed.replace(/\\gamma/g, 'γ');
  processed = processed.replace(/\\delta/g, 'δ');
  processed = processed.replace(/\\epsilon/g, 'ε');
  processed = processed.replace(/\\lambda/g, 'λ');
  processed = processed.replace(/\\mu/g, 'μ');
  processed = processed.replace(/\\nu/g, 'ν');
  processed = processed.replace(/\\pi/g, 'π');
  processed = processed.replace(/\\rho/g, 'ρ');
  processed = processed.replace(/\\sigma/g, 'σ');
  processed = processed.replace(/\\tau/g, 'τ');
  processed = processed.replace(/\\phi/g, 'φ');
  processed = processed.replace(/\\chi/g, 'χ');
  processed = processed.replace(/\\psi/g, 'ψ');
  processed = processed.replace(/\\omega/g, 'ω');
  
  // Greek uppercase
  processed = processed.replace(/\\Alpha/g, 'Α');
  processed = processed.replace(/\\Beta/g, 'Β');
  processed = processed.replace(/\\Gamma/g, 'Γ');
  processed = processed.replace(/\\Delta/g, 'Δ');
  processed = processed.replace(/\\Epsilon/g, 'Ε');
  processed = processed.replace(/\\Lambda/g, 'Λ');
  processed = processed.replace(/\\Mu/g, 'Μ');
  processed = processed.replace(/\\Nu/g, 'Ν');
  processed = processed.replace(/\\Pi/g, 'Π');
  processed = processed.replace(/\\Rho/g, 'Ρ');
  processed = processed.replace(/\\Sigma/g, 'Σ');
  processed = processed.replace(/\\Tau/g, 'Τ');
  processed = processed.replace(/\\Phi/g, 'Φ');
  processed = processed.replace(/\\Chi/g, 'Χ');
  processed = processed.replace(/\\Psi/g, 'Ψ');
  processed = processed.replace(/\\Omega/g, 'Ω');

  // Math operators and symbols
  processed = processed.replace(/\\pm/g, '±');
  processed = processed.replace(/\\mp/g, '∓');
  processed = processed.replace(/\\times/g, '×');
  processed = processed.replace(/\\div/g, '÷');
  processed = processed.replace(/\\cdot/g, '·');
  processed = processed.replace(/\\circ/g, '°');
  processed = processed.replace(/\\degree/g, '°');
  processed = processed.replace(/\\approx/g, '≈');
  processed = processed.replace(/\\neq/g, '≠');
  processed = processed.replace(/\\leq/g, '≤');
  processed = processed.replace(/\\geq/g, '≥');
  processed = processed.replace(/\\ll/g, '≪');
  processed = processed.replace(/\\gg/g, '≫');
  processed = processed.replace(/\\propto/g, '∝');
  processed = processed.replace(/\\partial/g, '∂');
  processed = processed.replace(/\\nabla/g, '∇');
  processed = processed.replace(/\\int/g, '∫');
  processed = processed.replace(/\\sum/g, '∑');
  processed = processed.replace(/\\prod/g, '∏');

  // Comparison operators (LaTeX versions)
  processed = processed.replace(/\\lt/g, '<');
  processed = processed.replace(/\\gt/g, '>');
  processed = processed.replace(/\\le/g, '≤');
  processed = processed.replace(/\\ge/g, '≥');

  // Temperature and unit notation
  processed = processed.replace(/\\mathrm{K}/g, 'K');
  processed = processed.replace(/\\mathrm{mK}/g, 'mK');
  processed = processed.replace(/\\mathrm{μK}/g, 'μK');
  processed = processed.replace(/\\mathrm{nK}/g, 'nK');
  processed = processed.replace(/\\text{K}/g, 'K');
  processed = processed.replace(/\\text{mK}/g, 'mK');
  processed = processed.replace(/\\text{μK}/g, 'μK');
  processed = processed.replace(/\\text{nK}/g, 'nK');

  // Common physics notation
  processed = processed.replace(/\\sim/g, '∼');
  processed = processed.replace(/\\simeq/g, '≃');
  processed = processed.replace(/\\equiv/g, '≡');
  processed = processed.replace(/\\hbar/g, 'ℏ');
  processed = processed.replace(/\\celsius/g, '°C');

  // Other common symbols
  processed = processed.replace(/\\&/g, '&');
  processed = processed.replace(/\\%/g, '%');
  processed = processed.replace(/\\\$/g, '$');

  return processed;
}

export default LaTeXRenderer; 