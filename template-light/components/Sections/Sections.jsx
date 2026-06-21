"use client";

import { useEffect, useRef } from "react";
import styles from "./Sections.module.css";

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
    year: "2013",
    degree: "B.Tech — Computer Science & Engineering",
    school: "Vignan Institute of Information Technology (JNTU)",
    meta: "Andhra Pradesh, India",
  },
  {
    year: "Diploma",
    degree: "Real-Time Embedded Systems & Linux Device Drivers",
    school: "Cranes Varsity",
    meta: "Bangalore, India",
  },
];

const PROJECTS = [
  {
    company: "Neurealm",
    sub: "formerly GS Lab | GAVS",
    role: "Senior Software Engineer",
    period: "2025 — Present",
    desc: "Revamped the e-commerce platform for Advance Professional (900,000+ auto parts) — migrating Angular to React & Next.js, designing scalable GraphQL APIs, A/B-tested pricing, and Jenkins & Terraform automation.",
    tech: ["Next.js", "React", "GraphQL", "Jenkins", "Terraform"],
  },
  {
    company: "Trianz",
    sub: "Walmart · GAP",
    role: "Technical Lead",
    period: "2021 — 2025",
    desc: "Migrated & overhauled Hayneedle (Walmart) on ReactJS + Bulma, and elevated GAP's checkout journey with a Micro Frontend architecture, Storybook, Atomic Design, and Java 8 services on Spring Boot / Flask / FastAPI.",
    tech: ["React", "Micro Frontends", "Java 8", "Spring Boot"],
  },
  {
    company: "Zensar Technologies",
    sub: "DWS · Optum",
    role: "Lead Software Engineer",
    period: "2015 — 2018",
    desc: "Built a microservice-based HRMS portal (Docker + Redis) and an AI/ML-driven KPI dashboard with a dynamic UI using Moleculer.js, PostgreSQL & d3.js, deployed as Docker containers on AWS.",
    tech: ["Vue.js", "Moleculer.js", "PostgreSQL", "Docker", "d3.js"],
  },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function Sections() {
  const ref = useReveal();

  return (
    <main ref={ref} className={styles.wrap}>
      {/* ===== 01 — WHO I AM ===== */}
      <section className={styles.section} id="about">
        <SectionHead num="01" title="Who I Am" />
        <div className={styles.aboutGrid}>
          <p className={`${styles.aboutLabel} reveal`}>About</p>
          <p className={`${styles.aboutLead} reveal`}>
            Full-Stack Engineer with{" "}
            <span className={styles.mark}>11+ years</span> architecting scalable
            web applications and enterprise platforms — and{" "}
            <span className={styles.mark}>9+ years</span> crafting high-performance
            interfaces. I build across the stack with React, Vue &amp; Next.js, Java,
            Python &amp; microservices, now channeling it into{" "}
            <span className={styles.mark}>Generative AI</span>: LLM-powered apps, RAG
            pipelines, chatbots and intelligent automation.
          </p>
        </div>
        <ul className={`${styles.tagRow} reveal`}>
          {["Full Stack", "AI / GenAI", "Cloud Native", "Microservices", "Problem Solver"].map(
            (t) => (
              <li key={t} className={styles.tag}>
                {t}
              </li>
            )
          )}
        </ul>
      </section>

      {/* ===== 02 — TECHNICAL SKILLS ===== */}
      <section className={styles.section} id="skills">
        <SectionHead num="02" title="Technical Skills" />
        <div className={styles.skillList}>
          {SKILL_GROUPS.map((g) => (
            <div key={g.label} className={`${styles.skillRow} reveal`}>
              <p className={styles.skillLabel}>{g.label}</p>
              <ul className={styles.tagRow}>
                {g.items.map((it) => (
                  <li key={it} className={styles.tag}>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 03 — EDUCATION ===== */}
      <section className={styles.section} id="education">
        <SectionHead num="03" title="Education" />
        <div className={styles.eduList}>
          {EDUCATION.map((e) => (
            <div key={e.degree} className={`${styles.eduRow} reveal`}>
              <span className={styles.eduYear}>{e.year}</span>
              <div>
                <p className={styles.eduDegree}>{e.degree}</p>
                <p className={styles.eduSchool}>
                  {e.school} <span className={styles.eduMeta}>· {e.meta}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 04 — PROJECTS ===== */}
      <section className={styles.section} id="projects">
        <SectionHead num="04" title="Selected Projects" />
        <div className={styles.projList}>
          {PROJECTS.map((p) => (
            <article key={p.company} className={`${styles.projRow} reveal`}>
              <div className={styles.projTop}>
                <div>
                  <h3 className={styles.projCompany}>{p.company}</h3>
                  <p className={styles.projSub}>
                    {p.role} · {p.sub}
                  </p>
                </div>
                <span className={styles.projYear}>{p.period}</span>
              </div>
              <p className={styles.projDesc}>{p.desc}</p>
              <ul className={styles.tagRow}>
                {p.tech.map((t) => (
                  <li key={t} className={styles.tagOutline}>
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className={styles.footer}>
        <p className={`${styles.footBig} reveal`}>Let&apos;s build something.</p>
        <div className={`${styles.footLinks} reveal`}>
          <a href="mailto:suryatejapathuri4@gmail.com">suryatejapathuri4@gmail.com</a>
          <a href="tel:+919032475086">+91 90324 75086</a>
        </div>
        <p className={styles.footCopy}>© 2026 SuryaTeja Pathuri</p>
      </footer>
    </main>
  );
}

function SectionHead({ num, title }) {
  return (
    <div className={`${styles.head} reveal`}>
      <span className={styles.headNum}>{num}</span>
      <h2 className={styles.headTitle}>{title}</h2>
    </div>
  );
}
