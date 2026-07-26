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
      metricHeadline: "1,000+ US healthcare users onboarded",
      title: "Patient Form & Agreement System",
      problem:
        "Healthcare providers needed a secure digital workflow to replace manual patient onboarding.",
      description:
        "Built a HIPAA-compliant patient onboarding platform featuring OCR, multilingual forms, digital signatures, appointment scheduling, and secure document workflows.",
      // FIX: Outcome chips replace feature bullet list
      contribution: [
        "Workflow Design",
        "Figma Collaboration",
        "Frontend Development",
        "Backend APIs",
        "Manual Testing",
        "Production Deployment",
      ],
      outcomes: [
        "HIPAA workflows",
        "OCR processing",
        "Digital signatures",
        "Multilingual i18n",
        "Stripe payments",
        "PDF generation",
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
      privateText: "Private Client Project",
    },
    {
      id: "02",
      featured: true, // FEATURED — large card
      accentColor: "#00d4ff", // cyan — SaaS/platform
      type: "SaaS",
      highlight: "saas",
      highlightText: "Multi-tenant Dashboard",
      metricHeadline: "Multi-tenant SaaS with role-based access",
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
      privateText: "Private Client Project",
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
      githubLink: "https://github.com/nandhakumar-official",
    },
    {
      id: "04",
      featured: false, // Standard card
      accentColor: "#f59e0b", // amber — payments
      type: "Payments",
      highlight: "payment",
      highlightText: "Stripe Integration",
      metricHeadline: "End-to-end onboarding with secure payments",
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
      privateText: "Private Client Project",
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
          Products I've helped bring to life
        </h2>
        <p
          className="section-sub"
          data-anim="down"
          data-delay="200"
          style={{ textAlign: "center", margin: "0 auto 3rem auto" }}
        >
          From healthcare SaaS platforms serving US clients to custom business
          applications, every project reflects complete ownership—from product
          discussions and Figma designs to development, testing, and production
          deployment.
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
                      View Source →
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
