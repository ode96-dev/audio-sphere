"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Episode } from "@/lib/podcast-data";
import { soundEngine } from "@/lib/audio";
import { SoundWaveWidget } from "../vector-icons/vector-icons";

interface AudioPlayerDockProps {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  elapsedSeconds: number;
  totalDuration: number;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onClose: () => void;
}

function formatClock(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function AudioPlayerDock({
  currentEpisode,
  isPlaying,
  elapsedSeconds,
  totalDuration,
  onTogglePlay,
  onSeek,
  onClose,
}: AudioPlayerDockProps) {
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);

  const speeds = [1, 1.25, 1.5];

  const handleSpeedChange = () => {
    soundEngine.playPopSound();
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    soundEngine.setPlaybackRate(next);
  };

  const handleMuteToggle = () => {
    const next = !muted;
    setMuted(next);
    soundEngine.setMuted(next);
  };

  const progressPct =
    totalDuration > 0
      ? Math.min(100, (elapsedSeconds / totalDuration) * 100)
      : 0;

  return (
    <AnimatePresence>
      {currentEpisode && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-3 inset-x-3 sm:inset-x-6 max-w-4xl mx-auto z-40"
        >
          <div className="bg-[#1B1B1E]/95 backdrop-blur-xl border border-white/15 rounded-2xl px-3.5 py-2.5 sm:px-5 sm:py-3 shadow-2xl text-[#F5F2EB]">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-[11px] font-mono text-stone-400 tabular-nums w-10">
                {formatClock(elapsedSeconds)}
              </span>
              <input
                type="range"
                aria-label="Seek preview timeline"
                min={0}
                max={totalDuration}
                step={0.5}
                value={elapsedSeconds}
                onChange={(e) => onSeek(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #FF7B60 ${progressPct}%, rgba(255,255,255,0.18) ${progressPct}%)`,
                }}
                className="w-full h-1 rounded-full appearance-none cursor-pointer accent-[#FF7B60]"
              />
              <span className="text-[11px] font-mono text-stone-400 tabular-nums w-10 text-right">
                {formatClock(totalDuration)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/15">
                  <Image
                    src={currentEpisode.image}
                    alt={currentEpisode.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold truncate text-[#F5F2EB]">
                    {currentEpisode.title}
                  </p>
                  <p className="text-[11px] text-stone-400 truncate">
                    {currentEpisode.host} · {currentEpisode.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onSeek(Math.max(0, elapsedSeconds - 5))}
                  className="p-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Rewind 5 seconds"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onTogglePlay}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FF7B60] text-white flex items-center justify-center hover:bg-[#ff6647] active:scale-95 transition-all cursor-pointer"
                  aria-label={isPlaying ? "Pause episode" : "Play episode"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current translate-x-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onSeek(Math.min(totalDuration - 0.5, elapsedSeconds + 5))
                  }
                  className="p-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Forward 5 seconds"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleSpeedChange}
                  className="hidden sm:inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Change playback speed"
                >
                  {speed}x
                </button>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden md:flex items-center" aria-hidden="true">
                  <SoundWaveWidget
                    active={isPlaying && !muted}
                    barCount={7}
                    height="h-4"
                    color="#25C0D0"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleMuteToggle}
                  className="hidden sm:inline-flex p-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
                  aria-label={muted ? "Unmute audio" : "Mute audio"}
                >
                  {muted ? (
                    <VolumeX className="w-4 h-4 text-[#FF7B60]" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close player dock"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
