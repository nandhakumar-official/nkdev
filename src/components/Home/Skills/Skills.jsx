// src/components/Home/Skills.jsx
// AUDIT FIXES APPLIED:
// 1. Proof line added to ALL 5 cards (Database + Tools + Concepts were missing)
// 2. "Primary" badge added to Frontend card — signals your core strength
// 3. "Domain expertise" badge added to Concepts — signals these are rare
// 4. First 4 concepts get skill-tag-highlight class — HIPAA/Stripe/OCR/Signatures stand out
// 5. Section subtitle updated — specific, not generic
// 6. VanillaTilt properly destroyed on unmount (memory leak fix)
// 7. observer.unobserve() called after animating — no redundant re-observations
// 8. frontend-card class removed — replaced with skill-featured (cleaner naming)

import { useEffect, useRef } from "react";
import "./Skills.css";
import VanillaTilt from "vanilla-tilt";

const Skills = () => {
  const tiltRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("anim-in");
            observer.unobserve(entry.target); // animate once only
          }
        });
      },
      { threshold: 0.12 },
    );

    const cards = document.querySelectorAll(".skill-category");

    tiltRefs.current = Array.from(cards);
    tiltRefs.current.forEach((el) => {
      observer.observe(el);
      VanillaTilt.init(el, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        scale: 1.03,
        perspective: 1000,
      });
    });

    // FIX: proper cleanup — was missing VanillaTilt destroy before
    return () => {
      tiltRefs.current.forEach((el) => {
        if (el.vanillaTilt) el.vanillaTilt.destroy();
      });
    };
  }, []);

  // ── Skill data ──────────────────────────────────────────────────────────

  const frontendSkills = [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript ES6+",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Material UI",
    "Bootstrap",
    "React Query",
    "Context API",
    "React Router",
    "Redux",
    "Responsive Design",
    "Lazy Loading",
    "Code Splitting",
    "Progressive Web Apps",
    "Accessibility",
    "Cross-Browser Testing",
  ];

  const backendSkills = [
    "Node.js",
    "Express.js",
    "REST API",
    "JWT Auth",
    "RBAC",
    "Middleware",
  ];

  const databaseSkills = ["MongoDB", "CRUD Operations", "Data Modeling"];

  const toolsSkills = [
    "Git",
    "GitHub",
    "CI/CD",
    "GitHub Actions",
    "Postman",
    "Figma",
    "Vite",
    "Webpack",
    "ESLint",
    "Prettier",
  ];

  // FIX: Differentiators at the TOP — HIPAA, Stripe, OCR, Signatures are rare
  // Common skills (Agile, Responsive, Lazy Loading) pushed to bottom
  const conceptsSkills = [
    { label: "Workflow Design", highlight: true },
    { label: "HIPAA Compliance", highlight: true },
    { label: "Stripe Integration", highlight: true },
    { label: "OCR Processing", highlight: true },
    { label: "Digital Signatures", highlight: true },
    { label: "HTML-to-PDF", highlight: false },
    { label: "Multi-Step Forms", highlight: false },
    { label: "Internationalization (i18n)", highlight: false },
    { label: "Manual Testing", highlight: false },
    { label: "CI/CD Pipeline", highlight: false },
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-inner">
        <div
          className="section-label"
          data-anim="down"
          style={{ textAlign: "center", marginBottom: "0.5rem" }}
        >
          Technical Skills
        </div>

        <h2
          className="section-title"
          data-anim="down"
          data-delay="100"
          style={{ textAlign: "center" }}
        >
          The stack I ship with
        </h2>

        {/* FIX: Subtitle now specific — removed "UI to API to database" generic line */}
        <p
          className="section-sub"
          data-anim="down"
          data-delay="200"
          style={{ textAlign: "center", margin: "0 auto 3rem auto" }}
        >
          Production-ready technologies, product thinking, and workflow
          expertise gained from building real healthcare SaaS platforms.
        </p>

        <div className="skills-grid">
          {/* ── FRONTEND — Primary strength, largest visual weight ── */}
          <div
            className="skill-category skill-featured"
            data-anim="left"
            data-delay="100"
          >
            <div className="skill-cat-header">
              <div
                className="skill-cat-icon"
                style={{ background: "rgba(0,212,255,0.1)" }}
              >
                ⚛️
              </div>
              <div className="skill-cat-name">Frontend</div>
              {/* FIX: Badge signals primary strength to recruiter */}
              <span className="skill-primary-badge">Primary</span>
            </div>
            <div className="skill-tags">
              {frontendSkills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
            {/* Proof line — already existed, kept */}
            <p className="skill-proof">
              Designed complex workflows in Figma and transformed them into
              production-ready React applications with pixel-perfect
              implementation across modern browsers.
            </p>
          </div>

          {/* ── BACKEND ── */}
          <div className="skill-category" data-anim="right" data-delay="200">
            <div className="skill-cat-header">
              <div
                className="skill-cat-icon"
                style={{ background: "rgba(16,185,129,0.1)" }}
              >
                ⚙️
              </div>
              <div className="skill-cat-name">Backend</div>
            </div>
            <div className="skill-tags">
              {backendSkills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
            {/* Proof line — already existed, kept */}
            <p className="skill-proof">
              Built secure REST APIs, role-based authentication, multi-step
              business workflows, and healthcare SaaS features serving US
              clients.
            </p>
          </div>

          {/* ── DATABASE ── */}
          <div className="skill-category" data-anim="left" data-delay="300">
            <div className="skill-cat-header">
              <div
                className="skill-cat-icon"
                style={{ background: "rgba(124,58,237,0.1)" }}
              >
                🗄️
              </div>
              <div className="skill-cat-name">Database</div>
            </div>
            <div className="skill-tags">
              {databaseSkills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
            {/* FIX: Proof line added — was completely missing before */}
            <p className="skill-proof">
              Structured MongoDB collections for patient intake, onboarding,
              payment workflows, agreements, and multi-tenant healthcare
              applications.
            </p>
          </div>

          {/* ── TOOLS & PLATFORMS ── */}
          <div className="skill-category" data-anim="right" data-delay="300">
            <div className="skill-cat-header">
              <div
                className="skill-cat-icon"
                style={{ background: "rgba(245,158,11,0.1)" }}
              >
                🛠️
              </div>
              <div className="skill-cat-name">Tools &amp; Platforms</div>
            </div>
            <div className="skill-tags">
              {toolsSkills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
            {/* FIX: Proof line added — was completely missing before */}
            <p className="skill-proof">
              Daily workflow includes Git, GitHub, Figma, Postman, CI/CD
              pipelines, manual testing, and collaborative development with
              product and backend teams.
            </p>
          </div>

          {/* ── CONCEPTS & INTEGRATIONS — Full width, rare skills first ── */}
          <div
            className="skill-category full-width"
            data-anim="up"
            data-delay="400"
          >
            <div className="skill-cat-header">
              <div
                className="skill-cat-icon"
                style={{ background: "rgba(239,68,68,0.1)" }}
              >
                💡
              </div>
              <div className="skill-cat-name">Concepts &amp; Integrations</div>
              {/* FIX: Badge communicates rarity of these skills */}
              <span className="skill-rare-badge">Domain expertise</span>
            </div>
            <div className="skill-tags">
              {conceptsSkills.map(({ label, highlight }, i) => (
                <span
                  key={i}
                  className={`skill-tag ${highlight ? "skill-tag-highlight" : ""}`}
                >
                  {label}
                </span>
              ))}
            </div>
            {/* FIX: Proof line added — was completely missing before */}
            <p className="skill-proof">
              Experienced in workflow architecture, HIPAA-compliant healthcare
              products, Stripe payment integration, OCR processing, multilingual
              applications, digital signatures, and HTML-to-PDF generation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
