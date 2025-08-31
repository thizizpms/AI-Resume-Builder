import React from 'react';
import { ResumeData } from '../../types/resume';

interface MinimalTemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    return `${month}/${year}`;
  };

  return (
    <div id="resume-preview" className="bg-white w-full max-w-4xl mx-auto shadow-lg min-h-screen p-12 font-light">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-light text-slate-900 mb-4">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-slate-600 space-y-1 text-sm">
          <div className="flex flex-wrap gap-4">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
          <div className="flex flex-wrap gap-4">
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          </div>
        </div>
        {data.personalInfo.summary && (
          <p className="text-slate-700 mt-6 leading-relaxed">{data.personalInfo.summary}</p>
        )}
      </div>

      {/* Experience */}
      {data.workExperience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-light text-slate-900 mb-6 tracking-wider">EXPERIENCE</h2>
          <div className="space-y-8">
            {data.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">{exp.position}</h3>
                    <p className="text-slate-700">{exp.company} • {exp.location}</p>
                  </div>
                  <p className="text-slate-600 text-sm">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
                <div className="space-y-1 text-slate-700">
                  {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                    <p key={index} className="text-sm leading-relaxed">• {desc}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-light text-slate-900 mb-6 tracking-wider">EDUCATION</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-slate-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-slate-700">{edu.institution} • {edu.location}</p>
                  {edu.gpa && <p className="text-slate-600 text-sm">GPA: {edu.gpa}</p>}
                </div>
                <p className="text-slate-600 text-sm">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-light text-slate-900 mb-6 tracking-wider">SKILLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(
              data.skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, typeof data.skills>)
            ).map(([category, skills]) => (
              <div key={category}>
                <h3 className="font-medium text-slate-800 mb-2">{category}</h3>
                <p className="text-slate-700 text-sm">
                  {skills.map(skill => skill.name).join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}