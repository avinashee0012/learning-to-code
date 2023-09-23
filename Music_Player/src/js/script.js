// DETAILS SECTION


// **************************************************************
// CONTROLS SECTION


// _________MENU:_________


// _________REPEAT:_________
const repeat_icon = document.querySelector(".repeat");
let repeat = false;
repeat_icon.addEventListener("click", toggle);
// toggle function is yet to be coded


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
    if(shuffle) {
        track_index = Math.floor((Math.random() * track_list.length));
    } 
    curr_track.src = track_list[track_index].path;
    console.log(track_index);
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





function toggle() {
    // Algo yet to be coded
}

// **************************************************************
// PROGRESS-BAR SECTION:

// _________PROGRESS:_________


// _________TIMER:_________


// **************************************************************
// MODAL SECTION:



