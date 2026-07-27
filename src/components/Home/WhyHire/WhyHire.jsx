// src/components/Home/WhyHire.jsx

import { useEffect } from "react";
import "./WhyHire.css";
import { FaProjectDiagram, FaReact, FaRocket } from "react-icons/fa";

const WhyHire = () => {
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
      .querySelectorAll(".why-card")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      icon: <FaProjectDiagram />,
      title: "I solve product problems, not just coding tasks",
      description:
        "I enjoy turning complicated workflows into simple user experiences. From multi-step patient onboarding to admin dashboards, I focus on reducing friction while keeping the system scalable.",
      proofTag: "Patient Intake Platform",
      proofLink: "#projects",
      accentColor: "#10b981",
      anim: "left",
      delay: "100",
    },
    {
      icon: <FaReact />,
      title: "Frontend is my strongest skill",
      description:
        "Building polished React applications is where I deliver the most value. I convert Figma designs into responsive, accessible interfaces with reusable components, clean architecture, and production-ready performance.",
      proofTag: "Admin & Super Admin Dashboard",
      proofLink: "#projects",
      accentColor: "#00d4ff",
      anim: "up",
      delay: "200",
    },
    {
      icon: <FaRocket />,
      title: "I take ownership from start to finish",
      description:
        "As the sole developer for a freelance MERN project, I handled planning, frontend, backend, database design, testing, deployment, and client communication. The finished platform reduced HR onboarding time by 50%.",
      proofTag: "Employee Joining Form System",
      proofLink: "#projects",
      accentColor: "#7c3aed",
      anim: "right",
      delay: "100",
    },
  ];

  return (
    <section id="why" className="why">
      <div className="why-inner">
        {/* FIX: Label changed — less defensive than "Why Hire Me" */}
        <div
          className="section-label"
          data-anim="down"
          style={{ textAlign: "center" }}
        >
          Beyond the code
        </div>
        <h2
          className="section-title"
          data-anim="down"
          data-delay="100"
          style={{ textAlign: "center" }}
        >
          The way I approach product development
        </h2>

        {/* FIX: Subtitle added — sets up the proof-first framing */}
        <p
          className="section-sub"
          data-anim="down"
          data-delay="150"
          style={{ textAlign: "center", margin: "0 auto 3rem auto" }}
        >
          The qualities that define how I work.
        </p>

        {/* FIX: 3-column grid — each card gets full width and attention */}
        <div className="why-grid why-grid-3">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="why-card why-card-proof"
              data-anim={reason.anim}
              data-delay={reason.delay}
              style={{ "--why-accent": reason.accentColor }}
            >
              {/* Accent bar at top — matches Projects card pattern */}
              <div
                className="why-accent-bar"
                style={{ background: reason.accentColor }}
              />

              <div className="why-card-inner">
                <div
                  className="why-icon"
                  style={{
                    color: reason.iconColor,
                  }}
                >
                  {reason.icon}
                </div>
                <div className="why-title">{reason.title}</div>
                <div className="why-desc">{reason.description}</div>

                {/* FIX: Proof tag — links the claim to a specific project
                    Visitor who just scrolled past Projects recognises it */}
                <a href={reason.proofLink} className="why-proof-tag">
                  <span className="why-proof-icon">↗</span>
                  {reason.proofTag}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHire;
