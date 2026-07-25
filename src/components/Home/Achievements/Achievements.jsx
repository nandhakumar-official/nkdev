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
          (target % 1 !== 0 ? current.toFixed(1) : Math.floor(current)) +
          suffix;
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

    if (sectionRef.current) {
      counterObserver.observe(sectionRef.current);
    }

    return () => {
      counterObserver.disconnect();
      fadeObserver.disconnect();
    };
  }, []);

  const achievements = [
    {
      type: "counter",
      target: "1000",
      suffix: "+",
      label: "Healthcare Users Served",
      sublabel:
        "Patient onboarding platform used across US healthcare organizations.",
      icon: "🏥",
      delay: 100,
    },
    {
      type: "static",
      display: "50%",
      label: "HR Process Reduction",
      sublabel:
        "Reduced employee onboarding time by building a complete MERN workflow.",
      icon: "⚡",
      delay: 200,
    },
    {
      type: "counter",
      target: "4",
      suffix: "",
      label: "Production SaaS Applications",
      sublabel:
        "Delivered healthcare, onboarding, payments, and admin platforms.",
      icon: "🚀",
      delay: 300,
    },
    {
      type: "counter",
      target: "6",
      suffix: "",
      label: "Core Production Integrations",
      sublabel: "Stripe, OCR, Digital Signatures, i18n, PDF Generation, RBAC.",
      icon: "🛠️",
      delay: 400,
    },
  ];

  return (
    <section id="achievements" className="achievements" ref={sectionRef}>
      <div className="ach-inner">
        <div
          className="section-label"
          data-anim="up"
          style={{ textAlign: "center" }}
        >
          Impact
        </div>

        <h2
          className="section-title"
          data-anim="up"
          data-delay="100"
          style={{ textAlign: "center" }}
        >
          Results I've delivered
        </h2>

        <p
          className="section-sub"
          data-anim="up"
          data-delay="150"
          style={{
            textAlign: "center",
            margin: "0 auto 2.5rem auto",
          }}
        >
          Real production work with measurable outcomes—not tutorial projects.
        </p>

        <div className="ach-grid">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="ach-card"
              data-anim="scale"
              data-delay={item.delay}
            >
              <div className="ach-icon">{item.icon}</div>

              {item.type === "counter" ? (
                <div
                  className="ach-num"
                  data-target={item.target}
                  data-suffix={item.suffix}
                >
                  <span>0</span>
                </div>
              ) : (
                <div className="ach-num ach-num-static">
                  <span>{item.display}</span>
                </div>
              )}

              <div className="ach-label">{item.label}</div>

              <div className="ach-sublabel">{item.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
