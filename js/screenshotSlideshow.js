document.addEventListener('DOMContentLoaded', () => {
    loadScreenshot();
});

async function loadScreenshot() {
    try {
        const response = await fetch('./data/screenshots.json');
        const images = await response.json();

        if (images.length === 0) return;

        let currentIndex = 0;
        let showingFirst = true;

        const img1 = document.getElementById('slide1');
        const img2 = document.getElementById('slide2');

        img1.src = `./images/works/screenshots/${images[currentIndex]}`;
        img1.classList.add('active');

        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            const nextImage = `./images/works/screenshots/${images[currentIndex]}`;

            if (showingFirst) {
                img2.src = nextImage;
                img2.classList.add('active');
                img1.classList.remove('active');
            } else {
                img1.src = nextImage;
                img1.classList.add('active');
                img2.classList.remove('active');
            }

            showingFirst = !showingFirst;
        }, 5000);
    } catch (error) {
        console.error("Failed to load slideshow images:", error);
    }
}
