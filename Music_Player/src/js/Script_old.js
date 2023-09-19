// ***********************************************************************************************
// SETTING MAIN VIEW: 
main.style.flexDirection = "row";

// ***********************************************************************************************
// GLOBAL VARIABLES: 

let now_playing = document.querySelector(".now-playing");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');
curr_track.volume = 0.10;
// ***********************************************************************************************

// ***********************************************************************************************
// PLAYER FUNCTIONS

function loadTrack(track_index, list) {

    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // Load a new track
    curr_track.src = list[track_index].path;
    curr_track.load();

    track_name.textContent = (track_index + 1) + ". " + list[track_index].name;
    track_artist.textContent = list[track_index].artist;

    mylist_select(track_index);

    updateTimer = setInterval(seekUpdate, 500);


    curr_track.addEventListener("ended", nextTrack);

}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (list.length == 0) {
        alert("No Song Selected");
    } else {
        if (!isPlaying) playTrack();
        else pauseTrack();
    }

}

function playTrack() {
    if(curr_track.src == ""){
        play_playlist();
    }
    
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fas fa-pause fa-2x" style="color: #a51d2d;"></i>';

}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;

    playpause_btn.innerHTML = '<i class="fas fa-play fa-2x" style="color: #26a269;"></i>';
}


function nextTrack() {

    if (track_index < list.length - 1)
        track_index += 1;
    else track_index = 0;

    loadTrack(track_index, list);
    playTrack();

}

function prevTrack() {

    if (track_index > 0)
        track_index -= 1;
    else track_index = list.length - 1;

    loadTrack(track_index, list);
    playTrack();
}

function seekTo() {

    seekto = curr_track.duration * (seek_slider.value / 100);

    curr_track.currentTime = seekto;
}

function setVolume() {

    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }

        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// LEFT SIDEBAR:



// RIGHT SIDEBAR:
let rsList;

function rs_list(category_inp) {
    let right_sidebar = document.querySelector(".right-sidebar");
    while (right_sidebar.firstChild) {
        right_sidebar.removeChild(right_sidebar.firstChild);
    }
    rsList = [];
    track_list.forEach(x => {
        if (x.category == category_inp) {
            x.content.forEach(y => {
                rsList.push(y);
                const div_rs = document.createElement('div');
                right_sidebar.appendChild(div_rs);
                const button1 = document.createElement('button');
                button1.className = "btn btn-outline-success";
                button1.textContent = (y.song_id + 1) + ". " + y.name;
                button1.onclick = function () {
                    clearList();
                    alert("You are about to replace playlist with new list.");
                    list = [];
                    x.content.forEach(z => {
                        addSong(x.category, z);
                    })
                }
                const button2 = document.createElement('button');
                button2.className = "rs_btn";
                button2.textContent = " + ";
                button2.onclick = function () {
                    addSong(x.category, y);
                }
                div_rs.appendChild(button1);
                div_rs.appendChild(button2);
            })
        }
    });
}

// ***********************************************************************************************

// ***********************************************************************************************
// mylist Algorithm:

let mylist = document.querySelector(".my-list");
let temp;
const ul = document.createElement("ul");
mylist.appendChild(ul);
let list;


function addSong(category_input, song_input) {
    let input = song_input;
    let song = {};
    song.category = category_input;
    song.name = input.name;
    song.artist = input.artist;
    song.path = input.path;
    list.push(song);
    generateMyList();
}

function generateMyList() {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    list.forEach(y => {
        const li = document.createElement("li");
        ul.appendChild(li);
        li.innerText =  y.name;
        li.onclick = function () {
            track_index = list.indexOf(y);
            loadTrack(track_index, list);
            isPlaying = false;
            playpauseTrack();
        }
    })
    localStorage.playlist = JSON.stringify(list);
}

function clearList() {
    localStorage.removeItem("playlist");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    location.reload();
}

window.onload = function () {

    if (localStorage.playlist) {
        list = [];
        list = JSON.parse(localStorage.playlist);
        generateMyList();
    } else {
        list = [];
        localStorage.playlist = JSON.stringify(list);
        generateMyList();
    }
}

function play_playlist() {
    track_index = 0;
    loadTrack(track_index, list);

    list.forEach(x => {
        loadTrack(track_index, list);
        isPlaying = false;
        playpauseTrack();
    })
}

function mylist_select(track_index) {
    let mylist_items = document.querySelectorAll(".my-list li");
    for (let i = 0; i < mylist_items.length; i++) {
        if(i == track_index){
            mylist_items[i].classList.add("mylist_selected_item");
            mylist_items[i].classList.remove("mylist_deselected_item");
        } else {
            mylist_items[i].classList.remove("mylist_selected_item");
            mylist_items[i].classList.add("mylist_deselected_item");
        }
    }
        
}


// ***********************************************************************************************
// 