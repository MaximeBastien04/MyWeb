// change work category

const videosBtn = document.getElementById('videos');
videosBtn.addEventListener('click', showVideos);

const modelsBtn = document.getElementById('3dModels');
modelsBtn.addEventListener('click', showModels);


const videoContainer = document.getElementById('works-video-container');
const modelsContainer = document.getElementById('works-models-container');

function showVideos() {
    modelsContainer.style.display = 'none';
    videoContainer.style.display = 'grid';
    modelsBtn.style.textDecoration = 'none';
    videosBtn.style.textDecoration = '#ffffff underline 2px';
}

function showModels() {
    videoContainer.style.display = 'none';
    modelsContainer.style.display = 'grid';
    videosBtn.style.textDecoration = 'none';
    modelsBtn.style.textDecoration = '#ffffff underline 2px';
}





// article pop-ups

let modalBtns = document.querySelectorAll('.work-article');

modalBtns.forEach(function (btn) {
    btn.onclick = function () {
        let modal = btn.getAttribute('data-popup');
        document.querySelector('#'+ modal).classList.toggle('active');
    };
});

let videoIframes = document.querySelectorAll('.video');
let closeBtns = document.querySelectorAll(".close-popup");

// close iframe when popup is gone
for (let i = 0; i < videoIframes.length; i++) {
    videoIframes[i].setAttribute('id', 'video' + i)
}

closeBtns.forEach(function (btn) {
    btn.onclick = function () {
        for(let i = 0; i < videoIframes.length; i++){
            document.getElementById(`video${i}`).src = document.getElementById(`video${i}`).src;
        }
        let modal = (btn.closest(".work-popup").classList.toggle('active'));

    };
});