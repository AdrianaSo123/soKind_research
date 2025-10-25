// Type definitions for UX Synthesizer

export interface PainPoint {
  id: string;
  description: string;
  severity?: 'high' | 'medium' | 'low';
}

export interface Motivation {
  id: string;
  description: string;
  category?: string;
}

export interface Theme {
  theme: string;
  quotes: string[];
  frequency?: number;
}

export interface AffinityGroup {
  category: string;
  items: string[];
  color?: string;
}

export interface Persona {
  name: string;
  role: string;
  age: string;
  goals: string[];
  frustrations: string[];
  behaviors: string[];
  quote: string;
  avatar?: string;
}

export interface AnalysisResult {
  painPoints: string[];
  motivations: string[];
  themes: Theme[];
  affinityGroups: AffinityGroup[];
  personas: Persona[];
}

export interface AnalysisRequest {
  text: string;
  options?: {
    includePersonas?: boolean;
    includeAffinityMap?: boolean;
    maxThemes?: number;
  };
}
