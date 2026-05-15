import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const linksRef = useRef([]);
    const location = useLocation();

    function openMenu() {
        setIsOpen(true);
        gsap.to(menuRef.current, {
            x: 0,
            duration: 0.4,
            ease: "power2.out",
        });
        gsap.fromTo(
            linksRef.current,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.08, ease: "power2.out", delay: 0.2 }
        );
    }

    function closeMenu() {
        gsap.to(linksRef.current, {
            opacity: 0,
            x: 40,
            duration: 0.2,
            stagger: 0.05,
            ease: "power2.in",
        });
        gsap.to(menuRef.current, {
            x: "100%",
            duration: 0.4,
            ease: "power2.in",
            delay: 0.15,
            onComplete: () => setIsOpen(false),
        });
    }

    // Close menu on route change
    useEffect(() => {
        if (isOpen) closeMenu();
    }, [location]);

    // Set initial position off-screen
    useEffect(() => {
        gsap.set(menuRef.current, { x: "100%" });
    }, []);

    return (
        <>
            <nav>
                <h1>Maxime Bastien</h1>

                {/* DESKTOP LINKS */}
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/works">Works</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>

                {/* HAMBURGER BUTTON */}
                <button className="hamburger" onClick={isOpen ? closeMenu : openMenu} aria-label="Menu">
                    <span className={isOpen ? "open" : ""}></span>
                    <span className={isOpen ? "open" : ""}></span>
                    <span className={isOpen ? "open" : ""}></span>
                </button>
            </nav>

            {/* MOBILE MENU */}
            <div className="mobile-menu" ref={menuRef}>
                <ul>
                    {["/", "/works", "/about", "/contact"].map((path, index) => (
                        <li key={path} ref={(el) => (linksRef.current[index] = el)}>
                            <Link to={path} onClick={closeMenu}>
                                {["Home", "Works", "About", "Contact"][index]}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Nav;