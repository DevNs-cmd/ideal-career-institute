import React from 'react';
import { Award, Plus, CheckCircle2 } from 'lucide-react';
import { Topper } from '../../lib/api';

interface AdminToppersProps {
  toppers: Topper[];
  onRefresh: () => void;
}

export const AdminToppers: React.FC<AdminToppersProps> = ({ toppers }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-0.5">
            Results Archive
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Toppers & Results Gallery Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Displaying all 15 authentic institute topper portraits and verified student records.
          </p>
        </div>

        <div className="px-4 py-2 bg-amber-50 rounded-xl text-xs font-bold text-amber-900 border border-amber-200">
          {toppers.length} Documented Toppers
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {toppers.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div className="aspect-square bg-slate-100 p-3 flex items-center justify-center">
              <img
                src={t.image_url}
                alt={t.student_name}
                className="max-h-full max-w-full object-contain filter drop-shadow"
              />
            </div>

            <div className="p-3 text-center border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{t.student_name}</h4>
              <span className="text-[10px] text-slate-500 block line-clamp-1">{t.exam_or_class}</span>
              <span className="text-[10px] text-red-600 font-bold block">{t.score_or_rank}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
