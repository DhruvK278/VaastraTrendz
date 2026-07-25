"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Search,
  RefreshCw,
  Package,
  Gift,
  MailCheck,
  Zap,
  Loader2,
  Bot,
  User,
} from "lucide-react";

const API_BASE =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3001/api/support"
    : "https://vaastratrendz-backend.onrender.com/api/support";

/* ── Types ──────────────────────────────────────────────── */
interface ActionExecuted {
  tool: string;
  input: Record<string, any>;
  output: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  actions?: ActionExecuted[];
  timestamp: Date;
}

/* ── Tool icon map ──────────────────────────────────────── */
const toolIconMap: Record<string, any> = {
  lookup_order: Search,
  process_refund: RefreshCw,
  initiate_replacement: Package,
  issue_discount: Gift,
  send_apology_email: MailCheck,
};

/* ── Tool label helper ──────────────────────────────────── */
const toolLabel = (name: string) =>
  name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/* ═══════════════════════════════════════════════════════════
   CHAT WIDGET
   ═══════════════════════════════════════════════════════════ */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── Auto-scroll to latest message ───────────── */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  /* ── Focus input when chat opens ─────────────── */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* ── Add greeting on first open ──────────────── */
  const handleOpen = () => {
    setIsOpen(true);
    setHasInteracted(true);
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! 👋 Welcome to VaastraTrendz support. I'm here to help with any issues regarding your orders — sizing, quality, shipping, refunds, and more. How can I assist you today?",
          timestamp: new Date(),
        },
      ]);
    }
  };

  /* ── Send message ────────────────────────────── */
  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Build the history payload (exclude the greeting if it's the system greeting)
      const payload = {
        messages: updatedMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };

      const res = await axios.post(`${API_BASE}/chat`, payload);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: res.data.reply,
        actions:
          res.data.actions_executed?.length > 0
            ? res.data.actions_executed
            : undefined,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I'm sorry, I encountered an error: ${errorMsg}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* ═══════════════════ RENDER ═══════════════════ */
  return (
    <>
      {/* ── Chat Window ─────────────────────────── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 animate-chat-slide-up"
          style={{
            width: "min(400px, calc(100vw - 48px))",
            height: "min(560px, calc(100vh - 140px))",
          }}
        >
          <div
            className="flex flex-col h-full rounded-xl overflow-hidden shadow-2xl"
            style={{
              background: "#0E0E0E",
              border: "1px solid rgba(201, 169, 110, 0.2)",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(201,169,110,0.05)",
            }}
          >
            {/* ── Header ──────────────────────── */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,169,110,0.08) 0%, rgba(201,169,110,0.03) 100%)",
                borderBottom: "1px solid rgba(201,169,110,0.15)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201,169,110,0.2) 0%, rgba(201,169,110,0.05) 100%)",
                    border: "1px solid rgba(201,169,110,0.3)",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-[#C9A96E]" />
                </div>
                <div>
                  <p
                    className="text-[#F5F0E8] text-sm font-medium leading-tight"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    VaastraTrendz AI
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span
                      className="text-emerald-400 text-[10px]"
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#666] hover:text-[#C9A96E] hover:bg-[#C9A96E]/10 transition-all duration-200"
                id="chat-close-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Messages ────────────────────── */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 gold-scrollbar"
              style={{ background: "#0A0A0A" }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`animate-chat-message-in flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Assistant avatar */}
                  {msg.role === "assistant" && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-2"
                      style={{
                        background: "rgba(201,169,110,0.1)",
                        border: "1px solid rgba(201,169,110,0.25)",
                      }}
                    >
                      <Bot className="w-3 h-3 text-[#C9A96E]" />
                    </div>
                  )}

                  <div
                    className="flex flex-col max-w-[80%]"
                  >
                    {/* ── Action Cards (before the text reply) ── */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-col gap-1.5 mb-2">
                        {msg.actions.map((action, aIdx) => {
                          const IconComp = toolIconMap[action.tool] || Zap;
                          let parsed: any = {};
                          try {
                            parsed = JSON.parse(action.output);
                          } catch {
                            parsed = { details: action.output };
                          }
                          const isSuccess = parsed.success !== false;
                          return (
                            <div
                              key={aIdx}
                              className="rounded-lg px-3 py-2"
                              style={{
                                background: "rgba(201,169,110,0.04)",
                                border: "1px solid rgba(201,169,110,0.12)",
                              }}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                    isSuccess
                                      ? "bg-[#C9A96E]/15 text-[#C9A96E]"
                                      : "bg-rose-400/15 text-rose-400"
                                  }`}
                                >
                                  <IconComp className="w-2.5 h-2.5" />
                                </div>
                                <span
                                  className="text-[#C9A96E] text-[10px] font-semibold tracking-wider uppercase"
                                  style={{ fontFamily: "'Jost', sans-serif" }}
                                >
                                  {toolLabel(action.tool)}
                                </span>
                              </div>
                              <p
                                className={`text-[11px] leading-relaxed ${
                                  isSuccess ? "text-emerald-400/80" : "text-rose-400/80"
                                }`}
                                style={{ fontFamily: "'Jost', sans-serif" }}
                              >
                                {isSuccess ? "✓" : "✗"}{" "}
                                {parsed.details || parsed.error || action.output}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* ── Message Bubble ── */}
                    <div
                      className="rounded-xl px-3.5 py-2.5"
                      style={
                        msg.role === "user"
                          ? {
                              background:
                                "linear-gradient(135deg, rgba(201,169,110,0.2) 0%, rgba(201,169,110,0.1) 100%)",
                              border: "1px solid rgba(201,169,110,0.25)",
                              borderBottomRightRadius: "4px",
                            }
                          : {
                              background: "#161616",
                              border: "1px solid rgba(255,255,255,0.06)",
                              borderBottomLeftRadius: "4px",
                            }
                      }
                    >
                      <p
                        className={`text-[13px] leading-relaxed whitespace-pre-wrap ${
                          msg.role === "user" ? "text-[#F5F0E8]" : "text-[#ccc]"
                        }`}
                        style={{ fontFamily: "'Jost', sans-serif" }}
                      >
                        {msg.content}
                      </p>
                    </div>

                    {/* Timestamp */}
                    <p
                      className={`text-[10px] text-[#444] mt-1 ${
                        msg.role === "user" ? "text-right" : "text-left"
                      }`}
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* User avatar */}
                  {msg.role === "user" && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ml-2"
                      style={{
                        background: "rgba(201,169,110,0.15)",
                        border: "1px solid rgba(201,169,110,0.3)",
                      }}
                    >
                      <User className="w-3 h-3 text-[#C9A96E]" />
                    </div>
                  )}
                </div>
              ))}

              {/* ── Typing indicator ──────────── */}
              {isLoading && (
                <div className="flex justify-start animate-chat-message-in">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-2"
                    style={{
                      background: "rgba(201,169,110,0.1)",
                      border: "1px solid rgba(201,169,110,0.25)",
                    }}
                  >
                    <Bot className="w-3 h-3 text-[#C9A96E]" />
                  </div>
                  <div
                    className="rounded-xl px-4 py-3 flex items-center gap-1"
                    style={{
                      background: "#161616",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] chat-typing-dot" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] chat-typing-dot" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] chat-typing-dot" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input Bar ───────────────────── */}
            <div
              className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
              style={{
                background: "#0E0E0E",
                borderTop: "1px solid rgba(201,169,110,0.12)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message…"
                disabled={isLoading}
                className="flex-1 bg-[#161616] border border-[#C9A96E]/10 rounded-lg px-3.5 py-2.5 text-[13px] text-[#F5F0E8] placeholder-[#444] focus:outline-none focus:border-[#C9A96E]/40 transition-colors disabled:opacity-50"
                style={{ fontFamily: "'Jost', sans-serif" }}
                id="chat-input"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: input.trim() && !isLoading
                    ? "linear-gradient(135deg, #C9A96E 0%, #B8944D 100%)"
                    : "rgba(201,169,110,0.1)",
                  border: "1px solid rgba(201,169,110,0.3)",
                }}
                id="chat-send-btn"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 text-[#C9A96E] animate-spin" />
                ) : (
                  <Send
                    className={`w-3.5 h-3.5 ${
                      input.trim() ? "text-[#0A0A0A]" : "text-[#C9A96E]/50"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating Chat Bubble ─────────────── */}
      <button
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          !hasInteracted ? "animate-chat-pulse" : ""
        }`}
        style={{
          background: isOpen
            ? "#161616"
            : "linear-gradient(135deg, #C9A96E 0%, #B8944D 100%)",
          border: isOpen
            ? "1px solid rgba(201,169,110,0.3)"
            : "1px solid rgba(201,169,110,0.6)",
          boxShadow: isOpen
            ? "0 4px 20px rgba(0,0,0,0.4)"
            : "0 4px 20px rgba(201,169,110,0.3)",
        }}
        id="chat-toggle-btn"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-[#C9A96E]" />
        ) : (
          <MessageSquare className="w-5 h-5 text-[#0A0A0A]" />
        )}
      </button>
    </>
  );
}
