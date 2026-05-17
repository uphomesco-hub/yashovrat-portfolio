import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

const CONTACT_FORM_ENDPOINT =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbzjO3XZm7daOWttCOoW_RW7rQi3Om12XWIWR7ehqyULeJ1s1yK3XK3qArYk8o5lt9C_aQ/exec";

const initialValues = {
  name: "",
  email: "",
  projectType: "",
  timeline: "",
  message: "",
};

type FormValues = typeof initialValues;
type FormErrors = Partial<Record<keyof FormValues, string>>;

function getFieldError(name: keyof FormValues, value: string) {
  const trimmed = value.trim();

  if (name === "name" && !trimmed) return "Name is required.";
  if (name === "email") {
    if (!trimmed) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "Enter a valid email address.";
    }
  }
  if (name === "projectType" && !trimmed) return "Choose a project type.";
  if (name === "message" && !trimmed) return "Tell me what you want to build.";

  return "";
}

const Contact = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  function updateField(name: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      const nextError = getFieldError(name, value);
      setErrors((current) => {
        const next = { ...current };
        if (nextError) next[name] = nextError;
        else delete next[name];
        return next;
      });
    }
  }

  function validateForm() {
    const nextErrors: FormErrors = {
      name: getFieldError("name", values.name),
      email: getFieldError("email", values.email),
      projectType: getFieldError("projectType", values.projectType),
      message: getFieldError("message", values.message),
    };

    Object.keys(nextErrors).forEach((key) => {
      if (!nextErrors[key as keyof FormValues]) delete nextErrors[key as keyof FormValues];
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    if (!validateForm()) {
      setStatus("error");
      setFeedback("Please fix the highlighted fields.");
      return;
    }

    setStatus("submitting");
    const formData = new FormData(event.currentTarget);

    try {
      await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      setValues(initialValues);
      setErrors({});
      setStatus("success");
      setFeedback("Message sent. Yashovrat will get it by email.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Message could not be sent. Please try again.");
    }
  }

  const inputClass =
    "w-full border-0 border-b border-black/30 bg-transparent px-0 py-4 text-base md:text-lg font-bold uppercase tracking-tight outline-none transition-colors duration-300 placeholder:text-black/35 focus:border-black";
  const errorClass = "mt-2 block text-xs font-bold uppercase tracking-[0.18em] text-red-600";

  return (
    <section className="min-h-screen w-full bg-white text-black font-sans px-4 md:px-8 lg:px-12 py-24 overflow-hidden flex items-center justify-center relative">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 max-w-[1400px] w-full mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full py-2">
          <motion.div variants={itemVariants} className="mb-8 lg:mb-0">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight text-left">
              Build <br />
              With Me <span className="inline-block ml-2">→</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 lg:mt-0 hidden lg:block">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-black/60">
              Contact Form
            </h2>
            <p className="text-base md:text-lg font-normal leading-relaxed text-black/80 max-w-md text-left">
              Best fit: startup products, full-stack systems, AI agents, automations, real estate tech, and founder-led builds that need fast execution.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Form */}
        <motion.div className="lg:col-span-5 flex flex-col justify-center" variants={itemVariants}>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="source" value="yashovrat-portfolio" />
            <input type="hidden" name="recipient" value="yashovrattiwari@gmail.com" />

            <label>
              <input
                className={inputClass}
                name="name"
                placeholder="Name"
                autoComplete="name"
                value={values.name}
                onChange={(event) => updateField("name", event.target.value)}
                onBlur={(event) => setErrors((current) => ({ ...current, name: getFieldError("name", event.target.value) }))}
                aria-invalid={Boolean(errors.name)}
                required
              />
              {errors.name ? <span className={errorClass}>{errors.name}</span> : null}
            </label>

            <label>
              <input
                className={inputClass}
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
                onBlur={(event) => setErrors((current) => ({ ...current, email: getFieldError("email", event.target.value) }))}
                aria-invalid={Boolean(errors.email)}
                required
              />
              {errors.email ? <span className={errorClass}>{errors.email}</span> : null}
            </label>

            <label>
              <select
                className={inputClass}
                name="projectType"
                value={values.projectType}
                onChange={(event) => updateField("projectType", event.target.value)}
                onBlur={(event) => setErrors((current) => ({ ...current, projectType: getFieldError("projectType", event.target.value) }))}
                aria-invalid={Boolean(errors.projectType)}
                required
              >
                <option value="" disabled>Project type</option>
                <option>Full-stack product</option>
                <option>AI agent or RAG system</option>
                <option>Startup automation</option>
                <option>Flutter / mobile app</option>
                <option>Website or growth system</option>
              </select>
              {errors.projectType ? <span className={errorClass}>{errors.projectType}</span> : null}
            </label>

            <label>
              <input
                className={inputClass}
                name="timeline"
                placeholder="Timeline / budget"
                value={values.timeline}
                onChange={(event) => updateField("timeline", event.target.value)}
              />
            </label>

            <label>
              <textarea
                className={`${inputClass} min-h-[150px] resize-none normal-case font-medium tracking-normal`}
                name="message"
                placeholder="Tell me what you want to build"
                value={values.message}
                onChange={(event) => updateField("message", event.target.value)}
                onBlur={(event) => setErrors((current) => ({ ...current, message: getFieldError("message", event.target.value) }))}
                aria-invalid={Boolean(errors.message)}
                required
              />
              {errors.message ? <span className={errorClass}>{errors.message}</span> : null}
            </label>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group relative overflow-hidden border border-black px-6 py-4 text-left font-black uppercase tracking-[0.18em] transition-colors duration-300 disabled:cursor-wait disabled:opacity-60"
            >
              <span className="absolute inset-0 bg-black translate-x-[-101%] transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white">
                {status === "submitting" ? "Sending..." : "Send form"}
              </span>
            </button>

            {feedback ? (
              <p className={`text-sm font-bold uppercase tracking-[0.14em] ${status === "success" ? "text-black" : "text-red-600"}`}>
                {feedback}
              </p>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm font-bold uppercase tracking-tight">
              <a className="border-b border-black/30 pb-3 hover:pl-2 transition-all duration-300" href="mailto:yashovrattiwari@gmail.com">
                Email →
              </a>
              <a className="border-b border-black/30 pb-3 hover:pl-2 transition-all duration-300" href="https://www.linkedin.com/in/yashovrat/" target="_blank" rel="noopener noreferrer">
                LinkedIn →
              </a>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
