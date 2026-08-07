import React, { useState, useEffect, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Briefcase,
  FileText,
  Building,
  BarChart3,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Plus,
  RefreshCw,
  Eye,
  Edit3,
  Award,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Settings,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Search,
  ExternalLink,
  Copy,
  Paperclip,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/career")({
  component: CareerPage,
});

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  job_url: string;
  overall_score: number;
  score_dimensions: any;
  match_reasons: string[];
  gap_reasons: string[];
  company_tier: string;
  recruiter_email: string | null;
  cover_letter: string;
  tailored_highlights: string[];
  apply_status: string;
  applied_at: string | null;
  discovered_at: string;
}

interface ResumeVersion {
  id: string;
  filename: string;
  storage_url: string;
  uploaded_at: string;
  is_active: boolean;
}

interface WatchlistItem {
  id: string;
  company_name: string;
  careers_url: string | null;
  new_jobs_today: number;
}

interface Stats {
  discovered_count: number;
  matched_count: number;
  applied_count: number;
  skipped_count: number;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function CareerPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "matches" | "watchlist" | "resume" | "settings">("overview");
  
  // Data States
  const [jobs, setJobs] = useState<JobMatch[]>([]);
  const [resumes, setResumes] = useState<ResumeVersion[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [todayStats, setTodayStats] = useState<Stats>({
    discovered_count: 0,
    matched_count: 0,
    applied_count: 0,
    skipped_count: 0,
  });

  // Settings Edit States
  const [targetRolesText, setTargetRolesText] = useState("");
  const [skillsText, setSkillsText] = useState("");
  const [experienceYears, setExperienceYears] = useState(2.0);
  const [scoreThreshold, setScoreThreshold] = useState(80);
  const [targetLocations, setTargetLocations] = useState<{ name: string; active: boolean }[]>([]);
  const [newLocationInput, setNewLocationInput] = useState("");

  // Crawler Action States
  const [crawlGeneral, setCrawlGeneral] = useState(true);
  const [crawlWatchlist, setCrawlWatchlist] = useState(true);
  const [crawling, setCrawling] = useState(false);

  // UI States
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);
  const [editedCoverLetter, setEditedCoverLetter] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: "",
  });

  // Fetch Backend REST APIs
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Fetch Job matches
      const jobsRes = await fetch(`${BACKEND_URL}/api/jobs`);
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        setJobs(jobsData || []);
      }

      // 2. Fetch Resumes list
      const resumesRes = await fetch(`${BACKEND_URL}/api/resumes`);
      if (resumesRes.ok) {
        const resumesData = await resumesRes.json();
        setResumes(resumesData || []);
      }

      // 3. Fetch Watchlist
      const watchlistRes = await fetch(`${BACKEND_URL}/api/watchlist`);
      if (watchlistRes.ok) {
        const watchlistData = await watchlistRes.json();
        setWatchlist(watchlistData || []);
      }

      // 4. Fetch Profile configuration
      const profileRes = await fetch(`${BACKEND_URL}/api/profile`);
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
        setTargetRolesText(profileData.target_roles?.join(", ") || "");
        setSkillsText(profileData.skills?.join(", ") || "");
        setExperienceYears(profileData.experience_years || 2.0);
        setScoreThreshold(profileData.min_score_threshold || 80);
        setTargetLocations(profileData.target_locations || []);
      }

      // 5. Fetch Today's Stats
      const statsRes = await fetch(`${BACKEND_URL}/api/stats`);
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setTodayStats({
          discovered_count: statsData.discovered_count || 0,
          matched_count: statsData.matched_count || 0,
          applied_count: statsData.applied_count || 0,
          skipped_count: statsData.skipped_count || 0,
        });
      }
    } catch (err: any) {
      console.error("❌ REST: Error loading data:", err);
      setStatusMsg({ type: "error", text: "Backend server connection refused. Is your bot server running?" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle selected job change
  const selectJobMatch = (job: JobMatch) => {
    setSelectedJob(job);
    setEditedCoverLetter(job.cover_letter || "");
    setIsEditing(false);
    setCopiedUrl(false);
  };

  // Copy job URL to clipboard
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  // Get job portal hostname/badge
  const getJobSourceBadge = (url: string) => {
    try {
      const hostname = new URL(url).hostname.toLowerCase();
      if (hostname.includes("greenhouse.io")) return { label: "Greenhouse", color: "bg-emerald-950/40 text-emerald-400 border-emerald-850" };
      if (hostname.includes("lever.co")) return { label: "Lever", color: "bg-teal-950/40 text-teal-400 border-teal-850" };
      if (hostname.includes("linkedin.com")) return { label: "LinkedIn", color: "bg-blue-950/40 text-blue-400 border-blue-900/50" };
      if (hostname.includes("naukri.com")) return { label: "Naukri", color: "bg-orange-950/40 text-orange-400 border-orange-900/50" };
      return { label: "Careers Page", color: "bg-indigo-950/40 text-indigo-400 border-indigo-900/50" };
    } catch (e) {
      return { label: "Job Board", color: "bg-secondary text-muted-foreground border-border" };
    }
  };

  // Toggle active/inactive resume version
  const handleToggleResume = async (id: string, active: boolean) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/resume/active`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active }),
      });

      if (!response.ok) throw new Error("Failed to toggle resume status");

      setStatusMsg({ 
        type: "success", 
        text: active ? "Resume activated successfully!" : "Resume deactivated successfully." 
      });
      loadData();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: "Failed to update resume status." });
    }
  };

  // Helper to add location
  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocationInput.trim()) return;
    const name = newLocationInput.trim();
    if (targetLocations.some((l) => l.name.toLowerCase() === name.toLowerCase())) {
      setNewLocationInput("");
      return;
    }
    setTargetLocations([...targetLocations, { name, active: true }]);
    setNewLocationInput("");
  };

  // Helper to toggle location active/inactive
  const handleToggleLocationActive = (index: number) => {
    const updated = [...targetLocations];
    updated[index].active = !updated[index].active;
    setTargetLocations(updated);
  };

  // Helper to delete location
  const handleDeleteLocation = (index: number) => {
    setTargetLocations(targetLocations.filter((_, i) => i !== index));
  };

  // Save profile settings changes
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const roles = targetRolesText.split(",").map((r) => r.trim()).filter(Boolean);
      const skills = skillsText.split(",").map((s) => s.trim()).filter(Boolean);
      
      const response = await fetch(`${BACKEND_URL}/api/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_roles: roles,
          min_score_threshold: scoreThreshold,
          experience_years: experienceYears,
          skills,
          target_locations: targetLocations,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");
      setStatusMsg({ type: "success", text: "Profile configuration saved successfully!" });
      loadData();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: "Failed to update profile configuration." });
    }
  };

  // Trigger manual crawl with selected scope options
  const handleTriggerCrawl = async () => {
    if (!crawlGeneral && !crawlWatchlist) {
      setStatusMsg({ type: "error", text: "Please select at least one search option (General or Watchlist) to crawl." });
      return;
    }
    setCrawling(true);
    setStatusMsg({ type: "success", text: "Job discovery run triggered! Check your Telegram for live progress alerts." });

    let scope: "general" | "watchlist" | "all" = "all";
    if (crawlGeneral && !crawlWatchlist) scope = "general";
    if (!crawlGeneral && crawlWatchlist) scope = "watchlist";

    try {
      const response = await fetch(`${BACKEND_URL}/api/discover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope }),
      });

      if (!response.ok) throw new Error("Failed to trigger crawl run");
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: "error", text: "Failed to trigger discovery crawl. Check if backend is active." });
    } finally {
      setCrawling(false);
    }
  };

  // Delete Watchlist Company
  const handleDeleteWatchlist = async (id: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/watchlist/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete watchlist company");
      setStatusMsg({ type: "success", text: "Watchlist company removed successfully!" });
      loadData();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: "Failed to remove company from watchlist." });
    }
  };

  // Upload Resume File to Backend API
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    if (file.type !== "application/pdf") {
      setStatusMsg({ type: "error", text: "Please upload PDF documents only." });
      return;
    }

    setUploading(true);
    setStatusMsg({ type: null, text: "" });

    try {
      const formData = new FormData();
      formData.append("resume", file);

      console.log(`📤 REST: Uploading PDF to backend parser: ${file.name}`);
      const response = await fetch(`${BACKEND_URL}/api/resume/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || "Failed to upload resume file");
      }

      setStatusMsg({ type: "success", text: `"${file.name}" uploaded, parsed, and activated successfully!` });
      loadData();
    } catch (err: any) {
      console.error("Upload error:", err);
      setStatusMsg({ type: "error", text: err.message || "Failed to upload resume." });
    } finally {
      setUploading(false);
    }
  };

  // Add Watchlist Company
  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim()) return;
    try {
      const response = await fetch(`${BACKEND_URL}/api/watchlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: newCompany.trim() }),
      });

      if (!response.ok) throw new Error("Failed to add company");

      setNewCompany("");
      setStatusMsg({ type: "success", text: "Added company to watchlist!" });
      loadData();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: "Failed to add company to watchlist." });
    }
  };

  // Trigger Action directly from Frontend
  const triggerBackendAction = async (jobId: string, action: "email" | "auto" | "skip") => {
    try {
      const payload: any = { jobId, action };
      // Include the edited cover letter if approving/emailing
      if (action === "email" && editedCoverLetter) {
        payload.emailBody = editedCoverLetter;
      }

      const response = await fetch(`${BACKEND_URL}/api/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Backend server unavailable.");

      const resJson = await response.json();
      setStatusMsg({ type: "success", text: resJson.message || "Action processed successfully!" });
      
      // Update selectedJob state if modifying
      if (selectedJob && selectedJob.id === jobId && action === "email") {
        setSelectedJob({ ...selectedJob, cover_letter: editedCoverLetter, apply_status: "EMAIL_SENT" });
      }

      loadData();
      if (action === "skip") {
        setSelectedJob(null);
      }
      setIsEditing(false);
    } catch (err: any) {
      setStatusMsg({ type: "error", text: "Action failed. Make sure your backend node bot is running." });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans pt-28 pb-16">
      
      {/* Background visual gradients */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-primary-glow/10 blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute top-1/2 right-1/10 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-border/40 pb-8 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary-glow">
              <Sparkles className="h-3.5 w-3.5" /> PERSONAL PILOT
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl bg-gradient-to-r from-foreground via-foreground/90 to-primary-glow bg-clip-text">
              AI Career Agent
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl">
              Autonomous matching pipelines, detailed AI score justifications, and review workflows for email and auto-applying.
            </p>
          </div>
          <button
            onClick={loadData}
            className="flex items-center justify-center gap-2 bg-secondary/80 border border-border/80 hover:bg-secondary hover:border-border text-foreground px-5 py-2.5 rounded-xl text-sm font-semibold transition-all w-full md:w-auto shadow-elegant"
          >
            <RefreshCw className="h-4 w-4" /> Refresh Pipeline
          </button>
        </div>

        {/* Global Notifications */}
        {statusMsg.type && (
          <div
            className={`p-4 rounded-xl border text-sm flex items-center justify-between transition-all ${
              statusMsg.type === "success"
                ? "bg-emerald-950/20 text-emerald-300 border-emerald-900/50"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{statusMsg.type === "success" ? "✓" : "⚠"}</span>
              {statusMsg.text}
            </div>
            <button className="text-xs underline hover:opacity-80" onClick={() => setStatusMsg({ type: null, text: "" })}>
              Dismiss
            </button>
          </div>
        )}

        {/* Top Metric Cards */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card/40 border border-border/40 rounded-2xl h-24" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card/40 border border-border/60 rounded-2xl p-5 flex items-center justify-between shadow-elegant backdrop-blur-md">
              <div>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Discovered</span>
                <h3 className="text-3xl font-extrabold mt-1 text-foreground">{jobs.length}</h3>
              </div>
              <div className="p-3 rounded-xl bg-secondary/60 border border-border/45 text-muted-foreground"><Briefcase className="h-5 w-5" /></div>
            </div>
            
            <div className="bg-card/40 border border-border/60 rounded-2xl p-5 flex items-center justify-between shadow-elegant backdrop-blur-md">
              <div>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Matches (&ge;{scoreThreshold}%)</span>
                <h3 className="text-3xl font-extrabold mt-1 text-primary-glow">
                  {jobs.filter((j) => (j.overall_score || 0) >= scoreThreshold).length}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary-glow"><Award className="h-5 w-5" /></div>
            </div>

            <div className="bg-card/40 border border-border/60 rounded-2xl p-5 flex items-center justify-between shadow-elegant backdrop-blur-md">
              <div>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Applications</span>
                <h3 className="text-3xl font-extrabold mt-1 text-indigo-400 font-mono">
                  {jobs.filter((j) => ["AUTO_APPLIED", "EMAIL_SENT"].includes(j.apply_status)).length}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-indigo-400"><Send className="h-5 w-5" /></div>
            </div>

            <div className="bg-card/40 border border-border/60 rounded-2xl p-5 flex items-center justify-between shadow-elegant backdrop-blur-md">
              <div>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Watchlist</span>
                <h3 className="text-3xl font-extrabold mt-1 text-amber-500 font-mono">{watchlist.length}</h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-amber-400"><Building className="h-5 w-5" /></div>
            </div>
          </div>
        )}

        {/* Tab Navigation buttons */}
        <div className="flex border-b border-border/60 gap-2 overflow-x-auto scrollbar-none">
          {(["overview", "matches", "watchlist", "resume", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap capitalize ${
                activeTab === tab 
                  ? "border-primary-glow text-primary-glow" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "overview" && <BarChart3 className="h-4 w-4" />}
              {tab === "matches" && <Briefcase className="h-4 w-4" />}
              {tab === "watchlist" && <Building className="h-4 w-4" />}
              {tab === "resume" && <FileText className="h-4 w-4" />}
              {tab === "settings" && <Settings className="h-4 w-4" />}
              {tab === "matches" ? `Job Matches (${jobs.filter((j) => (j.overall_score || 0) >= scoreThreshold).length})` : tab}
            </button>
          ))}
        </div>

        {/* Tabs Content */}
        <div className="space-y-6">
          
          {/* TAB 1: OVERVIEW & MANUAL SEARCH */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Stats and Manual Trigger Options */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Manual Search Options Card */}
                <div className="bg-card/30 border border-border/60 p-6 rounded-2xl space-y-5 shadow-elegant backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Search className="h-40 w-40 text-primary-glow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Search className="h-5 w-5 text-primary-glow" /> Target Crawl Options
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Choose which job portals or watchlists to search through, then trigger a manual discover run.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border/30 pt-4">
                    <label className="flex items-start gap-3 p-4 bg-secondary/30 hover:bg-secondary/50 border border-border/40 rounded-xl cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={crawlGeneral}
                        onChange={(e) => setCrawlGeneral(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-border text-primary-glow focus:ring-primary-glow"
                      />
                      <div>
                        <span className="text-sm font-semibold text-foreground block">General Search</span>
                        <span className="text-[11px] text-muted-foreground leading-relaxed mt-0.5 block">
                          Scans Greenhouse, Lever, LinkedIn, and Naukri for your target job titles across India.
                        </span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 bg-secondary/30 hover:bg-secondary/50 border border-border/40 rounded-xl cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={crawlWatchlist}
                        onChange={(e) => setCrawlWatchlist(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-border text-primary-glow focus:ring-primary-glow"
                      />
                      <div>
                        <span className="text-sm font-semibold text-foreground block">Watchlist Portals Only</span>
                        <span className="text-[11px] text-muted-foreground leading-relaxed mt-0.5 block">
                          Scans only target career sites of watchlist companies (e.g. EMIRATES).
                        </span>
                      </div>
                    </label>
                  </div>

                  <button
                    onClick={handleTriggerCrawl}
                    disabled={crawling}
                    className="w-full bg-gradient-primary text-primary-foreground font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 shadow-glow transition-all disabled:opacity-50"
                  >
                    <Search className="h-4.5 w-4.5" /> 
                    {crawling ? "Triggering background crawl..." : "Run Job Discovery Now"}
                  </button>
                </div>

                <div className="bg-card/30 border border-border/60 p-6 rounded-2xl space-y-5 shadow-elegant backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary-glow" /> Daily Crawl Summary
                    </h3>
                    <span className="text-xs text-muted-foreground bg-secondary/80 px-2.5 py-1 rounded-md border border-border/40 font-mono">
                      {new Date().toISOString().split("T")[0]}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-secondary/40 border border-border/40 rounded-xl text-center">
                      <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Discovered</span>
                      <h4 className="text-3xl font-extrabold text-foreground mt-2">{todayStats.discovered_count}</h4>
                    </div>
                    <div className="p-4 bg-secondary/40 border border-border/40 rounded-xl text-center">
                      <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Matched</span>
                      <h4 className="text-3xl font-extrabold text-primary-glow mt-2">{todayStats.matched_count}</h4>
                    </div>
                    <div className="p-4 bg-secondary/40 border border-border/40 rounded-xl text-center">
                      <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Applied</span>
                      <h4 className="text-3xl font-extrabold text-indigo-400 mt-2">{todayStats.applied_count}</h4>
                    </div>
                    <div className="p-4 bg-secondary/40 border border-border/40 rounded-xl text-center">
                      <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Skipped</span>
                      <h4 className="text-3xl font-extrabold text-muted-foreground mt-2">{todayStats.skipped_count}</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telegram Mock Alert Preview */}
              <div className="bg-card/30 border border-border/60 p-6 rounded-2xl space-y-4 flex flex-col justify-between shadow-elegant backdrop-blur-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border/40 pb-3">
                    <h3 className="text-base font-bold text-indigo-400 flex items-center gap-2">
                      💬 Telegram Alert Format
                    </h3>
                    <span className="text-xs bg-secondary border border-border/40 px-2 py-0.5 rounded-md text-muted-foreground">HTML Mode</span>
                  </div>

                  <div className="bg-background/80 p-4 rounded-xl border border-border/60 font-mono text-[11px] text-foreground leading-relaxed whitespace-pre-wrap shadow-inner max-h-72 overflow-y-auto">
{`🚨 <b>New Match Found!</b> Score: <b>92/100</b>
🏢 <b>Company</b>: EMIRATES (MNC)
💼 <b>Role</b>: Spring Boot & React Developer
📍 <b>Loc</b>: Bangalore/Remote

✅ <b>Matches</b>:
• Java Spring Boot expert skills
• WebRTC Realtime API matches AskOxy
• Guide 4 junior developers matches team lead

❌ <b>Gaps</b>:
• AWS Cloud experience not in current CV
• Kubernetes preferred

📧 <b>Email Contact</b>: careers@emirates.com`}
                  </div>
                  
                  {/* Inline keyboard mock buttons */}
                  <div className="space-y-2">
                    <button className="w-full bg-secondary border border-border/80 text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 text-foreground cursor-default">
                      📧 Approve & Email Recruiter
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-secondary border border-border/80 text-xs font-semibold py-2.5 rounded-lg text-foreground cursor-default">
                        🤖 Approve & Apply
                      </button>
                      <button className="bg-secondary border border-border/80 text-xs font-semibold py-2.5 rounded-lg text-destructive cursor-default">
                        ❌ Skip Job
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground italic mt-3 text-center">
                  Jobs scoring &ge; {scoreThreshold} trigger this interactive popup on your Telegram bot.
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: MATCHED JOBS LIST */}
          {activeTab === "matches" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Job list table/cards */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-card/30 border border-border/60 rounded-2xl overflow-hidden shadow-elegant backdrop-blur-md">
                  <div className="px-6 py-4 border-b border-border/60 bg-card/60 flex items-center justify-between">
                    <h3 className="font-bold text-foreground">Matching Positions (&ge; {scoreThreshold}%)</h3>
                    <span className="text-xs text-muted-foreground">Total matched: {jobs.filter((j) => (j.overall_score || 0) >= scoreThreshold).length}</span>
                  </div>

                  {jobs.filter((j) => (j.overall_score || 0) >= scoreThreshold).length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground text-sm">
                      No matches found matching this threshold. Try triggering a crawl via Telegram (/discover) or the crawler panel.
                    </div>
                  ) : (
                    <div className="divide-y divide-border/60">
                      {jobs
                        .filter((j) => (j.overall_score || 0) >= scoreThreshold)
                        .map((job) => {
                          const badge = getJobSourceBadge(job.job_url);
                          return (
                            <div
                              key={job.id}
                              onClick={() => selectJobMatch(job)}
                              className={`p-5 hover:bg-secondary/40 transition-all cursor-pointer flex flex-col gap-4 ${
                                selectedJob?.id === job.id ? "bg-primary/5 border-l-2 border-primary-glow" : ""
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-foreground">{job.company}</span>
                                    <span className="text-[10px] bg-secondary/80 border border-border px-2 py-0.5 rounded text-muted-foreground uppercase font-bold tracking-wider">
                                      {job.company_tier}
                                    </span>
                                    <span className={`text-[9px] border px-2 py-0.5 rounded font-semibold ${badge.color}`}>
                                      {badge.label}
                                    </span>
                                  </div>
                                  <h4 className="text-foreground font-semibold text-sm">{job.title}</h4>
                                </div>

                                <div className="flex items-center gap-6 sm:text-right shrink-0">
                                  <div>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Match</span>
                                    <span className="text-base font-extrabold text-primary-glow">{job.overall_score}%</span>
                                  </div>

                                  <div className="min-w-[110px]">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Status</span>
                                    <span
                                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold inline-block mt-1 ${
                                        job.apply_status === "PENDING_APPROVAL"
                                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                          : ["EMAIL_SENT", "AUTO_APPLIED"].includes(job.apply_status)
                                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                          : "bg-secondary text-muted-foreground border border-border"
                                      }`}
                                    >
                                      {job.apply_status.replace("_", " ")}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* URL Display Area */}
                              <div className="flex items-center gap-2 bg-secondary/20 p-2.5 rounded-lg border border-border/40 text-xs">
                                <Paperclip className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                <span className="text-muted-foreground truncate flex-1 font-mono">
                                  {job.job_url}
                                </span>
                                <a
                                  href={job.job_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[11px] text-primary-glow hover:underline flex items-center gap-0.5 shrink-0"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Open <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>

              {/* Match details & controls (Sidebar) */}
              <div className="bg-card/30 border border-border/60 p-6 rounded-2xl space-y-6 shadow-elegant backdrop-blur-md">
                {selectedJob ? (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-primary-glow uppercase tracking-widest">
                        <Sparkles className="h-3.5 w-3.5" /> AI Score Card
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mt-1">{selectedJob.company}</h3>
                      <h4 className="text-muted-foreground text-sm font-medium">{selectedJob.title}</h4>
                      
                      {/* Prominent URL display in sidebar details */}
                      <div className="mt-4 space-y-1.5 p-3.5 bg-secondary/40 border border-border/60 rounded-xl">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
                          Origin Job Link:
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-foreground truncate font-mono flex-1">
                            {selectedJob.job_url}
                          </span>
                          <button
                            onClick={() => handleCopyUrl(selectedJob.job_url)}
                            className="p-1.5 hover:bg-secondary rounded-lg border border-border text-muted-foreground hover:text-foreground transition-all shrink-0"
                            title="Copy Job Link"
                          >
                            {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                          <a
                            href={selectedJob.job_url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 hover:bg-secondary rounded-lg border border-border text-primary-glow hover:text-primary-glow transition-all shrink-0"
                            title="Open Link in New Tab"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Score Progress */}
                    <div className="border-t border-border/40 pt-4 space-y-4">
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="text-muted-foreground uppercase tracking-wider font-semibold">Match Score</span>
                          <span className="font-extrabold text-primary-glow">{selectedJob.overall_score}/100</span>
                        </div>
                        <div className="bg-secondary h-2.5 rounded-full overflow-hidden border border-border/60">
                          <div className="bg-gradient-to-r from-primary to-primary-glow h-full rounded-full" style={{ width: `${selectedJob.overall_score}%` }}></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-3 bg-secondary/40 rounded-xl border border-border/60">
                          <span className="text-muted-foreground">Skills Match</span>
                          <span className="block font-bold text-foreground mt-1 text-sm font-mono">
                            {selectedJob.score_dimensions?.skills?.score || 0}%
                          </span>
                        </div>
                        <div className="p-3 bg-secondary/40 rounded-xl border border-border/60">
                          <span className="text-muted-foreground">Experience Fit</span>
                          <span className="block font-bold text-foreground mt-1 text-sm font-mono">
                            {selectedJob.score_dimensions?.experience?.score || 0}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pros & Gaps */}
                    <div className="space-y-4 text-xs">
                      <div className="space-y-2">
                        <span className="text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4 text-emerald-400" /> Match Strengths
                        </span>
                        <ul className="text-muted-foreground space-y-1.5 list-disc pl-4 leading-relaxed">
                          {selectedJob.match_reasons.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 border-t border-border/20 pt-3">
                        <span className="text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-1.5">
                          <XCircle className="h-4 w-4 text-destructive" /> Missing Gaps
                        </span>
                        <ul className="text-muted-foreground space-y-1.5 list-disc pl-4 leading-relaxed">
                          {selectedJob.gap_reasons.map((g, i) => (
                            <li key={i}>{g}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* EDITABLE COVER LETTER PORTAL */}
                    <div className="border-t border-border/40 pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Edit3 className="h-3.5 w-3.5 text-primary-glow" /> Tailored Cover Letter
                        </label>
                        {selectedJob.apply_status === "PENDING_APPROVAL" && (
                          <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-xs text-primary-glow underline hover:opacity-80"
                          >
                            {isEditing ? "Cancel Edit" : "Edit Text"}
                          </button>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="space-y-2">
                          <textarea
                            value={editedCoverLetter}
                            onChange={(e) => setEditedCoverLetter(e.target.value)}
                            className="w-full h-60 bg-secondary/80 border border-border/80 rounded-xl p-3 text-xs text-foreground font-mono outline-none focus:border-primary-glow shadow-inner leading-relaxed"
                          />
                          <p className="text-[10px] text-muted-foreground">
                            *Type modifications above. Approving will email this customized text.
                          </p>
                        </div>
                      ) : (
                        <div className="bg-secondary/40 border border-border/60 rounded-xl p-3 max-h-48 overflow-y-auto font-mono text-[11px] text-muted-foreground leading-relaxed whitespace-pre-wrap shadow-inner">
                          {editedCoverLetter || "No cover letter tailored for this position."}
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    {selectedJob.apply_status === "PENDING_APPROVAL" && (
                      <div className="space-y-2 border-t border-border/40 pt-4">
                        {selectedJob.recruiter_email && (
                          <button
                            onClick={() => triggerBackendAction(selectedJob.id, "email")}
                            className="w-full bg-gradient-primary text-primary-foreground font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 shadow-glow transition-all"
                          >
                            <Send className="h-4 w-4" /> Approve & Send Email
                          </button>
                        )}
                        <button
                          onClick={() => triggerBackendAction(selectedJob.id, "auto")}
                          className="w-full bg-secondary border border-border hover:bg-secondary/80 text-foreground font-semibold py-2.5 px-4 rounded-xl text-sm transition-all"
                        >
                          🤖 Approve & Auto-Apply (Playwright)
                        </button>
                        <button
                          onClick={() => triggerBackendAction(selectedJob.id, "skip")}
                          className="w-full bg-destructive/10 hover:bg-destructive/20 text-destructive font-semibold py-2 px-4 rounded-xl text-sm border border-destructive/20 transition-all"
                        >
                          Skip Match
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground text-sm py-12 text-center">
                    Select a matching job opportunity to review metrics, customize the cover letter, and send applications.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: WATCHLIST COMPANIES */}
          {activeTab === "watchlist" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Form & Info */}
              <div className="lg:col-span-1 bg-card/30 border border-border/60 p-6 rounded-2xl space-y-6 shadow-elegant backdrop-blur-md">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Target List</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Watchlist career sites are audited during morning and evening scheduled sweeps for newly listed vacancies.
                  </p>
                </div>

                <form onSubmit={handleAddCompany} className="space-y-3">
                  <label className="text-xs font-semibold text-muted-foreground block uppercase tracking-wider">Add Company to Monitor</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. RAZORPAY"
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      className="flex-1 bg-secondary/80 border border-border/80 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary-glow"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-primary text-primary-foreground font-bold px-4 rounded-xl text-sm transition-all shadow-glow hover:opacity-90 flex items-center justify-center"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Watchlist Table */}
              <div className="lg:col-span-2 bg-card/30 border border-border/60 rounded-2xl overflow-hidden shadow-elegant backdrop-blur-md">
                <div className="px-6 py-4 border-b border-border/60 bg-card/60">
                  <h3 className="font-bold text-foreground">Target Watchlist Companies</h3>
                </div>

                {watchlist.length === 0 ? (
                  <div className="p-12 text-center text-muted-foreground text-sm">
                    Your watchlist is empty. Add a target company using the left-hand panel.
                  </div>
                ) : (
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-secondary/40 text-muted-foreground text-xs uppercase border-b border-border/60 font-semibold">
                        <th className="p-4">Company</th>
                        <th className="p-4">Today's Jobs Found</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {watchlist.map((item) => (
                        <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
                          <td className="p-4 font-semibold text-foreground flex items-center gap-2">
                            <span className="text-primary-glow">🏢</span> {item.company_name}
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {item.new_jobs_today > 0 ? (
                              <span className="text-primary-glow font-bold bg-primary-glow/10 px-2 py-0.5 rounded border border-primary-glow/20">
                                {item.new_jobs_today} new jobs
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">No updates</span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteWatchlist(item.id)}
                              className="p-2 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-all"
                              title="Delete from Watchlist"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          )}

          {/* TAB 4: RESUME VERSION MANAGER */}
          {activeTab === "resume" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Upload window */}
              <div className="lg:col-span-1 bg-card/30 border border-border/60 p-6 rounded-2xl space-y-6 shadow-elegant backdrop-blur-md">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Active CV Template</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Upload your latest resume PDF. The parser will automatically extract and activate the text as the template profile for job evaluation.
                  </p>
                </div>

                <div className="border-2 border-dashed border-border/80 hover:border-primary-glow/50 rounded-xl p-4 bg-secondary/20 transition-all flex flex-col items-center justify-center min-h-[160px] relative">
                  <input
                    type="file"
                    id="resume-file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="resume-file"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-3"
                  >
                    <div className="p-3 bg-secondary/80 border border-border/60 text-primary-glow rounded-full shadow-elegant">
                      <Upload className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold text-primary-glow underline">Upload PDF Resume</span>
                  </label>
                  {uploading && (
                    <div className="absolute inset-0 bg-background/95 rounded-xl flex flex-col items-center justify-center space-y-2">
                      <div className="h-6 w-6 border-2 border-primary-glow border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs text-foreground font-medium">Extracting CV content...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Resume History Table */}
              <div className="lg:col-span-2 bg-card/30 border border-border/60 rounded-2xl overflow-hidden shadow-elegant backdrop-blur-md">
                <div className="px-6 py-4 border-b border-border/60 bg-card/60 flex items-center justify-between">
                  <h3 className="font-bold text-foreground">Uploaded CV Versions</h3>
                  <span className="text-xs text-muted-foreground">Total: {resumes.length}</span>
                </div>

                {resumes.length === 0 ? (
                  <div className="p-12 text-center text-muted-foreground text-sm">
                    No CV templates uploaded. Use the upload panel to upload your first resume version.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[500px]">
                      <thead>
                        <tr className="bg-secondary/40 text-muted-foreground text-xs uppercase border-b border-border/60 font-semibold">
                          <th className="p-4">Filename</th>
                          <th className="p-4">Uploaded At</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {resumes.map((resume) => (
                          <tr
                            key={resume.id}
                            className={`hover:bg-secondary/20 transition-colors ${resume.is_active ? "bg-primary/5" : ""}`}
                          >
                            <td className="p-4 font-semibold text-foreground truncate max-w-[200px]">
                              📄 {resume.filename}
                            </td>
                            <td className="p-4 text-muted-foreground text-xs">
                              {new Date(resume.uploaded_at).toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </td>
                            <td className="p-4">
                              {resume.is_active ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-glow/10 text-primary-glow border border-primary-glow/20">
                                  ACTIVE CV
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary text-muted-foreground border border-border">
                                  INACTIVE
                                </span>
                              )}
                            </td>
                            <td className="p-4 text-right space-x-2 text-xs">
                              <a
                                href={resume.storage_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block text-muted-foreground hover:text-foreground underline font-semibold px-2 py-1"
                              >
                                Download
                              </a>
                              {resume.is_active ? (
                                <button
                                  onClick={() => handleToggleResume(resume.id, false)}
                                  className="inline-flex items-center gap-1 bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                                >
                                  <ToggleRight className="h-3.5 w-3.5" /> Deactivate
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleToggleResume(resume.id, true)}
                                  className="inline-flex items-center gap-1 bg-gradient-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-glow hover:opacity-90"
                                >
                                  <ToggleLeft className="h-3.5 w-3.5" /> Set Active
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 5: PROFILE SETTINGS */}
          {activeTab === "settings" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Form panel */}
              <div className="lg:col-span-2 bg-card/30 border border-border/60 p-6 rounded-2xl space-y-6 shadow-elegant backdrop-blur-md">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Profile Configuration</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Control search parameters, job title keywords, and AI filter constraints without touching the database schema.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-5 border-t border-border/30 pt-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                      Target Search Roles (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={targetRolesText}
                      onChange={(e) => setTargetRolesText(e.target.value)}
                      className="w-full bg-secondary/60 border border-border/80 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary-glow"
                      placeholder="e.g. Full Stack Developer, Software Engineer, Backend Developer"
                    />
                    <span className="text-[10px] text-muted-foreground block">
                      *Keywords Serper queries on Greenhouse/Lever & watchlist career sites.
                    </span>
                  </div>

                  {/* Preferred Locations List */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                      Preferred Job Locations
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newLocationInput}
                        onChange={(e) => setNewLocationInput(e.target.value)}
                        placeholder="Add location (e.g. Hyderabad, Remote)"
                        className="w-full bg-secondary/60 border border-border/80 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary-glow"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const name = newLocationInput.trim();
                            if (name) {
                              if (!targetLocations.some((l) => l.name.toLowerCase() === name.toLowerCase())) {
                                setTargetLocations([...targetLocations, { name, active: true }]);
                              }
                              setNewLocationInput("");
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const name = newLocationInput.trim();
                          if (name) {
                            if (!targetLocations.some((l) => l.name.toLowerCase() === name.toLowerCase())) {
                              setTargetLocations([...targetLocations, { name, active: true }]);
                            }
                            setNewLocationInput("");
                          }
                        }}
                        className="bg-secondary hover:bg-secondary/80 border border-border/80 px-4 rounded-xl text-sm font-semibold transition-colors"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {targetLocations.length === 0 ? (
                        <span className="text-xs text-muted-foreground italic">No target locations added yet. All locations will match.</span>
                      ) : (
                        targetLocations.map((loc, idx) => (
                          <div
                            key={idx}
                            className={`inline-flex items-center gap-2 border px-3 py-1.5 rounded-xl text-xs transition-all ${
                              loc.active
                                ? "bg-emerald-950/20 text-emerald-300 border-emerald-900/40"
                                : "bg-secondary/40 text-muted-foreground border-border/40 line-through"
                            }`}
                          >
                            <span className="font-semibold">{loc.name}</span>
                            <button
                              type="button"
                              onClick={() => handleToggleLocationActive(idx)}
                              className={`p-0.5 rounded hover:bg-secondary transition-colors ${
                                loc.active ? "text-emerald-400" : "text-muted-foreground"
                              }`}
                              title={loc.active ? "Click to Deactivate" : "Click to Activate"}
                            >
                              {loc.active ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteLocation(idx)}
                              className="text-destructive/70 hover:text-destructive p-0.5"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                        Target Experience (Years)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(parseFloat(e.target.value))}
                        className="w-full bg-secondary/60 border border-border/80 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary-glow"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                        Minimum Match Score Threshold (%)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={scoreThreshold}
                        onChange={(e) => setScoreThreshold(parseInt(e.target.value))}
                        className="w-full bg-secondary/60 border border-border/80 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary-glow"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                      Required Core Skills (Comma-separated)
                    </label>
                    <textarea
                      value={skillsText}
                      onChange={(e) => setSkillsText(e.target.value)}
                      className="w-full h-24 bg-secondary/60 border border-border/80 rounded-xl p-3 text-sm text-foreground outline-none focus:border-primary-glow leading-relaxed"
                      placeholder="React, TypeScript, Java, Spring Boot"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-primary text-primary-foreground font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 shadow-glow transition-all"
                  >
                    <Plus className="h-4.5 w-4.5" /> Save Profile Configurations
                  </button>
                </form>
              </div>

              {/* Status panel details */}
              <div className="bg-card/30 border border-border/60 p-6 rounded-2xl space-y-4 shadow-elegant backdrop-blur-md text-xs leading-relaxed text-muted-foreground">
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Configuration Summary</h4>
                <div className="space-y-2 border-t border-border/20 pt-3">
                  <div className="flex justify-between border-b border-border/10 pb-1.5 font-sans">
                    <span>Crawl Scope Roles:</span>
                    <span className="font-bold text-foreground">{profile?.target_roles?.length || 0} active</span>
                  </div>
                  <div className="flex justify-between border-b border-border/10 pb-1.5 font-sans">
                    <span>Target Locations:</span>
                    <span className="font-bold text-foreground truncate max-w-[150px] inline-block">
                      {targetLocations.map((l) => `${l.name}${l.active ? "" : " (inactive)"}`).join(", ") || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border/10 pb-1.5 font-sans">
                    <span>Experience Filter:</span>
                    <span className="font-bold text-foreground font-mono">{experienceYears} Years</span>
                  </div>
                  <div className="flex justify-between border-b border-border/10 pb-1.5 font-sans">
                    <span>Score Gatekeeper:</span>
                    <span className="font-bold text-primary-glow font-mono">{scoreThreshold}% match</span>
                  </div>
                </div>
                <p className="text-[11px] mt-4">
                  *Saving these adjustments updates your Supabase profile record instantly. All scheduled morning (9:00 AM) and evening (6:00 PM) cron loops will automatically reference your updated parameters during their next discovery crawl.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
