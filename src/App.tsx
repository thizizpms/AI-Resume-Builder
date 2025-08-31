import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { PersonalInfoForm } from './components/forms/PersonalInfoForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { EducationForm } from './components/forms/EducationForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { TemplateSelector } from './components/TemplateSelector';
import { PreviewPanel } from './components/PreviewPanel';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generatePDF } from './utils/pdfGenerator';
import { ResumeData, TemplateType } from './types/resume';

const initialData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    summary: '',
  },
  workExperience: [],
  education: [],
  skills: [],
};

function App() {
  const [currentStep, setCurrentStep] = useState('personal');
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>('resumeData', initialData);
  const [selectedTemplate, setSelectedTemplate] = useLocalStorage<TemplateType>('selectedTemplate', 'modern');

  const handleExportPDF = async () => {
    const fileName = resumeData.personalInfo.fullName 
      ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf';
    
    await generatePDF(resumeData, selectedTemplate, fileName);
  };

  const updatePersonalInfo = (personalInfo: ResumeData['personalInfo']) => {
    setResumeData({ ...resumeData, personalInfo });
  };

  const updateWorkExperience = (workExperience: ResumeData['workExperience']) => {
    setResumeData({ ...resumeData, workExperience });
  };

  const updateEducation = (education: ResumeData['education']) => {
    setResumeData({ ...resumeData, education });
  };

  const updateSkills = (skills: ResumeData['skills']) => {
    setResumeData({ ...resumeData, skills });
  };

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 'personal':
        return <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} />;
      case 'experience':
        return <ExperienceForm data={resumeData.workExperience} onChange={updateWorkExperience} />;
      case 'education':
        return <EducationForm data={resumeData.education} onChange={updateEducation} />;
      case 'skills':
        return <SkillsForm data={resumeData.skills} onChange={updateSkills} />;
      case 'templates':
        return <TemplateSelector selectedTemplate={selectedTemplate} onTemplateChange={setSelectedTemplate} />;
      default:
        return <PersonalInfoForm data={resumeData.personalInfo} onChange={updatePersonalInfo} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        currentStep={currentStep} 
        onStepChange={setCurrentStep}
        onExportPDF={handleExportPDF}
      />
      
      <div className="flex flex-1">
        {/* Form Panel */}
        <div className="w-1/2 p-8 overflow-auto">
          <div className="max-w-2xl">
            {renderCurrentForm()}
          </div>
        </div>

        {/* Preview Panel */}
        <PreviewPanel data={resumeData} template={selectedTemplate} />
      </div>
    </div>
  );
}

export default App;