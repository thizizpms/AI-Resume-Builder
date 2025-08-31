import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div id="resume-preview" className="bg-white w-full max-w-4xl mx-auto shadow-lg min-h-screen font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap items-center gap-4 text-blue-100">
          {data.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={16} />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-600 pb-2">Professional Summary</h2>
            <p className="text-slate-700 leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-600 pb-2">Work Experience</h2>
            <div className="space-y-6">
              {data.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      <p className="text-slate-600">{exp.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-600 font-medium">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
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
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-600 pb-2">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{edu.degree} in {edu.field}</h3>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    <p className="text-slate-600">{edu.location}</p>
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
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-600 pb-2">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(
                data.skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, Skill[]>)
              ).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">{category}</h3>
                  <div className="space-y-2">
                    {skills.map(skill => (
                      <div key={skill.id} className="flex justify-between items-center">
                        <span className="text-slate-700">{skill.name}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                          skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                          skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}