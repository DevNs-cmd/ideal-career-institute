import React from 'react';
import { GraduationCap, Award, Plus, CheckCircle2 } from 'lucide-react';
import { Faculty } from '../../lib/api';

interface AdminFacultyProps {
  faculty: Faculty[];
  onRefresh: () => void;
}

export const AdminFaculty: React.FC<AdminFacultyProps> = ({ faculty }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
            Faculty & Leadership
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Faculty Roster Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain authentic institutional educator profiles, subject assignments, and qualifications.
          </p>
        </div>

        <div className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-800">
          {faculty.length} Verified Profiles
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-16/9 w-full bg-slate-100 overflow-hidden relative">
                <img
                  src={f.image_url}
                  alt={f.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white rounded text-[10px] font-bold">
                  Order #{f.order_index}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">{f.name}</h3>
                <span className="text-xs font-bold text-red-600 block mb-2">{f.designation}</span>
                <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                  Subjects: {f.subjects}
                </span>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {f.bio}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Active & Displayed on Website</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
