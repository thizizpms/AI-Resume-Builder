import React from 'react';
import { ResumeData, TemplateType } from '../types/resume';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';

interface PreviewPanelProps {
  data: ResumeData;
  template: TemplateType;
}

export function PreviewPanel({ data, template }: PreviewPanelProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="bg-slate-100 flex-1 p-6 overflow-auto">
      <div className="flex justify-center">
        <div className="transform scale-75 origin-top">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}