'use client';

import { ArrowLeft, AlertCircle, Heart, TrendingUp, Users, Download, BookOpen } from 'lucide-react';
import PersonaCard from './PersonaCard';
import AffinityMap from './AffinityMap';
import CodebookDisplay from './CodebookDisplay';

interface InsightsDisplayProps {
  data: {
    painPoints: (string | { description: string; violatedHeuristic?: string; severity?: string; impact?: string })[];
    motivations: (string | { description: string; category?: string })[];
    themes: { theme: string; quotes: string[]; principle?: string }[];
    personas: any[];
    affinityGroups: { category: string; items: string[] }[];
    codebook?: { code: string; definition: string; frequency: number; examples: string[]; category?: string }[];
    recommendations?: { priority: string; issue: string; recommendation: string; principle?: string }[];
  };
  onReset: () => void;
}

export default function InsightsDisplay({ data, onReset }: InsightsDisplayProps) {
  // Helper function to extract text from pain points (handles both string and object formats)
  const getPainPointText = (point: string | { description: string; violatedHeuristic?: string; severity?: string; impact?: string }) => {
    return typeof point === 'string' ? point : point.description;
  };

  const getPainPointDetails = (point: string | { description: string; violatedHeuristic?: string; severity?: string; impact?: string }) => {
    if (typeof point === 'string') return null;
    return {
      heuristic: point.violatedHeuristic,
      severity: point.severity,
      impact: point.impact
    };
  };

  // Helper function to extract text from motivations
  const getMotivationText = (motivation: string | { description: string; category?: string }) => {
    return typeof motivation === 'string' ? motivation : motivation.description;
  };

  const getMotivationCategory = (motivation: string | { description: string; category?: string }) => {
    if (typeof motivation === 'string') return null;
    return motivation.category;
  };

  // Download analysis as JSON
  const handleDownloadAnalysis = () => {
    const timestamp = new Date().toISOString().slice(0, 16).replace('T', '-').replace(':', 'h');
    const filename = `ux-analysis-${timestamp}.json`;
    
    const analysisData = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      analysis: data
    };
    
    const blob = new Blob([JSON.stringify(analysisData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between pb-8 border-b-2 border-sage-200">
        <div>
          <h2 className="text-4xl font-serif font-bold text-white mb-3">Analysis Results</h2>
          <p className="text-white font-serif text-base italic">Expert synthesis of your research data</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadAnalysis}
            className="flex items-center gap-2.5 px-6 py-3.5 text-white hover:text-gray-200 hover:bg-white/10 rounded-lg transition-all border-2 border-white/30 hover:border-white/50 font-sans font-semibold shadow-sm hover:shadow-md"
          >
            <Download className="w-5 h-5" />
            <span>Download</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2.5 px-6 py-3.5 text-white hover:text-gray-200 hover:bg-white/10 rounded-lg transition-all border-2 border-white/30 hover:border-white/50 font-sans font-semibold shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      {/* Pain Points */}
      <section className="bg-white rounded-xl border-2 border-sage-200 p-10 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4 mb-8 pb-6 border-b-2 border-sage-200">
          <div className="w-14 h-14 bg-red-50 rounded-lg flex items-center justify-center border-2 border-red-200 shadow-sm">
            <AlertCircle className="w-7 h-7 text-red-700" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-black mb-1">Pain Points</h3>
            <p className="text-sm text-gray-800 font-sans font-medium">Critical usability issues and friction points</p>
          </div>
        </div>
        <div className="space-y-4">
          {data.painPoints.map((point, idx) => {
            const text = getPainPointText(point);
            const details = getPainPointDetails(point);
            return (
              <div key={idx} className="flex gap-5 p-6 bg-sage-50 rounded-lg border-2 border-sage-200 hover:border-red-300 hover:bg-red-50/30 transition-all">
                <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 text-red-800 text-sm font-bold border-2 border-red-200 font-sans shadow-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 leading-relaxed font-serif text-base">{text}</p>
                  {details && (details.heuristic || details.severity || details.impact) && (
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-sans">
                      {details.severity && (
                        <span className={`px-3 py-1.5 rounded-md font-semibold shadow-sm ${
                          details.severity === 'Critical' ? 'bg-red-100 text-red-900 border-2 border-red-300' :
                          details.severity === 'High' ? 'bg-orange-100 text-orange-900 border-2 border-orange-300' :
                          'bg-yellow-100 text-yellow-900 border-2 border-yellow-300'
                        }`}>
                          {details.severity}
                        </span>
                      )}
                      {details.heuristic && (
                        <span className="px-3 py-1.5 bg-sage-100 text-sage-900 rounded-md border-2 border-sage-300 font-semibold">
                          {details.heuristic}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Motivations */}
      <section className="bg-white rounded-xl border-2 border-sage-200 p-10 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4 mb-8 pb-6 border-b-2 border-sage-200">
          <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center border-2 border-green-200 shadow-sm">
            <Heart className="w-7 h-7 text-green-700" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-black mb-1">User Motivations</h3>
            <p className="text-sm text-gray-800 font-sans font-medium">What drives user behavior and decision-making</p>
          </div>
        </div>
        <div className="space-y-4">
          {data.motivations.map((motivation, idx) => {
            const text = getMotivationText(motivation);
            const category = getMotivationCategory(motivation);
            return (
              <div key={idx} className="flex gap-5 p-6 bg-sage-50 rounded-lg border-2 border-sage-200 hover:border-green-300 hover:bg-green-50/30 transition-all">
                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-800 text-sm font-bold border-2 border-green-200 font-sans shadow-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 leading-relaxed font-serif text-base">{text}</p>
                  {category && (
                    <span className="inline-block mt-4 px-3 py-1.5 bg-green-100 text-green-900 rounded-md text-xs font-semibold border-2 border-green-300 font-sans shadow-sm">
                      {category}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Themes */}
      <section className="bg-white rounded-xl border-2 border-sage-200 p-10 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4 mb-8 pb-6 border-b-2 border-sage-200">
          <div className="w-14 h-14 bg-purple-50 rounded-lg flex items-center justify-center border-2 border-purple-200 shadow-sm">
            <TrendingUp className="w-7 h-7 text-purple-700" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-black mb-1">Emerging Themes</h3>
            <p className="text-sm text-gray-800 font-sans font-medium">Patterns and recurring insights from the research</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {data.themes.map((theme, idx) => (
            <div key={idx} className="p-7 bg-purple-50/50 rounded-xl border-2 border-purple-200 hover:border-purple-300 hover:shadow-md transition-all">
              <h4 className="font-serif font-semibold text-purple-900 mb-3 text-lg">{theme.theme}</h4>
              {theme.principle && (
                <p className="text-xs text-purple-800 mb-5 font-sans font-semibold bg-purple-100 inline-block px-3 py-1.5 rounded-md border-2 border-purple-200 shadow-sm">
                  {theme.principle}
                </p>
              )}
              <div className="space-y-4 mt-5">
                {theme.quotes.map((quote, qIdx) => (
                  <p key={qIdx} className="text-sm text-gray-800 italic border-l-4 border-purple-400 pl-5 leading-relaxed font-serif">
                    "{quote}"
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <section className="bg-white rounded-xl border-2 border-sage-200 p-10 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4 mb-8 pb-6 border-b-2 border-sage-200">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center border-2 border-blue-200 shadow-sm">
              <TrendingUp className="w-7 h-7 text-blue-700" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-black mb-1">Expert Recommendations</h3>
              <p className="text-sm text-gray-800 font-sans font-medium">Prioritized actions grounded in UX principles</p>
            </div>
          </div>
          <div className="space-y-5">
            {data.recommendations.map((rec, idx) => {
              const priorityStyles = {
                Critical: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900', badge: 'bg-red-100 text-red-900 border-red-300' },
                High: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900', badge: 'bg-orange-100 text-orange-900 border-orange-300' },
                Medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-900', badge: 'bg-yellow-100 text-yellow-900 border-yellow-300' },
              };
              const style = priorityStyles[rec.priority as keyof typeof priorityStyles] || { bg: 'bg-sage-50', border: 'border-sage-200', text: 'text-sage-900', badge: 'bg-sage-100 text-sage-900 border-sage-300' };
              
              return (
                <div key={idx} className={`p-7 rounded-xl border-2 ${style.border} ${style.bg} hover:shadow-md transition-all`}>
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wide px-3 py-2 rounded-md border-2 ${style.badge} font-sans shadow-sm`}>{rec.priority} Priority</span>
                  </div>
                  <h4 className={`font-serif font-semibold mb-3 text-lg ${style.text}`}>Issue: {rec.issue}</h4>
                  <p className={`mb-4 text-base leading-relaxed font-serif ${style.text}`}>{rec.recommendation}</p>
                  {rec.principle && (
                    <p className="text-sm font-semibold mt-5 pt-5 border-t-2 border-gray-300 text-gray-900 font-sans">
                      💡 Based on: {rec.principle}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Codebook */}
      {data.codebook && data.codebook.length > 0 && (
        <section className="bg-white rounded-xl border-2 border-sage-200 p-10 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4 mb-8 pb-6 border-b-2 border-sage-200">
            <div className="w-14 h-14 bg-amber-50 rounded-lg flex items-center justify-center border-2 border-amber-200 shadow-sm">
              <BookOpen className="w-7 h-7 text-amber-700" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-black mb-1">Research Codebook</h3>
              <p className="text-sm text-gray-800 font-sans font-medium">Systematic documentation of all identified patterns and themes</p>
            </div>
          </div>
          <CodebookDisplay codebook={data.codebook} />
        </section>
      )}

      {/* Affinity Map */}
      {data.affinityGroups && data.affinityGroups.length > 0 && (
        <section className="bg-white rounded-xl border-2 border-sage-200 p-10 shadow-md hover:shadow-lg transition-shadow">
          <div className="mb-8 pb-6 border-b-2 border-sage-200">
            <h3 className="text-2xl font-serif font-bold text-black mb-2">Affinity Diagram</h3>
            <p className="text-sm text-gray-800 font-sans font-medium">Related observations clustered by emergent themes</p>
          </div>
          <AffinityMap groups={data.affinityGroups} />
        </section>
      )}

      {/* Personas */}
      {data.personas && data.personas.length > 0 && (
        <section className="bg-white rounded-xl border-2 border-sage-200 p-10 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4 mb-8 pb-6 border-b-2 border-sage-200">
            <div className="w-14 h-14 bg-indigo-50 rounded-lg flex items-center justify-center border-2 border-indigo-200 shadow-sm">
              <Users className="w-7 h-7 text-indigo-700" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-black mb-1">User Personas</h3>
              <p className="text-sm text-gray-800 font-sans font-medium">Research-based behavioral archetypes</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.personas.map((persona, idx) => (
              <PersonaCard key={idx} persona={persona} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
