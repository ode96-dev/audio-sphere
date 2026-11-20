"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { soundEngine } from "@/lib/audio";
import { ContactModal } from "../contact-modal/contact-modal";
import { BingeDrawer } from "../binge-drawer/binge-drawer";
import { Episode, EPISODES_DATA } from "@/lib/podcast-data";
import { AudioPlayerDock } from "../audio-player-dock/audio-player-dock";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "facts", label: "Facts" },
  { id: "explore", label: "Sound" },
  { id: "episodes", label: "Podcast" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [bingeOpen, setBingeOpen] = useState<boolean>(false);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(30);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);

      const offsets = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: Math.abs(rect.top - 140) };
      });

      const closest = offsets.reduce((prev, curr) =>
        curr.top < prev.top ? curr : prev,
      );
      setActiveSection(closest.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollToSection = (id: string) => {
    soundEngine.playPopSound();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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

  const handleTogglePlay = () => {
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      const ep = currentEpisode || EPISODES_DATA[0];
      startPlayback(ep, elapsedSeconds >= totalDuration ? 0 : elapsedSeconds);
    }
  };

  const handleSeek = (seconds: number) => {
    setElapsedSeconds(seconds);
    soundEngine.seekTo(seconds);
    if (isPlaying && currentEpisode) {
      startPlayback(currentEpisode, seconds);
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
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
        <div
          className={`pointer-events-auto max-w-6xl mx-auto transition-all duration-300 ${
            scrolled
              ? "bg-[#18181B]/90 backdrop-blur-xl border border-white/12 rounded-full px-5 sm:px-6 py-2.5 shadow-2xl shadow-black/40"
              : "bg-transparent border border-transparent rounded-full px-2 sm:px-4 py-3"
          }`}
        >
          <div className="flex items-center justify-between gap-8">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero");
              }}
              className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#F5F2EB] whitespace-nowrap shrink-0 hover:text-[#FF7B60] transition-colors"
            >
              AudioSphere
            </a>

            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center gap-1 bg-white/4 border border-white/8 rounded-full p-1"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? "text-[#161618]"
                        : "text-stone-300 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-full bg-[#E4DBCD]"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPopSound();
                  setContactOpen(true);
                }}
                className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-full bg-[#FF7B60] text-white hover:bg-[#ff6647] active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                Contact
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playPopSound();
                  setMobileMenuOpen((prev) => !prev);
                }}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white border border-white/15 hover:bg-white/15 transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {scrolled && (
            <div className="mt-2 mx-4 h-[1.5px] bg-white/10 rounded-full overflow-hidden hidden sm:block">
              <motion.div
                style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
                className="h-full bg-linear-to-r from-[#25C0D0] via-[#FF7B60] to-[#E4DBCD]"
              />
            </div>
          )}
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#161618]/98 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between md:hidden"
          >
            <nav className="flex flex-col divide-y divide-white/10">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className="py-4 flex items-baseline justify-between text-left group"
                >
                  <span className="font-display text-2xl font-bold text-[#F5F2EB] group-hover:text-[#FF7B60] transition-colors">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-stone-500">
                    0{idx + 1}
                  </span>
                </motion.button>
              ))}
              <motion.button
                type="button"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBingeOpen(true);
                }}
                className="py-4 flex items-baseline justify-between text-left group"
              >
                <span className="font-display text-2xl font-bold text-[#25C0D0]">
                  Binge in Order
                </span>
                <span className="font-mono text-xs text-[#25C0D0]/70">
                  Archive
                </span>
              </motion.button>
            </nav>

            <div className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-[#FF7B60] text-white font-semibold text-base tracking-wide active:scale-98 transition-transform"
              >
                Contact the Studio
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
