import VideoIntro from "@/components/VideoIntro/VideoIntro";
import AboutSections from "@/components/AboutSections/AboutSections";
import Projects from "@/components/Projects/Projects";

export default function Home() {
  return (
    <main>
      <VideoIntro
        badge=""
        firstName="SuryaTeja"
        lastName="Pathuri"
        role="Senior Full-Stack Engineer · AI & GenAI"
        skills={[
          "React",
          "Next.js",
          "Vue.js",
          "Node.js",
          "TypeScript",
          "Java",
          "Python",
          "AI / GenAI",
          "AWS",
          "Microservices",
        ]}
        githubUrl="https://github.com"
      />

      {/* Second page — Who I Am, Technical Skills, Education */}
      <AboutSections />

      {/* Third page — Projects (horizontal scroll showcase) */}
      <Projects />
    </main>
  );
}
