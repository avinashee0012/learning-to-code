// DETAILS 

function updateDetails() {
    const songName = document.querySelector(".song");
    songName.textContent = track_list[track_index].name;

    const artistName = document.querySelector(".artist");
    artistName.textContent = track_list[track_index].artist;
}


// ****************************************************************************************************************************
// CONTROLS SECTION


// _________MENU:_________

const menu = document.querySelector(".menu");
menu.addEventListener("click", showModal);

const my_modal = document.querySelector("#myModal");
const close = document.querySelector(".close");
close.addEventListener("click", hideModal);


function showModal() {
    my_modal.style.display = "flex";
}

function hideModal() {
    my_modal.style.display = "none";
}



// _________REPEAT:_________
const repeat_icon = document.querySelector(".repeat");
const repeat_status = document.querySelector(".repeat-status");
repeat_icon.addEventListener("click", toggleRepeat);

let repeat = 0;
// 0 => No-Repeat
// 1 => Repeat-One
// 2 => Repeat-All

function toggleRepeat() {
    switch (repeat) {
        case 0:
            repeat++;
            repeat_status.textContent = "1";
            repeat_icon.style.color = "green";
            break;
        case 1:
            repeat++;
            repeat_status.textContent = "\u{267B}";
            repeat_icon.style.color = "green";
            break;
        case 2:
            repeat = 0;
            repeat_status.textContent = " ";
            repeat_icon.style.color = "unset";
            break;
    }
}


// _________PREV:_________
let prev = document.querySelector(".prev");
prev.addEventListener("click", prevSong);


function prevSong() {
    if (track_index == 0) {
        track_index = track_list.length - 1;;
    } else {
        track_index--;
    }

    if (curr_track.paused) {
        loadSong();
    } else {
        loadSong();
        playPause();
    }
}

// _________PLAY-PAUSE:_________

let play_pause = document.querySelector(".play-pause");
play_pause.addEventListener("click", playPause);

let curr_track = document.createElement('audio');
let track_index = 0;

function loadSong() {
    curr_track.src = track_list[track_index].path;
    updateDetails();

    curr_track.addEventListener("ended", autoNext);
}


function playPause() {
    if (!curr_track.paused) {
        curr_track.pause();
        play_pause.innerHTML = "<i class=\"fa fa-play-circle-o\"></i>";
    } else {
        play_pause.innerHTML = "<i class=\"fa fa-pause-circle-o\"></i>";
        loadSong();
        setInterval(progressTrack, 500);
        curr_track.play();
    }
}

// _________NEXT:_________
let next = document.querySelector(".next");
next.addEventListener("click", nextSong);


function nextSong() {
    if (track_index == track_list.length - 1) {
        track_index = 0;;
    } else {
        track_index++;
    }

    if (curr_track.paused) {
        loadSong();
    } else {
        loadSong();
        playPause();
    }
}

function autoNext() {
    if (track_index == track_list.length - 1) {
        track_index = 0;;
    } else {
        track_index++;
    }

    loadSong();
    playPause();
}

// _________SHUFFLE:_________
const shuffle_icon = document.querySelector(".shuffle");
let shuffle = false;
shuffle_icon.addEventListener("click", toggleShuffle);

function toggleShuffle() {
    switch (shuffle) {
        case false:
            shuffle = true;
            shuffle_icon.style.color = "green";
            break;
        case true:
            shuffle = false;
            shuffle_icon.style.color = "unset";
            break;
    }
}



// _________VOLUME:_________
const volume_icon = document.querySelector(".volume");
const curr_volume = document.querySelector(".curr-volume");

curr_track.volume = 0.20;
volume_icon.addEventListener("wheel", volumeChange);


function volumeChange(event) {
    try {
        let change = event.deltaY;

        if (change <= 0) {
            curr_track.volume += 0.1;
        } else {
            curr_track.volume -= 0.1;
        }
        curr_volume.textContent = Math.floor(curr_track.volume * 11);
    } catch (error) {
        // Passing for now
    }

}



// ****************************************************************************************************************************
// PROGRESS-BAR SECTION:


let progress = document.querySelector(".progress");

function progressTrack() {
    if (!isNaN(curr_track.duration)) {

        // _________PROGRESS:_________
        time = Math.floor(100 * curr_track.currentTime / curr_track.duration + 0.5) + "%";
        console.log(time);
        progress.style.width = time;
        progress.style.background = "linear-gradient(#00f7ffaf, rgb(11, 180, 247), #00f7ffaf)";

        // _________TIMER:_________
        let current = document.querySelector(".current");
        let total = document.querySelector(".total");

        let currentMin = Math.floor(curr_track.currentTime/ 60) ;
        let currentSec = Math.floor(curr_track.currentTime) - (currentMin * 60);
        let totalMin = Math.floor(curr_track.duration/ 60);
        let totalSec = Math.floor(curr_track.duration) - (totalMin * 60);

        if (currentMin < 10) {
            currentMin =  "0" + currentMin;
        }
        if (currentSec < 10) {
            currentSec = "0" + currentSec;
        }
        if (totalMin < 10) {
            totalMin = "0" + totalMin;
        }
        if (totalSec < 10) {
            totalSec = "0" + totalSec;
        }

        current.textContent = currentMin + ":" + currentSec;
        total.textContent = totalMin + ":" + totalSec;
    }

}


// ****************************************************************************************************************************
// MODAL SECTION:



