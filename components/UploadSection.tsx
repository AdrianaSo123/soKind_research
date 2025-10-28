'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Loader2, FileCheck, Brain, FolderOpen } from 'lucide-react';

interface UploadSectionProps {
  onAnalysisComplete: (data: any) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (value: boolean) => void;
}

export default function UploadSection({ onAnalysisComplete, isAnalyzing, setIsAnalyzing }: UploadSectionProps) {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isProcessingPDF, setIsProcessingPDF] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // Check if it's a PDF file
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      setIsProcessingPDF(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/extract-pdf', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('PDF extraction failed');

        const data = await response.json();
        setText(data.text);
        setIsProcessingPDF(false);
      } catch (error) {
        console.error('PDF processing error:', error);
        alert('Failed to process PDF. Please try a different file or paste the text directly.');
        setIsProcessingPDF(false);
        setFileName('');
      }
    } else if (file.name.toLowerCase().endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Handle .docx files
      setIsProcessingPDF(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/extract-docx', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('DOCX extraction failed');

        const data = await response.json();
        setText(data.text);
        setIsProcessingPDF(false);
      } catch (error) {
        console.error('DOCX processing error:', error);
        alert('Failed to process Word document. Please try a different file or paste the text directly.');
        setIsProcessingPDF(false);
        setFileName('');
      }
    } else {
      // Handle plain text files
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  const handleLoadPreviousAnalysis = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Check if it's a valid analysis export
      if (data.analysis) {
        onAnalysisComplete(data.analysis);
        setIsAnalyzing(false);
      } else {
        alert('Invalid analysis file format. Please upload a file exported from UX Synthesizer.');
      }
    } catch (error) {
      console.error('Error loading analysis:', error);
      alert('Failed to load analysis file. Please make sure it\'s a valid JSON file.');
    }
    
    // Reset the input so the same file can be selected again
    if (jsonInputRef.current) {
      jsonInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      onAnalysisComplete(data);
    } catch (error: any) {
      console.error('Analysis error:', error);
      alert(error.message || 'Analysis failed. Please try again.');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-xl border-4 border-gray-700 shadow-lg p-10">
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-serif font-bold text-gray-900">Begin Your Analysis</h3>
            <button
              onClick={() => jsonInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all border-2 border-gray-300 hover:border-gray-500 font-sans font-medium text-sm"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Load Previous</span>
            </button>
          </div>
          <p className="text-gray-900 font-serif leading-relaxed text-base">
            Upload research documents or paste your qualitative data to receive expert-level synthesis
          </p>
        </div>
        
        {/* Hidden JSON file input */}
        <input
          type="file"
          ref={jsonInputRef}
          onChange={handleLoadPreviousAnalysis}
          accept=".json"
          className="hidden"
          aria-label="Load previous analysis"
        />
        
        {/* File Upload Button */}
        <div className="mb-10">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".txt,.doc,.docx,.pdf"
            className="hidden"
            aria-label="Upload research document file"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessingPDF}
            className="w-full border-4 border-dashed border-gray-400 rounded-xl p-14 hover:border-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm hover:shadow-md"
            aria-label="Upload research document"
          >
            {isProcessingPDF ? (
              <div className="text-center">
                <Loader2 className="w-11 h-11 text-warm-700 mx-auto mb-4 animate-spin" />
                <p className="text-gray-900 font-semibold font-serif text-lg">
                  Processing document...
                </p>
                <p className="text-sm text-gray-600 mt-2 font-sans">
                  Extracting text content
                </p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-11 h-11 text-gray-800 group-hover:text-gray-900 mx-auto mb-4 transition-colors" />
                <p className="text-gray-900 group-hover:text-gray-900 font-bold mb-2 font-serif text-lg">
                  Upload research document
                </p>
                <p className="text-base text-gray-700 font-sans font-medium">
                  TXT, PDF, DOC, or DOCX formats accepted
                </p>
              </div>
            )}
          </button>
          {fileName && !isProcessingPDF && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-900 bg-gray-100 px-4 py-3 rounded-lg border-2 border-gray-700">
              <FileCheck className="w-5 h-5 text-gray-900" />
              <span className="font-sans font-semibold">{fileName}</span>
            </div>
          )}
        </div>

        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-400"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-sm text-gray-700 font-serif italic font-medium">or enter text directly</span>
          </div>
        </div>

        {/* Text Area */}
        <div className="mb-8">
          <label htmlFor="research-text" className="sr-only">Research data text area</label>
          <textarea
            id="research-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste interview transcripts, survey responses, field notes, or any qualitative research data..."
            className="w-full h-80 p-5 border-4 border-gray-400 rounded-xl focus:ring-2 focus:ring-gray-700 focus:border-gray-700 resize-none text-gray-900 placeholder:text-gray-500 font-serif leading-relaxed bg-white transition-all"
            aria-describedby="char-count min-chars"
          />
          <div className="flex items-center justify-between mt-3">
            <p id="char-count" className="text-sm text-gray-900 font-sans font-bold">
              {text.length.toLocaleString()} characters
            </p>
            <p id="min-chars" className="text-sm text-gray-700 font-sans font-medium">
              Minimum 50 characters required
            </p>
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!text.trim() || isAnalyzing || text.trim().length < 50}
          className="w-full bg-gray-900 text-white font-bold py-5 px-8 rounded-xl hover:bg-black active:bg-black disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl font-sans text-lg"
          aria-label={isAnalyzing ? "Analyzing research data" : "Begin analysis"}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Analyzing research...
            </>
          ) : (
            <>
              <Brain className="w-6 h-6" />
              Begin Analysis
            </>
          )}
        </button>
        
        {isAnalyzing && (
          <div className="mt-8 p-7 bg-gray-100 rounded-xl border-4 border-gray-700 shadow-md" role="status" aria-live="polite">
            <div className="flex items-start gap-4">
              <Loader2 className="w-7 h-7 text-gray-900 animate-spin flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-base font-bold text-gray-900 mb-4 font-serif">
                  Applying expert research methodology...
                </p>
                <div className="space-y-3 text-base text-gray-900 font-sans font-medium">
                  <p className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-gray-900 rounded-full animate-pulse"></span>
                    Reading and parsing research data
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-gray-900 rounded-full animate-pulse delay-75"></span>
                    Identifying patterns and themes
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-gray-900 rounded-full animate-pulse delay-150"></span>
                    Building codebook and personas
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-gray-900 rounded-full animate-pulse delay-200"></span>
                    Generating recommendations
                  </p>
                </div>
                <div className="mt-5 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gray-900 h-full rounded-full animate-[progress_15s_ease-in-out_forwards]"></div>
                </div>
                <p className="text-sm text-gray-700 mt-3 font-sans font-semibold">
                  Analysis typically takes 10-20 seconds
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
