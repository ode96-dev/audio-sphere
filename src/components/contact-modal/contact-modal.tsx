"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { soundEngine } from "@/lib/audio";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Guest Appearance",
    message: "",
  });
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.message.trim().length < 10) {
      setError("Please include a brief note (at least 10 characters).");
      return;
    }

    setError("");
    soundEngine.playPopSound();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError("");
    setFormData({
      name: "",
      email: "",
      topic: "Guest Appearance",
      message: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative w-full max-w-lg bg-[#18181B] border border-white/15 rounded-3xl p-6 sm:p-8 text-[#F5F2EB] shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close contact dialog"
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#25C0D0]/15 text-[#25C0D0] flex items-center justify-center mx-auto border border-[#25C0D0]/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#F5F2EB]">
                  Message Received
                </h3>
                <p className="text-stone-300 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name}. Our editorial desk reviews
                  listener pitches and partnership notes within one business
                  day.
                </p>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="mt-2 px-6 py-2.5 rounded-full bg-[#FF7B60] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff6647] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#FF7B60] mb-1">
                    Studio Desk
                  </p>
                  <h3
                    id="contact-modal-title"
                    className="font-display text-2xl font-extrabold uppercase tracking-tight text-[#F5F2EB]"
                  >
                    Connect With The Studio
                  </h3>
                  <p className="text-stone-400 text-xs sm:text-sm mt-1">
                    Pitch a guest story, inquire about sponsorships, or suggest
                    a topic.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-stone-300 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/12 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#25C0D0] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-stone-300 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@domain.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/12 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#25C0D0] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs font-medium text-stone-300 mb-1.5"
                    >
                      Topic of Inquiry
                    </label>
                    <select
                      id="contact-topic"
                      value={formData.topic}
                      onChange={(e) =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#232328] border border-white/12 text-white text-sm focus:outline-none focus:border-[#25C0D0] transition-colors"
                    >
                      <option value="Guest Appearance">Guest Appearance</option>
                      <option value="Sponsorship">
                        Sponsorship & Partnerships
                      </option>
                      <option value="Press Inquiry">Press & Media</option>
                      <option value="Listener Topic">
                        Listener Fact Suggestion
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-stone-300 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      required
                      placeholder="Share your topic, background, or collaboration details..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/12 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#25C0D0] transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-[#FF7B60]"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#FF7B60] hover:bg-[#ff6647] active:scale-98 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
