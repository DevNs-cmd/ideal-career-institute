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

const AnimatedCounter: React.FC<{
  target: number;
  duration?: number;
  isVisible: boolean;
}> = ({ target, duration = 1500, isVisible }) => {
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const startVal = 1;
    const endVal = target;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fast start with smooth cubic deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startVal + (endVal - startVal) * easeOut);
      setCount((prev) => (prev !== current ? current : prev));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(endVal);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, target, duration]);

  return <>{count}</>;
};

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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const statItems = [
    {
      label: 'Established Year',
      target: parseInt(stats?.established || '1999', 10) || 1999,
      duration: 1600,
      subtext: 'Over 25 years of educational commitment',
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Verified Toppers',
      target: parseInt(stats?.toppers || '333', 10) || 333,
      suffix: '+',
      duration: 1300,
      subtext: 'Consistent top ranks in boards & entrance',
      icon: Award,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      label: 'Happy Students',
      target: parseInt(stats?.students || '1000', 10) || 1000,
      suffix: '+',
      duration: 1500,
      subtext: 'Nurtured across school and competitive courses',
      icon: GraduationCap,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      label: 'Satisfied Parents',
      target: parseInt(stats?.parents || '500', 10) || 500,
      suffix: '+',
      duration: 1400,
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
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-outfit group-hover:text-red-600 transition-colors tabular-nums">
                  <AnimatedCounter target={item.target} duration={item.duration} isVisible={isVisible} />
                  {item.suffix || ''}
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
