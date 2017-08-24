const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//functions
function togglePlay() {
    return (video.paused) ? video.play() : video.pause();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

let mouseDown = false;
function handleRangeUpdate(e) {
    if (e.buttons === 1) {
        video[this.name] = this.value;
    }
}

function handleProgress(){
    const time = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis =  `${time}%`; 
}

function scrub(e){
    
    let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    if(e.buttons === 1){
    video.currentTime = scrubTime;
    }
}

//eventListeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', scrub)

