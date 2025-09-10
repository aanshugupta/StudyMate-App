
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderLine = (line: string, index: number) => {
    if (line.startsWith('# ')) {
      return <h1 key={index} className="text-3xl font-bold mt-4 mb-2 pb-2 border-b">{line.substring(2)}</h1>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={index} className="text-2xl font-bold mt-3 mb-2">{line.substring(3)}</h2>;
    }
    if (line.startsWith('### ')) {
      return <h3 key={index} className="text-xl font-semibold mt-2 mb-2">{line.substring(4)}</h3>;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
    }
    if (line.match(/^\d+\.\s/)) {
        return <li key={index} className="ml-6 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
    }

    const boldedLine = line.split('**').map((part, i) => 
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
    );
    
    return <p key={index} className="my-2 leading-relaxed">{boldedLine}</p>;
  };

  const lines = content.trim().split('\n');

  return (
    <div className="prose max-w-none text-gray-700">
      {lines.map(renderLine)}
    </div>
  );
};

export default MarkdownRenderer;
