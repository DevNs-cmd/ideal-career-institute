import React, { useState, useMemo } from 'react';
import { Search, BookOpen, ArrowRight, MessageCircle, CheckCircle, GraduationCap, Laptop, Target, Award, Compass, Briefcase, Shield, Atom, TrendingUp, Landmark, Sparkles } from 'lucide-react';
import { Course } from '../lib/api';
import { INITIAL_COURSES } from '../lib/initialData';

interface CoursesDiscoveryProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onOpenEnquiry: (courseId?: number) => void;
}

export const CoursesDiscovery: React.FC<CoursesDiscoveryProps> = ({
  courses,
  onSelectCourse,
  onOpenEnquiry
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const effectiveCourses = (courses && courses.length > 0) ? courses : INITIAL_COURSES;

  const categories = [
    'All',
    'School Education',
    'Skill Development',
    'Competitive Examinations'
  ];

  // Helper to render icon for course
  const renderCourseIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Atom': return <Atom className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Landmark': return <Landmark className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Laptop': return <Laptop className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Target': return <Target className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Shield': return <Shield className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Award': return <Award className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'Compass': return <Compass className="w-5 h-5 sm:w-6 sm:h-6" />;
      default: return <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  const filteredCourses = useMemo(() => {
    return effectiveCourses.filter((course) => {
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [effectiveCourses, selectedCategory, searchQuery]);

  return (
    <section id="courses" className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/60 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full ios-glass-pill text-red-600 text-xs font-bold tracking-wider uppercase mb-3 shadow-xs border border-red-100">
            <Sparkles className="w-3.5 h-3.5" /> Academic Offerings
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-outfit">
            Comprehensive <span className="text-red-600">Course Programs</span>
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            From foundational school education to premier competitive entrances and digital skills, find the right curriculum to achieve your highest potential.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 w-full">
          {/* Category Tabs - Apple Segmented Glass Bar */}
          <div className="flex overflow-x-auto items-center gap-1 sm:gap-1.5 p-1.5 bg-slate-200/70 backdrop-blur-md rounded-2xl w-full md:w-auto max-w-full pb-2 sm:pb-1.5 border border-white/60 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 cursor-pointer ${selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-md scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box - Frosted Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses or exams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-base sm:text-sm bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/80 focus:bg-white shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-2xl hover:border-red-500/30 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 sm:p-7">
                {/* Category Pill & Icon */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-50 to-rose-100/70 text-red-600 flex items-center justify-center shadow-xs group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    {renderCourseIcon(course.icon)}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100/90 px-3 py-1 rounded-full border border-slate-200/70">
                    {course.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3 font-normal">
                  {course.short_description}
                </p>

                {/* Bullet Highlights Preview */}
                {course.highlights && course.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    {course.highlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectCourse(course)}
                  className="text-xs font-bold text-slate-700 hover:text-red-600 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Details & Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {/* WhatsApp Quick Query */}
                  <a
                    href={`https://wa.me/917011667297?text=${encodeURIComponent(
                      `Hello Ideal Career Institute, I am interested in your ${course.title} course. Please share admission details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors border border-emerald-200/80 bg-white"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  {/* Primary Enquiry CTA */}
                  <button
                    onClick={() => onOpenEnquiry(course.id)}
                    className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State if search yields no results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto shadow-sm">
            <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching courses found</h3>
            <p className="text-sm text-slate-500 mt-1 mb-5">
              Try adjusting your search query or select another category tab above.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
