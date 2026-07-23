// src/components/Home/About.jsx
import "./About.css";
const About = () => {
  // What makes Nandha different — specific proof points, not tag clouds
  const proofPoints = [
    {
      icon: "🏥",
      title: "HIPAA-compliant systems",
      desc: "Patient data, done right — secure intake forms, digital agreements, and OCR workflows used by 1,000+ US healthcare users.",
    },
    {
      icon: "💳",
      title: "Full payment lifecycle",
      desc: "Stripe pre-payment, post-payment, success/failure handling, and billing dashboards — not just 'I've used Stripe'.",
    },
    {
      icon: "🌍",
      title: "Multilingual at scale",
      desc: "i18n across English, Spanish, and Hindi — with Context API managing state across 8+ multi-step form components.",
    },
    {
      icon: "🎨",
      title: "Figma to production",
      desc: "Pixel-perfect delivery across Chrome, Firefox, Safari, and Edge — I don't approximate, I match.",
    },
  ];

  // Currently learning — replaces the duplicate stat cards
  // Shows growth mindset, makes the right column useful and non-repetitive
  const learning = [
    { label: "Next.js App Router", status: "active" },
    { label: "Docker basics", status: "active" },
    { label: "Jest + React Testing Library", status: "next" },
    { label: "Redis caching", status: "next" },
  ];

  return (
    <section id="about" className="about">
      <div className="about-inner">
        {/* ── LEFT — Story, not resume bullets ── */}
        <div className="about-story" data-anim="left">
          <div className="section-label">About Me</div>
          <h2 className="section-title">
            Turning complex problems into elegant products
          </h2>

          {/*
            BEFORE (generic):
            "I'm Nandha Kumar C, a Full Stack MERN Developer..."
            "At Siddha AI, I expanded into building complete SaaS..."

            AFTER (specific story that only Nandha can tell):
          */}
          <p>
            I started as a frontend developer who cared too much about pixel
            accuracy. Then I joined a healthcare company and learned what{" "}
            <strong>"too much" actually means</strong> — when a patient can't
            complete their intake form at midnight, it's not a UI bug. It's a
            broken workflow.
          </p>
          <p>
            That context changed how I build. I now obsess over edge cases,
            fallback states, and what happens when the OCR fails at 2am. I've
            shipped <strong>HIPAA-compliant systems</strong>, Stripe payment
            flows, and multilingual patient forms used by real people in real
            hospitals — all from a single React + TypeScript + Node.js codebase.
          </p>
          <p>
            I work best at the intersection of product and engineering — where a
            Figma file becomes something{" "}
            <strong>patients and doctors actually use</strong>.
          </p>

          {/*
            BEFORE (generic quote):
            "I don't just build features — I design experiences that work at scale..."

            AFTER (specific and verifiable):
          */}
          <div className="highlight-card" data-anim="up" data-delay="200">
            <p>
              "Sole developer on a MERN onboarding platform that cut a client's
              HR process time by 50% — from Figma wireframe to MongoDB in two
              months."
            </p>
          </div>
        </div>

        {/* ── RIGHT — Proof points + Currently Learning ── */}
        {/*
          BEFORE: 4 stat cards (2.5+, 5+, 3+, 1k+) — exact duplicates of Hero
          AFTER:  2 useful things that don't appear anywhere else on the page
        */}
        <div data-anim="right">
          {/* Proof points — what you actually did, not numbers */}
          <div className="about-proof-grid">
            {proofPoints.map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className="about-proof-card"
                data-anim="scale"
                data-delay={`${(i + 1) * 100}`}
              >
                <span className="about-proof-icon">{icon}</span>
                <div>
                  <div className="about-proof-title">{title}</div>
                  <div className="about-proof-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Currently Learning — fills the space left by removed stat cards
              Shows growth mindset, makes senior engineers nod */}
          <div className="about-learning" data-anim="up" data-delay="400">
            <div className="about-learning-label">Currently learning</div>
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
