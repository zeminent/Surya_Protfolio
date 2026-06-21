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

const PROJECTS = [
  {
    company: "Neurealm (formerly GS Lab | GAVS)",
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

        {/* ===== 04 — PROJECTS ===== */}
        <section className={`${styles.card} ${styles.flow}`}>
          <span className={styles.cardNum} aria-hidden="true">
            04
          </span>
          <p className={`${styles.eyebrow} ${styles.reveal}`}>Work — Projects</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>Projects</h2>

          <div className={styles.projList}>
            {PROJECTS.map((p) => (
              <div key={p.company} className={`${styles.proj} ${styles.reveal}`}>
                <div className={styles.projHead}>
                  <h3 className={styles.projCompany}>{p.company}</h3>
                  <span className={styles.projPeriod}>{p.period}</span>
                </div>
                <p className={styles.projRole}>{p.role}</p>
                <ul className={styles.projItems}>
                  {p.items.map((it, i) => (
                    <li key={i}>
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
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
