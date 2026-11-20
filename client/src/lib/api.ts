/**
 * API Client for Ideal Career Institute
 */

function getApiBase(): string {
  if (typeof window !== 'undefined') {
    // If accessing on port 5000 directly
    if (window.location.port === '5000') {
      return '/api';
    }
    // If accessing via Vite dev server on localhost (e.g. 5173, 3000)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return `http://${window.location.hostname}:5000/api`;
    }
  }
  return '/api';
}

const API_BASE = getApiBase();

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

async function safeFetchJson(url: string, options: RequestInit = {}): Promise<any> {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || `Request failed with status ${res.status}`);
      }
      return data;
    } else {
      const text = await res.text();
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      return text;
    }
  } catch (err: any) {
    // If relative /api failed due to dev server port mismatch, fallback to explicit localhost:5000
    if (url.startsWith('/api') && typeof window !== 'undefined' && window.location.port !== '5000') {
      const fallbackUrl = `http://${window.location.hostname}:5000${url}`;
      const res = await fetch(fallbackUrl, options);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Request failed');
      }
      return data;
    }
    throw err;
  }
}

export const api = {
  // Public
  async getSettings(): Promise<Record<string, string>> {
    const data = await safeFetchJson(`${API_BASE}/settings`);
    return data.settings || {};
  },

  async getCourses(category?: string): Promise<Course[]> {
    const url = category ? `${API_BASE}/courses?category=${encodeURIComponent(category)}` : `${API_BASE}/courses`;
    const data = await safeFetchJson(url);
    return data.courses || [];
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    try {
      const data = await safeFetchJson(`${API_BASE}/courses/${slug}`);
      return data.course || null;
    } catch {
      return null;
    }
  },

  async getFaculty(): Promise<Faculty[]> {
    const data = await safeFetchJson(`${API_BASE}/faculty`);
    return data.faculty || [];
  },

  async getToppers(): Promise<Topper[]> {
    const data = await safeFetchJson(`${API_BASE}/toppers`);
    return data.toppers || [];
  },

  async getBranches(): Promise<Branch[]> {
    const data = await safeFetchJson(`${API_BASE}/branches`);
    return data.branches || [];
  },

  async getTestimonials(): Promise<Testimonial[]> {
    const data = await safeFetchJson(`${API_BASE}/testimonials`);
    return data.testimonials || [];
  },

  async getGallery(category?: string): Promise<GalleryItem[]> {
    const url = category ? `${API_BASE}/gallery?category=${encodeURIComponent(category)}` : `${API_BASE}/gallery`;
    const data = await safeFetchJson(url);
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
    return safeFetchJson(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  },

  // Auth
  async login(username: string, password: string) {
    return safeFetchJson(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  },

  async getMe() {
    return safeFetchJson(`${API_BASE}/auth/me`, {
      headers: getAuthHeader()
    });
  },

  // Admin Leads CRM
  async getLeads(filters: Record<string, any> = {}): Promise<{ enquiries: Lead[]; total: number }> {
    const query = new URLSearchParams();
    for (const [k, v] of Object.entries(filters)) {
      if (v !== undefined && v !== '' && v !== null) query.append(k, String(v));
    }
    return safeFetchJson(`${API_BASE}/enquiries?${query.toString()}`, {
      headers: getAuthHeader()
    });
  },

  async getLeadDetails(id: number | string): Promise<{ lead: Lead; notes: LeadNote[]; followUps: FollowUp[] }> {
    return safeFetchJson(`${API_BASE}/enquiries/${id}`, {
      headers: getAuthHeader()
    });
  },

  async updateLeadStatus(id: number, status: string, note?: string) {
    return safeFetchJson(`${API_BASE}/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note })
    });
  },

  async assignCounsellor(id: number, counsellor_id: number | null) {
    return safeFetchJson(`${API_BASE}/enquiries/${id}/assign`, {
      method: 'PATCH',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ counsellor_id })
    });
  },

  async addLeadNote(id: number, note: string) {
    return safeFetchJson(`${API_BASE}/enquiries/${id}/notes`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ note })
    });
  },

  async scheduleFollowUp(id: number, scheduled_date: string, notes?: string, counsellor_id?: number) {
    return safeFetchJson(`${API_BASE}/enquiries/${id}/followups`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ scheduled_date, notes, counsellor_id })
    });
  },

  // Admin Analytics
  async getAnalytics(startDate?: string, endDate?: string, includeDemo: boolean = true): Promise<AnalyticsData> {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    params.append('include_demo', includeDemo ? 'true' : 'false');

    return safeFetchJson(`${API_BASE}/analytics?${params.toString()}`, {
      headers: getAuthHeader()
    });
  },

  // Admin CMS & Settings
  async updateSettings(settings: Record<string, string>) {
    return safeFetchJson(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
  },

  async getAuditLogs() {
    return safeFetchJson(`${API_BASE}/settings/audit-logs`, {
      headers: getAuthHeader()
    });
  },

  async getNotifications() {
    return safeFetchJson(`${API_BASE}/settings/notifications`, {
      headers: getAuthHeader()
    });
  },

  async markNotificationsRead() {
    return fetch(`${API_BASE}/settings/notifications/mark-read`, {
      method: 'PATCH',
      headers: getAuthHeader()
    });
  },

  // Demo Journey
  async seedDemoData() {
    return safeFetchJson(`${API_BASE}/demo/seed`, {
      method: 'POST',
      headers: getAuthHeader()
    });
  },

  async resetDemoData() {
    return safeFetchJson(`${API_BASE}/demo/reset`, {
      method: 'POST',
      headers: getAuthHeader()
    });
  }
};
