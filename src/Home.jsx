import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {

    // SLIDESHOW STATES
    const [images, setImages] = useState([]);
    const [slide1, setSlide1] = useState("");
    const [slide2, setSlide2] = useState("");
    const [showingFirst, setShowingFirst] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    // WORK SLIDER STATES
    const [games, setGames] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        loadScreenshot();
        loadGames();
        loadVideos();
    }, []);

    // LOAD SCREENSHOTS
    async function loadScreenshot() {
        try {
            const response = await fetch("/data/screenshots.json");
            const data = await response.json();

            if (data.length === 0) return;

            setImages(data);

            setSlide1(`/images/works/screenshots/${data[0]}`);

            if (data.length > 1) {
                setSlide2(`/images/works/screenshots/${data[1]}`);
            }
        } catch (error) {
            console.error("Failed to load slideshow images:", error);
        }
    }

    // SLIDESHOW TRANSITION
    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;

            const nextImage = `/images/works/screenshots/${images[nextIndex]}`;

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

    // LOAD GAMES
    async function loadGames() {
        try {
            const response = await fetch("/data/games.json");
            const gamesData = await response.json();

            setGames(gamesData.slice(0, 6));
        } catch (error) {
            console.error("Error loading games data:", error);
        }
    }

    // LOAD VIDEOS
    async function loadVideos() {
        try {
            const response = await fetch("/data/videos.json");
            const videosData = await response.json();

            setVideos(videosData.slice(0, 6));
        } catch (error) {
            console.error("Error loading videos data:", error);
        }
    }

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
                        <p>
                            I'm Maxime Bastien, a Multimedia graduate from
                            Erasmushogeschool Brussel. I learned many things
                            such as webdesign, coding etc. but I'm most
                            passionate about game developpement.
                        </p>

                        <p>
                            Aside from my school assignments I make project in
                            my free time to learn more about game development
                            to gain more experience and one day be able to
                            achieve my dream of becoming an accomplished game
                            developer.
                        </p>

                        <Link to="/about">
                            <button>Read More</button>
                        </Link>
                    </article>
                </div>

                {/* ========================= */}
                {/* SLIDESHOW */}
                {/* ========================= */}
                <section id="slideshow">
                    <img
                        id="slide1"
                        className={`slide-img ${showingFirst ? "active" : ""
                            }`}
                        src={slide1}
                        alt="Slideshow image 1"
                    />

                    <img
                        id="slide2"
                        className={`slide-img ${!showingFirst ? "active" : ""
                            }`}
                        src={slide2}
                        alt="Slideshow image 2"
                    />
                </section>
            </header>

            <main>
                <article id="home-works">
                    <h2 className="homeTitel">Works</h2>

                    <hr />

                    {/* ========================= */}
                    {/* GAME SLIDER */}
                    {/* ========================= */}
                    <div className="slider">
                        <div className="slide-track" id="slide-track">
                            {[...games, ...games].map((game, index) => (
                                <a
                                    key={index}
                                    href={game.link}
                                    className="slide"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={`/images/works/games/${game.thumbnail}`}
                                        alt={game.title}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ========================= */}
                    {/* VIDEO SLIDER */}
                    {/* ========================= */}
                    <div className="slider">
                        <div
                            className="slide-track-right"
                            id="slide-track-right"
                        >
                            {[...videos, ...videos].map((video, index) => (
                                <a
                                    key={index}
                                    href={video.youtube}
                                    className="slide"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={`/images/works/videos/${video.thumbnail}`}
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