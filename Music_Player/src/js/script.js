// INITIAL SETUP

let object = [
    {
        playlist: [],
        track_index: -1,
        isPlaying: false,
        volume: 0.2,
        state: false,
        // alert_read: false,
        // repeat: 0,
        // shuffle: false
    }
]


window.onload = function localStorageFetch() {
    if (localStorage.playlist) {
        object[0].playlist = JSON.parse(localStorage.playlist);
    } else {
        localStorage.playlist = JSON.stringify(object[0].playlist);
    }

    if (localStorage.track_index && (localStorage.track_index != NaN)) {
        object[0].track_index = localStorage.track_index;
    } else {
        localStorage.track_index = object[0].track_index;
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

    if (localStorage.state) {
        object[0].state = localStorage.state;
    } else {
        localStorage.state = object[0].state;
    }

    if (localStorage.state == "false") {
        localStorage.state = true;
        location.reload();
    } else {
        generatePlaylist();
        highlightButton();
        updateDetails();
    }

}




// if (localStorage.alert_read) {
//     alert.style.visibility = "hidden";
//     alert_message.style.display = "none";
// } 


// DETAILS 
// Should show details of the song being played -- should reference the index from playlist

// to show details of song being played
function updateDetails() {
    try {
        const songName = document.querySelector(".song");
        songName.textContent = JSON.parse(localStorage.playlist)[track_index].name;

        const artistName = document.querySelector(".artist");
        artistName.textContent = JSON.parse(localStorage.playlist)[track_index].artist;
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

function repeatAlgo() {
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
}


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

    if (localStorage.isPlaying == "false") {
        loadSong();
    } else {
        loadSong();
        localStorage.isPlaying = false;
        playPause();        
    }
}

// _________PLAY-PAUSE:_________

let play_pause = document.querySelector(".play-pause");
play_pause.addEventListener("click", playPause);

let curr_track = document.createElement('audio');
let track_index = localStorage.track_index;

function loadSong() {
    updateDetails();
    curr_track.src = object[0].playlist[track_index].path;

    curr_track.addEventListener("ended", autoNext);
    highlightButton();
}


function playPause() {
    if (localStorage.isPlaying == "true") {
        curr_track.pause();
        localStorage.current_time = curr_track.currentTime;
        localStorage.isPlaying = false;
        play_pause.innerHTML = "<i class=\"fa fa-play-circle-o\"></i>";
    } else {
        play_pause.innerHTML = "<i class=\"fa fa-pause-circle-o\"></i>";
        if (localStorage.current_time) {
            curr_track.currentTime = localStorage.current_time;
        } else {
            loadSong();
        }
        localStorage.removeItem("current_time");
        localStorage.isPlaying = true;
        setInterval(progressTrack, 500);
        curr_track.play();
    }
}

function highlightButton() {
    const highlights = document.querySelectorAll(".playlist .btn-container");
    const body_highlights = document.querySelectorAll("body #playlist button");

    for (let i = 0; i < highlights.length; i++) {
        if (i == track_index) {
            highlights[i].classList.remove("highlight");
            highlights[i].classList.add("highlight");
            body_highlights[i].classList.remove("highlight");
            body_highlights[i].classList.add("highlight");
        } else {
            highlights[i].classList.remove("highlight");
            body_highlights[i].classList.remove("highlight");
        }
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

    if (localStorage.isPlaying == "false") {
        loadSong();
    } else {
        loadSong();
        localStorage.isPlaying = false;
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
localStorage.isPlaying = false;
    playPause();
}

// _________SHUFFLE:_________

function shuffleAlgo() {
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
                shuffle_icon.style.color = "unstatusset";
                break;
        }
    }
}


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

let progress_bar_div = document.querySelector(".progress-bar");

progress_bar_div.addEventListener("click", (event) => {
    console.log(curr_track.duration * event.offsetX / progress_bar_div.offsetWidth);
    curr_track.currentTime = curr_track.duration * event.offsetX / progress_bar_div.offsetWidth;
})

function progressTrack() {
    if (!isNaN(curr_track.duration)) {

        // _________PROGRESS:_________
        let time = Math.floor(100 * curr_track.currentTime / curr_track.duration) + 0.5;
        let time_perc = time + "%";

        progress.style.width = time_perc;
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

const modal = document.querySelector("#myModal");

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

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
            clearAllButtons(list);
            x.content.forEach(y => {
                const div = document.createElement("div");
                div.setAttribute("class", "btn-container");

                const button1 = document.createElement("button");
                button1.textContent = y.name;
                button1.setAttribute("type", "button");
                button1.setAttribute("class", "name");
                button1.onclick = function () {
                    addToPlaylist(y);
                    object[0].playlist = JSON.parse(localStorage.playlist);
                    track_index = object[0].playlist.length - 1;
                    localStorage.track_index = track_index;
                    localStorage.isPlaying = false;
                    localStorage.removeItem("current_time");
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
    clearAllButtons(body_playlist);
    clearAllButtons(modal_playlist);

    // if adding just a song object to playlist 
    if (typeof (category) == "object") {
        object[0].playlist.push(category);
        localStorage.playlist = JSON.stringify(object[0].playlist);
    } else {
        // if adding whole category to playlist
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
    highlightButton();
}


// generate the playlist buttons for items in playlist array
function generatePlaylist() {
    createClearPlaylistButton();
    createPlaylistButtons();
    highlightButton();
}

function removeFromPlaylist(song, index) {
    if (index == track_index) {
        playPause();
    }
    object[0].playlist.splice(index, 1);
    localStorage.playlist = JSON.stringify(object[0].playlist);
    clearAllButtons(body_playlist);
    clearAllButtons(modal_playlist);

    createClearPlaylistButton();
    createPlaylistButtons();
    if (index > track_index) {
        highlightButton();
    } else if (index = track_index) {
        //
    } else {
        //
    }

}

function clearAllButtons(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function createClearPlaylistButton() {

    const playlist_length = (JSON.parse(localStorage.playlist)).length;

    const button = document.createElement("button");
    button.textContent = "Clear Playlist (" + playlist_length + " songs)";
    button.setAttribute("class", "clear-playlist-button");
    button.style.justifyContent = "center";
    button.addEventListener("click", clearPlaylist);
    modal_playlist.appendChild(button);

    const clear_playlist = document.querySelector(".clear-playlist-button");

    if (object[0].playlist.length == 0 || JSON.parse(localStorage.playlist).length == 0) {
        clear_playlist.style.display = "none";
    }
}

function createPlaylistButtons() {
    object[0].playlist.forEach(x => {
        const div = document.createElement("div");
        div.setAttribute("class", "btn-container");

        const button1 = document.createElement("button");
        button1.textContent = x.name;
        button1.onclick = function () {
            track_index = object[0].playlist.indexOf(x);
            localStorage.track_index = track_index;
            localStorage.isPlaying = false;
            localStorage.removeItem("current_time");
            playPause();
        }
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
        button3.onclick = function () {
            track_index = object[0].playlist.indexOf(x);
            localStorage.track_index = track_index;
            localStorage.isPlaying = false;
            localStorage.removeItem("current_time");
            playPause();
        }
        body_playlist.appendChild(button3);
    })
}

// clear the playlist array and refresh page
function clearPlaylist() {
    let text = "Pressing OK will clear you playlist!";
    if (confirm(text) == true) {
        object[0].playlist = [];
        localStorage.playlist = [];
        clearAllButtons(modal_playlist);
        clearAllButtons(body_playlist);
    }
}


curr_volume.textContent = Math.floor(localStorage.volume * 11);

