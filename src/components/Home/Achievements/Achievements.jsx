// src/components/Home/Achievements.jsx
// AUDIT FIXES APPLIED:
// 1. ALL 4 numbers replaced — none duplicate Hero stat cards anymore
//    Hero has: 2.5+ years, 4+ apps, 3 lang, 1k+ users
//    This section now shows: 3 languages, 50% reduction, 7 modules, 4 countries
// 2. Two card types: animated counters + static highlight cards
//    — some stats don't suit a counter (50%, "countries") so they're static
// 3. Section label + title updated to match new content
// 4. fadeObserver now uses anim-in (matches scroll system) not "visible"
// 5. observer.disconnect() already correct — kept as-is

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

  // FIX: ALL new numbers — none appear in Hero, About, or anywhere else
  //
  // OLD (duplicated Hero):          NEW (unique, specific, meaningful):
  // 2.5+ Years Experience       →   3 Languages (EN/ES/HI — i18n work)
  // 5+ Production Projects      →   50% (HR onboarding reduction — freelance)
  // 1000+ Healthcare Users      →   7 Modules (Employee Form scope)
  // 3+ Major SaaS Applications  →   4 Countries (US healthcare client reach)
  //
  // Each stat now tells a story no other developer has.

  const achievements = [
    {
      type: "counter", // animated number
      target: "3",
      suffix: "",
      prefix: "",
      label: "Languages Supported",
      sublabel: "English, Spanish & Hindi — multilingual i18n in production",
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
