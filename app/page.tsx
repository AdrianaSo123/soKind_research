'use client';

import { useState } from 'react';
import { Upload, Brain, Users, TrendingUp, FileText } from 'lucide-react';
import UploadSection from '@/components/UploadSection';
import InsightsDisplay from '@/components/InsightsDisplay';

export default function Home() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (data: any) => {
    setAnalysisData(data);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Header */}
      <header className="border-b-2 border-sage-200 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center shadow-md">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-semibold text-black">
                  UX Synthesizer
                </h1>
                <p className="text-xs text-black font-sans font-medium">Expert research analysis</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 lg:px-12 py-20">
        {!analysisData ? (
          <>
            {/* Hero Section */}
            <div className="max-w-4xl mb-24">
              <p className="text-sm font-medium text-warm-800 tracking-wide uppercase mb-4 font-sans">
                Research Intelligence Platform
              </p>
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-sage-900 mb-8 leading-tight">
                Discover deeper insights from your research
              </h2>
              <p className="text-xl text-sage-800 leading-relaxed mb-12 font-serif">
                Harness the power of AI to analyze interview transcripts, survey responses, 
                and usability studies. Our platform applies Nielsen Norman Group methodology 
                to deliver expert-level synthesis—transforming raw data into strategic insights.
              </p>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 pb-16 border-b-2 border-sage-200">
                {[
                  { icon: FileText, label: 'Upload', desc: 'Multiple formats' },
                  { icon: Brain, label: 'Analyze', desc: 'Expert methodology' },
                  { icon: TrendingUp, label: 'Synthesize', desc: 'Find patterns' },
                  { icon: Users, label: 'Understand', desc: 'User archetypes' }
                ].map((feature, idx) => (
                  <div key={idx} className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-warm-100 mb-5 border-2 border-warm-200 shadow-sm">
                      <feature.icon className="w-7 h-7 text-warm-700" />
                    </div>
                    <h3 className="font-semibold text-sage-900 mb-2 text-base font-sans">{feature.label}</h3>
                    <p className="text-sm text-sage-700 font-sans">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Section */}
            <UploadSection 
              onAnalysisComplete={handleAnalysisComplete}
              isAnalyzing={isAnalyzing}
              setIsAnalyzing={setIsAnalyzing}
            />
          </>
        ) : (
          <InsightsDisplay 
            data={analysisData} 
            onReset={() => setAnalysisData(null)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-sage-200 bg-white mt-32">
        <div className="max-w-6xl mx-auto px-8 lg:px-12 py-16">
          <div className="text-center">
            <p className="text-sm text-black mb-3 font-serif italic leading-relaxed">
              "The purpose of research is to inform and illuminate, not merely to collect data."
            </p>
            <p className="text-xs text-black font-sans font-medium">
              Built on Nielsen Norman Group principles • Designed for UX professionals
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

