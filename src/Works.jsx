import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { assetPath } from "./utils/paths.js";

function Works() {
    const [works, setWorks] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("games");
    const gridRef = useRef(null);
    const gamesRef = useRef(null);
    const videosRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadGames();
    }, []);

    async function loadGames() {
        try {
            const response = await fetch(assetPath("data/games.json"));
            const gamesData = await response.json();
            setWorks(gamesData);
            setCurrentCategory("games");
        } catch (error) {
            console.error("Error loading games data:", error);
        }
    }

    async function loadVideos() {
        try {
            const response = await fetch(assetPath("data/videos.json"));
            const videosData = await response.json();
            setWorks(videosData);
            setCurrentCategory("videos");
        } catch (error) {
            console.error("Error loading videos data:", error);
        }
    }

    function switchCategory(fetchFn, targetCategory, direction) {
        if (currentCategory === targetCategory) return;
        const grid = gridRef.current;
        gsap.to(grid, {
            opacity: 0,
            x: direction * 80,
            duration: 0.35,
            ease: "power1.in",
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

    function openWork(id) {
        navigate(`/works/${id}`, { state: { transition: "slide-left" } });
    }

    return (
        <>
            <section id="works-container">
                <h1>Works</h1>

                <div id="work-categories">
                    <h2
                        ref={gamesRef}
                        onClick={() => switchCategory(loadGames, "games", 1)}
                        style={{
                            cursor: "pointer",
                            borderBottom: currentCategory === "games" ? "3px solid #ffffff" : "2px solid #ffffff5b",
                            display: "inline-block",
                        }}
                    >
                        Games
                    </h2>
                    <h2
                        ref={videosRef}
                        onClick={() => switchCategory(loadVideos, "videos", -1)}
                        style={{
                            cursor: "pointer",
                            borderBottom: currentCategory === "videos" ? "3px solid #ffffff" : "2px solid #ffffff5b",
                            display: "inline-block",
                        }}
                    >
                        Other
                    </h2>
                </div>

                <section ref={gridRef} id="works-category-container" className="works-category">
                    {works.map((work) => (
                        <article
                            key={work.id}
                            className="work-article"
                            onClick={() => openWork(work.id)}
                        >
                            <img
                                src={
                                    currentCategory === "games"
                                        ? assetPath(`images/works/games/${work.thumbnail}`)
                                        : assetPath(`images/works/videos/${work.thumbnail}`)
                                }
                                alt={work.title}
                            />
                            <p>{work.title}</p>
                        </article>
                    ))}
                </section>
            </section>
        </>
    );
}

export default Works;