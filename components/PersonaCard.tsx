'use client';

import { User, Target, Zap, Frown, Brain } from 'lucide-react';

interface Persona {
  name: string;
  role: string;
  age: string;
  goals: string[];
  frustrations: string[];
  behaviors: string[];
  quote: string;
  mentalModel?: string;
}

interface PersonaCardProps {
  persona: Persona;
}

export default function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-7 border-2 border-indigo-200 hover:border-indigo-300 transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-900 font-serif">{persona.name}</h4>
          <p className="text-indigo-700 font-semibold font-sans text-sm">{persona.role}</p>
          <p className="text-sm text-gray-600 font-sans">{persona.age}</p>
        </div>
      </div>

      {/* Quote */}
      {persona.quote && (
        <div className="mb-5 p-4 bg-white/80 rounded-lg border-2 border-indigo-200">
          <p className="text-gray-800 italic font-serif leading-relaxed">"{persona.quote}"</p>
        </div>
      )}

      {/* Goals */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-green-600" />
          <h5 className="font-semibold text-gray-900 font-sans">Goals</h5>
        </div>
        <ul className="space-y-2">
          {persona.goals.map((goal, idx) => (
            <li key={idx} className="text-sm text-gray-800 flex items-start gap-2.5 font-serif leading-relaxed">
              <span className="text-green-600 font-bold mt-0.5">•</span>
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Frustrations */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Frown className="w-5 h-5 text-red-600" />
          <h5 className="font-semibold text-gray-900 font-sans">Frustrations</h5>
        </div>
        <ul className="space-y-2">
          {persona.frustrations.map((frustration, idx) => (
            <li key={idx} className="text-sm text-gray-800 flex items-start gap-2.5 font-serif leading-relaxed">
              <span className="text-red-600 font-bold mt-0.5">•</span>
              <span>{frustration}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Behaviors */}
      {persona.behaviors && persona.behaviors.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-purple-600" />
            <h5 className="font-semibold text-gray-900 font-sans">Behaviors</h5>
          </div>
          <ul className="space-y-2">
            {persona.behaviors.map((behavior, idx) => (
              <li key={idx} className="text-sm text-gray-800 flex items-start gap-2.5 font-serif leading-relaxed">
                <span className="text-purple-600 font-bold mt-0.5">•</span>
                <span>{behavior}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mental Model */}
      {persona.mentalModel && (
        <div className="mt-5 p-4 bg-indigo-100/60 rounded-lg border-2 border-indigo-200">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-indigo-700" />
            <h5 className="font-semibold text-gray-900 text-sm font-sans">Mental Model</h5>
          </div>
          <p className="text-sm text-gray-800 font-serif leading-relaxed">{persona.mentalModel}</p>
        </div>
      )}
    </div>
  );
}
