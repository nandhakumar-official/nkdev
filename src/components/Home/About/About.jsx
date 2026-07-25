// src/components/Home/About.jsx

import { getExperienceYears } from "../../../utils/experince";
import "./About.css";

const About = () => {
  const proofPoints = [
    {
      icon: "🧩",
      title: "Workflow Analysis",
      desc: "I collaborate with product teams to understand business requirements, design workflow diagrams, identify edge cases, and transform ideas into scalable product flows before writing code.",
    },
    {
      icon: "🎨",
      title: "Figma to Production",
      desc: "From approved Figma designs to pixel-perfect React applications with responsive layouts, reusable components, accessibility, and cross-browser compatibility.",
    },
    {
      icon: "⚙️",
      title: "Full Product Development",
      desc: "Building complete healthcare SaaS workflows including onboarding, payments, agreements, dashboards, API integrations, and production-ready business applications.",
    },
    {
      icon: "🧪",
      title: "Quality & Delivery",
      desc: "Manual testing, validation, bug fixing, production deployment, and continuous improvements to ensure reliable user experiences for real customers.",
    },
  ];

  const learning = [
    { label: "CI/CD Automation", status: "active" },
    { label: "Docker", status: "active" },
    { label: "Next.js App Router", status: "next" },
    { label: "Redis", status: "next" },
  ];

  return (
    <section id="about" className="about">
      <div className="about-inner">
        {/* LEFT */}
        <div className="about-story" data-anim="left">
          <div className="section-label">About Me</div>

          <h2 className="section-title">
            Building software starts long before writing code.
          </h2>

          <p>
            Every feature begins with understanding the business problem. Before
            opening my editor, I work with product teams to discuss workflows,
            identify user journeys, map edge cases, and convert requirements
            into structured workflow diagrams.
          </p>

          <p>
            Once the workflow is validated, I transform it into interactive
            Figma designs, develop scalable React applications, integrate APIs,
            implement business logic, perform manual testing, and deliver
            production-ready healthcare SaaS products used by healthcare
            providers in the United States.
          </p>

          <p>
            Over the past {getExperienceYears()} years, my role has evolved beyond frontend
            development. Today I contribute across the complete product
            lifecycle—from workflow planning and UI design to development,
            testing, deployment, and continuous product improvements.
          </p>

          <div className="highlight-card" data-anim="up" data-delay="200">
            <p>
              <strong>
                "My strength isn't just building interfaces—it's translating
                complex business workflows into production-ready software by
                contributing across workflow analysis, Figma design,
                development, testing, and deployment."
              </strong>
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div data-anim="right">
          <div className="about-proof-grid">
            {proofPoints.map(({ icon, title, desc }, index) => (
              <div
                key={title}
                className="about-proof-card"
                data-anim="scale"
                data-delay={`${(index + 1) * 100}`}
              >
                <span className="about-proof-icon">{icon}</span>

                <div>
                  <div className="about-proof-title">{title}</div>

                  <div className="about-proof-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="about-learning" data-anim="up" data-delay="400">
            <div className="about-learning-label">Currently Learning</div>

            <div className="about-learning-tags">
              {learning.map(({ label, status }) => (
                <span key={label} className={`about-learning-tag ${status}`}>
                  {status === "active" ? "⚡" : "→"} {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
