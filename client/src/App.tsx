import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { api, Course, Faculty, Topper, Branch, GalleryItem, Testimonial } from './lib/api';
import {
  INITIAL_COURSES,
  INITIAL_GALLERY,
  INITIAL_FACULTY,
  INITIAL_TOPPERS,
  INITIAL_BRANCHES,
  INITIAL_SETTINGS
} from './lib/initialData';

// Public Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CredibilityStats } from './components/CredibilityStats';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { EducationalExcellence } from './components/EducationalExcellence';
import { ToppersSection } from './components/ToppersSection';
import { CoursesDiscovery } from './components/CoursesDiscovery';
import { FacultySection } from './components/FacultySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingContactBar } from './components/FloatingContactBar';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { EnquiryModal } from './components/EnquiryModal';
import { CourseDetailModal } from './components/CourseDetailModal';
import { LegalModal } from './components/LegalModal';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLeads } from './components/admin/AdminLeads';
import { AdminFollowups } from './components/admin/AdminFollowups';
import { AdminCourses } from './components/admin/AdminCourses';
import { AdminFaculty } from './components/admin/AdminFaculty';
import { AdminToppers } from './components/admin/AdminToppers';
import { AdminBranches } from './components/admin/AdminBranches';
import { AdminCMS } from './components/admin/AdminCMS';
import { AdminDemo } from './components/admin/AdminDemo';
import { AdminAudit } from './components/admin/AdminAudit';

const MainApp: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  // View mode: 'public' | 'admin'
  const [viewMode, setViewMode] = useState<'public' | 'admin'>(() => {
    return window.location.pathname.startsWith('/admin') || window.location.hash.includes('admin')
      ? 'admin'
      : 'public';
  });

  const [adminTab, setAdminTab] = useState<string>('overview');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Data states with guaranteed instant institutional defaults
  const [settings, setSettings] = useState<Record<string, string>>(INITIAL_SETTINGS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [faculty, setFaculty] = useState<Faculty[]>(INITIAL_FACULTY);
  const [toppers, setToppers] = useState<Topper[]>(INITIAL_TOPPERS);
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Modals state
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryCourseId, setEnquiryCourseId] = useState<number | undefined>(undefined);
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Sync browser URL hash with view mode
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('admin')) {
        setViewMode('admin');
      } else {
        setViewMode('public');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const loadInitialData = async () => {
    try {
      const results = await Promise.allSettled([
        api.getSettings(),
        api.getCourses(),
        api.getFaculty(),
        api.getToppers(),
        api.getBranches(),
        api.getGallery(),
        api.getTestimonials()
      ]);

      if (results[0].status === 'fulfilled' && Object.keys(results[0].value).length > 0) setSettings(results[0].value);
      if (results[1].status === 'fulfilled' && results[1].value?.length > 0) setCourses(results[1].value);
      if (results[2].status === 'fulfilled' && results[2].value?.length > 0) setFaculty(results[2].value);
      if (results[3].status === 'fulfilled' && results[3].value?.length > 0) setToppers(results[3].value);
      if (results[4].status === 'fulfilled' && results[4].value?.length > 0) setBranches(results[4].value);
      if (results[5].status === 'fulfilled' && results[5].value?.length > 0) setGallery(results[5].value);
      if (results[6].status === 'fulfilled') setTestimonials(results[6].value || []);
    } catch (err) {
      console.warn('Initial data sync notice:', err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    setViewMode('public');
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenEnquiry = (courseId?: number) => {
    setEnquiryCourseId(courseId);
    setIsEnquiryModalOpen(true);
  };

  const handleFormSubmit = async (payload: any) => {
    return await api.submitEnquiry(payload);
  };

  // If in Admin Mode
  if (viewMode === 'admin') {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onBackToWebsite={() => {
            window.location.hash = '';
            setViewMode('public');
          }}
        />
      );
    }

    return (
      <AdminLayout
        currentTab={adminTab}
        onSelectTab={setAdminTab}
        onViewWebsite={() => {
          window.location.hash = '';
          setViewMode('public');
        }}
      >
        {adminTab === 'overview' && (
          <AdminDashboard
            onNavigateToLeads={(status) => {
              setAdminTab('leads');
            }}
            onNavigateToDemo={() => setAdminTab('demo')}
          />
        )}
        {adminTab === 'leads' && (
          <AdminLeads courses={courses} branches={branches} />
        )}
        {adminTab === 'followups' && <AdminFollowups />}
        {adminTab === 'courses' && <AdminCourses courses={courses} onRefresh={loadInitialData} />}
        {adminTab === 'faculty' && <AdminFaculty faculty={faculty} onRefresh={loadInitialData} />}
        {adminTab === 'toppers' && <AdminToppers toppers={toppers} onRefresh={loadInitialData} />}
        {adminTab === 'branches' && <AdminBranches />}
        {adminTab === 'cms' && <AdminCMS />}
        {adminTab === 'demo' && (
          <AdminDemo
            onNavigateToLeads={() => setAdminTab('leads')}
            onNavigateToOverview={() => setAdminTab('overview')}
          />
        )}
        {adminTab === 'audit' && <AdminAudit />}
      </AdminLayout>
    );
  }

  // Public Institutional Website
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-red-500 selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar
        onOpenEnquiry={handleOpenEnquiry}
        onNavigateToSection={handleNavigateToSection}
        activeSection={activeSection}
        onOpenAdmin={() => {
          window.location.hash = 'admin';
          setViewMode('admin');
        }}
      />

      {/* Main Public Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenEnquiry={handleOpenEnquiry}
          onExploreCourses={() => handleNavigateToSection('courses')}
        />

        {/* 2. Institutional Credibility Section */}
        <CredibilityStats
          stats={{
            established: settings.established_year,
            toppers: settings.stats_toppers,
            students: settings.stats_students,
            parents: settings.stats_parents
          }}
        />

        {/* 3. About the Institute */}
        <AboutSection />

        {/* 4. Why Choose Us (4 Feature Cards) */}
        <WhyChooseUs />

        {/* 5. Educational Excellence & Methodology */}
        <EducationalExcellence />

        {/* 6. Our Toppers (All 15 authentic photographs) */}
        <ToppersSection toppers={toppers} />

        {/* 7. Comprehensive Course Discovery (11 courses) */}
        <CoursesDiscovery
          courses={courses}
          onSelectCourse={(course) => setSelectedCourseForDetail(course)}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* 8. Founder & Faculty Leadership Section */}
        <FacultySection faculty={faculty} />

        {/* 9. Verified Testimonials & Student Voices */}
        <TestimonialsSection
          testimonials={testimonials}
          onOpenEnquiry={() => handleOpenEnquiry()}
        />

        {/* 10. Campus Photo Gallery */}
        <GallerySection gallery={gallery} />

        {/* 11. FAQ Accordion */}
        <FAQSection />

        {/* 12. Contact & Admission Desk Section */}
        <ContactSection
          branches={branches}
          courses={courses}
          onSubmitEnquiry={handleFormSubmit}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateToSection={handleNavigateToSection}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenAdmin={() => {
          window.location.hash = 'admin';
          setViewMode('admin');
        }}
      />

      {/* Floating Elements */}
      <FloatingContactBar onOpenEnquiry={() => handleOpenEnquiry()} />
      <WhatsAppFloatingButton />

      {/* Modals */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        courses={courses}
        branches={branches}
        initialCourseId={enquiryCourseId}
        onSubmit={handleFormSubmit}
      />

      <CourseDetailModal
        course={selectedCourseForDetail}
        onClose={() => setSelectedCourseForDetail(null)}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
