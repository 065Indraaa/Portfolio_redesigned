import { useState, useEffect } from "react";
import Lenis from "lenis";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Process from "./pages/Process";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import "./styles/global.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Smooth scroll
  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    // anchor links via lenis
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id && id.length > 1) { e.preventDefault(); lenis.scrollTo(id, { offset: 0 }); }
    };
    document.addEventListener("click", onClick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); document.removeEventListener("click", onClick); };
  }, [loaded]);

  // Active section observer
  useEffect(() => {
    if (!loaded) return;
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) setActiveSection(en.target.id); }),
      { threshold: 0.35, rootMargin: "-10% 0px -40% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [loaded]);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <div className="noise-overlay" />
      {loaded && (
        <>
          <Cursor />
          <Navbar activeSection={activeSection} />
          <main>
            <Hero />
            <Projects />
            <About />
            <Process />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
