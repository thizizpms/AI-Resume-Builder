import React from 'react';
import { User, Briefcase, GraduationCap, Award, FileText, Download } from 'lucide-react';

interface SidebarProps {
  currentStep: string;
  onStepChange: (step: string) => void;
  onExportPDF: () => void;
}

const steps = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Work Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Award },
  { id: 'templates', label: 'Templates', icon: FileText },
];

export function Sidebar({ currentStep, onStepChange, onExportPDF }: SidebarProps) {
  return (
    <div className="bg-slate-900 text-white w-80 min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">Resume Builder</h1>
        <p className="text-slate-400 mt-2">Create your professional resume</p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            
            return (
              <li key={step.id}>
                <button
                  onClick={() => onStepChange(step.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{step.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-700">
        <button
          onClick={onExportPDF}
          className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium"
        >
          <Download size={20} />
          <span>Export PDF</span>
        </button>
      </div>
    </div>
  );
}