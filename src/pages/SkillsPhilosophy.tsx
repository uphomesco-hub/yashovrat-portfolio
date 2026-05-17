import { motion } from "framer-motion";
import FlowingMenu from "./FlowingMenu";

const skillCategories = [
  {
    link: "#",
    text: "Full-stack Development",
    items: [
      { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Flutter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Postgres", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Netlify", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" }
    ]
  },
  {
    link: "#",
    text: "AI Engineering",
    items: [
      { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "RAG", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Agents", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
      { name: "Vision", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
      { name: "Voice", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Memory", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
    ]
  },
  {
    link: "#",
    text: "Startup Systems",
    items: [
      { name: "Real Estate", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" },
      { name: "SEO", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
      { name: "Analytics", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
      { name: "Dashboards", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Growth", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Automation", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" }
    ]
  }
];

const SkillsPhilosophy = () => {
  return (
    // Unified layout using justify-center on all breakpoints to keep elements seamlessly grouped
    <section className="min-h-screen bg-white text-black font-sans flex flex-col justify-center">
      <div className="w-full px-6 md:px-12 lg:px-16 pt-24 pb-12 md:pt-12 md:pb-12 bg-white z-10 md:flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-y-8"
        >
          <div className="md:col-span-1">
            <h2 className="text-xs font-bold uppercase tracking-widest">Skills & Building Philosophy</h2>
          </div>
          <div className="md:col-span-4">
            <blockquote className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-tight">
              “Build close to the user, ship the full stack, and automate the work that should not need a human twice.”
            </blockquote>
            <p className="mt-6">— Yashovrat T</p>
            <p className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed text-black/70">
              Full-stack developer and AI engineer building startup products, agent workflows, automation systems, and persistent memory layers for AI agents.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="w-full border-t border-black relative overflow-hidden">
        <FlowingMenu
          items={skillCategories}
          speed={3}
          marqueeBgColor="#000000"
        />
      </div>
    </section>
  );
};

export default SkillsPhilosophy;
