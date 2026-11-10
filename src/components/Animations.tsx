"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ─── RevealOnScroll ─── */
export function RevealOnScroll({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const transforms = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-x-0 translate-y-0 opacity-100 scale-100" : `opacity-0 ${transforms[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── AnimatedCounter ─── */
export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

/* ─── GradientText ─── */
export function GradientText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-[#c9a84c] via-[#f0d78c] to-[#c9a84c] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient ${className}`}
    >
      {children}
    </span>
  );
}

/* ─── FloatingOrbs ─── */
export function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 -left-20 h-72 w-72 animate-float-slow rounded-full bg-[#c9a84c]/5 blur-[100px]" />
      <div className="absolute top-1/2 -right-20 h-96 w-96 animate-float-slower rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute -bottom-20 left-1/3 h-64 w-64 animate-float rounded-full bg-purple-500/5 blur-[80px]" />
    </div>
  );
}

/* ─── GlowCard ─── */
export function GlowCard({
  children,
  className = "",
  glowColor = "#c9a84c",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    function handleMove(e: MouseEvent) {
      const rect = card!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setStyle({
        background: `radial-gradient(300px circle at ${x}px ${y}px, ${glowColor}12, transparent 60%)`,
      });
    }
    function handleLeave() {
      setStyle({});
    }
    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, [glowColor]);

  return (
    <div ref={cardRef} className={`group relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300" style={style} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─── StaggeredReveal ─── */
export function StaggerReveal({
  children,
  className = "",
  staggerMs = 100,
}: {
  children: ReactNode[];
  className?: string;
  staggerMs?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <RevealOnScroll key={i} delay={i * staggerMs}>
          {child}
        </RevealOnScroll>
      ))}
    </div>
  );
}

/* ─── ParallaxSection ─── */
export function ParallaxSection({
  children,
  className = "",
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      if (scrolled > 0) {
        setOffset(scrolled * speed);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div style={{ transform: `translateY(${offset}px)` }}>
        {children}
      </div>
    </div>
  );
}

/* ─── TypewriterText ─── */
export function TypewriterText({
  text,
  className = "",
  speed = 50,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const timer = setInterval(() => {
            if (i < text.length) {
              setDisplayed(text.slice(0, i + 1));
              i++;
            } else {
              clearInterval(timer);
              setDone(true);
            }
          }, speed);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      <span className={`inline-block w-[3px] h-[1em] ml-0.5 bg-current align-middle ${done ? "animate-blink" : ""}`} />
    </span>
  );
}

/* ─── PulseGlow ─── */
export function PulseGlow({
  children,
  className = "",
  color = "#c9a84c",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute -inset-1 animate-pulse rounded-2xl opacity-20 blur-lg"
        style={{ backgroundColor: color }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ─── MagneticButton ─── */
export function MagneticButton({
  children,
  href,
  className = "",
  target,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  target?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el!.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    }
    function handleLeave() {
      el!.style.transform = "translate(0, 0)";
    }
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </a>
  );
}

/* ─── ScrollProgress ─── */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[100] h-[2px] bg-[#c9a84c] transition-all duration-150"
      style={{ width: `${progress}%` }}
    />
  );
}

/* ─── Tilt3D ─── */
export function Tilt3D({
  children,
  className = "",
  maxTilt = 5,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el!.style.transform = `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale(1.02)`;
    }
    function handleLeave() {
      el!.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    }
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [maxTilt]);

  return (
    <div ref={ref} className={`transition-transform duration-200 ease-out ${className}`}>
      {children}
    </div>
  );
}
