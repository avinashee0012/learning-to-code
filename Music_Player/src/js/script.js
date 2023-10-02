// INITIAL SETUP

let object = [
    {
        playlist: [],
        track_index: 0,
        current_time: 0,
        isPlaying: false,
        volume: 0.2,
        alert_read: true,
        // repeat: 0,
        // shuffle: false
    }
]

window.onload = function localStorageFetch() {
    if (localStorage.playlist) {
        object[0].playlist = JSON.parse(localStorage.playlist);
    } else {
        localStorage.playlist = object[0].playlist;
    }

    if (localStorage.track_index && (localStorage.track_index != NaN)) {
        object[0].track_index = localStorage.track_index;
    } else {
        localStorage.track_index = object[0].track_index;
    }

    if (localStorage.current_time) {
        object[0].current_time = localStorage.current_time;
    } else {
        localStorage.current_time = object[0].current_time;
    }

    if (localStorage.isPlaying) {
        object[0].isPlaying = localStorage.isPlaying;
    } else {
        localStorage.isPlaying = object[0].isPlaying;
    }

    if (localStorage.volume) {
        object[0].volume = localStorage.volume;
    } else {
        localStorage.volume = object[0].volume;
    }

    if (localStorage.alert_read) {
        object[0].alert_read = localStorage.alert_read;
    } else {
        localStorage.alert_read = object[0].alert_read;
    }

    generatePlaylist();
}

if (localStorage.alert_read) {
    alert.style.visibility = "hidden";
    alert_message.style.display = "none";
} 


// DETAILS 
// Should show details of the song being played -- should reference the index from playlist

