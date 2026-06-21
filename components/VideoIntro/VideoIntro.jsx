"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import CinematicLayer from "@/components/CinematicLayer/CinematicLayer";
import styles from "./VideoIntro.module.css";

/**
 * VideoIntro — split cinematic hero
 *  - Left: "open to work" badge, name, role, skill pills, CTAs
 *  - Right: portrait talking-head video (4K), softly blended into the bg
 *  - Dark bokeh particle background (Three.js) floating over the whole hero
 *  - GSAP entrance timeline, glassmorphism video controls, scroll indicator
 */
export default function VideoIntro({
  src = "/hero_new4k.mp4",
  badge = "Open to work",
  firstName = "SuryaTeja",
  lastName = "Pathuri",
  role = "Senior Full-Stack Engineer · AI & GenAI",
  skills = ["React", "Node.js", "AI / GenAI", "Next.js", "AWS"],
  githubUrl = "https://github.com",
  nextSectionId = "work",
}) {
  const fgVideoRef = useRef(null);
  const rootRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);

  /* ---- GSAP entrance + autoplay kick-off ---- */
  useEffect(() => {
    const fg = fgVideoRef.current;
    if (fg) {
      const p = fg.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(rootRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })
        .fromTo(
          `.${styles.badge}`,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          `.${styles.lineFirst}`,
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, ease: "expo.out" },
          "-=0.3"
        )
        .fromTo(
          `.${styles.lineLast}`,
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, ease: "expo.out" },
          "-=0.8"
        )
        .fromTo(
          `.${styles.role}`,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          "-=0.55"
        )
        .fromTo(
          `.${styles.pills} > *`,
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 },
          "-=0.4"
        )
        .fromTo(
          `.${styles.actions} > *`,
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 },
          "-=0.25"
        )
        .fromTo(
          `.${styles.videoWrap}`,
          { autoAlpha: 0, scale: 1.04 },
          { autoAlpha: 1, scale: 1, duration: 1.2, ease: "expo.out" },
          "-=1.1"
        )
        .fromTo(
          `.${styles.scroll}`,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.3"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* ---- Auto-hide the sound hint ---- */
  useEffect(() => {
    if (!showHint) return;
    const id = setTimeout(() => setShowHint(false), 5200);
    return () => clearTimeout(id);
  }, [showHint]);

  /* ---- Pause when scrolled away, resume (from the same spot) on return.
         currentTime is preserved across pause, so playback continues where it
         left off. A manual pause is respected — we only auto-resume what we
         auto-paused. ---- */
  useEffect(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    let pausedByScroll = false;
    let ticking = false;

    const evaluate = () => {
      ticking = false;
      const scrolledAway = window.scrollY > window.innerHeight * 0.6;
      if (scrolledAway) {
        if (!fg.paused) {
          fg.pause();
          setIsPlaying(false);
          pausedByScroll = true;
        }
      } else if (pausedByScroll && fg.paused) {
        fg.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
        pausedByScroll = false;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Controls ---- */
  const togglePlay = useCallback(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    if (fg.paused) {
      fg.play().catch(() => {});
      setIsPlaying(true);
    } else {
      fg.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    const next = !fg.muted;
    fg.muted = next;
    setIsMuted(next);
    setShowHint(false);
    if (!next) fg.play().catch(() => {});
  }, []);

  const handleScrollDown = useCallback(() => {
    const el = document.getElementById(nextSectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [nextSectionId]);

  return (
    <section className={styles.stickyWrap}>
      <div ref={rootRef} className={styles.hero}>
        {/* Ambient gradient washes */}
        <div className={styles.bgWarm} aria-hidden="true" />
        <div className={styles.bgMonitor} aria-hidden="true" />

        {/* Three.js bokeh particle layer (over the whole hero) */}
        <CinematicLayer />

        {/* ---- Left: text column ---- */}
        <div className={styles.left}>
          {badge ? (
            <span className={styles.badge}>
              <span className={styles.badgeDot} />
              {badge}
            </span>
          ) : null}

          <h1 className={styles.name}>
            <span className={styles.lineMask}>
              <span className={styles.lineFirst}>{firstName}</span>
            </span>
            <span className={styles.lineMask}>
              <span className={styles.lineLast}>{lastName}</span>
            </span>
          </h1>

          <p className={styles.role}>{role}</p>

          <ul className={styles.pills}>
            {skills.map((s) => (
              <li key={s} className={styles.pill}>
                {s}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={handleScrollDown}
            >
              View Projects
            </button>
            <a
              className={styles.btnGhost}
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                <path
                  d="M7 17L17 7M17 7H9M17 7v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* ---- Right: video column ---- */}
        <div className={styles.right}>
          <div className={styles.videoWrap}>
            <video
              ref={fgVideoRef}
              className={styles.fgVideo}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
            {/* Soft blend of the video into the dark background */}
            <div className={styles.videoFade} aria-hidden="true" />
            <div className={styles.videoGrain} aria-hidden="true" />

            {/* Controls */}
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.ctrlBtn}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                type="button"
                className={styles.ctrlBtn}
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <MutedIcon /> : <SoundIcon />}
              </button>
            </div>

            {/* Tap for sound badge */}
            <button
              type="button"
              className={`${styles.soundHint} ${
                showHint && isMuted ? styles.soundHintShow : ""
              }`}
              onClick={toggleMute}
              aria-hidden={!(showHint && isMuted)}
              tabIndex={showHint && isMuted ? 0 : -1}
            >
              <span className={styles.soundHintDot} />
              Tap for sound
            </button>
          </div>
        </div>

        {/* ---- Scroll indicator ---- */}
        <button
          type="button"
          className={styles.scroll}
          onClick={handleScrollDown}
          aria-label="Scroll to next section"
        >
          <span className={styles.scrollLabel}>Scroll</span>
          <span className={styles.scrollLine}>
            <span className={styles.scrollPulse} />
          </span>
        </button>
      </div>
    </section>
  );
}

/* ---- Inline icons ---- */
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor" />
    </svg>
  );
}
function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
      <path
        d="M16.5 12a3.5 3.5 0 0 0-2-3.15v6.3a3.5 3.5 0 0 0 2-3.15zM14.5 4.2v2.06a6 6 0 0 1 0 11.48v2.06a8 8 0 0 0 0-15.6z"
        fill="currentColor"
      />
    </svg>
  );
}
function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
      <path
        d="M16 9.5l4 4m0-4l-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
