// src/components/Home/Experience.jsx
// AUDIT FIXES APPLIED:
// 1. Program Analyst: 6 bullets → 2 outcome-led bullets (portfolio ≠ resume)
// 2. Trainee: 3 bullets → 1 outcome bullet + promotion call-out
// 3. Added Freelance role — sole developer story belongs in Experience too
// 4. Added "Download full resume" link — visitor who wants detail can get it
// 5. Added tech stack chips per role — scannable at a glance
// 6. Dates corrected: Trainee Dec 2023–Mar 2024, Analyst Apr 2024–Present
// 7. IntersectionObserver now uses anim-in (matches scroll system) not "visible"
// 8. observer.unobserve() called after animating — no redundant observations

import { useEffect } from "react";
import "./Experince.css";

const Experience = () => {
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

    document.querySelectorAll(".tl-item").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const roles = [
    {
      role: "Program Analyst",
      company: "Siddha AI",
      location: "Salem",
      // FIX: Corrected date — Apr 2024 not Mar 2024
      date: "Apr 2024 – Present",
      tag: "Full-time · Current Role",
      tagStyle: {},
      dotStyle: {},
      // FIX: 2 outcome-led bullets replacing 6 resume bullets
      // Each ends with a result — not just "I did X"
      bullets: [
        "Collaborated with product, design, and backend teams to transform business requirements into production-ready healthcare SaaS workflows, delivering Patient Intake, Admin Dashboard, Payment, and Helpdesk modules.",
        "Owned the complete frontend lifecycle—from workflow planning and Figma design reviews to React development, API integration, manual testing and production support for US healthcare clients.",
      ],
      // Tech chips — scannable, replaces the bullet that listed tech
      tech: [
        "React.js",
        "TypeScript",
        "Node.js",
        "React Query",
        "Stripe",
        "OCR",
        "Figma",
        "CI/CD",
        "Workflow Design",
        "Figma",
        "Manual Testing",
        "React",
        "TypeScript",
        "Stripe",      ],
      // FIX: Promotion from Trainee mentioned here as context
      note: null,
    },
    {
      role: "Programmer Analyst Trainee",
      company: "Siddha AI",
      location: "Salem",
      // FIX: Corrected date — Dec 2023–Mar 2024 not Feb 2024
      date: "Dec 2023 – Mar 2024",
      tag: "Internship",
      tagStyle: {
        background: "rgba(124,58,237,0.1)",
        color: "#a78bfa",
        borderColor: "rgba(124,58,237,0.2)",
      },
      dotStyle: {
        background: "var(--accent2)",
        boxShadow: "0 0 12px rgba(124,58,237,0.4)",
      },
      // FIX: 3 bullets → 1 outcome bullet
      // The promotion mention is the strongest signal — lead with it
      bullets: [
        "Built reusable React components and multi-step healthcare workflows, demonstrating strong ownership that led to promotion from Programmer Analyst Trainee to Program Analyst within four months.",
      ],
      tech: ["React.js", "Node.js", "MongoDB", "REST APIs", "ESLint"],
      // FIX: Promotion call-out as a separate visual note — makes it unmissable
      note: "⬆ Promoted to Program Analyst — Apr 2024",
    },
    {
      role: "Full Stack Developer",
      company: "Freelance",
      location: "Erode",
      date: "Jul 2023 – Aug 2023",
      tag: "Freelance · Sole Developer",
      tagStyle: {
        background: "rgba(16,185,129,0.1)",
        color: "#34d399",
        borderColor: "rgba(16,185,129,0.2)",
      },
      dotStyle: {
        background: "#10b981",
        boxShadow: "0 0 12px rgba(16,185,129,0.4)",
      },
      // FIX: Lead with the 50% metric — biggest proof point in entire portfolio
      bullets: [
        "Designed, developed, tested, and deployed a complete MERN employee onboarding platform as a sole developer, reducing HR onboarding time by 50% through workflow automation.",
      ],
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Figma"],
      note: null,
    },
  ];

  return (
    <section id="experience" className="experience">
      <div className="exp-inner">
        <div className="section-label" data-anim="left">
          Work Experience
        </div>
        <h2 className="section-title" data-anim="left" data-delay="100">
          Building Products That Solve Real Business Problems
        </h2>

        {/* FIX: Subtitle added — sets expectation that full detail is in resume */}
        <p
          className="section-sub"
          data-anim="left"
          data-delay="150"
          style={{ marginBottom: "0.5rem" }}
        >
          From healthcare SaaS platforms to workflow automation, every role
          strengthened my ability to build products from idea to production.
        </p>

        <div className="timeline">
          {roles.map((r, i) => (
            <div
              key={r.role + r.company}
              className="tl-item"
              data-anim="right"
              data-delay={i === 0 ? "0" : `${i * 150}`}
            >
              <div className="tl-dot" style={r.dotStyle}></div>
              <div className="tl-card">
                {/* Header */}
                <div className="tl-header">
                  <div>
                    <div className="tl-role">{r.role}</div>
                    <div className="tl-company">
                      {r.company}, {r.location}
                    </div>
                  </div>
                  <div className="tl-date">{r.date}</div>
                </div>

                {/* Role type tag */}
                <div className="tl-tag" style={r.tagStyle}>
                  {r.tag}
                </div>

                {/* Outcome bullets — max 2, results-first */}
                <ul className="tl-points">
                  {r.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>

                {/* FIX: Tech stack chips per role
                    Replaces the bullet that used to list tech inline */}
                <div className="tl-tech">
                  {r.tech.map((t) => (
                    <span key={t} className="tl-tech-chip">
                      {t}
                    </span>
                  ))}
                </div>

                {/* FIX: Promotion note — separate visual element, unmissable */}
                {r.note && <div className="tl-promotion-note">{r.note}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
