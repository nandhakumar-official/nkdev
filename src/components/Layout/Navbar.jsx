// src/components/Layout/Navbar.jsx
import { useState, useEffect } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    closeMobile();
  };

  return (
    <>
      <nav
        className="navbar"
        style={{ boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.4)" : "none" }}
      >
        <a href="#hero" className="nav-logo">
          NK<span>.</span>dev
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <button className="nav-cta" onClick={scrollToContact}>
          Hire Me
        </button>
        <button
          className="hamburger"
          onClick={toggleMobile}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <a href="#about" onClick={closeMobile}>
          About
        </a>
        <a href="#skills" onClick={closeMobile}>
          Skills
        </a>
        <a href="#experience" onClick={closeMobile}>
          Experience
        </a>
        <a href="#projects" onClick={closeMobile}>
          Projects
        </a>
        <a href="#contact" onClick={closeMobile}>
          Contact
        </a>
      </div>
    </>
  );
};

export default Navbar;
