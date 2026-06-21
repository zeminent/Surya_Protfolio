"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

/* Skill logos (Simple Icons CDN) revolving around the avatar */
const RING_INNER = [
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
];
const RING_OUTER = [
  { name: "Next.js", slug: "nextdotjs", color: "1F3AFF" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "GraphQL", slug: "graphql", color: "E10098" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
];

function ring(items, radius) {
  const step = 360 / items.length;
  return items.map((s, i) => {
    const a = ((i * step - 90) * Math.PI) / 180; // start at top
    return {
      ...s,
      x: Math.round(Math.cos(a) * radius),
      y: Math.round(Math.sin(a) * radius),
    };
  });
}

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    root.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const inner = ring(RING_INNER, 178);
  const outer = ring(RING_OUTER, 250);

  return (
    <header ref={rootRef} className={styles.hero} id="top">
      {/* Top bar */}
      <nav className={styles.topbar}>
        <a href="#top" className={styles.mark}>
          ST<span className={styles.markDot}>.</span>
        </a>
        <ul className={styles.navLinks}>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#education">Education</a>
          </li>
        </ul>
        <a href="/resume.pdf" target="_blank" rel="noreferrer" className={styles.resumeBtn}>
          <ResumeIcon />
          Download Resume
        </a>
      </nav>

      {/* Hero grid */}
      <div className={styles.grid}>
        <div className={styles.left}>
          <p className={`${styles.hi} reveal`}>
            Hey, I am <span className={styles.hiName}>SuryaTeja</span>
          </p>
          <h1 className={`${styles.title} reveal`}>
            <span className={styles.titleLine}>Full-Stack</span>
            <span className={`${styles.titleLine} ${styles.titleAccent}`}>
              Developer
            </span>
          </h1>
          <p className={`${styles.sub} reveal`}>
            Senior Full-Stack Engineer with 11+ years building premium, scalable
            web experiences across React, Node &amp; Generative AI.
          </p>
          <div className={`${styles.cta} reveal`}>
            <a href="#projects" className={styles.hireBtn}>
              Hire me
            </a>
            <a
              href="mailto:suryatejapathuri4@gmail.com"
              className={styles.iconBtn}
              aria-label="Email"
            >
              <MailIcon />
            </a>
          </div>

          <div className={`${styles.statCard} reveal`}>
            <p className={styles.statBig}>11+ yrs</p>
            <p className={styles.statText}>
              Full-stack engineering across Walmart, GAP &amp; enterprise platforms —
              now focused on AI &amp; GenAI products.
            </p>
          </div>
        </div>

        {/* Avatar + revolving skills */}
        <div className={`${styles.right} reveal`}>
          <div className={styles.stage}>
            <span className={`${styles.ringLine} ${styles.ringLineInner}`} />
            <span className={`${styles.ringLine} ${styles.ringLineOuter}`} />

            {/* Inner ring (clockwise) */}
            <div className={`${styles.orbit} ${styles.orbitInner}`}>
              {inner.map((s) => (
                <span
                  key={s.name}
                  className={styles.node}
                  style={{
                    left: `calc(50% + ${s.x}px)`,
                    top: `calc(50% + ${s.y}px)`,
                  }}
                >
                  <span className={`${styles.badge} ${styles.badgeInner}`}>
                    <img
                      src={s.url || `https://cdn.simpleicons.org/${s.slug}/${s.color}`}
                      alt={s.name}
                      width="24"
                      height="24"
                      loading="lazy"
                    />
                  </span>
                </span>
              ))}
            </div>

            {/* Outer ring (counter-clockwise) */}
            <div className={`${styles.orbit} ${styles.orbitOuter}`}>
              {outer.map((s) => (
                <span
                  key={s.name}
                  className={styles.node}
                  style={{
                    left: `calc(50% + ${s.x}px)`,
                    top: `calc(50% + ${s.y}px)`,
                  }}
                >
                  <span className={`${styles.badge} ${styles.badgeOuter}`}>
                    <img
                      src={s.url || `https://cdn.simpleicons.org/${s.slug}/${s.color}`}
                      alt={s.name}
                      width="24"
                      height="24"
                      loading="lazy"
                    />
                  </span>
                </span>
              ))}
            </div>

            {/* Avatar — photo pops out of the circle for a 3D feel */}
            <div className={styles.avatar}>
              <span className={styles.avatarDisc} aria-hidden="true" />
              <img
                src="/profile_photo.png"
                alt="SuryaTeja Pathuri"
                className={styles.avatarImg}
              />
            </div>
          </div>

          <div className={`${styles.nameTag} reveal`}>
            <p className={styles.nameTagName}>SuryaTeja Pathuri</p>
            <p className={styles.nameTagRole}>Senior Full-Stack Engineer · AI &amp; GenAI</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
