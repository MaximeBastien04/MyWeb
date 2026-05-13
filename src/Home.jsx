import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { assetPath } from "./utils/paths.js";

function Home() {
    const [images, setImages] = useState([]);
    const [slide1, setSlide1] = useState("");
    const [slide2, setSlide2] = useState("");
    const [showingFirst, setShowingFirst] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [games, setGames] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        loadScreenshot();
        loadGames();
        loadVideos();
    }, []);

    async function loadScreenshot() {
        try {
            const response = await fetch(assetPath("data/screenshots.json"));
            const data = await response.json();

            if (data.length === 0) return;

            setImages(data);
            setSlide1(assetPath(`images/works/screenshots/${data[0]}`));

            if (data.length > 1) {
                setSlide2(assetPath(`images/works/screenshots/${data[1]}`));
            }
        } catch (error) {
            console.error("Failed to load slideshow images:", error);
        }
    }

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            const nextImage = assetPath(`images/works/screenshots/${images[nextIndex]}`);

            if (showingFirst) {
                setSlide2(nextImage);
            } else {
                setSlide1(nextImage);
            }

            setShowingFirst((prev) => !prev);
            setCurrentIndex(nextIndex);
        }, 5000);

        return () => clearInterval(interval);
    }, [images, currentIndex, showingFirst]);

    async function loadGames() {
        try {
            const response = await fetch(assetPath("data/games.json"));
            const gamesData = await response.json();
            setGames(gamesData.slice(0, 6));
        } catch (error) {
            console.error("Error loading games data:", error);
        }
    }

    async function loadVideos() {
        try {
            const response = await fetch(assetPath("data/videos.json"));
            const videosData = await response.json();
            setVideos(videosData.slice(0, 6));
        } catch (error) {
            console.error("Error loading videos data:", error);
        }
    }

    // TYPEWRITER
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        class TxtType {
            constructor(el, toRotate, period) {
                this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 2000;
                this.txt = "";
                this.isDeleting = false;
                this.tick();
            }

            tick() {
                const i = this.loopNum % this.toRotate.length;
                const fullTxt = this.toRotate[i];

                if (this.isDeleting) {
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }

                this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

                let delta = 120;
                if (this.isDeleting) delta /= 2;

                if (!this.isDeleting && this.txt === fullTxt) {
                    delta = this.period;
                    this.isDeleting = true;
                } else if (this.isDeleting && this.txt === "") {
                    this.isDeleting = false;
                    this.loopNum++;
                    delta = 500;
                }

                setTimeout(() => { this.tick(); }, delta);
            }
        }

        const elements = document.getElementsByClassName("typewrite");
        for (let i = 0; i < elements.length; i++) {
            const toRotate = elements[i].getAttribute("data-type");
            const period = elements[i].getAttribute("data-period");
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
    }, []);

    return (
        <>
            <header id="home-header">
                <div>
                    <h1>
                        <span>Game</span>
                        <br />
                        Developer
                    </h1>

                    <h2>Game Developer</h2>

                    <article>
                        <p>Hi! I'm Maxime Bastien. I'm a
                            <span className="typewrite" data-period="2000" data-type='[" Game Developer", " Creative Designer", " Web Developer"]'>
                                <span className="wrap"></span>
                            </span>.
                        </p>
                        <p>I'm passionate about creating meaningful and engaging experiences through game development, design, and web technologies. I enjoy combining creativity with technical problem-solving to build projects that not only look good, but also leave an impact on the people interacting with them.</p>
                        <Link to="/about">
                            <button>Read More</button>
                        </Link>
                    </article>
                </div>

                <section id="slideshow">
                    <img
                        id="slide1"
                        className={`slide-img ${showingFirst ? "active" : ""}`}
                        src={slide1}
                        alt="Slideshow image 1"
                    />
                    <img
                        id="slide2"
                        className={`slide-img ${!showingFirst ? "active" : ""}`}
                        src={slide2}
                        alt="Slideshow image 2"
                    />
                </section>
            </header>

            <main>
                <article id="home-works">
                    <h2 className="homeTitel">Works</h2>
                    <hr />

                    <div className="slider">
                        <div className="slide-track" id="slide-track">
                            {[...games, ...games].map((game, index) => (
                                <a key={index} href={game.link} className="slide" target="_blank" rel="noreferrer">
                                    <img
                                        src={assetPath(`images/works/games/${game.thumbnail}`)}
                                        alt={game.title}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="slider">
                        <div className="slide-track-right" id="slide-track-right">
                            {[...videos, ...videos].map((video, index) => (
                                <a key={index} href={video.youtube} className="slide" target="_blank" rel="noreferrer">
                                    <img
                                        src={assetPath(`images/works/videos/${video.thumbnail}`)}
                                        alt={video.title}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    <Link to="/works" className="moreWorks">
                        <button>More works</button>
                    </Link>
                </article>
            </main>
        </>
    );
}

export default Home;