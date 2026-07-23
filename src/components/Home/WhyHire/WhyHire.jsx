// src/components/Home/WhyHire.jsx
// AUDIT FIXES APPLIED:
// 1. 6 generic cards → 3 proof-backed cards
//    Every card now ends with a verifiable fact from your actual work
// 2. Each card links back to something the visitor already saw in Projects
//    — creates mental connections across sections
// 3. "Why Hire Me" label → "Why it matters" — less defensive framing
// 4. Grid changes: 3 equal cards in a row instead of 2x3
//    — fewer cards = each one gets more weight and attention
// 5. observer.disconnect() on cleanup — cleaner than loop unobserve
// 6. anim-in instead of "visible" — matches scroll animation system
// 7. Added "proof tag" visual element — makes the evidence scannable

import { useEffect } from "react";
import "./WhyHire.css";

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
      { threshold: 0.1 }
    );

    document.querySelectorAll(".why-card").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // FIX: 3 proof-backed cards replacing 6 generic claim cards
  //
  // OLD approach — unverifiable claims:
  // "React Ecosystem Depth" — I know the ecosystem deeply
  // "Full Stack Ownership" — I've built complete products solo
  // "Healthcare & SaaS Domain" — Real experience with HIPAA
  // "Performance First" — I optimize before it becomes a problem
  // "Design-to-Code Precision" — I convert Figma designs pixel-perfectly
  // "Agile Team Player" — Comfortable in sprint cycles
  //
  // NEW approach — each card ends with specific proof the visitor can verify:

  const reasons = [
    {
      icon: "🏥",
      title: "I've shipped in regulated environments",
      description:
        "HIPAA compliance, patient data handling, OCR fallback workflows, and digital signature generation. Not side projects — production systems used by 1,000+ US healthcare users at Siddha AI.",
      // Proof tag links back to Projects section mentally
      proofTag: "Patient Intake & Agreement System",
      proofLink: "#projects",
      accentColor: "#10b981", // green — healthcare
      anim: "left",
      delay: "100",
    },
    {
      icon: "🎨",
      title: "I own the full UI lifecycle",
      description:
        "From Figma file to deployed component — I handle design interpretation, cross-browser testing (Chrome, Firefox, Safari, Edge), performance optimization, and API integration without hand-holding.",
      proofTag: "Admin & Super Admin Dashboard",
      proofLink: "#projects",
      accentColor: "#00d4ff", // cyan — frontend
      anim: "up",
      delay: "200",
    },
    {
      icon: "🚀",
      title: "I've been trusted to ship solo",
      description:
        "Freelance MERN project for SAN Institute — sole developer from Figma wireframe to MongoDB backend to Vercel deployment. The client's HR onboarding time dropped by 50%.",
      proofTag: "Employee Joining Form System",
      proofLink: "#projects",
      accentColor: "#7c3aed", // purple — freelance
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
          Why it matters
        </div>
        <h2
          className="section-title"
          data-anim="down"
          data-delay="100"
          style={{ textAlign: "center" }}
        >
          What I bring to your team
        </h2>

        {/* FIX: Subtitle added — sets up the proof-first framing */}
        <p
          className="section-sub"
          data-anim="down"
          data-delay="150"
          style={{ textAlign: "center", margin: "0 auto 3rem auto" }}
        >
          Three things I can prove — not just claim.
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
                <div className="why-icon">{reason.icon}</div>
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
