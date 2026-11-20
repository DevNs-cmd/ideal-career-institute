import React, { useState } from 'react';
import { BookOpen, Plus, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { Course } from '../../lib/api';

interface AdminCoursesProps {
  courses: Course[];
  onRefresh: () => void;
}

export const AdminCourses: React.FC<AdminCoursesProps> = ({ courses, onRefresh }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-0.5">
            Curriculum Administration
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Course Catalog Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage course descriptions, syllabus highlights, target audience, and admission requirements.
          </p>
        </div>

        <div className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-800">
          {courses.length} Active Courses
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  #{course.order_index}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{course.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {course.short_description}
              </p>

              {course.duration && (
                <div className="mt-3 text-[11px] font-semibold text-slate-500">
                  Duration: <span className="text-slate-800">{course.duration}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 font-bold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> Published
              </span>
              <span className="text-slate-400 font-mono text-[11px]">{course.slug}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
