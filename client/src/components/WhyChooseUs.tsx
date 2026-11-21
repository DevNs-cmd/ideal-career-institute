import React from 'react';
import { Trophy, GraduationCap, Coins, School, ArrowUpRight } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: 'Award Winners',
      description: 'Our institute is proud to have produced several award-winning students who have excelled in various academic and competitive exams.',
      icon: Trophy,
      badge: 'Proven Merit',
      accentColor: 'from-amber-500/10 to-amber-500/5',
      borderColor: 'border-amber-200/80',
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-100'
    },
    {
      title: 'Expert Faculties',
      description: 'Our faculties are experts in their respective fields, providing quality education and personalized guidance to ensure student success.',
      icon: GraduationCap,
      badge: 'Academic Mentors',
      accentColor: 'from-blue-500/10 to-blue-500/5',
      borderColor: 'border-blue-200/80',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      title: 'Affordable Coaching',
      description: 'We offer high-quality coaching at affordable prices, making education accessible to students from all financial backgrounds.',
      icon: Coins,
      badge: 'Fair & Transparent',
      accentColor: 'from-emerald-500/10 to-emerald-500/5',
      borderColor: 'border-emerald-200/80',
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100'
    },
    {
      title: 'Best Facilities',
      description: 'Our institute is equipped with modern facilities, providing a conducive learning environment for all students.',
      icon: School,
      badge: 'Air-Conditioned',
      accentColor: 'from-red-500/10 to-red-500/5',
      borderColor: 'border-red-200/80',
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 block mb-2">
            Why Ideal Career Institute
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            <span className="font-sans-modern font-black">Building Strong Foundations for </span>
            <span className="font-editorial font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 pr-1">
              Lifetime Academic Success
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Discover why students and parents across Delhi have entrusted their academic futures to Ideal Career Institute since 1999.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative p-8 rounded-2xl border ${item.borderColor} bg-gradient-to-b ${item.accentColor} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-white/80 px-2.5 py-1 rounded-full border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center gap-1 text-xs font-bold text-slate-700 group-hover:text-red-600 transition-colors">
                  <span>Learn more</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
