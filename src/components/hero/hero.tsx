"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useSpring, animated } from "@react-spring/web";
import { Play, Pause, ArrowUpRight } from "lucide-react";
import { soundEngine } from "@/lib/audio";
import Link from "next/link";
import {
  AsteriskIcon,
  HeadphonesIllustration,
  LineFlowerStarburst,
  RotatingStampBadge,
  SoundWaveWidget,
} from "../vector-icons/vector-icons";
import { PLATFORMS } from "./platforms";

interface HeroProps {
  onPlayEpisode: (id: string) => void;
  onOpenBinge: () => void;
  isPlaying?: boolean;
}

export function Hero({
  onPlayEpisode,
  onOpenBinge,
  isPlaying = false,
}: HeroProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Spotify");

  const [portraitSpring, portraitApi] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 1.2, tension: 220, friction: 24 },
  }));

  const handlePlatformClick = (name: string) => {
    soundEngine.playPopSound();
    setSelectedPlatform(name);
  };

  const toggleHeroAudio = () => {
    soundEngine.playPopSound();
    onPlayEpisode("01");
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-10 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 bg-[#161618] text-[#F5F2EB] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[1.04] text-[#F5F2EB] text-balance max-w-4xl mx-auto">
            <span className="inline-flex items-center justify-center flex-wrap gap-x-3 gap-y-1">
              <span>NEW PODCAST</span>
              <span
                className="inline-block animate-spin-slow"
                aria-hidden="true"
              >
                <AsteriskIcon
                  className="w-8 h-8 sm:w-11 sm:h-11"
                  color="#25C0D0"
                />
              </span>
            </span>
            <br />
            <span className="text-[#F5F2EB]">LISTEN IN ORDER!</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-1"
          >
            <div
              className="hidden lg:block gsap-parallax-slow"
              aria-hidden="true"
            >
              <AsteriskIcon className="w-7 h-7 opacity-80" color="#F5F2EB" />
            </div>

            <button
              type="button"
              onClick={toggleHeroAudio}
              className="group relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C0D0] rounded-2xl p-2"
              aria-label={
                isPlaying
                  ? "Pause featured episode preview"
                  : "Play featured episode preview"
              }
            >
              <HeadphonesIllustration className="w-32 h-40 sm:w-36 sm:h-44 text-stone-300 group-hover:text-white transition-transform duration-300 group-hover:scale-105" />
            </button>

            <p className="text-stone-300 text-sm sm:text-[15px] leading-relaxed max-w-xs font-normal">
              <span className="text-[#FF7B60] font-semibold">
                The premier podcast channel
              </span>{" "}
              where creativity meets acoustic storytelling to deliver engaging,
              well-researched conversations.
            </p>

            <button
              type="button"
              onClick={toggleHeroAudio}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/8 hover:bg-white/[0.14] border border-white/15 text-xs font-semibold tracking-wide text-white transition-colors active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#25C0D0]" />
                  <span>Pause Episode 01</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-[#FF7B60] text-[#FF7B60]" />
                  <span>Listen Preview · 0:30</span>
                </>
              )}
            </button>

            <div className="hidden lg:block pt-2" aria-hidden="true">
              <AsteriskIcon className="w-6 h-6 opacity-50" color="#F5F2EB" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.65,
              delay: 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2"
          >
            <animated.div
              style={{
                transform: portraitSpring.scale.to(
                  (s) =>
                    `perspective(900px) rotateX(${portraitSpring.rotateX.get()}deg) rotateY(${portraitSpring.rotateY.get()}deg) scale(${s})`,
                ),
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const rx = -((e.clientY - rect.top - rect.height / 2) / 36);
                const ry = (e.clientX - rect.left - rect.width / 2) / 36;
                portraitApi.start({ rotateX: rx, rotateY: ry, scale: 1.015 });
              }}
              onMouseLeave={() => {
                portraitApi.start({ rotateX: 0, rotateY: 0, scale: 1 });
              }}
              className="relative w-full max-w-[320px] sm:max-w-100 aspect-4/5 flex items-center justify-center"
            >
              <div className="absolute inset-x-4 inset-y-6 flex items-center justify-center pointer-events-none">
                <div
                  className="w-1/2 h-full bg-[#E4DBCD]"
                  style={{
                    borderTopLeftRadius: "170px",
                    borderBottomLeftRadius: "18px",
                  }}
                />
                <div
                  className="w-1/2 h-full bg-[#25C0D0]"
                  style={{
                    borderTopRightRadius: "170px",
                    borderBottomRightRadius: "18px",
                  }}
                />
              </div>

              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                aria-hidden="true"
              >
                <svg width="34" height="28" viewBox="0 0 34 28" fill="none">
                  <polygon points="0,0 34,0 17,28" fill="#FF7B60" />
                </svg>
              </div>

              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center"
                aria-hidden="true"
              >
                <SoundWaveWidget
                  active={isPlaying}
                  barCount={6}
                  height="h-10"
                  color="rgba(255,255,255,0.75)"
                />
              </div>
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center"
                aria-hidden="true"
              >
                <SoundWaveWidget
                  active={isPlaying}
                  barCount={6}
                  height="h-10"
                  color="rgba(255,255,255,0.75)"
                />
              </div>

              <div className="relative z-10 w-[82%] h-[88%] rounded-t-[150px] overflow-hidden shadow-2xl">
                <Image
                  src="/assets/images/hero_host_portrait_1791851741118.jpg"
                  alt="AudioSphere podcast host wearing studio headphones"
                  fill
                  priority
                  className="object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#161618] via-transparent to-transparent opacity-75" />
              </div>
            </animated.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col items-center lg:items-end text-center lg:text-right space-y-6 order-3"
          >
            <div className="gsap-stamp-scroll">
              <RotatingStampBadge size={142} onClick={onOpenBinge} />
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <LineFlowerStarburst
                className="w-11 h-11"
                color="rgba(245,242,235,0.55)"
              />
            </div>

            <div className="w-full max-w-65 flex flex-col items-center lg:items-end">
              <span className="text-xs font-medium text-stone-400 mb-3">
                Available on
              </span>

              <div className="grid grid-cols-2 gap-2 w-full">
                {PLATFORMS.map((platform) => {
                  const isCurrent = selectedPlatform === platform.name;
                  return (
                    <button
                      key={platform.name}
                      type="button"
                      onClick={() => handlePlatformClick(platform.name)}
                      className={`px-3 py-2 text-xs font-medium rounded-full text-center transition-colors cursor-pointer whitespace-nowrap shrink-0 truncate ${
                        isCurrent
                          ? "bg-[#25C0D0] text-[#161618] font-semibold border border-[#25C0D0]"
                          : "bg-transparent text-stone-300 border border-[#25C0D0]/40 hover:border-[#25C0D0] hover:text-white"
                      }`}
                    >
                      {platform.name}
                    </button>
                  );
                })}
              </div>

              <Link
                href={
                  PLATFORMS.find((p) => p.name === selectedPlatform)?.url || "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#25C0D0] hover:underline whitespace-nowrap"
              >
                <span>Open in {selectedPlatform}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
