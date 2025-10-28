'use client';

import { BookOpen, Hash, Layers } from 'lucide-react';

interface CodebookEntry {
  code: string;
  definition: string;
  frequency: number;
  examples: string[];
  category?: string;
}

interface CodebookDisplayProps {
  codebook: CodebookEntry[];
}

const categoryColors: { [key: string]: { bg: string; border: string; text: string; badge: string } } = {
  'Usability': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', badge: 'bg-blue-100 border-blue-300' },
  'Content': { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900', badge: 'bg-green-100 border-green-300' },
  'Emotional Response': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-900', badge: 'bg-purple-100 border-purple-300' },
  'User Goals': { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900', badge: 'bg-orange-100 border-orange-300' },
  'Feature Requests': { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-900', badge: 'bg-pink-100 border-pink-300' },
  'Technical Issues': { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900', badge: 'bg-red-100 border-red-300' },
};

const getColorScheme = (category?: string) => {
  if (!category) return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-900', badge: 'bg-gray-100 border-gray-300' };
  return categoryColors[category] || { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-900', badge: 'bg-gray-100 border-gray-300' };
};

export default function CodebookDisplay({ codebook }: CodebookDisplayProps) {
  // Sort by frequency (highest first)
  const sortedCodebook = [...codebook].sort((a, b) => b.frequency - a.frequency);
  
  // Calculate total occurrences
  const totalOccurrences = codebook.reduce((sum, entry) => sum + entry.frequency, 0);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-sage-100 rounded-lg p-5 border-2 border-sage-300">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-sage-700" />
            <p className="text-sm font-semibold text-sage-700 font-sans">Total Codes</p>
          </div>
          <p className="text-3xl font-bold text-sage-900 font-serif">{codebook.length}</p>
        </div>
        <div className="bg-warm-100 rounded-lg p-5 border-2 border-warm-300">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-5 h-5 text-warm-700" />
            <p className="text-sm font-semibold text-warm-700 font-sans">Occurrences</p>
          </div>
          <p className="text-3xl font-bold text-warm-900 font-serif">{totalOccurrences}</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-5 border-2 border-blue-300">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5 text-blue-700" />
            <p className="text-sm font-semibold text-blue-700 font-sans">Categories</p>
          </div>
          <p className="text-3xl font-bold text-blue-900 font-serif">
            {new Set(codebook.map(c => c.category).filter(Boolean)).size}
          </p>
        </div>
      </div>

      {/* Codebook Entries */}
      <div className="space-y-5">
        {sortedCodebook.map((entry, idx) => {
          const colorScheme = getColorScheme(entry.category);
          const percentage = ((entry.frequency / totalOccurrences) * 100).toFixed(1);
          
          return (
            <div
              key={idx}
              className={`p-7 rounded-xl border-2 ${colorScheme.border} ${colorScheme.bg} hover:shadow-lg transition-all`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className={`text-xl font-bold ${colorScheme.text} font-serif`}>
                      {entry.code}
                    </h4>
                    {entry.category && (
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold border-2 ${colorScheme.badge} ${colorScheme.text} font-sans`}>
                        {entry.category}
                      </span>
                    )}
                  </div>
                  <p className="text-base text-gray-800 leading-relaxed font-serif mt-3">
                    {entry.definition}
                  </p>
                </div>
                
                {/* Frequency Badge */}
                <div className="ml-5 flex flex-col items-center justify-center bg-white rounded-lg p-4 border-2 border-gray-300 shadow-sm min-w-[100px]">
                  <p className="text-3xl font-bold text-gray-900 font-serif">{entry.frequency}</p>
                  <p className="text-xs text-gray-600 font-semibold font-sans">occurrences</p>
                  <div className="mt-2 px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-700 font-sans">
                    {percentage}%
                  </div>
                </div>
              </div>

              {/* Examples */}
              <div className="mt-6 pt-6 border-t-2 border-gray-300/40">
                <p className="text-sm font-semibold text-gray-700 mb-4 font-sans flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                  Examples from research data:
                </p>
                <div className="space-y-3">
                  {entry.examples.map((example, exIdx) => (
                    <div
                      key={exIdx}
                      className="bg-white/80 rounded-lg p-4 border-l-4 border-gray-400"
                    >
                      <p className="text-sm text-gray-800 italic leading-relaxed font-serif">
                        "{example}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Methodology Note */}
      <div className="mt-8 p-6 bg-sage-50 rounded-lg border-2 border-sage-200">
        <p className="text-sm text-gray-700 leading-relaxed font-serif">
          <strong className="font-sans font-bold">Codebook Methodology:</strong> This codebook documents all recurring patterns 
          identified through systematic qualitative coding. Each code appears at least twice in the research data and includes 
          clear definitions and supporting evidence. Codes are ordered by frequency to highlight the most prevalent themes.
        </p>
      </div>
    </div>
  );
}
