
import React from 'react';
import { GLOSSARY } from '../data/glossary';

interface RichTextProps {
  content: string;
  className?: string;
  termClassName?: string;
}

const RichText: React.FC<RichTextProps> = ({ content, className = "", termClassName }) => {
  // Memoize the regex construction
  const regex = React.useMemo(() => {
    // Sort terms by length (descending) to match "Machine Learning" before "Machine"
    const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
    // Escape special regex characters if any (simple terms usually don't have them but good practice)
    const escapedTerms = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi');
  }, []);

  if (!content) return null;

  const parts = content.split(regex);
  const defaultTermClasses = "border-indigo-400 text-indigo-600 dark:text-indigo-300";
  const activeTermClasses = termClassName || defaultTermClasses;

  return (
    <span className={className}>
      {parts.map((part, i) => {
        // Check if this part matches a glossary term (case-insensitive)
        const lowerPart = part.toLowerCase();
        // Find the key in glossary that matches
        const glossaryKey = Object.keys(GLOSSARY).find(k => k.toLowerCase() === lowerPart);

        if (glossaryKey) {
          const entry = GLOSSARY[glossaryKey];
          return (
            <span key={i} className={`group relative inline-block cursor-help border-b border-dashed font-semibold mx-0.5 ${activeTermClasses}`}>
              {part}
              {/* Tooltip */}
              <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 sm:w-64 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-xl z-50 pointer-events-none border border-slate-700 leading-snug font-normal text-left">
                <span className="flex items-center gap-2 mb-1 border-b border-slate-700 pb-1">
                    <span className="text-lg">{entry.emoji}</span>
                    <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-300">{entry.term}</span>
                </span>
                {entry.def}
                {/* Arrow */}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></span>
              </span>
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

export default RichText;
