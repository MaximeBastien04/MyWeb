import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

function Works() {
    const [works, setWorks] = useState([]);
    const [activePopup, setActivePopup] = useState(null);
    const [currentCategory, setCurrentCategory] = useState("games");
    const gridRef = useRef(null);

    useEffect(() => {
        loadGames();
    }, []);

    async function loadGames() {
        try {
            const response = await fetch("/data/games.json");
            const gamesData = await response.json();
            setWorks(gamesData);
            setCurrentCategory("games");
        } catch (error) {
            console.error("Error loading games data:", error);
        }
    }

    async function loadVideos() {
        try {
            const response = await fetch("/data/videos.json");
            const videosData = await response.json();
            setWorks(videosData);
            setCurrentCategory("videos");
        } catch (error) {
            console.error("Error loading videos data:", error);
        }
    }


    const gamesRef = useRef(null);
    const videosRef = useRef(null);

    function switchCategory(fetchFn, targetCategory, direction) {
        if (currentCategory === targetCategory) return;

        const grid = gridRef.current;

        const fromEl =
            currentCategory === "games" ? gamesRef.current : videosRef.current;

        const toEl =
            targetCategory === "games" ? gamesRef.current : videosRef.current;

        gsap.to(grid, {
            opacity: 0,
            x: direction * 80,
            duration: 0.35,
            ease: "power1.in",
            onStart: () => {
                // underline OUT (3px -> 0px)
                gsap.to(fromEl, {
                    borderBottomWidth: 0,
                    duration: 0.2,
                    ease: "power1.out",
                });

                // underline IN (0px -> 3px)
                gsap.to(toEl, {
                    borderBottomWidth: 3,
                    duration: 0.3,
                    ease: "power1.out",
                });
            },
            onComplete: async () => {
                await fetchFn();

                gsap.fromTo(
                    grid,
                    { opacity: 0, x: direction * -80 },
                    { opacity: 1, x: 0, duration: 0.35, ease: "power1.out" }
                );
            }
        });
    }
    
    function closePopup() {
        setActivePopup(null);
    }

    return (
        <>
            <section id="works-container">
                <h1>Works</h1>

                <div id="work-categories">
                    <h2 ref={gamesRef} id="games" onClick={() => switchCategory(loadGames, "games", 1)}
                        style={{
                            cursor: "pointer",
                            borderBottom: currentCategory === "games" ? "3px solid #ffffff" : "2px solid #ffffff5b",
                            display: "inline-block",
                        }}>
                        Games
                    </h2>

                    <h2 ref={videosRef} id="videos" onClick={() => switchCategory(loadVideos, "videos", -1)}
                        style={{
                            cursor: "pointer",
                            borderBottom: currentCategory === "videos" ? "3px solid #ffffff" : "2px solid #ffffff5b",
                            display: "inline-block",
                        }}>
                        Other
                    </h2>
                </div>

                <section ref={gridRef} id="works-category-container" className="works-category">
                    {works.map((work) => (
                        <div key={work.id}>
                            <article className="work-article" onClick={() => setActivePopup(work.id)}>
                                <img src={currentCategory === "games" ? `/images/works/games/${work.thumbnail}` : `/images/works/videos/${work.thumbnail}`} alt={work.title} />
                                <p>{work.title}</p>
                            </article>

                            <div className={`work-popup ${activePopup === work.id ? "active" : ""}`}>
                                <div className="overlay" onClick={closePopup}></div>

                                <div className="popup-content">
                                    <h3>{work.date}</h3>

                                    <div>
                                        <p className="close-popup" onClick={closePopup}>
                                            &#10006;
                                        </p>
                                    </div>

                                    <div className="work-content-info">
                                        <h1>{work.title}</h1>
                                        <article className="mainInfo">
                                            <p>{work.description}</p>
                                            <p>Tools Used: {work.tools}</p>
                                        </article>
                                    </div>

                                    {currentCategory === "games" && (
                                        <a href={work.link} target="_blank" rel="noreferrer">
                                            <img src={`/images/works/games/${work.thumbnail}`} alt={work.title} />
                                            <img src="/images/icons/play_button_icon.png" alt="Play Button" />
                                        </a>
                                    )}

                                    {currentCategory === "videos" && (
                                        <iframe className="video" width="560" height="315" src={work.youtube_embed} title={work.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen
                                        ></iframe>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
        </>
    );
}

export default Works;