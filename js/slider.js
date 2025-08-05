document.addEventListener('DOMContentLoaded', () => {
    loadGames();
    loadVideos();
});

async function loadGames() {
    
    try {
        const response = await fetch('../data/games.json');
        const gamesData = await response.json();

        const container = document.getElementById("slide-track");
        container.innerHTML = "";

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 6; j++) {
                const htmlString = `
                    <a href="${gamesData[j].link}" class="slide" target="_blank">
                        <img src="./images/${gamesData[j].thumbnail}">
                    </a>`;
                container.insertAdjacentHTML('beforeend', htmlString);
            }
        }

    } catch (error) {
        console.error("Error loading games data:", error);
    }
}

async function loadVideos() {
    try {
        const response = await fetch('../data/videos.json');
        const videosData = await response.json();

        const container = document.getElementById("slide-track-right");
        container.innerHTML = "";

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 6; j++) {
                const htmlString = `
                    <a href="${videosData[j].link}" class="slide" target="_blank">
                        <img src="./images/${videosData[j].thumbnail}">
                    </a>`;
                container.insertAdjacentHTML('beforeend', htmlString);
            }
        }

    } catch (error) {
        console.error("Error loading games data:", error);
    }
}