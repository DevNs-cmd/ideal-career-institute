import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Phone,
  MessageCircle,
  Clock,
  User,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  Send,
  RefreshCw,
  Plus,
  Eye,
  Building,
  GraduationCap
} from 'lucide-react';
import { api, Lead, Course, Branch } from '../../lib/api';
import { formatDate, formatIndianPhone } from '../../lib/utils';

interface AdminLeadsProps {
  initialStatusFilter?: string;
  courses: Course[];
  branches: Branch[];
}

export const AdminLeads: React.FC<AdminLeadsProps> = ({
  initialStatusFilter,
  courses,
  branches
}) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter || '');
  const [courseFilter, setCourseFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');

  // Selected Lead Drawer / Modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNotes, setLeadNotes] = useState<any[]>([]);
  const [leadFollowUps, setLeadFollowUps] = useState<any[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Note form state
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Follow-up scheduling form state
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);

  const statuses = [
    'New',
    'Contacted',
    'Follow-up Required',
    'Interested',
    'Counselling Scheduled',
    'Admission Confirmed',
    'Not Interested',
    'Closed'
  ];

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const data = await api.getLeads({
        search,
        status: statusFilter,
        course_id: courseFilter,
        branch_id: branchFilter
      });
      setLeads(data.enquiries || []);
      setTotalCount(data.total || 0);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, statusFilter, courseFilter, branchFilter]);

  // Open Lead Drawer
  const handleOpenLead = async (lead: Lead) => {
    setSelectedLead(lead);
    setIsLoadingDetails(true);
    try {
      const details = await api.getLeadDetails(lead.id);
      setLeadNotes(details.notes || []);
      setLeadFollowUps(details.followUps || []);
    } catch (err) {
      console.error('Error fetching lead details:', err);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Update Status
  const handleStatusChange = async (newStatus: string) => {
    if (!selectedLead) return;
    try {
      await api.updateLeadStatus(selectedLead.id, newStatus);
      setSelectedLead({ ...selectedLead, status: newStatus });
      fetchLeads();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // Add Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;
    setIsAddingNote(true);
    try {
      await api.addLeadNote(selectedLead.id, newNote);
      setNewNote('');
      const details = await api.getLeadDetails(selectedLead.id);
      setLeadNotes(details.notes || []);
    } catch (err) {
      alert('Failed to add note');
    } finally {
      setIsAddingNote(false);
    }
  };

  // Schedule Follow-Up
  const handleScheduleFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !followUpDate) return;
    setIsScheduling(true);
    try {
      await api.scheduleFollowUp(selectedLead.id, followUpDate, followUpNotes);
      setFollowUpDate('');
      setFollowUpNotes('');
      const details = await api.getLeadDetails(selectedLead.id);
      setLeadFollowUps(details.followUps || []);
      fetchLeads();
      alert('Follow-up scheduled successfully!');
    } catch (err) {
      alert('Failed to schedule follow-up');
    } finally {
      setIsScheduling(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Follow-up Required':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Interested':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Counselling Scheduled':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Admission Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 font-extrabold';
      case 'Not Interested':
      case 'Closed':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student, phone, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
          >
            <option value="">All Statuses</option>
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* Course Filter */}
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer max-w-[160px]"
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          <button
            onClick={fetchLeads}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <a
            href="/api/enquiries/export/csv"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </a>
        </div>

      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Enquiry ID</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Interested Course</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  onClick={() => handleOpenLead(lead)}
                >
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      {lead.is_demo === 1 && (
                        <span className="px-1.5 py-0.5 rounded-sm bg-amber-100 text-amber-800 text-[9px] font-sans font-bold">
                          DEMO
                        </span>
                      )}
                      {lead.enquiry_id}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{lead.student_name}</div>
                    <div className="text-[11px] text-slate-400">{lead.source}</div>
                  </td>

                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:+91${lead.phone}`}
                        className="text-slate-900 hover:text-red-600 font-medium"
                      >
                        {formatIndianPhone(lead.phone)}
                      </a>
                      <a
                        href={`https://wa.me/91${lead.phone}?text=${encodeURIComponent(
                          `Hello ${lead.student_name}, this is from Ideal Career Institute regarding your admission enquiry (${lead.enquiry_id}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 p-1 rounded-md hover:bg-emerald-50"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-slate-600 font-medium">
                    {lead.current_class || '—'}
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800 line-clamp-1">
                      {lead.course_title || 'General Enquiry'}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] border ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-500 text-xs">
                    {formatDate(lead.created_at)}
                  </td>

                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleOpenLead(lead)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Manage</span>
                    </button>
                  </td>
                </tr>
              ))}

              {leads.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-xs">
                    No matching student enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Lead Details Drawer Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-end animate-in fade-in duration-200"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="w-full max-w-xl h-full bg-white shadow-2xl overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div>
              <div className="bg-slate-900 text-white p-6 relative">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/10 font-mono text-xs font-bold text-amber-400">
                    {selectedLead.enquiry_id}
                  </span>
                  {selectedLead.is_demo === 1 && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold">
                      DEMO LEAD
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-extrabold text-white">
                  {selectedLead.student_name}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
                  <span>Received: {formatDate(selectedLead.created_at)}</span>
                  <span>•</span>
                  <span>Source: {selectedLead.source}</span>
                </div>
              </div>

              {/* Status & Quick Action Bar */}
              <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Update Lead Status
                  </label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-2xs"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:+91${selectedLead.phone}`}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-slate-800 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Student</span>
                  </a>

                  <a
                    href={`https://wa.me/91${selectedLead.phone}?text=${encodeURIComponent(
                      `Hello ${selectedLead.student_name}, this is from Ideal Career Institute regarding your enquiry (${selectedLead.enquiry_id}) for ${selectedLead.course_title || 'courses'}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-emerald-700 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-semibold mb-0.5">Phone Number</span>
                    <span className="text-slate-900 font-bold">{formatIndianPhone(selectedLead.phone)}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-semibold mb-0.5">Email Address</span>
                    <span className="text-slate-900 font-bold">{selectedLead.email || 'Not Provided'}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-semibold mb-0.5">Current Class</span>
                    <span className="text-slate-900 font-bold">{selectedLead.current_class || '—'}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-semibold mb-0.5">Interested Course</span>
                    <span className="text-slate-900 font-bold">{selectedLead.course_title || 'General Enquiry'}</span>
                  </div>
                </div>

                {selectedLead.message && (
                  <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100 text-xs text-amber-950">
                    <span className="font-bold block mb-1">Student's Initial Message:</span>
                    <p className="leading-relaxed">{selectedLead.message}</p>
                  </div>
                )}

                {/* Schedule Follow-up Module */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-red-600" /> Schedule Academic Follow-Up
                  </h4>
                  <form onSubmit={handleScheduleFollowUp} className="space-y-3">
                    <input
                      type="datetime-local"
                      required
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                      type="text"
                      placeholder="Follow-up agenda (e.g. Discuss batch timing, parent consultation)"
                      value={followUpNotes}
                      onChange={(e) => setFollowUpNotes(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="submit"
                      disabled={isScheduling}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      {isScheduling ? 'Scheduling...' : 'Set Follow-up Reminder'}
                    </button>
                  </form>
                </div>

                {/* Counsellor Internal Notes History */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" /> Internal Counsellor Notes & Audit
                  </h4>

                  <form onSubmit={handleAddNote} className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Add an internal note or discussion summary..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="submit"
                      disabled={isAddingNote || !newNote.trim()}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Add Note
                    </button>
                  </form>

                  <div className="space-y-2.5 max-h-48 overflow-y-auto">
                    {leadNotes.map((note) => (
                      <div key={note.id} className="p-3 bg-white rounded-xl border border-slate-100 text-xs shadow-2xs">
                        <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1 font-medium">
                          <span className="font-bold text-slate-700">{note.author_name}</span>
                          <span>{formatDate(note.created_at)}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{note.note}</p>
                      </div>
                    ))}

                    {leadNotes.length === 0 && (
                      <p className="text-xs text-slate-400 py-3 text-center">No internal notes yet.</p>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Footer close */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
