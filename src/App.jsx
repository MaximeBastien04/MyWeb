import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'

import Nav from './Components/Nav.jsx'
import Footer from './Components/Footer.jsx'
import Home from './Home.jsx'
import Works from './Works.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'

function AnimatedRoutes() {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const containerRef = useRef(null);

    useEffect(() => {
        if (location.pathname === displayLocation.pathname) return;

        // Fade out current page
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.35,
            ease: "power1.in",
            onComplete: () => {
                // Swap the page, then fade in
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
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
}

function App() {
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