import React from 'react';
import { ResumeData } from '../../types/resume';

interface ClassicTemplateProps {
  data: ResumeData;
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div id="resume-preview" className="bg-white w-full max-w-4xl mx-auto shadow-lg min-h-screen p-8 font-serif">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-slate-300">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-slate-600 space-y-1">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
          {data.personalInfo.website && <p>{data.personalInfo.website}</p>}
          {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">Objective</h2>
          <p className="text-slate-700 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.workExperience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-wide">Professional Experience</h2>
          <div className="space-y-6">
            {data.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                    <p className="text-slate-700 font-medium">{exp.company}, {exp.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-600 font-medium">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-wide">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-slate-700 font-medium">{edu.institution}, {edu.location}</p>
                  {edu.gpa && <p className="text-slate-600">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right">
                  <p className="text-slate-600 font-medium">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-wide">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(
              data.skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, typeof data.skills>)
            ).map(([category, skills]) => (
              <div key={category}>
                <h3 className="font-bold text-slate-800 mb-2">{category}:</h3>
                <p className="text-slate-700">
                  {skills.map(skill => skill.name).join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}