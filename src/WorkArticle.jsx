import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

function WorkArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [work, setWork] = useState(null);
    const [category, setCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const mainImageRef = useRef(null);

    useEffect(() => {
        loadWork();
    }, [id]);

    useEffect(() => {
        if (work) {
            setSelectedImage(`/images/works/games/${work.thumbnail}`);
        }
    }, [work]);

    async function loadWork() {
        try {
            const gamesRes = await fetch("/data/games.json");
            const games = await gamesRes.json();
            const game = games.find((g) => g.id === id);

            if (game) {
                setWork(game);
                setCategory("games");
                return;
            }

            const videosRes = await fetch("/data/videos.json");
            const videos = await videosRes.json();
            const video = videos.find((v) => v.id === id);

            if (video) {
                setWork(video);
                setCategory("videos");
            }
        } catch (error) {
            console.error("Error loading work:", error);
        }
    }

    function switchImage(newPath) {
        if (newPath === selectedImage) return;

        gsap.to(mainImageRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power1.in",
            onComplete: () => {
                setSelectedImage(newPath);
                gsap.to(mainImageRef.current, {
                    opacity: 1,
                    duration: 0.2,
                    ease: "power1.out",
                });
            },
        });
    }

    function goBack() {
        navigate("/works", { state: { transition: "slide-right" } });
    }

    if (!work) return null;

    const thumbnailPath = `/images/works/games/${work.thumbnail}`;
    const screenshotPath = (filename) => `/images/works/games/${work.title}/${filename}`;

    return (
        <section id="work-article-container">

            <button className="go-back-btn" onClick={goBack}>
                &#8249; GO BACK
            </button>

            <div id="work-article-main">

                {/* LEFT — info */}
                <div id="work-article-info">
                    <h1>{work.title}</h1>

                    <div
                        className="work-article-description"
                        dangerouslySetInnerHTML={{ __html: work.description }}
                    />

                    <p className="work-article-tools">
                        <strong>Tools: </strong>
                        {Array.isArray(work.tools) ? work.tools.join(" · ") : work.tools}
                    </p>

                    {work.link && (
                        <a href={work.link} target="_blank" rel="noreferrer">
                            <button>Play Game</button>
                        </a>
                    )}
                </div>

                {/* RIGHT — main image */}
                <div id="work-article-image">
                    {category === "videos" && work.youtube_embed ? (
                        <iframe
                            src={work.youtube_embed}
                            title={work.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <img
                            ref={mainImageRef}
                            src={selectedImage || thumbnailPath}
                            alt={work.title}
                        />
                    )}
                </div>
            </div>

            {/* SCREENSHOT GALLERY */}
            {category === "games" && work.screenshot?.length > 0 && (
                <>
                    <hr id="work-article-divider" />
                    <div id="work-article-screenshots">

                        <img
                            src={thumbnailPath}
                            alt={`${work.title} thumbnail`}
                            className={selectedImage === thumbnailPath ? "active" : ""}
                            onClick={() => switchImage(thumbnailPath)}
                        />

                        {work.screenshot.map((filename, index) => (
                            <img
                                key={index}
                                src={screenshotPath(filename)}
                                alt={`${work.title} screenshot ${index + 1}`}
                                className={selectedImage === screenshotPath(filename) ? "active" : ""}
                                onClick={() => switchImage(screenshotPath(filename))}
                            />
                        ))}
                    </div>
                </>
            )}

        </section>
    );
}

export default WorkArticle;