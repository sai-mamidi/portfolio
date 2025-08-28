
import React, { useMemo, useState } from "react";
import { motion, easeOut } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Layers,
  Code2,
  Sparkles,
} from "lucide-react";



const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const Section = ({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) => (
  <section id={id} className="relative py-20 sm:py-24">
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-transparent" />
    <div className="mx-auto max-w-6xl px-4">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={container}>
        <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p variants={fadeInUp} className="mt-2 text-muted-foreground text-base sm:text-lg text-gray-600">
            {subtitle}
          </motion.p>
        )}
        <motion.div variants={fadeInUp} className="mt-10">
          {children}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs sm:text-sm shadow-sm backdrop-blur hover:shadow transition">
    {children}
  </span>
);

const SkillItem = ({ label, icon: Icon }: { label: string; icon: any }) => (
  <div className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
    <div className="flex items-center gap-3">
      <div className="rounded-xl border border-gray-200 p-2 bg-gray-50 group-hover:bg-white transition">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  </div>
);

const TimelineItem = ({
  role,
  company,
  period,
  points,
}: {
  role: string;
  company: string;
  period: string;
  points: string[];
}) => (
  <div className="relative pl-8">
    <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-blue-500" />
    <h4 className="text-lg font-semibold">{role}</h4>
    <p className="text-sm text-gray-600">{company} • {period}</p>
    <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc pl-4">
      {points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>
);

const ProjectCard = ({ title, tech, desc, href }: { title: string; tech: string; desc: string; href?: string }) => (
  <a
    href={href || "#"}
    target={href ? "_blank" : undefined}
    rel={href ? "noreferrer" : undefined}
    className="block group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <h4 className="text-lg font-semibold group-hover:underline underline-offset-4 decoration-blue-400/60">
          {title}
        </h4>
        <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">{tech}</p>
      </div>
      <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100" />
    </div>
    <p className="mt-3 text-sm text-gray-700">{desc}</p>
  </a>
);

const ContactForm = ({ email }: { email: string }) => {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio contact from ${name || "Someone"}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${fromEmail}`);
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }, [name, fromEmail, message, email]);

  const valid = name.trim().length > 1 && /.+@.+\..+/.test(fromEmail) && message.trim().length > 5;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name" type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              type="email"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              placeholder="Tell me about your project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <a
              href={mailto}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white transition ${valid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"}`}
              aria-disabled={!valid}
            >
              <Mail className="h-4 w-4" />
              Send Email
            </a>
            {valid ? (
              <span className="inline-flex items-center gap-2 text-xs text-green-600"><CheckCircle2 className="h-4 w-4"/> Ready to send</span>
            ) : (
              <span className="text-xs text-gray-500">Fill all fields to enable</span>
            )}
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h4 className="text-lg font-semibold">Prefer email?</h4>
        <p className="mt-2 text-sm text-gray-700">
          You can directly reach me at:
        </p>
        <a href={`mailto:${email}`} className="mt-3 inline-flex items-center gap-2 text-blue-600 hover:underline">
          <Mail className="h-4 w-4" /> {email}
        </a>
        <div className="mt-6 grid gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-700"><Phone className="h-4 w-4"/> +91 9493556691</div>
          <div className="flex items-center gap-2 text-gray-700"><MapPin className="h-4 w-4"/> Hyderabad, India</div>
        </div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  // === PROFILE DATA (edit here) ===
  const name = "Saikiran Mamidi";
  const title = "Frontend Developer (Angular)";
  const tagline = "I build modern, responsive, API‑driven web apps.";
  const email = "saikiran.mamidi44@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/saikiran-mamidi";
  const githubUrl = "https://github.com/"; 
  const resumeUrl = "/saikiran.m-resume.pdf"; 

  const skills = {
    Languages: [
      { label: "TypeScript", icon: Code2 },
      { label: "JavaScript", icon: Code2 },
      { label: "HTML5", icon: Code2 },
      { label: "CSS3", icon: Code2 },
      { label: "SCSS", icon: Code2 },
    ],
    Frameworks: [
      { label: "Angular (8–15)", icon: Layers },
      { label: "Bootstrap", icon: Layers },
      { label: "jQuery", icon: Layers },
      { label: "React (basic)", icon: Layers },
      { label: "Next.js (learning)", icon: Layers },
    ],
    Tools: [
      { label: "Git", icon: Briefcase },
      { label: "Bitbucket", icon: Briefcase },
      { label: "Jira", icon: Briefcase },
      { label: "Chrome DevTools", icon: Briefcase },
      { label: "Webpack (basic)", icon: Briefcase },
    ],
    Other: [
      { label: "REST APIs", icon: Sparkles },
      { label: "WordPress", icon: Sparkles },
      { label: "Responsive Design", icon: Sparkles },
      { label: "Flexbox", icon: Sparkles },
    ],
  } as const;

  const projects = [
    {
      title: "Office24by7 CRM Platform UI",
      tech: "Angular 15, SCSS, REST API, Bootstrap, Git",
      desc: "Developed and optimized user‑facing modules: dashboards, settings, Gmail‑style email (inbox/sent/compose/preview). Revamped UI to a scalable, responsive design system.",
      href: undefined,
    },
    {
      title: "Company Website (WordPress)",
      tech: "WordPress, jQuery, HTML/CSS",
      desc: "Built and launched the official company site with SEO‑friendly landing pages and cross‑browser responsive layout.",
      href: undefined,
    },
  ];

  const experience = [
    {
      role: "Frontend Developer (Angular)",
      company: "Office24by7 Technologies Pvt Ltd — Hyderabad",
      period: "Feb 2023 – Present",
      points: [
        "Maintained multiple Angular modules for a dynamic CRM used by sales/marketing teams.",
        "Built a Gmail‑style email module (inbox, sent, compose, preview).",
        "Led mobile‑first responsive revamp improving performance and UX across devices.",
        "Integrated 15+ REST APIs with backend teams for seamless functionality.",
        "Delivered pixel‑perfect landing pages to support marketing campaigns.",
      ],
    },
  ];

  const certifications = [
    "Angular (Intermediate) — HackerRank",
    "Problem Solving with Python (Basic) — HackerRank",
  ];

  const nav = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="w-full">
    <div className="px-4 mx-auto min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Header / Nav */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-100">
        <div className="mx-auto w-full px-4 h-16 flex items-center justify-between">
          <a href="#home" className="font-bold tracking-tight italic text-lg">Sai<span className="text-blue-600">kiran</span></a>
          <nav className="hidden sm:flex items-center gap-2">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="px-3 py-2 rounded-xl text-sm hover:bg-gray-100">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl hover:bg-gray-100"><Linkedin className="h-5 w-5"/></a>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl hover:bg-gray-100"><Github className="h-5 w-5"/></a>
            <a href={`mailto:${email}`} className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-white text-sm hover:bg-blue-700">
              <Mail className="h-4 w-4"/> Contact
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-teal-50" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3 py-1 text-xs shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500" /> Available for opportunities
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
              {name}
            </h1>
            <p className="mt-2 text-xl sm:text-2xl text-blue-700 font-semibold">{title}</p>
            <p className="mt-4 max-w-2xl text-gray-700">{tagline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={resumeUrl} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-black">
                <Download className="h-4 w-4"/> Download Resume
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 hover:bg-gray-50">
                Say Hello <ArrowRight className="h-4 w-4"/>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <Pill><Code2 className="h-4 w-4"/> Angular • TypeScript • SCSS</Pill>
              <Pill><Layers className="h-4 w-4"/> Responsive • Performance • UI Architecture</Pill>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="about" title="About" subtitle="Who I am and what I do">
        <div className="prose prose-slate max-w-none">
          <p>
            Frontend Developer with <strong>3 years</strong> of hands‑on experience building scalable, mobile‑first web apps.
            I specialize in <strong>Angular</strong>, <strong>TypeScript</strong>, and <strong>responsive UI</strong>. I enjoy crafting modular components,
            optimizing performance, and collaborating with backend teams to deliver smooth, <em>API‑driven</em> workflows. Currently expanding
            my skills in <strong>React</strong> and <strong>Next.js</strong>.
          </p>
        </div>
      </Section>

      <Section id="skills" title="Skills" subtitle="Stack I work with">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Languages</h4>
            <div className="grid grid-cols-2 gap-3">
              {skills.Languages.map((s) => <SkillItem key={s.label} label={s.label} icon={s.icon} />)}
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Frameworks/Libraries</h4>
            <div className="grid grid-cols-2 gap-3">
              {skills.Frameworks.map((s) => <SkillItem key={s.label} label={s.label} icon={s.icon} />)}
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Tools & Other</h4>
            <div className="grid grid-cols-2 gap-3">
              {[...skills.Tools, ...skills.Other].map((s) => <SkillItem key={s.label} label={s.label} icon={s.icon} />)}
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects" title="Projects" subtitle="Selected work">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </Section>

      <Section id="experience" title="Experience" subtitle="Where I've worked">
        <div className="relative border-l-2 border-blue-100 pl-6 space-y-8">
          {experience.map((e, i) => (
            <TimelineItem key={i} role={e.role} company={e.company} period={e.period} points={e.points} />
          ))}
        </div>
      </Section>

      <Section id="education" title="Education">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mb-6">
          <h4 className="text-lg font-semibold">B.Com in Commerce</h4>
          <p className="text-sm text-gray-600">Gandhi Institute of Technology and Management (GITAM), Visakhapatnam</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h4 className="text-lg font-semibold">Diploma in Mechanical Engineering</h4>
          <p className="text-sm text-gray-600">Government Polytechnic College, Korutla</p>
        </div>
      </Section>

      <Section id="certifications" title="Certifications">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {certifications.map((c) => (
            <li key={c} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm text-sm">
              {c}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact" title="Contact" subtitle="Let's build something great together">
        <ContactForm email={email} />
        <p className="mt-6 text-sm text-gray-600">
          Or write to me directly here: <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
        </p>
      </Section>

      <footer className="border-t border-gray-100 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline">
              <Linkedin className="h-4 w-4"/> LinkedIn
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline">
              <Github className="h-4 w-4"/> GitHub
            </a>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:underline">
              <Mail className="h-4 w-4"/> {email}
            </a>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
}
