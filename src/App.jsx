// src/App.js
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import CursorGlow from "./components/Layout/CursorGlow";
import Hero from "./components/Home/Hero/Hero";
import About from "./components/Home/About/About";
import Skills from "./components/Home/Skills/Skills";
import Experience from "./components/Home/Experince/Experince";
import Projects from "./components/Home/Projects/Projects";
import Achievements from "./components/Home/Achievements/Achievements";
import WhyHire from "./components/Home/WhyHire/WhyHire";
import Contact from "./components/Contact/Contact";
import Loader from "./components/Loader/Loader";
import { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    const animatedElements = document.querySelectorAll("[data-anim]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target;

          if (entry.isIntersecting) {
            element.classList.add("anim-in", "visible");
          } else {
            element.classList.remove("anim-in", "visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    animatedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(loaderTimer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <WhyHire />
      <Contact />
      <Footer />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid #374151",
            borderRadius: "12px",
          },
        }}
      />
    </>
  );
}

export default App;