// to show details of song being played
function updateDetails() {
    try {
        const songName = document.querySelector(".song");
        songName.textContent = object[0].playlist[track_index].name;

        const artistName = document.querySelector(".artist");
        artistName.textContent = object[0].playlist[track_index].artist;
    } catch (error) {
        //passing for now
    }
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
        track_index = object[0].playlist.length - 1;
    } else {
        track_index--;
        localStorage.track_index = track_index;
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
let track_index = localStorage.track_index;

function loadSong() {
    curr_track.src = object[0].playlist[track_index].path;
    updateDetails();

    curr_track.addEventListener("ended", autoNext);
}


function playPause() {
    if (!curr_track.paused) {
        curr_track.pause();
        localStorage.isPlaying = false;
        play_pause.innerHTML = "<i class=\"fa fa-play-circle-o\"></i>";
    } else {
        play_pause.innerHTML = "<i class=\"fa fa-pause-circle-o\"></i>";
        loadSong();
        localStorage.isPlaying = true;
        setInterval(progressTrack, 1000);
        curr_track.play();
    }
}

// _________NEXT:_________
let next = document.querySelector(".next");
next.addEventListener("click", nextSong);


function nextSong() {
    if (track_index == object[0].playlist.length - 1) {
        track_index = 0;
        localStorage.track_index = track_index;
    } else {
        track_index++;
        localStorage.track_index = track_index;
    }

    if (curr_track.paused) {
        loadSong();
    } else {
        loadSong();
        playPause();
    }
}

function autoNext() {
    if (track_index == object[0].playlist.length - 1) {
        track_index = 0;
        localStorage.track_index = track_index;
    } else {
        track_index++;
        localStorage.track_index = track_index;
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
//             shuffle_icon.style.color = "unstatusset";
//             break;
//     }
// }



// _________VOLUME:_________
const volume_icon = document.querySelector(".volume");
const curr_volume = document.querySelector(".curr-volume");

curr_track.volume = localStorage.volume;
volume_icon.addEventListener("wheel", volumeChange);

function volumeChange(event) {
    try {
        let change = event.deltaY;

        if (change <= 0) {
            event.preventDefault();
            curr_track.volume += 0.1;
            localStorage.volume = curr_track.volume;
        } else {
            event.preventDefault();
            curr_track.volume -= 0.1;
            localStorage.volume = curr_track.volume;
        }
        curr_volume.textContent = Math.floor(localStorage.volume * 11);
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
        let time = Math.floor(100 * curr_track.currentTime / curr_track.duration + 0.5);
        let time_perc = time + "%";

        progress.style.width = time_perc;
        progress.style.background = "linear-gradient(#00f7ffaf, rgb(11, 180, 247), #00f7ffaf)";
        localStorage.current_time = time;

        function seekTo() {
            curr_track.currentTime = curr_track.duration * time;
        }

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

// generate category buttons based on categories available in track_list
track_list.forEach(x => {
    const div = document.createElement("div");
    div.setAttribute("class", "btn-container");

    const button1 = document.createElement("button");
    button1.textContent = x["category"];
    button1.setAttribute("class", "name");
    button1.onclick = function () {
        generateList(x.category);
    }

    const button2 = document.createElement("button");
    button2.innerHTML = "<i class=\"fa fa-plus\"></i>";
    button2.setAttribute("class", "action");
    button2.onclick = function () {
        addToPlaylist(x.category);
    }

    // button1.appendChild(button2);
    div.appendChild(button1);
    div.appendChild(button2);
    category.appendChild(div);
})

// ______________LIST______________
let list = document.querySelector(".list");

// to generate list buttons based on category
function generateList(category) {
    track_list.forEach(x => {
        if (x.category === category) {
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
            x.content.forEach(y => {
                const div = document.createElement("div");
                div.setAttribute("class", "btn-container");

                const button1 = document.createElement("button");
                button1.textContent = y.name;
                button1.setAttribute("type", "button");
                button1.setAttribute("class", "name");
                button1.onclick = function () {
                    addToPlaylist(y);
                    track_index = JSON.parse(localStorage.playlist).length - 1;
                    playPause();
                }

                const button2 = document.createElement("button");
                button2.innerHTML = "<i class=\"fa fa-plus\"></i>";
                button2.setAttribute("class", "action");
                button2.onclick = function () {
                    addToPlaylist(y);
                }
                div.appendChild(button1);
                div.appendChild(button2);
                list.appendChild(div);
            })
        }
    })
}


// ______________EXTRA______________

// ______________PLAYLIST______________
let modal_playlist = document.querySelector(".playlist");
let body_playlist = document.querySelector("#playlist");

function addToPlaylist(category) {
    while (modal_playlist.firstChild) {
        modal_playlist.removeChild(modal_playlist.firstChild);
    }
    while (body_playlist.firstChild) {
        body_playlist.removeChild(body_playlist.firstChild);
    }
    if (typeof (category) == "object") {
        object[0].playlist.push(category);
        localStorage.playlist = JSON.stringify(object[0].playlist);
    } else {
        track_list.forEach(x => {
            if (x.category === category) {
                x.content.forEach(y => {
                    object[0].playlist.push(y);
                })
                localStorage.playlist = JSON.stringify(object[0].playlist);
            }
        })
    }
    generatePlaylist();
}



// generate the playlist buttons for items in playlist array
function generatePlaylist() {

    const button = document.createElement("button");
    button.textContent = "Clear Playlist";
    button.setAttribute("class", "clear-playlist-button");
    button.style.justifyContent = "center";
    button.addEventListener("click", clearPlaylist);
    modal_playlist.appendChild(button);

    const clear_playlist = document.querySelector(".clear-playlist-button");

    if (object[0].playlist.length == 0 || JSON.parse(localStorage.playlist).length == 0) {
        clear_playlist.style.display = "none";
    }

    object[0].playlist.forEach(x => {
        const div = document.createElement("div");
        div.setAttribute("class", "btn-container");

        const button1 = document.createElement("button");
        button1.textContent = x.name;
        button1.setAttribute("type", "button");
        button1.setAttribute("class", "name");

        button1.onclick = function () {
            track_index = object[0].playlist.indexOf(x);
            playPause();
        }

        const button2 = document.createElement("button");
        button2.innerHTML = "<i class=\"fa fa-remove\"></i>";
        button2.setAttribute("class", "action");
        button2.onclick = function () {
            removeFromPlaylist(x, object[0].playlist.indexOf(x));
        }
        div.appendChild(button1);
        div.appendChild(button2);
        modal_playlist.appendChild(div);

        const button3 = document.createElement("button");
        button3.textContent = x.name;
        button3.setAttribute("class", "name");
        button3.style.textAlign = "center";
        button3.onclick = function () {
            track_index = object[0].playlist.indexOf(x);
            playPause();
        }

        body_playlist.appendChild(button3);

    })
}

function removeFromPlaylist(song, index) {
    console.log("x: " + song + " index: " + index);
    object[0].playlist.splice(index, 1);
    localStorage.playlist = JSON.stringify(object[0].playlist);

    while (modal_playlist.firstChild) {
        modal_playlist.removeChild(modal_playlist.firstChild);
    }
    while (body_playlist.firstChild) {
        body_playlist.removeChild(body_playlist.firstChild);
    }

    const button = document.createElement("button");
    button.textContent = "Clear Playlist";
    button.setAttribute("class", "clear-playlist-button");
    button.style.justifyContent = "center";
    button.addEventListener("click", clearPlaylist);
    modal_playlist.appendChild(button);

    object[0].playlist.forEach(x => {
        const div = document.createElement("div");
        div.setAttribute("class", "btn-container");

        const button1 = document.createElement("button");
        button1.textContent = x.name;
        button1.setAttribute("type", "button");
        button1.setAttribute("class", "name");

        const button2 = document.createElement("button");
        button2.innerHTML = "<i class=\"fa fa-remove\"></i>";
        button2.setAttribute("class", "action");
        button2.onclick = function () {
            removeFromPlaylist(x, object[0].playlist.indexOf(x));
        }
        div.appendChild(button1);
        div.appendChild(button2);
        modal_playlist.appendChild(div);

        const button3 = document.createElement("button");
        button3.textContent = x.name;
        button3.setAttribute("class", "name");
        button3.style.textAlign = "center";
        body_playlist.appendChild(button3);
    })
}

// clear the playlist array and refresh page
function clearPlaylist() {
    let text = "Pressing OK will clear you playlist!";
    if (confirm(text) == true) {
        text = object[0].playlist = [];
        localStorage.playlist = [];
        location.reload();
    } else {
        text = "";
    }
}

const back_to_top = document.querySelector(".back-to-top");

window.onscroll = function () {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        back_to_top.style.display = "block";
    } else {
        back_to_top.style.display = "none";
    }
}

curr_volume.textContent = Math.floor(localStorage.volume * 11);
