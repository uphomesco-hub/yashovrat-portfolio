import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const About = () => {
  // Safe window height check for SSR
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    updateVh(); // Set on mount
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  const { scrollY } = useScroll();

  // Scroll mapping: 
  // As the user scrolls from 0 to 100vh (the Hero height), 
  // the text precisely fades in and slides up. We stagger the start/end points.

  // Section 1: Context Label
  const y1 = useTransform(scrollY, [0, vh * 0.4], [80, 0]);
  const opacity1 = useTransform(scrollY, [0, vh * 0.3], [0, 1]);

  // Section 2: Education
  const y2 = useTransform(scrollY, [vh * 0.1, vh * 0.5], [80, 0]);
  const opacity2 = useTransform(scrollY, [vh * 0.1, vh * 0.4], [0, 1]);

  // Section 3: Experience
  const y3 = useTransform(scrollY, [vh * 0.2, vh * 0.6], [80, 0]);
  const opacity3 = useTransform(scrollY, [vh * 0.2, vh * 0.5], [0, 1]);

  // Section 4: Focus
  const y4 = useTransform(scrollY, [vh * 0.3, vh * 0.7], [80, 0]);
  const opacity4 = useTransform(scrollY, [vh * 0.3, vh * 0.6], [0, 1]);

  return (
    <section className="about-mobile-section h-[100svh] md:h-screen w-full bg-white text-black font-sans px-6 md:px-12 lg:px-16 pt-20 pb-8 md:py-0 overflow-hidden flex items-start md:items-center justify-center relative">
      <style>{`
        @media (max-width: 767px) {
          .about-mobile-section {
            padding-top: clamp(4rem, 8.5svh, 5rem);
            padding-bottom: calc(clamp(4.25rem, 8svh, 5.5rem) + env(safe-area-inset-bottom));
          }
          .about-mobile-grid {
            row-gap: clamp(0.9rem, 2svh, 1.35rem);
          }
          .about-mobile-content {
            gap: clamp(0.8rem, 2.2svh, 1.5rem);
          }
          .about-mobile-item-gap {
            gap: clamp(0.5rem, 1.7svh, 1rem);
          }
          .about-mobile-label {
            font-size: clamp(0.62rem, 1.45svh, 0.75rem);
            line-height: 1.05;
          }
          .about-mobile-body {
            font-size: clamp(0.92rem, 1.95svh, 1.125rem);
            line-height: 1.12;
          }
        }
        @media (max-width: 380px), (max-height: 740px) {
          .about-mobile-section {
            padding-top: 4rem;
            padding-bottom: calc(4.75rem + env(safe-area-inset-bottom));
          }
          .about-mobile-grid {
            row-gap: 0.85rem;
          }
          .about-mobile-content {
            gap: 0.72rem;
          }
          .about-mobile-item-gap {
            gap: 0.48rem;
          }
          .about-mobile-body {
            font-size: clamp(0.82rem, 1.78svh, 1rem);
            line-height: 1.08;
          }
          .about-mobile-label {
            font-size: clamp(0.56rem, 1.35svh, 0.68rem);
          }
        }
        @media (max-height: 640px) {
          .about-mobile-section {
            padding-top: 3rem;
            padding-bottom: calc(4.25rem + env(safe-area-inset-bottom));
          }
          .about-mobile-grid {
            row-gap: 0.62rem;
          }
          .about-mobile-content {
            gap: 0.42rem;
          }
          .about-mobile-item-gap {
            gap: 0.28rem;
          }
          .about-mobile-body {
            font-size: 0.68rem;
            line-height: 1.02;
          }
          .about-mobile-label {
            font-size: 0.5rem;
          }
        }
      `}</style>
      <div className="about-mobile-grid grid grid-cols-1 md:grid-cols-12 gap-y-7 md:gap-y-8 md:gap-x-12 w-full max-w-[1600px] mx-auto">

        {/* Left Column: Context Label */}
        <motion.div
          className="md:col-span-3 lg:col-span-3 pt-2"
          style={{ y: y1, opacity: opacity1 }}
        >
            <h2 className="about-mobile-label font-sans text-xs md:text-sm font-bold uppercase tracking-widest">
            Builder Profile
          </h2>
        </motion.div>

        {/* Right Column: The Data List */}
        <div className="about-mobile-content md:col-span-9 lg:col-span-9 flex flex-col gap-8 md:gap-12">

          {/* 01. EDUCATION */}
          <motion.div style={{ y: y2, opacity: opacity2 }} className="flex flex-col gap-2">
            <h3 className="about-mobile-label font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              01. Operating Field
            </h3>
            <div className="flex flex-col">
              <p className="about-mobile-body font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Yashovrat T
              </p>
              <p className="about-mobile-body font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                Full-stack developer, AI engineer, and startup builder working across agents, mobile apps, real estate tech, automation, and growth systems.
              </p>
            </div>
          </motion.div>

          {/* 02. EXPERIENCE */}
          <motion.div style={{ y: y3, opacity: opacity3 }} className="flex flex-col gap-2">
            <h3 className="about-mobile-label font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              02. Startup Experience
            </h3>

            <div className="about-mobile-item-gap flex flex-col gap-5 md:gap-6">
              {/* Job 1 */}
              <div>
                <p className="about-mobile-body font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  Freelance + startup tech lead
                </p>
                <p className="about-mobile-body font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Built client products as a freelancer and led full-stack execution across multiple startups, including UpHomes and Raddie.
                </p>
              </div>

              {/* Job 2 */}
              <div>
                <p className="about-mobile-body font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  Zeno AI / Vision Voice Agent
                </p>
                <p className="about-mobile-body font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Real-time vision and voice AI agent with camera context, RAG, full-stack workflows, automation, and a persistent memory layer for agent context.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 03. FOCUS */}
          <motion.div style={{ y: y4, opacity: opacity4 }} className="flex flex-col gap-2">
            <h3 className="about-mobile-label font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              03. Focus
            </h3>
            <ul className="flex flex-col">
              <li className="about-mobile-body font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Full-stack product engineering with Flutter, React, TypeScript, Node.js, Firebase, and Python
              </li>
              <li className="about-mobile-body font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                AI agents, RAG, persistent memory, startup operations, SEO/growth systems, and workflow automation
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
