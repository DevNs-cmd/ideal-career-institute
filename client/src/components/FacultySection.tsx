import React from 'react';
import { Award, Sparkles, GraduationCap } from 'lucide-react';
import { Faculty } from '../lib/api';
import { LinkedInIcon, TwitterIcon } from './SocialIcons';

interface FacultySectionProps {
  faculty: Faculty[];
}

export const FacultySection: React.FC<FacultySectionProps> = ({ faculty }) => {
  // Founder is typically order_index = 1 or Mr. Vibhor Gupta
  const founder = faculty.find((f) => f.name.includes('Vibhor')) || faculty[0];
  const teachingStaff = faculty.filter((f) => f.id !== founder?.id);

  return (
    <section id="faculty" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Academic Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Founder & <span className="text-red-600">Expert Educators</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Guided by decades of dedicated teaching experience, subject matter mastery, and a relentless commitment to each student's growth.
          </p>
        </div>

        {/* Founder Editorial Showcase Card */}
        {founder && (
          <div className="mb-16 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-700/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Founder Image */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-56 sm:w-64 aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-800">
                  <img
                    src={founder.image_url}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 text-center">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                      Founder's Vision
                    </span>
                  </div>
                </div>
              </div>

              {/* Founder Narrative */}
              <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase border border-red-500/30">
                  <Award className="w-3.5 h-3.5" /> Institutional Visionary
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                  {founder.name}
                </h3>
                <div className="text-amber-400 font-semibold text-base">
                  {founder.designation}
                </div>

                <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  <p>
                    In a humble beginning, the owner of our institute started his journey in a small, single-room setup. With a passion for education and a vision for growth, he began teaching students on the floor, driven by a deep commitment to providing quality education.
                  </p>
                  <p>
                    Despite the modest start, his dedication and innovative teaching methods soon garnered attention, and the institute began to thrive. Today, his vision has transformed into a reality that surpasses expectations. With two branches that boast fully air-conditioned classrooms, students are provided with a comfortable and conducive learning environment.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-3 items-center justify-center lg:justify-start">
                  <span className="text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-slate-200">
                    Teaching Floor-to-Branch Legacy
                  </span>
                  <span className="text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-slate-200">
                    25+ Years Mentoring Students
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Faculty Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              Department Faculty & Mentors
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Experienced subject matter specialists fostering conceptual clarity and high test performance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
            {teachingStaff.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={fac.image_url}
                    alt={fac.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                    <div className="text-white">
                      <span className="text-xs font-semibold text-amber-300 block">
                        {fac.designation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {fac.name}
                    </h4>
                    <span className="text-xs font-bold text-red-600 block mt-1">
                      {fac.subjects}
                    </span>
                    <p className="text-sm text-slate-600 leading-relaxed mt-3">
                      {fac.bio}
                    </p>
                  </div>

                  {/* Social Links if present */}
                  {(fac.linkedin_url || fac.twitter_url) && (
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                      {fac.linkedin_url && (
                        <a
                          href={fac.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors text-xs"
                          title="LinkedIn Profile"
                        >
                          <LinkedInIcon className="w-4 h-4" />
                        </a>
                      )}
                      {fac.twitter_url && (
                        <a
                          href={fac.twitter_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center transition-colors text-xs"
                          title="Social Profile"
                        >
                          <TwitterIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
