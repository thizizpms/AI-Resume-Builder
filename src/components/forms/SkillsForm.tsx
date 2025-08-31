import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Skill } from '../../types/resume';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

const skillLevels: Skill['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const skillCategories = ['Programming', 'Design', 'Management', 'Communication', 'Other'];

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate' as Skill['level'], category: 'Programming' });

  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name.trim(),
      level: newSkill.level,
      category: newSkill.category,
    };
    
    onChange([...data, skill]);
    setNewSkill({ name: '', level: 'Intermediate', category: 'Programming' });
  };

  const removeSkill = (id: string) => {
    onChange(data.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onChange(data.map(skill => skill.id === id ? { ...skill, [field]: value } : skill));
  };

  const groupedSkills = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Skills</h2>
      </div>

      <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Add New Skill</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Skill Name</label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="React, JavaScript, Project Management..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Level</label>
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as Skill['level'] })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {skillLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {skillCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={addSkill}
          disabled={!newSkill.name.trim()}
          className="mt-4 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Plus size={16} />
          <span>Add Skill</span>
        </button>
      </div>

      {Object.keys(groupedSkills).map(category => (
        <div key={category} className="bg-white p-6 border border-slate-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">{category}</h3>
          
          <div className="space-y-3">
            {groupedSkills[category].map(skill => (
              <div key={skill.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-slate-800">{skill.name}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                    skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                    skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {skill.level}
                  </span>
                </div>
                
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
          <p className="text-slate-500 mb-4">No skills added yet</p>
          <p className="text-sm text-slate-400">Use the form above to add your first skill</p>
        </div>
      )}
    </div>
  );
}