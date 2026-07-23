// src/components/Home/Projects.jsx
// AUDIT FIXES APPLIED:
// 1. Patient Intake + Admin Dashboard → FEATURED cards (larger, metric headline)
// 2. Employee Form → metric "50% reduction" as headline, not buried in bullet
// 3. Each card has a unique accent color at the top — visually distinct
// 4. Feature bullets replaced with outcome chips — scannable in 3 seconds
// 5. "Problem → Solution" sentence added under description
// 6. Cards are no longer equal — featured projects feel more impressive
// 7. observer.disconnect() on cleanup — cleaner than loop unobserve
// 8. anim-in class used (matches scroll system) instead of "visible"

import { useEffect } from "react";
import "./Projects.css";

const Projects = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("anim-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".proj-card")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: "01",
      featured: true, // FEATURED — large card
      accentColor: "#10b981", // green — healthcare
      type: "Healthcare",
      highlight: "health",
      highlightText: "HIPAA Compliant",
      // FIX: Metric headline — this is the hook, not the title
      metricHeadline: "1,000+ US healthcare users onboarded",
      title: "Patient Form & Agreement System",
      // FIX: Problem → Solution sentence
      problem: "Manual patient intake was error-prone and slow at midnight.",
      description:
        "HIPAA-compliant patient intake platform with OCR scanning, multilingual forms, digital signatures, and appointment booking.",
      // FIX: Outcome chips replace feature bullet list
      outcomes: [
        "OCR + manual fallback",
        "EN / ES / HI i18n",
        "Digital signatures",
        "8+ step form state",
        "Pre & post-payment",
        "PDF agreements",
      ],
      stack: [
        "React.js",
        "TypeScript",
        "Tailwind CSS",
        "OCR",
        "i18n",
        "REST APIs",
      ],
      isPrivate: true,
      privateText: "Private — Siddha AI",
    },
    {
      id: "02",
      featured: true, // FEATURED — large card
      accentColor: "#00d4ff", // cyan — SaaS/platform
      type: "SaaS",
      highlight: "saas",
      highlightText: "Multi-tenant Dashboard",
      metricHeadline: "Two roles. One codebase. Real-time analytics.",
      title: "Admin & Super Admin Dashboard",
      problem:
        "Platform needed separate views for platform owners vs. each client.",
      description:
        "Multi-tenant SaaS platform with Super Admin (platform-level) and Admin (client-level) roles, analytics, and payments.",
      outcomes: [
        "RBAC — 2 role levels",
        "HTML-to-PDF generation",
        "Revenue analytics",
        "Helpdesk + file upload",
        "Stripe billing",
        "React Query caching",
      ],
      stack: [
        "React.js",
        "TypeScript",
        "Tailwind CSS",
        "React Query",
        "Stripe",
        "i18n",
      ],
      isPrivate: true,
      privateText: "Private — Siddha AI",
    },
    {
      id: "03",
      featured: false, // Standard card
      accentColor: "#7c3aed", // purple — freelance
      type: "Full Stack",
      highlight: "freelance",
      highlightText: "Freelance · Sole Developer",
      // FIX: 50% metric as headline — was buried in bullet 2 before
      metricHeadline: "Cut HR onboarding time by 50%",
      title: "Employee Joining Form System",
      problem:
        "Client's HR team was handling registrations manually end-to-end.",
      description:
        "End-to-end MERN employee onboarding platform built solo — from Figma wireframe to production in 2 months.",
      outcomes: [
        "Sole developer",
        "Figma → production",
        "7 onboarding modules",
        "Email notifications",
        "MongoDB CRUD",
        "Vercel deployed",
      ],
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Figma"],
      isPrivate: false,
      githubLink: "https://github.com/N4NDH4KUM4R",
    },
    {
      id: "04",
      featured: false, // Standard card
      accentColor: "#f59e0b", // amber — payments
      type: "Payments",
      highlight: "payment",
      highlightText: "Stripe Integration",
      metricHeadline: "Onboarding + payment in one seamless flow",
      title: "Client Intake & Payment Flow",
      problem:
        "Clients needed to sign agreements and pay before accessing the platform.",
      description:
        "Responsive client onboarding flow with Stripe payment integration, agreement signing, and multilingual support.",
      outcomes: [
        "Stripe pre/post-payment",
        "Agreement signing",
        "i18n multilingual",
        "Cross-browser tested",
      ],
      stack: ["React.js", "TypeScript", "Tailwind CSS", "Stripe", "i18n"],
      isPrivate: true,
      privateText: "Private — Siddha AI",
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="proj-inner">
        <div
          className="section-label"
          data-anim="down"
          style={{ textAlign: "center" }}
        >
          Featured Projects
        </div>
        <h2
          className="section-title"
          data-anim="down"
          data-delay="100"
          style={{ textAlign: "center" }}
        >
          Things I've built
        </h2>
        <p
          className="section-sub"
          data-anim="down"
          data-delay="200"
          style={{ textAlign: "center", margin: "0 auto 3rem auto" }}
        >
          From solo freelance builds to enterprise healthcare SaaS — each one
          shipped to production, not left as a side project.
        </p>

        {/* FIX: Featured row — top 2 projects get full-width treatment */}
        <div className="proj-featured-row">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <div
                key={project.id}
                className="proj-card proj-card-featured"
                data-anim={index === 0 ? "left" : "right"}
                data-delay={index === 0 ? "100" : "200"}
                style={{
                  // FIX: Unique top accent per project — visually distinct
                  "--proj-accent": project.accentColor,
                }}
              >
                {/* Colored accent bar at top */}
                <div
                  className="proj-accent-bar"
                  style={{ background: project.accentColor }}
                />

                <div className="proj-header">
                  <div className="proj-num">
                    {project.id} — {project.type}
                  </div>
                  <div className={`proj-highlight ${project.highlight}`}>
                    {project.highlightText}
                  </div>

                  {/* FIX: Metric headline is the first thing you read */}
                  <div className="proj-metric">{project.metricHeadline}</div>
                  <div className="proj-title">{project.title}</div>

                  {/* FIX: Problem sentence — shows context, not just what was built */}
                  <div className="proj-problem">
                    <span className="proj-problem-label">Problem: </span>
                    {project.problem}
                  </div>
                  <div className="proj-desc">{project.description}</div>
                </div>

                <div className="proj-body">
                  {/* FIX: Outcome chips instead of feature bullet list */}
                  <div className="proj-outcomes">
                    {project.outcomes.map((outcome, i) => (
                      <span key={i} className="proj-outcome-chip">
                        ✓ {outcome}
                      </span>
                    ))}
                  </div>
                  <div className="proj-stack">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="proj-tech">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="proj-footer">
                  <span
                    className="proj-btn"
                    style={{ cursor: "default", color: "var(--muted2)" }}
                  >
                    {project.privateText}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* Standard row — smaller cards for projects 03 and 04 */}
        <div className="proj-standard-row">
          {projects
            .filter((p) => !p.featured)
            .map((project, index) => (
              <div
                key={project.id}
                className="proj-card"
                data-anim={index === 0 ? "left" : "right"}
                data-delay={index === 0 ? "100" : "200"}
                style={{ "--proj-accent": project.accentColor }}
              >
                <div
                  className="proj-accent-bar"
                  style={{ background: project.accentColor }}
                />

                <div className="proj-header">
                  <div className="proj-num">
                    {project.id} — {project.type}
                  </div>
                  <div className={`proj-highlight ${project.highlight}`}>
                    {project.highlightText}
                  </div>
                  {/* FIX: Metric headline first even on standard cards */}
                  <div className="proj-metric">{project.metricHeadline}</div>
                  <div className="proj-title">{project.title}</div>
                  <div className="proj-problem">
                    <span className="proj-problem-label">Problem: </span>
                    {project.problem}
                  </div>
                  <div className="proj-desc">{project.description}</div>
                </div>

                <div className="proj-body">
                  <div className="proj-outcomes">
                    {project.outcomes.map((outcome, i) => (
                      <span key={i} className="proj-outcome-chip">
                        ✓ {outcome}
                      </span>
                    ))}
                  </div>
                  <div className="proj-stack">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="proj-tech">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="proj-footer">
                  {project.isPrivate ? (
                    <span
                      className="proj-btn"
                      style={{ cursor: "default", color: "var(--muted2)" }}
                    >
                      {project.privateText}
                    </span>
                  ) : (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-btn"
                    >
                      ↗ GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
