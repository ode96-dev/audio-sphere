"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play } from "lucide-react";
import { EPISODES_DATA, Episode } from "@/lib/podcast-data";
import { soundEngine } from "@/lib/audio";

interface BingeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayEpisode: (episode: Episode) => void;
  currentEpisodeId: string | null;
}

export function BingeDrawer({
  isOpen,
  onClose,
  onPlayEpisode,
  currentEpisodeId,
}: BingeDrawerProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

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
            aria-labelledby="binge-drawer-title"
            className="relative w-full max-w-xl bg-[#18181B] border border-white/15 rounded-3xl p-6 sm:p-8 text-[#F5F2EB] shadow-2xl max-h-[88vh] flex flex-col"
          >
            <div className="flex items-start justify-between mb-5 pb-4 border-b border-white/10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#25C0D0] mb-1">
                  Sequential Listening
                </p>
                <h3
                  id="binge-drawer-title"
                  className="font-display text-2xl font-extrabold uppercase tracking-tight text-[#F5F2EB]"
                >
                  Listen in Order
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm mt-1">
                  Start from Episode 01 to follow connected threads across the
                  season.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close playlist dialog"
                className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
              {EPISODES_DATA.map((ep) => {
                const isSelected = currentEpisodeId === ep.id;
                return (
                  <button
                    key={ep.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playPopSound();
                      onPlayEpisode(ep);
                      onClose();
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-colors cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-white/12 border-[#25C0D0]"
                        : "bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 text-white"
                        style={{ backgroundColor: ep.bg }}
                      >
                        {ep.num}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-[#F5F2EB] truncate">
                          {ep.title}
                        </h4>
                        <p className="text-xs text-stone-400 mt-0.5 truncate">
                          {ep.host} · {ep.category} ·{" "}
                          <span className="font-mono tabular-nums">
                            {ep.duration}
                          </span>
                        </p>
                      </div>
                    </div>

                    <span className="w-9 h-9 rounded-full bg-[#FF7B60] text-white flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
              <span>Sequential archive</span>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPopSound();
                  onPlayEpisode(EPISODES_DATA[0]);
                  onClose();
                }}
                className="font-semibold text-[#FF7B60] hover:underline cursor-pointer"
              >
                Start from Episode 01
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
