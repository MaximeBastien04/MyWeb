document.addEventListener('DOMContentLoaded', () => {
    loadGames();
});

async function loadGames() {    
    try {
        const response = await fetch('../data/games.json');
        const gamesData = await response.json();

        const container = document.getElementById("works-category-container");
        container.innerHTML = "";

        gamesData.forEach(game => {
            const htmlString = `
                <article class="work-article" data-popup="${game.id}">
                    <img src="${game.thumbnail}" alt="${game.title}">
                    <p>${game.title}</p>
                </article>
                <div class="work-popup" id="${game.id}">
                    <div class="overlay"></div>
                    <div class="popup-content">
                        <h3>${game.date}</h3>
                        <div>
                            <p class="close-popup">&#10006;</p>
                        </div>
                        <div class="work-content-info">
                            <h1>${game.title}</h1>
                            <article class="mainInfo">
                                <p>${game.description}
                                </p>
                            </article>
                            <article class="extraInfo">
                                <p>${game.key_research}
                                </p>
                                <p>${game.results}
                                </p>
                                <p>Tools Used: ${game.tools}</p>
                            </article>
                        </div>
                        <a href="${game.link}" target="_blank">
                            <img src="${game.thumbnail}">
                            <img src="../images/play_button_icon.png">
                        </a>
                    </div>
                </div>`;

            container.insertAdjacentHTML('beforeend', htmlString);
        });


        const modalBtns = document.querySelectorAll('.work-article');
        modalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.getAttribute('data-popup');
                const modal = document.getElementById(modalId);
                if (modal) modal.classList.add('active');
            });
        });

        const closeBtns = document.querySelectorAll('.close-popup');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const popup = btn.closest(".work-popup");
                const video = popup.querySelector('iframe');
                if (video) {
                    const src = video.src;
                    video.src = src; // reset video on close
                }
                popup.classList.remove('active');
            });
        });

    } catch (error) {
        console.error("Error loading games data:", error);
    }
}

async function loadVideos() {
    try {
        const response = await fetch('../data/videos.json');
        const videosData = await response.json();

        const container = document.getElementById("works-category-container");
        container.innerHTML = "";

        videosData.forEach(video => {
            const htmlString = `
                <article class="work-article" data-popup="${video.id}">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <p>${video.title}</p>
                </article>
                <div class="work-popup" id="${video.id}">
                    <div class="overlay"></div>
                    <div class="popup-content">
                        <h3>${video.date}</h3>
                        <div>
                            <p class="close-popup">&#10006;</p>
                        </div>
                        <div class="work-content-info">
                            <h1>${video.title}</h1>
                            <article class="mainInfo">
                                <p>${video.description}
                                </p>
                            </article>
                            <article class="extraInfo">
                                <p>${video.key_research}
                                </p>
                                <p>${video.results}
                                </p>
                                <p>Tools Used: ${video.tools}</p>
                            </article>
                        </div>
                        <iframe class="video" width="560" height="315" src="${video.youtube}"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </div>
                </div>`;

            container.insertAdjacentHTML('beforeend', htmlString);
        });


        const modalBtns = document.querySelectorAll('.work-article');
        modalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.getAttribute('data-popup');
                const modal = document.getElementById(modalId);
                if (modal) modal.classList.add('active');
            });
        });

        const closeBtns = document.querySelectorAll('.close-popup');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const popup = btn.closest(".work-popup");
                const video = popup.querySelector('iframe');
                if (video) {
                    const src = video.src;
                    video.src = src; // reset video on close
                }
                popup.classList.remove('active');
            });
        });

    } catch (error) {
        console.error("Error loading games data:", error);
    }
}

const videosBtn = document.getElementById('videos');
videosBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loadVideos();
    videosBtn.style.textDecoration = "underline";
    gamesBtn.style.textDecoration = "none";
});


const gamesBtn = document.getElementById('games');
gamesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loadGames();
    gamesBtn.style.textDecoration = "underline";
    videosBtn.style.textDecoration = "none";
});