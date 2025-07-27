
import React from 'react';

interface StyledMarkdownOutputProps {
    content: string;
}

// Placeholder component
const StyledMarkdownOutput: React.FC<StyledMarkdownOutputProps> = ({ content }) => {
    return (
        <div className="prose prose-invert bg-space_deep p-4 rounded-md">
            <p>{content || "Markdown output will appear here."}</p>
        </div>
    );
};
export default StyledMarkdownOutput;
