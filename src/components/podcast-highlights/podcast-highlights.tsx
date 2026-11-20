"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Share2, Check, ChevronDown } from "lucide-react";
import { EPISODES_DATA, Episode } from "@/lib/podcast-data";
import { soundEngine } from "@/lib/audio";

interface PodcastHighlightsProps {
  onPlayEpisode: (episode: Episode) => void;
  currentEpisodeId: string | null;
  isPlaying: boolean;
}

const CATEGORIES = ["All", "Comedy", "Politics", "Science"] as const;

export function PodcastHighlights({
  onPlayEpisode,
  currentEpisodeId,
  isPlaying,
}: PodcastHighlightsProps) {
  const [filter, setFilter] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedNotesId, setExpandedNotesId] = useState<string | null>(null);

  const filteredEpisodes =
    filter === "All"
      ? EPISODES_DATA
      : EPISODES_DATA.filter((ep) => ep.category === filter);

  const handleShare = (id: string) => {
    soundEngine.playPopSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(`${window.location.origin}/#episodes`);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="episodes"
      className="relative bg-[#161618] text-[#F5F2EB] py-16 sm:py-24 px-6 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#25C0D0]">
              Podcast Highlights
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#F5F2EB] leading-[1.08] max-w-2xl text-balance">
              YOUR SOURCE FOR THE HOTTEST NEW PODCASTS UPDATED ALL THE TIME!
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter episodes by category"
            className="inline-flex items-center gap-1 p-1 rounded-full bg-white/6 border border-white/10 self-start md:self-auto"
          >
            {CATEGORIES.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    soundEngine.playPopSound();
                    setFilter(cat);
                  }}
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? "text-[#161618]"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="episode-filter-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-[#F5F2EB]"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredEpisodes.map((ep) => {
              const isCurrent = currentEpisodeId === ep.id;
              const episodePlaying = isCurrent && isPlaying;
              const notesOpen = expandedNotesId === ep.id;

              return (
                <motion.article
                  key={ep.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  style={{ backgroundColor: ep.bg }}
                  className="rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-2xl sm:text-3xl font-bold text-white/90 tabular-nums">
                          {ep.num}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleShare(ep.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/15 hover:bg-black/25 text-xs font-medium text-white transition-colors cursor-pointer whitespace-nowrap"
                          aria-label={`Copy link for ${ep.title}`}
                        >
                          {copiedId === ep.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5" />
                              <span>Share</span>
                            </>
                          )}
                        </button>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white leading-[1.1] text-balance">
                        {ep.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium text-white/90">
                        <span>{ep.host}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{ep.episodeLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{ep.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {ep.duration}
                        </span>
                      </div>

                      <p className="text-sm text-white/85 leading-relaxed max-w-xl">
                        {ep.description}
                      </p>

                      <div className="pt-1 flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={() => onPlayEpisode(ep)}
                          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FF7B60] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:bg-[#ff6647] active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
                        >
                          {episodePlaying ? (
                            <>
                              <Pause className="w-4 h-4 fill-current" />
                              <span>Pause Episode</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 fill-current" />
                              <span>Play Episode</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            soundEngine.playPopSound();
                            setExpandedNotesId(notesOpen ? null : ep.id);
                          }}
                          aria-expanded={notesOpen}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <span>
                            {notesOpen ? "Hide Show Notes" : "Show Notes"}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              notesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {notesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-2 border-t border-white/20 space-y-2">
                              <p className="text-xs font-semibold uppercase tracking-wider text-white/75">
                                Inside This Episode
                              </p>
                              <ul className="space-y-1.5 text-xs sm:text-sm text-white/90">
                                {ep.keyTakeaways.map((note, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2.5"
                                  >
                                    <span className="font-mono text-white/65 tabular-nums">
                                      0{idx + 1}.
                                    </span>
                                    <span>{note}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-white/20 group">
                        <Image
                          src={ep.image}
                          alt={ep.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
