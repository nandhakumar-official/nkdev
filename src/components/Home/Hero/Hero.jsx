import { useEffect, useRef } from "react";
import nkLogo from "../../../assets/Nandhakumar Chinnasami.png";
import Typed from "typed.js";
import "./Hero.css";
import { getExperienceYears } from "../../../utils/experince.js";
import {
  FiActivity,
  FiGitBranch,
  FiPenTool,
  FiCreditCard,
  FiShield,
  FiCheckCircle,
  FiBriefcase,
  FiPackage,
  FiUsers,
} from "react-icons/fi";
const Hero = () => {
  const typedRef = useRef(null);
  const typedInstance = useRef(null);
  const resumeFile = "/NKDEV/resume/NandhaKumar_FullStack_Developer_Resume.pdf";
  useEffect(() => {
    typedInstance.current = new Typed(typedRef.current, {
      strings: [
        "MERN Stack Developer",
        "Product-Focused Full Stack Developer",
        "React & TypeScript Developer",
        "Healthcare SaaS Engineer",
        "Workflow-Driven Frontend Engineer",
        "Figma to Production Developer",
      ],
      typeSpeed: 65,
      backSpeed: 35,
      backDelay: 1800,
      startDelay: 400,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typedInstance.current?.destroy();
    };
  }, []);

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  // const scrollToContact = () =>
  //   document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 12;
    const rotateX = (y / rect.height - 0.5) * -12;
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetMove = (e) => {
    e.currentTarget.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  // FIX 1: Domain badges replace generic tech stack badges
  // These highlight what makes Nandha rare — not what every React dev has
  const domainBadges = [
    {
      label: "Healthcare SaaS",
      icon: FiActivity,
      color: "#10B981",
    },
    {
      label: "Workflow Design",
      icon: FiGitBranch,
      color: "#8B5CF6",
    },
    {
      label: "Figma → Production",
      icon: FiPenTool,
      color: "#F97316",
    },
    {
      label: "Stripe Integration",
      icon: FiCreditCard,
      color: "#00D4FF",
    },
    {
      label: "Manual Testing",
      icon: FiCheckCircle,
      color: "#FACC15",
    },
    {
      label: "HIPAA Workflows",
      icon: FiShield,
      color: "#EF4444",
    },
  ];

  const experience = getExperienceYears();
  const [year, decimal] = experience.split(".");

  return (
    <section id="hero" className="hero">
      <div className="grid-bg"></div>
      <div className="hero-grid">
        {/* ── LEFT COLUMN ── */}
        <div className="hero-left">
          {/* FIX 2: Badge is now specific — not generic "available" */}
          <div className="hero-badge" data-anim="left" data-delay="100">
            <span className="badge-dot"></span>
            <span>
              Building production-ready healthcare SaaS products for US clients
              · Open to React & Full Stack opportunities
            </span>
          </div>

          {/* Headline stays — it's good */}
          <h1 className="hero-title" data-anim="left" data-delay="200">
            Turning <span className="grad">Complex Workflows</span> into
            Production-Ready Web Applications
          </h1>

          {/* Typed.js role line */}
          <div className="typed-wrapper" data-anim="left" data-delay="250">
            <span className="typed-label">I am a </span>
            <span className="typed-text" ref={typedRef}></span>
          </div>

          {/* FIX 3: Subtitle is now ONE punchy line — not a resume sentence */}
          <p className="hero-sub" data-anim="up" data-delay="300">
            Over {getExperienceYears()} years collaborating with product teams
            to design workflows, create Figma prototypes, build scalable React
            applications, integrate APIs, and ship production-ready healthcare
            SaaS platforms for US clients.
          </p>

          {/* FIX 4: CTAs now have clear visual hierarchy
              - View Projects = PRIMARY (most valuable action)
              - Download Resume = SECONDARY outline
              - Contact Me REMOVED from hero — it lives at the bottom of the page
          */}
          <div className="hero-btns" data-anim="up" data-delay="400">
            <button className="btn-primary" onClick={scrollToProjects}>
              View Projects →
            </button>
            <a href={resumeFile} download className="btn-outline">
              ↓ Download Resume
            </a>
          </div>

          {/* FIX 5: Domain badges replace generic tech badges
              These are differentiators. Any React dev can list React.js.
              Not every React dev has HIPAA + OCR + Stripe + US healthcare.
          */}
          <div className="domain-badges" data-anim="up" data-delay="500">
            {domainBadges.map(({ label, icon: Icon, color }) => (
              <span key={label} className="domain-badge">
                <Icon
                  size={15}
                  style={{
                    color,
                    flexShrink: 0,
                  }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="hero-right">
          {/* Avatar — 3D tilt effect kept, it's good */}
          <div
            className="avatar-wrap"
            data-anim="right"
            data-delay="200"
            onMouseMove={handleMove}
            onMouseLeave={resetMove}
          >
            <div className="avatar-ring"></div>
            <div className="avatar-inner">
              <img
                src={nkLogo}
                alt="Nandha Kumar C — Full Stack Developer"
                className="hero-avatar rounded-full"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                draggable={false}
              />
            </div>
          </div>

          {/* FIX 6: Stat cards kept here BUT removed from About section
              They only appear once now — duplication fixed.
              Changed ∞ card to something real and specific.
          */}
          <div className="stat-cards" data-anim="right" data-delay="300">
            <div className="stat-card">
              <FiBriefcase className="stat-icon" />
              <div className="stat-num">
                {year}
                <span>.{decimal}+</span>
              </div>

              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <FiPackage className="stat-icon" />
              <div className="stat-num">
                4<span>+</span>
              </div>
              {/* FIX 7: "5+ Projects Built" → "4+ Products Delivered" — more specific and honest */}
              <div className="stat-label">Products Delivered</div>
            </div>
            <div className="stat-card">
              <FiGitBranch className="stat-icon" />
              <div className="stat-num">
                End<span>-to-End</span>
              </div>

              <div className="stat-label">Workflow Ownership</div>
            </div>
            <div className="stat-card">
              <FiUsers className="stat-icon" />
              <div className="stat-num">
                1k<span>+</span>
              </div>
              <div className="stat-label">Users Supported</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
