import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { assetPath } from "./utils/paths.js";

function WorkArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [work, setWork] = useState(null);
    const [category, setCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isVideoSelected, setIsVideoSelected] = useState(false);
    const mainImageRef = useRef(null);

    useEffect(() => {
        loadWork();
    }, [id]);

    useEffect(() => {
        if (work) {
            setSelectedImage(assetPath(`images/works/games/${work.thumbnail}`));
            setIsVideoSelected(false);
        }
    }, [work]);

    async function loadWork() {
        try {
            const gamesRes = await fetch(assetPath("data/games.json"));
            const games = await gamesRes.json();
            const game = games.find((g) => g.id === id);

            if (game) {
                setWork(game);
                setCategory("games");
                return;
            }

            const videosRes = await fetch(assetPath("data/videos.json"));
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

    function switchItem(newPath, isVideo = false) {
        if (newPath === selectedImage) return;

        gsap.to(mainImageRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power1.in",
            onComplete: () => {
                setSelectedImage(newPath);
                setIsVideoSelected(isVideo);
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

    const thumbnailPath = assetPath(`images/works/games/${work.thumbnail}`);
    const screenshotPath = (filename) => assetPath(`images/works/games/${work.title}/${filename}`);
    const videoPath = work.video ? assetPath(`images/works/games/${work.title}/${work.video}`) : null;

    return (
        <section id="work-article-container">
            <button className="go-back-btn" onClick={goBack}>
                <span>&#8249;</span> GO BACK
            </button>

            <div id="work-article-main">
                <div id="work-article-info">
                    <h1>{work.title}</h1>
                    <div
                        className="work-article-description"
                        dangerouslySetInnerHTML={{ __html: work.description }}
                    />
                    <p className="work-article-implemented">
                        <strong>What I implemented: </strong>
                        {Array.isArray(work.implemented) ? work.implemented.join(" · ") : work.implemented}
                    </p>
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

                {/* RIGHT — main display */}
                <div id="work-article-image" ref={mainImageRef}>
                    {category === "videos" && work.youtube_embed ? (
                        <iframe
                            src={work.youtube_embed}
                            title={work.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : isVideoSelected ? (
                        <video
                            src={selectedImage}
                            controls
                            autoPlay
                        />
                    ) : (
                        <img
                            src={selectedImage || thumbnailPath}
                            alt={work.title}
                        />
                    )}
                </div>
            </div>

            {/* GALLERY */}
            {category === "games" && work.screenshot?.length > 0 && (
                <>
                    <hr id="work-article-divider" />
                    <div id="work-article-screenshots">

                        {/* Thumbnail */}
                        <img
                            src={thumbnailPath}
                            alt={`${work.title} thumbnail`}
                            className={selectedImage === thumbnailPath && !isVideoSelected ? "active" : ""}
                            onClick={() => switchItem(thumbnailPath, false)}
                        />

                        {/* Gameplay video */}
                        {videoPath && (
                            <div
                                className={`gallery-video-thumb ${isVideoSelected ? "active" : ""}`}
                                onClick={() => switchItem(videoPath, true)}
                            >
                                <video src={videoPath} muted />
                                <span>&#9654;</span>
                            </div>
                        )}

                        {/* Screenshots */}
                        {work.screenshot.map((filename, index) => (
                            <img
                                key={index}
                                src={screenshotPath(filename)}
                                alt={`${work.title} screenshot ${index + 1}`}
                                className={selectedImage === screenshotPath(filename) && !isVideoSelected ? "active" : ""}
                                onClick={() => switchItem(screenshotPath(filename), false)}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

export default WorkArticle;