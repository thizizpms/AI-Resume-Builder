import React from 'react';
import { TemplateType } from '../types/resume';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

const templates = [
  { id: 'modern' as TemplateType, name: 'Modern', description: 'Clean design with blue accents' },
  { id: 'classic' as TemplateType, name: 'Classic', description: 'Traditional professional layout' },
  { id: 'minimal' as TemplateType, name: 'Minimal', description: 'Simple and elegant design' },
];

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Choose Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-slate-300 hover:border-slate-400 bg-white'
            }`}
          >
            <div className={`w-full h-32 mb-3 rounded border-2 ${
              template.id === 'modern' ? 'bg-gradient-to-b from-blue-600 to-blue-700 border-blue-600' :
              template.id === 'classic' ? 'bg-slate-100 border-slate-400' :
              'bg-white border-slate-300'
            }`}>
              <div className="p-2">
                <div className={`h-3 w-3/4 mb-2 rounded ${
                  template.id === 'modern' ? 'bg-white' :
                  template.id === 'classic' ? 'bg-slate-600' :
                  'bg-slate-800'
                }`}></div>
                <div className={`h-1 w-1/2 mb-2 rounded ${
                  template.id === 'modern' ? 'bg-blue-200' :
                  template.id === 'classic' ? 'bg-slate-400' :
                  'bg-slate-300'
                }`}></div>
                <div className={`h-1 w-full mb-1 rounded ${
                  template.id === 'modern' ? 'bg-blue-100' :
                  template.id === 'classic' ? 'bg-slate-300' :
                  'bg-slate-200'
                }`}></div>
                <div className={`h-1 w-4/5 rounded ${
                  template.id === 'modern' ? 'bg-blue-100' :
                  template.id === 'classic' ? 'bg-slate-300' :
                  'bg-slate-200'
                }`}></div>
              </div>
            </div>
            
            <h3 className="font-semibold text-slate-900">{template.name}</h3>
            <p className="text-sm text-slate-600 mt-1">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}