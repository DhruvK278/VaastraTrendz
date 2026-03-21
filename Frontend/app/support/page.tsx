"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import {
  Headphones,
  Send,
  Eye,
  X,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  User,
  Mail,
  ChevronDown,
  Loader2,
  MessageSquare,
  Clock,
  Filter,
} from "lucide-react";

const API_BASE = "http://localhost:3001/api/support";

const issueCategories = [
  "Sizing & Fit Issues",
  "Fabric & Quality Defects",
  "Wrong Item Received",
  "Color Mismatch",
  "Damaged in Shipping",
  "Late / Lost Delivery",
  "Price / Promotion Dispute",
  "Care & Maintenance Query",
];

const resolutionOptions = [
  "Refund",
  "Replacement",
  "Repair",
  "Discount",
  "Apology",
  "Return",
  "Exchange",
  "Compensation",
  "Service Enhancement",
];

interface TicketData {
  id: string;
  customer_name: string;
  customer_email: string;
  issue: string;
  issue_description: string;
  resolution: string;
  resolution_description: string;
  confidence_score: number;
  status: string;
  date: string;
}

/* ── helpers ────────────────────────────────────────────── */
const scoreBadge = (s: number) => {
  if (s >= 80) return { label: "High Confidence", cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25" };
  if (s >= 60) return { label: "Moderate", cls: "text-yellow-400 bg-yellow-400/10 border-yellow-400/25" };
  return { label: "Low", cls: "text-rose-400 bg-rose-400/10 border-rose-400/25" };
};

const statusCls = (s: string) => {
  if (s === "Auto-Resolved") return "text-emerald-400 bg-emerald-400/10 border-emerald-400/25";
  if (s === "Pending Review") return "text-amber-400 bg-amber-400/10 border-amber-400/25";
  if (s === "Manually Resolved") return "text-sky-400 bg-sky-400/10 border-sky-400/25";
  return "text-[#888] bg-white/5 border-white/10";
};

const resolutionCls = (r: string) => {
  const map: Record<string, string> = {
    refund: "text-rose-300 bg-rose-400/10 border-rose-400/20",
    replacement: "text-violet-300 bg-violet-400/10 border-violet-400/20",
    repair: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
    discount: "text-amber-300 bg-amber-400/10 border-amber-400/20",
    apology: "text-pink-300 bg-pink-400/10 border-pink-400/20",
    return: "text-orange-300 bg-orange-400/10 border-orange-400/20",
    exchange: "text-teal-300 bg-teal-400/10 border-teal-400/20",
    compensation: "text-lime-300 bg-lime-400/10 border-lime-400/20",
    service: "text-indigo-300 bg-indigo-400/10 border-indigo-400/20",
  };
  const key = Object.keys(map).find((k) => r?.toLowerCase().includes(k));
  return key ? map[key] : "text-[#C9A96E] bg-[#C9A96E]/10 border-[#C9A96E]/20";
};

/* ═══════════════════════════════════════════════════════════
   SUPPORT PAGE
   ═══════════════════════════════════════════════════════════ */
export default function SupportPage() {
  /* ── state ─────────────────────── */
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [viewFilter, setViewFilter] = useState<"All" | "Pending Review">("All");

  // form
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    issue: "",
    issue_description: "",
  });

  // result after submit
  const [result, setResult] = useState<TicketData | null>(null);

  // detail panel
  const [selected, setSelected] = useState<TicketData | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // override
  const [overrideRes, setOverrideRes] = useState("");
  const [overrideDesc, setOverrideDesc] = useState("");
  const [overrideSubmitting, setOverrideSubmitting] = useState(false);

  /* ── fetch list ─────────────────── */
  const fetchTickets = () => {
    setLoading(true);
    axios
      .get(`${API_BASE}/list`)
      .then((r) => setTickets(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  /* ── submit complaint ──────────── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.issue || !form.issue_description) return;
    setSubmitting(true);
    setResult(null);
    axios
      .post(`${API_BASE}/create`, form)
      .then((r) => {
        setResult(r.data);
        fetchTickets();
      })
      .catch(console.error)
      .finally(() => setSubmitting(false));
  };

  /* ── view detail ────────────────── */
  const openDetail = (id: string) => {
    setDetailLoading(true);
    setSelected(null);
    axios
      .get(`${API_BASE}/run/${id}`)
      .then((r) => {
        setSelected(r.data);
        setOverrideRes(r.data.resolution || "");
        setOverrideDesc(r.data.resolution_description || "");
      })
      .catch(console.error)
      .finally(() => setDetailLoading(false));
  };

  /* ── override ────────────────────── */
  const submitOverride = () => {
    if (!selected) return;
    setOverrideSubmitting(true);
    axios
      .put(`${API_BASE}/update/${selected.id}`, {
        resolution: overrideRes,
        resolution_description: overrideDesc,
      })
      .then((r) => {
        setSelected(r.data);
        fetchTickets();
      })
      .catch(console.error)
      .finally(() => setOverrideSubmitting(false));
  };

  /* ── filtered tickets ─────────── */
  const displayed = tickets.filter(
    (t) => viewFilter === "All" || t.status === "Pending Review"
  );

  /* ═══════════════════ RENDER ═══════════════════ */
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Hero strip */}
      <section className="border-b border-[#C9A96E]/10 py-14 text-center px-4">
        <p
          className="text-[#C9A96E] text-xs tracking-[0.5em] uppercase mb-3"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          AI-Powered
        </p>
        <h1
          className="text-4xl md:text-5xl font-light text-[#F5F0E8] mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
        >
          Customer Support
        </h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-12 bg-[#C9A96E]/40" />
          <div className="w-1 h-1 bg-[#C9A96E] rotate-45" />
          <div className="h-px w-12 bg-[#C9A96E]/40" />
        </div>
        <p
          className="text-[#555] text-sm max-w-lg mx-auto"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Describe your issue and our AI agent will analyze it against VaastraTrendz policies to find the best resolution instantly.
        </p>
      </section>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* ════════ LEFT: FORM ════════ */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Headphones className="w-4 h-4 text-[#C9A96E]" />
            <span
              className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              New Request
            </span>
          </div>

          <div className="luxury-card rounded-lg p-6 md:p-8">
            {submitting ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-8 h-8 text-[#C9A96E] animate-spin" />
                <p className="text-[#F5F0E8] text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Analyzing your issue…
                </p>
                <p className="text-[#555] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Our AI agent is finding the best resolution
                </p>
              </div>
            ) : result ? (
              /* ── Result card ── */
              <div className="animate-support-fade-in">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-4 h-4 text-[#C9A96E]" />
                  <span className="text-[#C9A96E] text-xs tracking-[0.2em] uppercase font-semibold" style={{ fontFamily: "'Jost', sans-serif" }}>
                    AI Resolution
                  </span>
                </div>

                <div className="border border-[#C9A96E]/20 rounded-lg p-5 mb-5" style={{ background: "rgba(201,169,110,0.04)" }}>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[#F5F0E8] text-sm font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>
                      Hi {result.customer_name || "there"},
                    </p>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${resolutionCls(result.resolution)}`}>
                      {result.resolution}
                    </span>
                  </div>
                  <p className="text-[#aaa] text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                    {result.resolution_description}
                  </p>

                  {/* Confidence */}
                  <div className="mt-5 pt-4 border-t border-[#C9A96E]/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#555] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Confidence</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${scoreBadge(result.confidence_score).cls}`}>
                        {scoreBadge(result.confidence_score).label} — {result.confidence_score}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full overflow-hidden bg-[#1a1a1a]">
                      <div
                        className="h-1.5 rounded-full bg-[#C9A96E] transition-all duration-700 ease-out support-bar-fill"
                        style={{ width: `${result.confidence_score}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#C9A96E]/10">
                    <p className="text-[#444] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Regards</p>
                    <p className="text-[#aaa] text-xs font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>Team VaastraTrendz Support</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setResult(null);
                    setForm({ customer_name: "", customer_email: "", issue: "", issue_description: "" });
                  }}
                  className="btn-gold w-full text-center"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-xs tracking-wide uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#555]" />
                      <input
                        type="text"
                        required
                        value={form.customer_name}
                        onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full bg-[#111] border border-[#C9A96E]/15 rounded pl-9 pr-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#444] focus:outline-none focus:border-[#C9A96E]/50 transition-colors"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#888] text-xs tracking-wide uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#555]" />
                      <input
                        type="email"
                        required
                        value={form.customer_email}
                        onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-[#111] border border-[#C9A96E]/15 rounded pl-9 pr-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#444] focus:outline-none focus:border-[#C9A96E]/50 transition-colors"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-xs tracking-wide uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Issue Category
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={form.issue}
                      onChange={(e) => setForm({ ...form, issue: e.target.value })}
                      className="w-full bg-[#111] border border-[#C9A96E]/15 rounded px-4 py-2.5 text-sm text-[#F5F0E8] appearance-none cursor-pointer focus:outline-none focus:border-[#C9A96E]/50 transition-colors"
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      <option value="" style={{ background: "#111" }}>— Select an issue category —</option>
                      {issueCategories.map((c) => (
                        <option key={c} value={c} style={{ background: "#111", color: "#F5F0E8" }}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555] pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[#888] text-xs tracking-wide uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Describe Your Issue
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.issue_description}
                    onChange={(e) => setForm({ ...form, issue_description: e.target.value })}
                    placeholder="Tell us what went wrong with your clothing order…"
                    className="w-full bg-[#111] border border-[#C9A96E]/15 rounded px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#444] resize-none focus:outline-none focus:border-[#C9A96E]/50 transition-colors"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  />
                </div>

                <button type="submit" className="btn-gold-filled flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit to AI Agent
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ════════ RIGHT: TICKET FEED ════════ */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
              <span
                className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Live Feed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-3 h-3 text-[#555]" />
              {(["All", "Pending Review"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setViewFilter(f)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all duration-200 ${
                    viewFilter === f
                      ? "bg-[#C9A96E]/15 border-[#C9A96E]/40 text-[#C9A96E]"
                      : "bg-transparent border-[#333] text-[#666] hover:border-[#555] hover:text-[#888]"
                  }`}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {f === "All" ? "All Tickets" : f}
                </button>
              ))}
            </div>
          </div>

          <h2
            className="text-xl font-light text-[#F5F0E8] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            AI Agent Actions
          </h2>
          <p className="text-[#555] text-xs mb-5" style={{ fontFamily: "'Jost', sans-serif" }}>
            Past resolutions generated by the AI for customer queries.
          </p>

          <div
            className="flex flex-col gap-2 overflow-y-auto gold-scrollbar pr-1"
            style={{ maxHeight: "calc(100vh - 340px)" }}
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center h-40 gap-3">
                <Loader2 className="w-6 h-6 text-[#C9A96E] animate-spin" />
                <p className="text-[#555] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Fetching agent actions…
                </p>
              </div>
            ) : displayed.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 gap-2 luxury-card rounded-lg">
                <MessageSquare className="w-8 h-8 text-[#333]" />
                <p className="text-[#555] text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
                  No agent actions yet
                </p>
                <p className="text-[#444] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Submit a support request to get started
                </p>
              </div>
            ) : (
              displayed.map((t, i) => (
                <div
                  key={t.id}
                  className="luxury-card rounded-lg px-4 py-3 flex items-center justify-between gap-3 group animate-support-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {/* Issue */}
                  <div className="flex flex-col min-w-0 w-[28%]">
                    <p className="text-[#555] text-[10px] uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>Issue</p>
                    <p className="text-xs text-[#ccc] truncate" style={{ fontFamily: "'Jost', sans-serif" }}>{t.issue}</p>
                  </div>

                  {/* Resolution */}
                  <div className="flex flex-col w-[22%]">
                    <p className="text-[#555] text-[10px] uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>Resolution</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border w-fit ${resolutionCls(t.resolution)}`}>
                      {t.resolution}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col w-[22%]">
                    <p className="text-[#555] text-[10px] uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>Status</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border w-fit ${statusCls(t.status)}`}>
                      {t.status || "—"}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-center w-[12%]">
                    <p className="text-[#555] text-[10px] uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>Score</p>
                    <p className={`text-sm font-bold ${scoreBadge(t.confidence_score).cls.split(" ")[0]}`}>
                      {t.confidence_score}
                    </p>
                  </div>

                  {/* View button */}
                  <button
                    onClick={() => openDetail(t.id)}
                    className="flex items-center justify-center w-8 h-8 rounded border border-[#C9A96E]/15 text-[#666] hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-200 flex-shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ════════ TICKET DETAIL MODAL ════════ */}
      {(selected || detailLoading) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="w-11/12 lg:w-[560px] max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl gold-scrollbar animate-support-fade-in"
            style={{ background: "#111", border: "1px solid rgba(201,169,110,0.15)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9A96E]/10" style={{ background: "rgba(201,169,110,0.04)" }}>
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#C9A96E]" />
                <div>
                  <p className="text-[#F5F0E8] text-sm font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Ticket Summary
                  </p>
                  <p className="text-[#555] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
                    AI-generated resolution details
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex items-center justify-center w-8 h-8 rounded text-[#666] hover:text-[#C9A96E] hover:bg-[#C9A96E]/10 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 flex flex-col gap-4">
              {detailLoading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Loader2 className="w-6 h-6 text-[#C9A96E] animate-spin" />
                  <p className="text-[#555] text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Loading ticket details…
                  </p>
                </div>
              ) : selected ? (
                <>
                  {/* Customer Info */}
                  <div className="border border-[#C9A96E]/10 rounded-lg overflow-hidden">
                    <div className="px-4 py-2 border-b border-[#C9A96E]/10" style={{ background: "rgba(201,169,110,0.03)" }}>
                      <p className="text-[#888] text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ fontFamily: "'Jost', sans-serif" }}>
                        Customer Information
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-[#1a1a1a]">
                      <div className="flex items-start gap-2 p-4 bg-[#111]">
                        <User className="w-3.5 h-3.5 text-[#555] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[#555] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Name</p>
                          <p className="text-[#ccc] text-sm mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>{selected.customer_name || "—"}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-4 bg-[#111]">
                        <Mail className="w-3.5 h-3.5 text-[#555] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[#555] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Email</p>
                          <p className="text-[#ccc] text-sm mt-0.5 break-all" style={{ fontFamily: "'Jost', sans-serif" }}>{selected.customer_email || "—"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Complaint */}
                  <div className="border border-[#C9A96E]/10 rounded-lg overflow-hidden">
                    <div className="px-4 py-2 border-b border-[#C9A96E]/10 flex items-center gap-2" style={{ background: "rgba(201,169,110,0.03)" }}>
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      <p className="text-[#888] text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ fontFamily: "'Jost', sans-serif" }}>
                        Complaint Raised
                      </p>
                    </div>
                    <div className="p-4 flex flex-col gap-3 bg-[#111]">
                      <div>
                        <p className="text-[#555] text-xs mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>Issue Type</p>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                          {selected.issue || "—"}
                        </span>
                      </div>
                      <div>
                        <p className="text-[#555] text-xs mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>Description</p>
                        <p className="text-[#aaa] text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>{selected.issue_description || "—"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Resolution */}
                  <div className="border border-[#C9A96E]/20 rounded-lg overflow-hidden">
                    <div className="px-4 py-2 border-b border-[#C9A96E]/15 flex items-center justify-between" style={{ background: "rgba(201,169,110,0.05)" }}>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-[#C9A96E]" />
                        <p className="text-[#C9A96E] text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ fontFamily: "'Jost', sans-serif" }}>
                          Agent Resolution
                        </p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusCls(selected.status)}`}>
                        {selected.status || "—"}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col gap-3 bg-[#111]">
                      {selected.status === "Pending Review" ? (
                        <>
                          <p className="text-amber-400 text-xs font-semibold flex items-center gap-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                            <Clock className="w-3 h-3" /> Manual Override Required
                          </p>
                          <div>
                            <p className="text-[#555] text-xs mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>Resolution Type</p>
                            <select
                              value={overrideRes}
                              onChange={(e) => setOverrideRes(e.target.value)}
                              className="w-full bg-[#0a0a0a] border border-[#C9A96E]/15 rounded px-3 py-2 text-sm text-[#F5F0E8] appearance-none cursor-pointer focus:outline-none focus:border-[#C9A96E]/50"
                              style={{ fontFamily: "'Jost', sans-serif" }}
                            >
                              {resolutionOptions.map((o) => (
                                <option key={o} value={o} style={{ background: "#111", color: "#F5F0E8" }}>{o}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <p className="text-[#555] text-xs mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>Resolution Description</p>
                            <textarea
                              value={overrideDesc}
                              onChange={(e) => setOverrideDesc(e.target.value)}
                              rows={3}
                              className="w-full bg-[#0a0a0a] border border-[#C9A96E]/15 rounded px-3 py-2 text-sm text-[#F5F0E8] resize-none focus:outline-none focus:border-[#C9A96E]/50"
                              style={{ fontFamily: "'Jost', sans-serif" }}
                              placeholder="Describe the resolution..."
                            />
                          </div>
                          <button
                            onClick={submitOverride}
                            disabled={overrideSubmitting}
                            className="btn-gold-filled w-full flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {overrideSubmitting ? "Submitting…" : "Submit Override"}
                          </button>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="text-[#555] text-xs mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>Resolution Type</p>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${resolutionCls(selected.resolution)}`}>
                              {selected.resolution || "—"}
                            </span>
                          </div>
                          <div>
                            <p className="text-[#555] text-xs mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>Description</p>
                            <p className="text-[#aaa] text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                              {selected.resolution_description || "—"}
                            </p>
                          </div>
                        </>
                      )}

                      {/* Confidence bar */}
                      <div className="mt-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[#555] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Confidence Score</p>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${scoreBadge(selected.confidence_score).cls}`}>
                            {scoreBadge(selected.confidence_score).label} — {selected.confidence_score}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full overflow-hidden bg-[#1a1a1a]">
                          <div
                            className="h-1.5 rounded-full bg-[#C9A96E] transition-all duration-700 ease-out support-bar-fill"
                            style={{ width: `${selected.confidence_score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#C9A96E]/10 bg-[#080808] py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div
            className="text-xl tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#F5F0E8" }}
          >
            Vaas<span style={{ color: "#C9A96E" }}>tra</span>
          </div>
          <p className="text-[#444] text-xs tracking-wide" style={{ fontFamily: "'Jost', sans-serif" }}>
            © 2026 VaastraTrendz. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
