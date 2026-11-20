"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, ArrowUpRight } from "lucide-react";
import { HOSTS_DATA } from "@/lib/podcast-data";
import { soundEngine } from "@/lib/audio";
import {
  AsteriskIcon,
  LineFlowerStarburst,
  SoundWaveWidget,
} from "../vector-icons/vector-icons";

interface SoundWavesGalleryProps {
  onPlayEpisode: (id: string) => void;
  isPlaying?: boolean;
  elapsedSeconds?: number;
}

function formatTime(sec: number): string {
  const mins = Math.floor(sec / 60);
  const rem = Math.floor(sec % 60);
  return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
}

export function SoundWavesGallery({
  onPlayEpisode,
  isPlaying = false,
  elapsedSeconds = 0,
}: SoundWavesGalleryProps) {
  const [activeHostId, setActiveHostId] = useState<string>(HOSTS_DATA[0].id);

  const selectedHost =
    HOSTS_DATA.find((h) => h.id === activeHostId) || HOSTS_DATA[0];

  const toggleSoundWavePlay = () => {
    soundEngine.playPopSound();
    onPlayEpisode("02");
  };

  return (
    <section className="relative bg-[#161618] text-[#F5F2EB] py-16 sm:py-24 px-6 sm:px-8 overflow-x-clip">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-4">
            <button
              type="button"
              onClick={toggleSoundWavePlay}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.07] hover:bg-white/12 border border-white/12 cursor-pointer transition-colors active:scale-98"
              aria-label={
                isPlaying
                  ? "Pause featured sound wave"
                  : "Play featured sound wave"
              }
            >
              <span className="w-7 h-7 rounded-full bg-[#FF7B60] text-white flex items-center justify-center shrink-0">
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                )}
              </span>
              <SoundWaveWidget
                active={isPlaying}
                barCount={16}
                height="h-5"
                color="#25C0D0"
              />
              <span className="text-xs font-mono text-stone-300 pl-1 tabular-nums">
                {formatTime(elapsedSeconds)} / 00:30
              </span>
            </button>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#25C0D0]">
                Sound Waves of Fun Facts
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#F5F2EB] leading-[1.08] max-w-xl text-balance">
                ENGAGING AUDIO FILLED WITH INTERESTING FACTS
              </h2>
            </div>
          </div>

          <div
            className="hidden lg:flex items-center gap-4 shrink-0"
            aria-hidden="true"
          >
            <LineFlowerStarburst
              className="w-14 h-14"
              color="rgba(245,242,235,0.6)"
            />
            <AsteriskIcon className="w-8 h-8" color="#FF7B60" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
          {HOSTS_DATA.map((host, idx) => {
            const isSelected = activeHostId === host.id;
            return (
              <button
                key={host.id}
                type="button"
                onClick={() => {
                  soundEngine.playPopSound();
                  setActiveHostId(host.id);
                }}
                className={`relative group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C0D0] rounded-[110px] transition-transform duration-300 ${
                  idx % 2 === 1 ? "md:translate-y-5" : "md:-translate-y-2"
                }`}
                aria-pressed={isSelected}
              >
                <div
                  className={`relative w-full aspect-[1/1.95] rounded-[90px] sm:rounded-[110px] overflow-hidden border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-[#25C0D0] shadow-xl shadow-[#25C0D0]/15"
                      : "border-white/15 hover:border-white/40"
                  }`}
                >
                  <Image
                    src={host.image}
                    alt={`${host.name}, ${host.role}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />

                  <div className="absolute bottom-5 inset-x-4 text-center text-white">
                    <p className="text-xs sm:text-sm font-bold tracking-tight leading-tight truncate">
                      {host.name}
                    </p>
                    <p className="text-[11px] text-stone-300 mt-0.5 truncate">
                      {host.role}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 pt-6 border-t border-white/12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedHost.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-2xl">
                <p className="text-xs font-medium text-[#25C0D0]">
                  {selectedHost.name} · {selectedHost.role}
                </p>
                <p className="text-base sm:text-lg font-medium text-[#F5F2EB] leading-snug">
                  &ldquo;{selectedHost.quote}&rdquo;
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playPopSound();
                  onPlayEpisode(selectedHost.featuredEpisodeId);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/8 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <span>Hear Featured Episode</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF7B60]" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
