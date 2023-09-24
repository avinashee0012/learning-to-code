// DETAILS 

function updateDetails() {
    const songName = document.querySelector(".song");
    songName.textContent = track_list[track_index].name;

    const artistName = document.querySelector(".artist");
    artistName.textContent = track_list[track_index].artist;
}


// **************************************************************
// CONTROLS SECTION


// _________MENU:_________


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
            break;
        case 1:
            repeat++;
            repeat_status.textContent = "All";
            break;
        case 2:
            repeat = 0;
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
    loadSong();
    playPause();
}

// _________PLAY-PAUSE:_________

let play_pause = document.querySelector(".play-pause");
play_pause.addEventListener("click", playPause);

let curr_track = document.createElement('audio');
let track_index = 0;

function loadSong() {
    if (shuffle) {
        track_index = Math.floor((Math.random() * track_list.length));
    }
    curr_track.src = track_list[track_index].path;
    updateDetails();
}

function playPause() {
    if (!curr_track.paused) {
        curr_track.pause();
        play_pause.innerHTML = "<i class=\"fa fa-play-circle-o\"></i>";
    } else {
        play_pause.innerHTML = "<i class=\"fa fa-pause-circle-o\"></i>";
        loadSong();
        curr_track.play();
    }
}

// _________NEXT:_________
let next = document.querySelector(".next");
next.addEventListener("click", nextSong);


function nextSong() {
    if (repeat && (track_index == track_list.length - 1)) {
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
shuffle_icon.addEventListener("click", toggle);


// _________VOLUME:_________
const volume_icon = document.querySelector(".volume");
const curr_volume = document.querySelector(".curr-volume");

curr_track.volume = 0.20;
volume_icon.addEventListener("wheel", volumeChange);


function volumeChange(event) {

    let change = event.deltaY;

    if (change < 0) {
        curr_track.volume += 0.1;
    } else {
        curr_track.volume -= 0.1;
    }
    curr_volume.textContent = Math.floor(curr_track.volume * 11);
}



// **************************************************************
// PROGRESS-BAR SECTION:

// _________PROGRESS:_________


// _________TIMER:_________


// **************************************************************
// MODAL SECTION:



