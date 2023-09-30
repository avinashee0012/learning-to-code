// INITIAL SETUP

let object = [
    {
        status: true,
        playlist: [],
        isPlaying: false,
        volume: 0.2,
        repeat: 0,
        shuffle: false
    }
]

window.onload = function localStorageFetch() {
    if (localStorage.status) {
        object[0].status = localStorage.status;
        object[0].playlist = JSON.parse(localStorage.playlist);
        object[0].isPlaying = localStorage.isPlaying;
        object[0].volume = localStorage.volume;
        object[0].repeat = localStorage.repeat;
        object[0].shuffle = localStorage.shuffle;
    } else {
        localStorage.status = object[0].status;
        localStorage.playlist = object[0].playlist;
        localStorage.isPlaying = object[0].isPlaying;
        localStorage.volume = object[0].volume;
        localStorage.repeat = object[0].repeat;
        localStorage.shuffle = object[0].shuffle;
    }

    generatePlaylist();
}


// DETAILS 

function updateDetails() {
    console.log("Entered Details");
    const songName = document.querySelector(".song");
    songName.textContent = track_list[track_index].name;

    const artistName = document.querySelector(".artist");
    artistName.textContent = track_list[track_index].artist;
    console.log("Exited Details");
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
// const repeat_icon = document.querySelector(".repeat");
// const repeat_status = document.querySelector(".repeat-status");
// repeat_icon.addEventListener("click", toggleRepeat);

// let repeat = 0;
// // 0 => No-Repeat
// // 1 => Repeat-One
// // 2 => Repeat-All

// function toggleRepeat() {
//     switch (repeat) {
//         case 0:
//             repeat++;
//             repeat_status.textContent = "1";
//             repeat_icon.style.color = "green";
//             break;
//         case 1:
//             repeat++;
//             repeat_status.textContent = "\u{267B}";
//             repeat_icon.style.color = "green";
//             break;
//         case 2:
//             repeat = 0;
//             repeat_status.textContent = " ";
//             repeat_icon.style.color = "unset";
//             break;
//     }
// }


// _________PREV:_________
let prev = document.querySelector(".prev");
prev.addEventListener("click", prevSong);


function prevSong() {
    if (track_index == 0) {
        track_index = track_list.length - 1;
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
        setInterval(progressTrack, 1000);
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
// const shuffle_icon = document.querySelector(".shuffle");
// let shuffle = false;
// shuffle_icon.addEventListener("click", toggleShuffle);

// function toggleShuffle() {
//     switch (shuffle) {
//         case false:
//             shuffle = true;
//             shuffle_icon.style.color = "green";
//             break;
//         case true:
//             shuffle = false;
//             shuffle_icon.style.color = "unset";
//             break;
//     }
// }



// _________VOLUME:_________
const volume_icon = document.querySelector(".volume");
const curr_volume = document.querySelector(".curr-volume");

curr_track.volume = 0.20;
volume_icon.addEventListener("wheel", volumeChange);


function volumeChange(event) {
    try {
        let change = event.deltaY;

        if (change <= 0) {
            event.preventDefault();
            curr_track.volume += 0.1;
        } else {
            event.preventDefault();
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
        progress.style.width = time;
        progress.style.background = "linear-gradient(#00f7ffaf, rgb(11, 180, 247), #00f7ffaf)";

        // _________TIMER:_________
        let current = document.querySelector(".current");
        let total = document.querySelector(".total");

        let currentMin = Math.floor(curr_track.currentTime / 60);
        let currentSec = Math.floor(curr_track.currentTime) - (currentMin * 60);
        let totalMin = Math.floor(curr_track.duration / 60);
        let totalSec = Math.floor(curr_track.duration) - (totalMin * 60);

        if (currentMin < 10) {
            currentMin = "0" + currentMin;
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


// ______________CATEGORY______________
let category = document.querySelector(".category");

track_list.forEach(x => {
    const button = document.createElement("button");
    const span = document.createElement("span");

    button.textContent = x["category"];
    button.setAttribute("type", "button");
    button.setAttribute("class", "category-btn");
    button.onclick = function () {
        generateList(x.category);
    }

    span.innerHTML = "<i class=\"fa\">&#xf04b;</i>";
    span.setAttribute("class", "play-category");
    span.onclick = function () {
        categoryToPlaylist(x.category);
    }

    button.appendChild(span);
    category.appendChild(button);
})

// Show a "play" button when hovered on each button above to be able to play whole category

// ______________LIST______________
let list = document.querySelector(".list");

function generateList(category) {
    track_list.forEach(x => {
        if (x.category === category) {
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
            x.content.forEach(y => {
                const button = document.createElement("button");
                button.textContent = y.name;
                button.setAttribute("type", "button");
                button.setAttribute("class", "list-btn");
                list.appendChild(button);
            })
        }
    })
}

// Show a "play" button when hovered on each button above to be able to play 

// ______________EXTRA______________

// ______________PLAYLIST______________
let modal_playlist = document.querySelector(".playlist");
let body_playlist = document.querySelector("#playlist");

function categoryToPlaylist(category) {
    track_list.forEach(x => {
        if (x.category === category) {
            x.content.forEach(y => {
                object[0].playlist.push(y);
            })
            localStorage.playlist = JSON.stringify(object[0].playlist);
        }
    }) 
    generatePlaylist();
}

function generatePlaylist() {
    object[0].playlist.forEach(x => {
        const button1 = document.createElement("button");
        button1.textContent = x.name;
        button1.setAttribute("type", "button");
        
        modal_playlist.appendChild(button1);

        let button2 = document.createElement("button");
        button2.textContent = x.name;
        button2.setAttribute("type", "button");
        body_playlist.appendChild(button2);
    })
}

function clearPlaylist() {
    object[0].playlist = [];
    localStorage.playlist = [];
}


