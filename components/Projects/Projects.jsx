"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.css";

/**
 * Projects — the "third page" below the AboutSections deck.
 * A cinematic, scroll-driven horizontal showcase: the section pins to the
 * viewport and the panels slide sideways as you scroll down. Matches the
 * warm-orange glow theme. On small screens it falls back to a native
 * horizontal swipe carousel (no scroll-jacking).
 */

const PROJECTS = [
  {
    company: "Neurealm",
    sub: "formerly GS Lab | GAVS",
    role: "Senior Software Engineer · Full-Stack Developer",
    period: "2025 — Present",
    items: [
      {
        name: "Advance Professional E-Commerce",
        desc: "Revamped the e-commerce platform for a top automotive aftermarket supplier (catalog of 900,000+ parts from Carquest, WORLDPAC & Autopart International) — migrating Angular to React & Next.js, designing scalable GraphQL APIs, running A/B-tested pricing features, and automating builds with Jenkins & Terraform.",
      },
    ],
    tech: ["Next.js", "React", "GraphQL", "Jenkins", "Terraform", "New Relic"],
  },
  {
    company: "Trianz",
    sub: "Walmart · GAP",
    role: "Technical Lead",
    period: "2021 — 2025",
    items: [
      {
        name: "Hayneedle (Walmart)",
        desc: "Led the migration and overhaul of hayneedle.com — a furnishings & decor retail site — to a new experience built on ReactJS and the Bulma framework.",
      },
      {
        name: "GAP — Checkout Experience",
        desc: "Elevated GAP's online checkout journey with a Micro Frontend architecture, Storybook, and Atomic Design, backed by Java 8 services on Spring Boot, Flask & FastAPI.",
      },
    ],
    tech: ["React", "Micro Frontends", "Java 8", "Spring Boot", "Storybook"],
  },
  {
    company: "Zensar Technologies",
    sub: "DWS · Optum",
    role: "Lead Software Engineer",
    period: "2015 — 2018",
    items: [
      {
        name: "DWS HRMS Portal",
        desc: "Built a microservice-based internal HRMS portal where each service runs in its own Docker container, communicating through a central Redis transporter for efficient scaling.",
      },
      {
        name: "Optum Admin Portal",
        desc: "Developed an AI/ML-driven KPI dashboard with a dynamically rendered UI using Moleculer.js & PostgreSQL, d3.js visualizations, and Node instances deployed as Docker containers on AWS.",
      },
    ],
    tech: ["Vue.js", "Moleculer.js", "PostgreSQL", "Docker", "Redis", "d3.js"],
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop / tablet: pin the section and scroll the track horizontally.
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const fill = fillRef.current;
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (fill) fill.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        return () => tween.kill();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className={styles.section}>
      <div ref={trackRef} className={styles.track}>
        {/* Intro panel */}
        <div className={`${styles.panel} ${styles.intro}`}>
          <p className={styles.eyebrow}>Work — Selected Projects</p>
          <h2 className={styles.bigTitle}>
            Things I&apos;ve
            <br />
            <span className={styles.hot}>built.</span>
          </h2>
          <p className={styles.introLead}>
            A decade of shipping enterprise platforms, e-commerce experiences and
            AI-driven dashboards.
          </p>
          <p className={styles.scrollHint}>
            Scroll to explore <span aria-hidden>→</span>
          </p>
        </div>

        {/* Project panels */}
        {PROJECTS.map((p, i) => (
          <article key={p.company} className={styles.panel}>
            <span className={styles.index} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={styles.panelHead}>
              <div>
                <h3 className={styles.company}>{p.company}</h3>
                <p className={styles.sub}>{p.sub}</p>
              </div>
              <span className={styles.period}>{p.period}</span>
            </div>
            <p className={styles.role}>{p.role}</p>
            <ul className={styles.items}>
              {p.items.map((it, j) => (
                <li key={j}>
                  {it.name && <strong>{it.name}: </strong>}
                  {it.desc}
                </li>
              ))}
            </ul>
            <ul className={styles.pills}>
              {p.tech.map((t) => (
                <li key={t} className={styles.pill}>
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Scroll progress bar (desktop) */}
      <div className={styles.progress} aria-hidden="true">
        <span ref={fillRef} className={styles.progressFill} />
      </div>
    </section>
  );
}
