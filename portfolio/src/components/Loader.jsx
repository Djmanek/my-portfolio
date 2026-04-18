import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const bootLogs = [
  "INITIALIZING CORE SYSTEM...",
  "LINKING NEURAL INTERFACE...",
  "SCANNING MEMORY BANKS...",
  "DECRYPTING SECURE CHANNELS...",
  "OVERRIDING SECURITY LAYERS...",
  "LOADING VISUAL ENGINE...",
  "STABILIZING UI MATRIX...",
  "COMPILING INTERACTIVE MODULES...",
  "MOUNTING PORTFOLIO NODES...",
  "SYNCING TERMINAL PROTOCOLS...",
  "AUTHENTICATING USER SHELL...",
  "FINALIZING SYSTEM STATE...",
];

export default function Loader({ onFinish }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const backgroundDots = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 1.5 + Math.random() * 2,
      })),
    []
  );

  useEffect(() => {
    let i = 0;

    const logInterval = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, `> ${bootLogs[i]}`];
        return next.slice(-12);
      });

      i += 1;
      if (i >= bootLogs.length) {
        clearInterval(logInterval);
      }
    }, 180);

    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = prev < 70 ? 3 : prev < 90 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      const t = setTimeout(() => setGlitch(false), 120);
      return () => clearTimeout(t);
    }, 1800);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const t1 = setTimeout(() => setShowFinal(true), 400);
      const t2 = setTimeout(() => onFinish(), 2200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [progress, onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: "blur(14px)" }}
        transition={{ duration: 0.9 }}
        className={`fixed inset-0 z-[9999] overflow-hidden bg-black text-green-400 font-mono ${
          glitch ? "brightness-125 contrast-125" : ""
        }`}
      >
        {/* Base cyber glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.12),transparent_45%),radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_35%)]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(34,197,94,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.55)_1px,transparent_1px)] bg-[size:42px_42px]" />

        {/* Scanlines */}
        <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_50%)] bg-[size:100%_4px]" />

        {/* Moving sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(34,197,94,0.08),transparent)]"
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles */}
        {backgroundDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute h-1 w-1 rounded-full bg-green-400/70"
            style={{ top: dot.top, left: dot.left }}
            animate={{ opacity: [0.15, 0.9, 0.15], scale: [1, 1.8, 1] }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Corner markers */}
        <div className="absolute left-6 top-6 h-10 w-10 border-l border-t border-green-400/50" />
        <div className="absolute right-6 top-6 h-10 w-10 border-r border-t border-green-400/50" />
        <div className="absolute bottom-6 left-6 h-10 w-10 border-b border-l border-green-400/50" />
        <div className="absolute bottom-6 right-6 h-10 w-10 border-b border-r border-green-400/50" />

        {/* Header */}
        <div className="absolute left-0 top-0 flex w-full items-center justify-between border-b border-green-400/15 px-6 py-3 text-xs tracking-[0.25em] text-green-300/80">
          <span>DEVOS / BOOT SEQUENCE</span>
          <span>STATUS :: INITIALIZING</span>
        </div>

        {/* Log area */}
        <div className="absolute left-8 top-20 w-[min(760px,85vw)]">
          <div className="mb-4 text-sm tracking-[0.3em] text-orange-400/90">
            TERMINAL STREAM
          </div>

          <div className="rounded-2xl border border-green-400/15 bg-black/35 p-5 shadow-[0_0_30px_rgba(34,197,94,0.08)] backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs text-green-300/70">
                root@devos:~ / secure-boot
              </span>
            </div>

            <div className="min-h-[260px] space-y-2 text-sm md:text-base">
              {lines.map((line, i) => (
                <motion.div
                  key={`${line}-${i}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22 }}
                  className="text-green-400/95"
                >
                  {line}
                </motion.div>
              ))}

              {!showFinal && (
                <div className="text-green-300">
                  <span className="animate-pulse">▋</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right-side diagnostics */}
        <div className="absolute right-8 top-24 hidden w-[320px] rounded-2xl border border-orange-400/15 bg-black/30 p-5 text-xs text-orange-300/85 shadow-[0_0_24px_rgba(249,115,22,0.08)] backdrop-blur-sm md:block">
          <div className="mb-4 tracking-[0.28em]">SYSTEM DIAGNOSTICS</div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>CORE TEMP</span>
              <span>72°C</span>
            </div>
            <div className="flex justify-between">
              <span>NETWORK</span>
              <span>STABLE</span>
            </div>
            <div className="flex justify-between">
              <span>SECURITY</span>
              <span>OVERRIDE</span>
            </div>
            <div className="flex justify-between">
              <span>UI ENGINE</span>
              <span>ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span>AUTH STATE</span>
              <span>GRANTED</span>
            </div>
          </div>
        </div>

        {/* Bottom status */}
        <div className="absolute bottom-12 left-8 right-8">
          <div className="mb-3 flex items-center justify-between text-xs tracking-[0.2em] text-green-300/75">
            <span>BOOT PROGRESS</span>
            <span>{progress}%</span>
          </div>

          <div className="h-[6px] w-full overflow-hidden rounded-full bg-green-950/70">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 via-orange-400 to-green-300 shadow-[0_0_18px_rgba(34,197,94,0.85)]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.12 }}
            />
          </div>
        </div>

        {/* Final cinematic message */}
        <AnimatePresence>
          {showFinal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{ opacity: [0.75, 1, 0.75] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                  className="mb-4 text-sm tracking-[0.55em] text-orange-400"
                >
                  SYSTEM STATUS
                </motion.div>

                <div className="bg-black/35 px-8 py-6 backdrop-blur-sm">
                  <motion.h1
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold tracking-[0.22em] text-green-300 md:text-5xl"
                  >
                    SYSTEM OVERRIDE COMPLETE
                  </motion.h1>

                  <motion.p
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.28 }}
                    className="mt-4 text-sm tracking-[0.42em] text-orange-300 md:text-lg"
                  >
                    ACCESS GRANTED — WELCOME
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}