"use client";

import { AudioPlayerDock } from "@/components/audio-player-dock/audio-player-dock";
import { BingeDrawer } from "@/components/binge-drawer/binge-drawer";
import {
  CurveDarkToSand,
  CurveSandToDark,
} from "@/components/curved-transition/curved-transition";
import { Hero } from "@/components/hero/hero";
import { PodcastFacts } from "@/components/podcast-facts/podcast-facts";
import { soundEngine } from "@/lib/audio";
import { Episode, EPISODES_DATA } from "@/lib/podcast-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [bingeOpen, setBingeOpen] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(30);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(".gsap-stamp-scroll", {
        rotation: 90,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to(".gsap-parallax-slow", {
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    });

    return () => ctx.revert();
  }, []);

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
    <main className="min-h-screen bg-[#161618] text-[#F5F2EB] overflow-x-clip selection:bg-[#FF7B60] selection:text-white">
      <Hero
        onPlayEpisode={(id) => handlePlayEpisode(id)}
        onOpenBinge={() => setBingeOpen(true)}
        isPlaying={isPlaying && currentEpisode?.id === "01"}
      />

      <CurveDarkToSand />

      <PodcastFacts />

      <CurveSandToDark />

      <AudioPlayerDock
        currentEpisode={currentEpisode}
        isPlaying={isPlaying}
        elapsedSeconds={elapsedSeconds}
        totalDuration={totalDuration}
        onTogglePlay={handleTogglePlay}
        onSeek={handleSeek}
        onClose={handleClosePlayer}
      />

      <BingeDrawer
        isOpen={bingeOpen}
        onClose={() => setBingeOpen(false)}
        onPlayEpisode={handlePlayEpisode}
        currentEpisodeId={currentEpisode?.id || null}
      />
    </main>
  );
}
