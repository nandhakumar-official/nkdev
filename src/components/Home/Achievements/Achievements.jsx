// src/components/Home/Achievements.jsx
import { useEffect, useRef } from "react";
import "./Achievements.css";

const Achievements = () => {
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const animateCounter = (el) => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      const span = el.querySelector("span");
      const isFloat = target % 1 !== 0;
      const duration = 1500;
      const steps = 50;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        current = increment * step;
        if (step >= steps) {
          current = target;
          clearInterval(interval);
        }
        span.textContent =
          (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
      }, duration / steps);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            document
              .querySelectorAll(".ach-num[data-target]")
              .forEach(animateCounter);
            hasAnimated.current = true;
            counterObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    // FIX: anim-in instead of "visible" — matches scroll animation system
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("anim-in");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".ach-card")
      .forEach((el) => fadeObserver.observe(el));

    if (sectionRef.current) counterObserver.observe(sectionRef.current);

    return () => {
      counterObserver.disconnect();
      fadeObserver.disconnect();
    };
  }, []);

  const achievements = [
    {
      type: "counter", // animated number
      target: "6",
      suffix: "",
      prefix: "",
      label: "Languages Supported",
      sublabel:
        "English, Spanish , Chinese, Arabic, French, German — multilingual i18n in production",
      icon: "🌍",
      delay: 100,
    },
    {
      type: "static", // not a counter — percentage suits static better
      display: "50%",
      label: "Less Onboarding Time",
      sublabel:
        "HR workflow reduction delivered for SAN Institute freelance project",
      icon: "⚡",
      delay: 200,
    },
    {
      type: "counter",
      target: "7",
      suffix: "",
      prefix: "",
      label: "Onboarding Modules Built",
      sublabel: "Personal info → payroll — complete MERN system delivered solo",
      icon: "🗂️",
      delay: 300,
    },
    {
      type: "counter",
      target: "4",
      suffix: "+",
      prefix: "",
      label: "Countries Reached",
      sublabel:
        "US healthcare clients onboarded through patient intake systems",
      icon: "🌐",
      delay: 400,
    },
  ];

  return (
    <section id="achievements" className="achievements" ref={sectionRef}>
      <div className="ach-inner">
        {/* FIX: Label and title updated to match new proof-based content */}
        <div
          className="section-label"
          data-anim="up"
          style={{ textAlign: "center" }}
        >
          Proof of work
        </div>
        <h2
          className="section-title"
          data-anim="up"
          data-delay="100"
          style={{ textAlign: "center" }}
        >
          Numbers that tell the story
        </h2>
        <p
          className="section-sub"
          data-anim="up"
          data-delay="150"
          style={{ textAlign: "center", margin: "0 auto 2.5rem auto" }}
        >
          Specific results — not the same stats you already saw above.
        </p>

        <div className="ach-grid">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="ach-card"
              data-anim="scale"
              data-delay={item.delay}
            >
              {/* Icon */}
              <div className="ach-icon">{item.icon}</div>

              {/* Number — animated counter OR static display */}
              {item.type === "counter" ? (
                <div
                  className="ach-num"
                  data-target={item.target}
                  data-suffix={item.suffix}
                >
                  {item.prefix && (
                    <span className="ach-prefix">{item.prefix}</span>
                  )}
                  <span>0</span>
                  {/* suffix rendered by JS counter */}
                </div>
              ) : (
                // FIX: Static display for non-counter stats like "50%"
                <div className="ach-num ach-num-static">
                  <span>{item.display}</span>
                </div>
              )}

              <div className="ach-label">{item.label}</div>

              {/* FIX: Sublabel added — explains what the number actually means */}
              <div className="ach-sublabel">{item.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
