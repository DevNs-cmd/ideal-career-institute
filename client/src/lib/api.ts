/**
 * API Client for Ideal Career Institute
 */

const API_BASE = '/api';

export interface Course {
  id: number;
  slug: string;
  title: string;
  category: string;
  target_audience: string;
  short_description: string;
  full_description: string;
  eligibility: string;
  duration: string;
  highlights: string[];
  icon: string;
  is_published: number;
  order_index: number;
}

export interface Faculty {
  id: number;
  name: string;
  designation: string;
  subjects: string;
  bio: string;
  image_url: string;
  linkedin_url?: string;
  twitter_url?: string;
  is_published: number;
  order_index: number;
}

export interface Topper {
  id: number;
  student_name: string;
  exam_or_class: string;
  score_or_rank: string;
  year: string;
  image_url: string;
  is_published: number;
  order_index: number;
}

export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  timings: string;
  map_url?: string;
  is_active: number;
  is_verified: number;
}

export interface Testimonial {
  id: number;
  author_name: string;
  author_relation: string;
  quote: string;
  rating: number;
  is_published: number;
  created_at: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  description?: string;
}

export interface Lead {
  id: number;
  enquiry_id: string;
  student_name: string;
  phone: string;
  email?: string;
  current_class?: string;
  course_id?: number;
  course_title?: string;
  branch_id?: number;
  branch_name?: string;
  contact_method: string;
  message?: string;
  status: string;
  source: string;
  counsellor_id?: number;
  counsellor_name?: string;
  next_followup_date?: string;
  is_demo: number;
  created_at: string;
  updated_at: string;
}

export interface LeadNote {
  id: number;
  enquiry_id: number;
  author_name: string;
  note: string;
  created_at: string;
}

export interface FollowUp {
  id: number;
  enquiry_id: number;
  counsellor_id?: number;
  counsellor_name?: string;
  scheduled_date: string;
  notes?: string;
  status: string;
  completed_at?: string;
  created_at: string;
}

export interface AnalyticsData {
  summary: {
    totalLeads: number;
    newLeads: number;
    contactedLeads: number;
    followUpPending: number;
    interestedLeads: number;
    scheduledLeads: number;
    confirmedAdmissions: number;
    closedOrNotInterested: number;
    conversionRate: number;
    pendingFollowUps: number;
    overdueFollowUps: number;
  };
  statusDistribution: { status: string; count: number }[];
  courseDistribution: { course_name: string; count: number }[];
  branchDistribution: { branch_name: string; count: number }[];
  recentTrend: { date: string; count: number }[];
}

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('ici_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Public
  async getSettings(): Promise<Record<string, string>> {
    const res = await fetch(`${API_BASE}/settings`);
    const data = await res.json();
    return data.settings || {};
  },

  async getCourses(category?: string): Promise<Course[]> {
    const url = category ? `${API_BASE}/courses?category=${encodeURIComponent(category)}` : `${API_BASE}/courses`;
    const res = await fetch(url);
    const data = await res.json();
    return data.courses || [];
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    const res = await fetch(`${API_BASE}/courses/${slug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.course || null;
  },

  async getFaculty(): Promise<Faculty[]> {
    const res = await fetch(`${API_BASE}/faculty`);
    const data = await res.json();
    return data.faculty || [];
  },

  async getToppers(): Promise<Topper[]> {
    const res = await fetch(`${API_BASE}/toppers`);
    const data = await res.json();
    return data.toppers || [];
  },

  async getBranches(): Promise<Branch[]> {
    const res = await fetch(`${API_BASE}/branches`);
    const data = await res.json();
    return data.branches || [];
  },

  async getTestimonials(): Promise<Testimonial[]> {
    const res = await fetch(`${API_BASE}/testimonials`);
    const data = await res.json();
    return data.testimonials || [];
  },

  async getGallery(category?: string): Promise<GalleryItem[]> {
    const url = category ? `${API_BASE}/gallery?category=${encodeURIComponent(category)}` : `${API_BASE}/gallery`;
    const res = await fetch(url);
    const data = await res.json();
    return data.gallery || [];
  },

  async submitEnquiry(payload: {
    student_name: string;
    phone: string;
    email?: string;
    current_class?: string;
    course_id?: number;
    branch_id?: number;
    contact_method?: string;
    message?: string;
  }): Promise<{ success: boolean; enquiry_id: string; message: string; whatsapp_link: string }> {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Submission failed');
    }
    return data;
  },

  // Auth
  async login(username: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  },

  // Admin Leads CRM
  async getLeads(filters: Record<string, any> = {}): Promise<{ enquiries: Lead[]; total: number }> {
    const query = new URLSearchParams();
    for (const [k, v] of Object.entries(filters)) {
      if (v !== undefined && v !== '' && v !== null) query.append(k, String(v));
    }
    const res = await fetch(`${API_BASE}/enquiries?${query.toString()}`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to load leads');
    return res.json();
  },

  async getLeadDetails(id: number | string): Promise<{ lead: Lead; notes: LeadNote[]; followUps: FollowUp[] }> {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to load lead details');
    return res.json();
  },

  async updateLeadStatus(id: number, status: string, note?: string) {
    const res = await fetch(`${API_BASE}/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  async assignCounsellor(id: number, counsellor_id: number | null) {
    const res = await fetch(`${API_BASE}/enquiries/${id}/assign`, {
      method: 'PATCH',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ counsellor_id })
    });
    if (!res.ok) throw new Error('Failed to assign counsellor');
    return res.json();
  },

  async addLeadNote(id: number, note: string) {
    const res = await fetch(`${API_BASE}/enquiries/${id}/notes`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ note })
    });
    if (!res.ok) throw new Error('Failed to add note');
    return res.json();
  },

  async scheduleFollowUp(id: number, scheduled_date: string, notes?: string, counsellor_id?: number) {
    const res = await fetch(`${API_BASE}/enquiries/${id}/followups`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ scheduled_date, notes, counsellor_id })
    });
    if (!res.ok) throw new Error('Failed to schedule follow-up');
    return res.json();
  },

  // Admin Analytics
  async getAnalytics(startDate?: string, endDate?: string, includeDemo: boolean = true): Promise<AnalyticsData> {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    params.append('include_demo', includeDemo ? 'true' : 'false');

    const res = await fetch(`${API_BASE}/analytics?${params.toString()}`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to load analytics');
    return res.json();
  },

  // Admin CMS & Settings
  async updateSettings(settings: Record<string, string>) {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
  },

  async getAuditLogs() {
    const res = await fetch(`${API_BASE}/settings/audit-logs`, {
      headers: getAuthHeader()
    });
    return res.json();
  },

  async getNotifications() {
    const res = await fetch(`${API_BASE}/settings/notifications`, {
      headers: getAuthHeader()
    });
    return res.json();
  },

  async markNotificationsRead() {
    return fetch(`${API_BASE}/settings/notifications/mark-read`, {
      method: 'PATCH',
      headers: getAuthHeader()
    });
  },

  // Demo Journey
  async seedDemoData() {
    const res = await fetch(`${API_BASE}/demo/seed`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    return res.json();
  },

  async resetDemoData() {
    const res = await fetch(`${API_BASE}/demo/reset`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    return res.json();
  }
};
