import { useEffect, useRef } from "react";
import nkLogo from "../../../assets/Nk Logo.png";
import Typed from "typed.js";

const Hero = () => {
  const typedRef = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    typedInstance.current = new Typed(typedRef.current, {
      strings: [
        "Full Stack Developer",
        "React.js Developer",
        "MERN Stack Developer",
        "Frontend Engineer",
        "SaaS Product Developer",
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

  const resumeFile = "/resume/NandhaKumar_FullStackDeveloper.docx";

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

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
    { label: "Healthcare SaaS", icon: "🏥" },
    { label: "HIPAA Compliant", icon: "🔒" },
    { label: "Stripe Payments", icon: "💳" },
    { label: "OCR Integration", icon: "📄" },
    { label: "US Clients", icon: "🌐" },
    { label: "Multilingual i18n", icon: "🌍" },
  ];

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
              Open to React &amp; Full Stack roles · Bangalore / Remote
            </span>
          </div>

          {/* Headline stays — it's good */}
          <h1 className="hero-title" data-anim="left" data-delay="200">
            Building <span className="grad">Scalable</span> Digital Experiences
            with React, TypeScript &amp; MERN
          </h1>

          {/* Typed.js role line */}
          <div className="typed-wrapper" data-anim="left" data-delay="250">
            <span className="typed-label">I am a </span>
            <span className="typed-text" ref={typedRef}></span>
          </div>

          {/* FIX 3: Subtitle is now ONE punchy line — not a resume sentence */}
          <p className="hero-sub" data-anim="up" data-delay="300">
            2.5 years shipping healthcare SaaS for US clients — from Figma to
            production. Based in Tamil Nadu, India.
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
            {domainBadges.map(({ label, icon }) => (
              <span key={label} className="domain-badge">
                <span className="domain-badge-icon">{icon}</span>
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
                style={{ width: "178px" }}
              />
            </div>
          </div>

          {/* FIX 6: Stat cards kept here BUT removed from About section
              They only appear once now — duplication fixed.
              Changed ∞ card to something real and specific.
          */}
          <div className="stat-cards" data-anim="right" data-delay="300">
            <div className="stat-card">
              <div className="stat-num">
                2<span>.5+</span>
              </div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">
                4<span>+</span>
              </div>
              {/* FIX 7: "5+ Projects Built" → "4+ Production Apps" — more specific and honest */}
              <div className="stat-label">Production Apps</div>
            </div>
            <div className="stat-card">
              {/* FIX 8: Replaced ∞ "Clean Code Lines" — it was a joke card
                  that undermined the credibility of the real stats next to it.
                  "3 Languages" refers to EN/ES/HI i18n — real and specific. */}
              <div className="stat-num">
                3<span> Lang</span>
              </div>
              <div className="stat-label">i18n Supported</div>
            </div>
            <div className="stat-card">
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
