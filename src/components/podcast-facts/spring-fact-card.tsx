"use client";
import { FactMetric } from "@/lib/podcast-data";
import React from "react";
import { ACCESSIBLE_PALETTE } from "./accessible-pallete";
import { animated, useSpring } from "@react-spring/web";
import AnimatedCounter from "./animated-counter";

const SpringFactCard = ({
  metric,
  isSelected,
  inView,
  onSelect,
}: {
  metric: FactMetric;
  isSelected: boolean;
  inView: boolean;
  onSelect: () => void;
}) => {
  const [tilt, api] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 260, friction: 22 },
  }));

  const bg = ACCESSIBLE_PALETTE[metric.id] || metric.bg;

  return (
    <animated.button
      type="button"
      onClick={onSelect}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const rx = -(e.clientY - rect.top - rect.height / 2) / 16;
        const ry = (e.clientX - rect.left - rect.width / 2) / 16;
        api.start({ xys: [rx, ry, 1.03] });
      }}
      onMouseLeave={() => api.start({ xys: [0, 0, 1] })}
      style={{
        backgroundColor: bg,
        transform: tilt.xys.to(
          (x, y, s) =>
            `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`,
        ),
      }}
      className={`w-full text-left rounded-2xl p-5 sm:p-6 text-white cursor-pointer select-none transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#161618] ${
        isSelected
          ? "ring-2 ring-[#161618] shadow-xl"
          : "shadow-md hover:shadow-lg"
      }`}
    >
      <div className="mb-1.5">
        <AnimatedCounter
          target={metric.numericTarget}
          suffix={metric.suffix}
          trigger={inView}
        />
      </div>
      <p className="text-xs sm:text-sm font-semibold text-white/95 leading-snug">
        {metric.label}
      </p>
      <p className="text-xs text-white/80 mt-1 line-clamp-1">
        {metric.summary}
      </p>
    </animated.button>
  );
};

export default SpringFactCard;
