document.addEventListener('DOMContentLoaded', () => {
    // Show only games works when the page loads
    loadGames();
});

async function loadGames() {
    try {
        const response = await fetch('../data/games.json');
        const projects = await response.json();

        console.log(projects);

        projects.forEach(project => {

            const article = document.createElement('article');
            article.className = 'work-article';
            article.setAttribute('data-popup', project.id);

            article.innerHTML = `
                <img src="${project.thumbnail}" alt="${project.title}">
                <p>${project.title}</p>
            `;


            const popup = document.createElement('div');
            popup.className = 'work-popup';
            popup.id = project.id;

            popup.innerHTML = `
                <div class="overlay"></div>
                <div class="popup-content">
                    <h3>${project.date}</h3>
                    <div><p class="close-popup">&#10006;</p></div>
                    <div class="work-content-info${project.smallText ? ' smallText' : ''}">
                        <h1>${project.title}</h1>
                        ${project.content.map(section => `
                            <article class="${section.type}">
                                ${section.header ? `<strong><p>${section.header}</p></strong>` : ''}
                                ${section.paragraphs ? section.paragraphs.map(p => `<p>${p}</p>`).join('') : ''}
                                ${section.list ? `
                                    <ul>
                                        ${section.list.map(item => `
                                            <li><strong>${item.title}</strong>: ${item.description}</li>
                                        `).join('')}
                                    </ul>` : ''}
                            </article>
                        `).join('')}
                    </div>
                    <a href="${project.link}" target="_blank">
                        <img src="${project.thumbnail}">
                        <img src="../images/play_button_icon.png">
                    </a>
                </div>
            `;

            container.appendChild(article);
            container.appendChild(popup);
        });

        setupPopups(); // Re-bind modal interactions after creating DOM elements

    } catch (error) {
        console.error("Failed to load game projects:", error);
    }
}

function setupPopups() {
    let modalBtns = document.querySelectorAll('.work-article');
    modalBtns.forEach(function (btn) {
        btn.onclick = function () {
            let modal = btn.getAttribute('data-popup');
            document.querySelector('#' + modal).classList.toggle('active');
        };
    });

    let videoIframes = document.querySelectorAll('.video');
    for (let i = 0; i < videoIframes.length; i++) {
        videoIframes[i].setAttribute('id', 'video' + i);
    }

    let closeBtns = document.querySelectorAll(".close-popup");
    closeBtns.forEach(function (btn) {
        btn.onclick = function () {
            for (let i = 0; i < videoIframes.length; i++) {
                document.getElementById(`video${i}`).src = document.getElementById(`video${i}`).src;
            }
            btn.closest(".work-popup").classList.toggle('active');
        };
    });
}