"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSections.module.css";

/**
 * AboutSections — the "second page" below the hero.
 * Three glowing cinematic cards (Who I Am, Technical Skills, Education),
 * styled to match the reference video: warm-orange glowing cards, big
 * illuminated neon titles, large faint section numbers, scroll-reveal.
 * Content is sourced from the résumé.
 */

const SKILL_GROUPS = [
  { label: "Frontend", items: ["HTML5", "CSS3", "SCSS", "JavaScript", "TypeScript"] },
  { label: "Frameworks", items: ["React.js", "Vue.js", "Angular", "Next.js", "Nuxt.js"] },
  { label: "UI / Styling", items: ["Tailwind", "Material UI", "Bootstrap", "AntD", "Vuetify"] },
  { label: "State", items: ["Redux", "VueX", "Context API"] },
  { label: "Backend", items: ["Java 8/11/17", "Python", "Microservices", "PHP"] },
  { label: "Server", items: ["Node.js", "Express.js", "Nest.js", "Moleculer.js", "REST APIs"] },
  { label: "Database", items: ["MongoDB", "PostgreSQL", "MySQL", "Mongoose"] },
  { label: "Cloud / DevOps", items: ["AWS", "Azure", "GCP", "Jenkins", "Azure DevOps"] },
  { label: "AI / GenAI", items: ["OpenAI GPT", "RAG", "Prompt Engineering", "Vector DBs", "LLM Apps"] },
  { label: "Testing", items: ["Jest", "Cypress", "Jasmine", "Karma", "Enzyme"] },
];

const EDUCATION = [
  {
    date: "May 2013",
    degree: "B.Tech — Computer Science & Engineering",
    school: "Vignan Institute of Information Technology (JNTU)",
    meta: "Andhra Pradesh, India",
  },
  {
    date: "Advanced Diploma",
    degree: "Real-Time Embedded Systems & Linux Device Drivers",
    school: "Cranes Varsity",
    meta: "Bangalore, India",
  },
];

export default function AboutSections() {
  const rootRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(`.${styles.card}`).forEach((card) => {
        const reveals = card.querySelectorAll(`.${styles.reveal}`);
        gsap.fromTo(
          reveals,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="work" ref={rootRef} className={styles.wrap}>
      <div className={styles.inner}>
        {/* ===== 01 — WHO I AM ===== */}
        <section className={styles.card}>
          <span className={styles.cardNum} aria-hidden="true">
            01
          </span>
          <p className={`${styles.eyebrow} ${styles.reveal}`}>About — Profile</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>Who I Am</h2>

          <p className={`${styles.lead} ${styles.reveal}`}>
            Full-Stack Engineer with <span className={styles.hot}>11+ years</span>{" "}
            architecting scalable web applications and enterprise platforms — and{" "}
            <span className={styles.hot}>9+ years</span> crafting high-performance
            user interfaces. I build across the stack with React, Vue &amp; Next.js
            on the front, Java, Python &amp; microservices on the back, now channeling
            it into <span className={styles.hot}>Generative AI</span> — LLM-powered
            apps, RAG pipelines, chatbots and intelligent automation.
          </p>

          <ul className={`${styles.pills} ${styles.reveal}`}>
            {["Full Stack", "AI / GenAI", "Cloud Native", "Microservices", "Problem Solver"].map(
              (p) => (
                <li key={p} className={styles.pill}>
                  {p}
                </li>
              )
            )}
          </ul>
        </section>

        {/* ===== 02 — TECHNICAL SKILLS ===== */}
        <section className={styles.card}>
          <span className={styles.cardNum} aria-hidden="true">
            02
          </span>
          <p className={`${styles.eyebrow} ${styles.reveal}`}>Skills — Stack</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>Technical Skills</h2>

          <div className={styles.skillGrid}>
            {SKILL_GROUPS.map((g) => (
              <div key={g.label} className={`${styles.skillGroup} ${styles.reveal}`}>
                <p className={styles.skillLabel}>{g.label}</p>
                <ul className={styles.pills}>
                  {g.items.map((it) => (
                    <li key={it} className={styles.pill}>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 03 — EDUCATION ===== */}
        <section className={styles.card}>
          <span className={styles.cardNum} aria-hidden="true">
            03
          </span>
          <p className={`${styles.eyebrow} ${styles.reveal}`}>Education — Journey</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>Education</h2>

          <div className={styles.eduList}>
            {EDUCATION.map((e) => (
              <div key={e.degree} className={`${styles.eduRow} ${styles.reveal}`}>
                <span className={styles.eduDate}>{e.date}</span>
                <div className={styles.eduBody}>
                  <p className={styles.eduDegree}>{e.degree}</p>
                  <p className={styles.eduSchool}>{e.school}</p>
                  <p className={styles.eduMeta}>{e.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
