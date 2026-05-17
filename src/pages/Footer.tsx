import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Dynamically scrubs opacity & scale using scroll progression instead of transition
  const textScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer ref={footerRef} className="bg-black text-white font-sans pt-16 md:pt-20 border-t border-white h-[100svh] md:h-screen flex flex-col overflow-hidden">

      {/* Top Section: Info Grid */}
      <motion.div
        className="px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-10 md:gap-x-12 shrink-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Column 1: IDENTIFICATION */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 text-white/80">
            Identification
          </h3>
          <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed">
            Yashovrat
          </p>
          <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-white/60">
            Full-stack Developer / AI Engineer / Startup Operator
          </p>
          <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-white/60">
            India / Building startup products, AI agents, real estate tech, and automation
          </p>
        </motion.div>

        {/* Column 2: CHANNELS */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 text-white/80">
            Channels
          </h3>
          <div className="flex flex-col gap-2">
            <a
              href="#contact"
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1"
            >
              Contact ↗
            </a>
            <a
              href="mailto:yashovrattiwari@gmail.com"
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1"
            >
              Email ↗
            </a>
            <a
              href="https://www.linkedin.com/in/yashovrat/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://x.com/yashovrat1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1"
            >
              X ↗
            </a>
            <a
              href="https://github.com/uphomesco-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1"
            >
              GitHub ↗
            </a>
          </div>
        </motion.div>

        {/* Column 3: COLOPHON + YEAR */}
        <motion.div variants={itemVariants} className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 text-white/80">
              Colophon
            </h3>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-white/60">
              Built With: React / TypeScript / Framer / Lenis
            </p>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-white/60">
              Direction: Full-stack AI portfolio system
            </p>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-white/60">
              Projects: Zeno AI / Agent Native / UpHomes / Raddie / Automations
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-white">
              2026
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Section: Branding Text */}
      <motion.div
        style={{ opacity: textOpacity, scale: textScale }}
        className="w-full flex-1 min-h-0 flex flex-col justify-center items-center overflow-visible select-none px-4 md:px-6 lg:px-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        <h1 className="font-sans font-black text-[13.8vw] sm:text-[14.5vw] md:text-[14vw] xl:text-[13vw] leading-none text-white uppercase tracking-tighter flex items-start whitespace-nowrap max-w-full">
          Yashovrat
          <span className="text-base sm:text-xl md:text-4xl lg:text-6xl font-medium mt-[1.6vw] ml-1 opacity-60">
            ®
          </span>
        </h1>
      </motion.div>
    </footer>
  );
};

export default Footer;
