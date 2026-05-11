import { useEffect, useState } from "react";

function Works() {
    const [works, setWorks] = useState([]);
    const [activePopup, setActivePopup] = useState(null);
    const [currentCategory, setCurrentCategory] = useState("games");

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

    function closePopup() {
        setActivePopup(null);
    }

    return (
        <>
            <section id="works-container">
                <h1>Works</h1>

                <div id="work-categories">
                    <h2
                        id="games"
                        onClick={loadGames}
                        style={{
                            textDecoration:
                                currentCategory === "games"
                                    ? "underline"
                                    : "none",
                            cursor: "pointer",
                        }}
                    >
                        Games
                    </h2>

                    <h2
                        id="videos"
                        onClick={loadVideos}
                        style={{
                            textDecoration:
                                currentCategory === "videos"
                                    ? "underline"
                                    : "none",
                            cursor: "pointer",
                        }}
                    >
                        Other
                    </h2>
                </div>

                <section
                    id="works-category-container"
                    className="works-category"
                >
                    {works.map((work) => (
                        <div key={work.id}>
                            {/* WORK CARD */}
                            <article
                                className="work-article"
                                onClick={() => setActivePopup(work.id)}
                            >
                                <img
                                    src={
                                        currentCategory === "games"
                                            ? `/images/works/games/${work.thumbnail}`
                                            : `/images/works/videos/${work.thumbnail}`
                                    }
                                    alt={work.title}
                                />

                                <p>{work.title}</p>
                            </article>

                            {/* POPUP */}
                            <div
                                className={`work-popup ${
                                    activePopup === work.id ? "active" : ""
                                }`}
                            >
                                <div
                                    className="overlay"
                                    onClick={closePopup}
                                ></div>

                                <div className="popup-content">
                                    <h3>{work.date}</h3>

                                    <div>
                                        <p
                                            className="close-popup"
                                            onClick={closePopup}
                                        >
                                            &#10006;
                                        </p>
                                    </div>

                                    <div className="work-content-info">
                                        <h1>{work.title}</h1>

                                        <article className="mainInfo">
                                            <p>{work.description}</p>

                                            <p>
                                                Tools Used: {work.tools}
                                            </p>
                                        </article>
                                    </div>

                                    {/* GAMES */}
                                    {currentCategory === "games" && (
                                        <a
                                            href={work.link}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <img
                                                src={`/images/works/games/${work.thumbnail}`}
                                                alt={work.title}
                                            />

                                            <img
                                                src="/images/icons/play_button_icon.png"
                                                alt="Play Button"
                                            />
                                        </a>
                                    )}

                                    {/* VIDEOS */}
                                    {currentCategory === "videos" && (
                                        <iframe
                                            className="video"
                                            width="560"
                                            height="315"
                                            src={work.youtube_embed}
                                            title={work.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
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