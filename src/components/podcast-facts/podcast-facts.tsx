"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FACTS_METRICS } from "@/lib/podcast-data";
import { soundEngine } from "@/lib/audio";
import SpringFactCard from "./spring-fact-card";

export function PodcastFacts() {
  const [selectedId, setSelectedId] = useState<string>(FACTS_METRICS[0].id);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const selectedMetric =
    FACTS_METRICS.find((m) => m.id === selectedId) || FACTS_METRICS[0];

  return (
    <section
      ref={sectionRef}
      id="facts"
      className="relative bg-[#E4DBCD] text-[#161618] py-16 sm:py-24 px-6 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#161618]/65">
              Podcast Facts
            </p>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.08] text-[#161618] text-balance">
              ENGAGING AUDIO FILLED WITH FASCINATING FACTS THAT KEEP YOU COMING
              BACK FOR MORE.
            </h2>

            <p className="text-[#161618]/75 text-sm sm:text-base leading-relaxed max-w-xl">
              Every episode pairs investigative rigor with spatial sound design,
              turning complex research into unhurried, unforgettable listening.
            </p>

            <div className="pt-5 mt-5 border-t border-[#161618]/15 min-h-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMetric.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-1"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-sm font-semibold tabular-nums text-[#161618]">
                      {selectedMetric.numericTarget}
                      {selectedMetric.suffix}
                    </span>
                    <span className="text-xs font-medium text-[#161618]/65">
                      · {selectedMetric.label}
                    </span>
                  </div>
                  <p className="text-sm text-[#161618]/85 leading-relaxed">
                    {selectedMetric.context}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FACTS_METRICS.map((metric, idx) => (
                <div
                  key={metric.id}
                  className={
                    idx === FACTS_METRICS.length - 1 ? "sm:col-span-2" : ""
                  }
                >
                  <SpringFactCard
                    metric={metric}
                    isSelected={selectedId === metric.id}
                    inView={inView}
                    onSelect={() => {
                      soundEngine.playPopSound();
                      setSelectedId(metric.id);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
