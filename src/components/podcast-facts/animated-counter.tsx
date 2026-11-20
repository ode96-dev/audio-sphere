"use client";

import { animated, useSpring } from "@react-spring/web";

const AnimatedCounter = ({
  target,
  suffix,
  trigger,
}: {
  target: number;
  suffix: string;
  trigger: boolean;
}) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: trigger ? target : 0 },
    delay: 80,
    config: { mass: 1, tension: 75, friction: 18 },
  });

  return (
    <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums">
      <animated.span>{number.to((n) => Math.floor(n))}</animated.span>
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
