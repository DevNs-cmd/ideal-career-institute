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
    <section ref={sectionRef} className="py-10 sm:py-14 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 sm:p-6 rounded-2xl sm:rounded-3xl ios-glass hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/80 shadow-xs group cursor-default"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-3 shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-outfit group-hover:text-red-600 transition-colors">
                  {item.value}{item.suffix || ''}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                  {item.label}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
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
