import React, { useState, useEffect } from 'react';
import { Building, MapPin, Phone, Clock, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { api, Branch } from '../../lib/api';

export const AdminBranches: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      // Fetch all branches including drafts
      const token = localStorage.getItem('ici_admin_token');
      const res = await fetch('/api/branches/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setBranches(data.branches || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-0.5">
            Campus Infrastructure
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Branch & Location Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ideal Career Institute operates two air-conditioned branches. Only verified addresses are shown publicly.
          </p>
        </div>

        <div className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-800">
          2-Branch Architecture
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((b) => (
          <div
            key={b.id}
            className={`p-6 rounded-2xl border shadow-xs flex flex-col justify-between space-y-5 ${
              b.is_verified === 1
                ? 'bg-white border-slate-200'
                : 'bg-amber-50/40 border-amber-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Campus #{b.id}
                </span>
                {b.is_verified === 1 ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified & Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    <AlertCircle className="w-3.5 h-3.5" /> Address Verification in Progress
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{b.name}</h3>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{b.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-slate-800">{b.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="font-medium text-slate-800">{b.timings}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/60 text-xs text-slate-500">
              {b.is_verified === 1 ? (
                <p>Publicly live on homepage, navigation, and admission forms.</p>
              ) : (
                <p className="text-amber-800">
                  Hidden from public visitors until management approves and confirms the exact second branch address.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
