import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import Lenis from 'lenis'

import Nav from './Components/Nav.jsx'
import Footer from './Components/Footer.jsx'
import Home from './Home.jsx'
import Works from './Works.jsx'
import WorkArticle from './WorkArticle.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const containerRef = useRef(null);

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return;

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: "power1.in",
      onComplete: () => {
        window.scrollTo(0, 0); // ← add this
        setDisplayLocation(location);
        gsap.to(containerRef.current, {
          opacity: 1,
          duration: 0.35,
          ease: "power1.out"
        });
      }
    });
  }, [location]);

  return (
    <div ref={containerRef}>
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/works/:id" element={<WorkArticle />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

function App() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    // Plug into GSAP's ticker so they stay in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div>
        <Nav />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;