import React, { useEffect, useState, useRef } from 'react';
import { Calendar, Award, GraduationCap, HeartHandshake } from 'lucide-react';

interface StatsProps {
  stats?: {
    established?: string;
    toppers?: string;
    students?: string;
    parents?: string;
  };
}

export const CredibilityStats: React.FC<StatsProps> = ({ stats }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const statItems = [
    {
      label: 'Established Year',
      value: stats?.established || '1999',
      subtext: 'Over 25 years of educational commitment',
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Verified Toppers',
      value: stats?.toppers || '333',
      suffix: '+',
      subtext: 'Consistent top ranks in boards & entrance',
      icon: Award,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      label: 'Happy Students',
      value: stats?.students || '1000',
      suffix: '+',
      subtext: 'Nurtured across school and competitive courses',
      icon: GraduationCap,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      label: 'Satisfied Parents',
      value: stats?.parents || '500',
      suffix: '+',
      subtext: 'Trusting our mentorship and discipline',
      icon: HeartHandshake,
      color: 'text-red-600',
      bg: 'bg-red-50'
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 bg-white border-y border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-3 shadow-xs`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                  {item.value}{item.suffix || ''}
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  {item.label}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                  {item.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
