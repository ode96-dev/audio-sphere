"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Play, Pause } from "lucide-react";
import { soundEngine, SoundProfile } from "@/lib/audio";
import {
  AsteriskIcon,
  SoundWaveWidget,
  VintageMicrophoneIllustration,
} from "../vector-icons/vector-icons";
import { SOUND_TEXTURES } from "./sound-textures";

interface ExploringSoundProps {
  onPlayEpisode: (id: string) => void;
  isPlaying?: boolean;
}

export function ExploringSound({
  onPlayEpisode,
  isPlaying = false,
}: ExploringSoundProps) {
  const [activeTexture, setActiveTexture] = useState<SoundProfile>("science");
  const [samplePlaying, setSamplePlaying] = useState(false);

  const toggleMainPlay = () => {
    soundEngine.playPopSound();
    setSamplePlaying(false);
    onPlayEpisode("01");
  };

  const handleTexturePlay = (profile: SoundProfile) => {
    soundEngine.playPopSound();
    if (activeTexture === profile && samplePlaying) {
      soundEngine.stop();
      setSamplePlaying(false);
      return;
    }
    setActiveTexture(profile);
    setSamplePlaying(true);
    soundEngine.playEpisodePreview(profile, 0, undefined, () =>
      setSamplePlaying(false),
    );
  };

  const isWaveActive = isPlaying || samplePlaying;

  return (
    <section
      id="explore"
      className="relative bg-[#161618] text-[#F5F2EB] py-16 sm:py-24 px-6 sm:px-8 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div aria-hidden="true">
              <AsteriskIcon className="w-8 h-8" color="#F5F2EB" />
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.06] text-[#F5F2EB] text-balance max-w-2xl">
              EXPLORING INTERESTING FACTS VIA SOUND
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-lg">
              There is something enduring about learning through sound. In every
              episode, we trace the curious details of our world through careful
              narration and acoustic craft.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <button
                type="button"
                onClick={toggleMainPlay}
                className="group relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C0D0] rounded-2xl p-2"
                aria-label="Play studio microphone preview"
              >
                <VintageMicrophoneIllustration className="w-36 h-52 sm:w-44 sm:h-60 text-stone-300 group-hover:text-white transition-transform duration-300 group-hover:scale-105" />
              </button>

              <div className="space-y-4 w-full sm:w-auto">
                <div className="flex items-center gap-3">
                  <SoundWaveWidget
                    active={isWaveActive}
                    barCount={16}
                    height="h-7"
                    color="#FF7B60"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-stone-400">
                    Audition Acoustic Textures
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SOUND_TEXTURES.map((tex) => {
                      const active = activeTexture === tex.id && samplePlaying;
                      return (
                        <button
                          key={tex.id}
                          type="button"
                          onClick={() => handleTexturePlay(tex.id)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                            active
                              ? "bg-[#FF7B60] text-white border-[#FF7B60]"
                              : "bg-white/4 text-stone-300 border-white/15 hover:border-white/35 hover:text-white"
                          }`}
                        >
                          {active ? `Playing · ${tex.label}` : tex.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] sm:max-w-92.5 aspect-3/4">
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full rounded-[150px] overflow-hidden border border-white/15 shadow-2xl group cursor-pointer"
                onClick={toggleMainPlay}
              >
                <Image
                  src="/assets/images/studio_mic_interview_1791851742261.jpg"
                  alt="Podcast host recording in sunlit apartment studio"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMainPlay();
                    }}
                    aria-label={
                      isPlaying ? "Pause studio audio" : "Play studio audio"
                    }
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FF7B60] text-white flex items-center justify-center shadow-2xl shadow-[#FF7B60]/40 transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 fill-current" />
                    ) : (
                      <Play className="w-7 h-7 fill-current translate-x-0.5" />
                    )}
                  </button>
                </div>
              </motion.div>

              <div
                className="absolute -bottom-3 -left-3 pointer-events-none hidden sm:block"
                aria-hidden="true"
              >
                <AsteriskIcon className="w-8 h-8" color="#25C0D0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
