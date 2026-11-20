"use client";

import React, { useState } from "react";
import { ArrowUp } from "lucide-react";
import { soundEngine } from "@/lib/audio";
import { ContactModal } from "../contact-modal/contact-modal";
import { BingeDrawer } from "../binge-drawer/binge-drawer";
import { Episode, EPISODES_DATA } from "@/lib/podcast-data";
import { AudioPlayerDock } from "../audio-player-dock/audio-player-dock";

export function Footer() {
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [bingeOpen, setBingeOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(30);

  const scrollToTop = () => {
    soundEngine.playPopSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startPlayback = (targetEpisode: Episode, startAt = 0) => {
    setCurrentEpisode(targetEpisode);
    setIsPlaying(true);
    soundEngine.playEpisodePreview(
      targetEpisode.soundProfile,
      startAt,
      (elapsed, total) => {
        setElapsedSeconds(elapsed);
        setTotalDuration(total);
      },
      () => {
        setIsPlaying(false);
        setElapsedSeconds(0);
      },
    );
  };

  const handlePlayEpisode = (ep: Episode | string) => {
    const targetEpisode =
      typeof ep === "string"
        ? EPISODES_DATA.find((e) => e.id === ep) || EPISODES_DATA[0]
        : ep;

    if (currentEpisode?.id === targetEpisode.id && isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      const resumeAt =
        currentEpisode?.id === targetEpisode.id ? elapsedSeconds : 0;
      startPlayback(targetEpisode, resumeAt);
    }
  };

  const handleSeek = (seconds: number) => {
    setElapsedSeconds(seconds);
    soundEngine.seekTo(seconds);
    if (isPlaying && currentEpisode) {
      startPlayback(currentEpisode, seconds);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      const ep = currentEpisode || EPISODES_DATA[0];
      startPlayback(ep, elapsedSeconds >= totalDuration ? 0 : elapsedSeconds);
    }
  };

  const handleClosePlayer = () => {
    soundEngine.stop();
    setIsPlaying(false);
    setElapsedSeconds(0);
    setCurrentEpisode(null);
  };

  return (
    <>
      <footer className="relative bg-[#101012] text-[#F5F2EB] border-t border-white/10 pt-14 pb-24 sm:pb-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="md:col-span-5 space-y-3">
              <span className="font-display text-xl font-bold tracking-tight text-[#F5F2EB]">
                AudioSphere
              </span>
              <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
                Long-form audio journalism exploring science, comedy, and civic
                history through immersive sound.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Sections
              </h4>
              <ul className="space-y-2 text-sm text-stone-300">
                <li>
                  <a
                    href="#hero"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#facts"
                    className="hover:text-white transition-colors"
                  >
                    Facts
                  </a>
                </li>
                <li>
                  <a
                    href="#explore"
                    className="hover:text-white transition-colors"
                  >
                    Sound
                  </a>
                </li>
                <li>
                  <a
                    href="#episodes"
                    className="hover:text-white transition-colors"
                  >
                    Podcast
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Studio Desk
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Have a research story or guest inquiry for upcoming seasons?
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="px-5 py-2 rounded-full bg-[#FF7B60] text-white text-xs font-semibold tracking-wide hover:bg-[#ff6647] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Contact Studio
                </button>
                <button
                  type="button"
                  onClick={() => setBingeOpen(true)}
                  className="px-5 py-2 rounded-full bg-white/8 hover:bg-white/15 text-stone-200 text-xs font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap"
                >
                  Listen in Order
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>
              &copy; {new Date().getFullYear()} AudioSphere. All rights
              reserved.
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      <AudioPlayerDock
        currentEpisode={currentEpisode}
        isPlaying={isPlaying}
        elapsedSeconds={elapsedSeconds}
        totalDuration={totalDuration}
        onTogglePlay={handleTogglePlay}
        onSeek={handleSeek}
        onClose={handleClosePlayer}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <BingeDrawer
        isOpen={bingeOpen}
        onClose={() => setBingeOpen(false)}
        onPlayEpisode={handlePlayEpisode}
        currentEpisodeId={currentEpisode?.id || null}
      />
    </>
  );
}
