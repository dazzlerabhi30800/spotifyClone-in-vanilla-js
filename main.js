console.log("welcome to Spotify");

// Initializing the variables
let audioElement = new Audio("./Audio/1.mp3");
let play = false;
const playButton = document.querySelector(".play--btn");
const visualizer = document.querySelector(".visualizer");
const progressBar = document.getElementById("progress--bar");
const songItems = document.querySelectorAll(".song--item");
const songName = document.querySelector(".song--name");
let songIndex = 0;
let timeStamp = 0;
let duration = document.querySelector(".duration");
const prevButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

let songs = [
  {
    songName: "Afrojack - Lose you",
    filePath: "./Audio/1.mp3",
    albumArt: "./Album Art/1.jpg",
  },
  {
    songName: "Calvin Harris - Feels",
    filePath: "./Audio/2.mp3",
    albumArt: "./Album Art/2.jpg",
  },
  {
    songName: "Charlie Puth - Light Switch",
    filePath: "./Audio/3.mp3",
    albumArt: "./Album Art/3.jpg",
  },
  {
    songName: "Ed Sheeran - Bad Habits ",
    filePath: "./Audio/4.mp3",
    albumArt: "./Album Art/4.jpg",
  },
  {
    songName: "Troye Sivan - Easy",
    filePath: "./Audio/5.mp3",
    albumArt: "./Album Art/5.jpg",
  },
];

// Handle Play Pause Events
const handleDuration = (audioElement) => {
  if (audioElement.duration !== NaN) {
    let newDuration = Math.floor(audioElement.duration / 60);
    let remainingSeconds = Math.floor(audioElement.duration % 60);
    let minutes = newDuration < 10 ? "0" + newDuration : newDuration;
    let seconds =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    let totalTime = minutes + ":" + seconds;
    return totalTime;
  } else {
    return;
  }
};
playButton.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    playButton.classList.remove("fa-play-circle");
    playButton.classList.add("fa-pause-circle");
    visualizer.classList.add("active");
    console.log(songIndex);
    songItems[songIndex].classList.add("playing");
    songItemPlay[songIndex].classList.add("fa-pause-circle");
    songItemPlay[songIndex].classList.remove("fa-play-circle");
  } else {
    audioElement.pause();
    playButton.classList.add("fa-play-circle");
    playButton.classList.remove("fa-pause-circle");
    visualizer.classList.remove("active");
    songItems[songIndex].classList.remove("playing");
    songItemPlay[songIndex].classList.remove("fa-pause-circle");
    songItemPlay[songIndex].classList.add("fa-play-circle");
  }
  duration.textContent = handleDuration(audioElement);
});
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].albumArt;
  element.querySelector(".song--title").textContent = songs[i].songName;
});
// Event Listener
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  progressBar.value = progress;
});
progressBar.addEventListener("change", () => {
  audioElement.currentTime = (audioElement.duration * progressBar.value) / 100;
});

const songItemPlay = document.querySelectorAll(".song--item--play");
document.querySelectorAll(".song--item--play").forEach((element, i) => {
  element.addEventListener("click", (e) => {
    songIndex = i;
    audioElement.src = songs[i].filePath;
    audioElement.currentTime = 0;
    duration.textContent = handleDuration(audioElement);
    songItemPlay.forEach((element) => {
      element.classList.add("fa-play-circle");
      element.classList.remove("fa-pause-circle");
    });
    // songItemPlay[songIndex].classList.add("fa-pause-circle");
    e.target.classList.toggle("fa-pause-circle");
    songItems.forEach((element) => element.classList.remove("playing"));
    if (e.target.classList.contains("fa-pause-circle")) {
      // e.target.classList.remove("fa-play-circle");
      audioElement.play();
      songItems[i].classList.add("playing");
      visualizer.classList.add("active");
      playButton.classList.add("fa-pause-circle");
      playButton.classList.remove("fa-play-circle");
    } else {
      e.target.classList.remove("fa-pause-circle");
      // e.target.classList.add("fa-play-circle");
      audioElement.pause();
      songItems[i].classList.remove("playing");
      visualizer.classList.remove("active");
      playButton.classList.remove("fa-pause-circle");
      playButton.classList.add("fa-play-circle");
    }
    // playButton.classList.add("fa-pause-circle");
    songName.textContent = songs[i].songName;
    setTimeout(() => {
      duration.textContent = handleDuration(audioElement);
    }, 50);
  });
});

const songPlayButton = document.querySelectorAll(".song--item--play");
prevButton.addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex--;
  }
  audioElement.src = songs[songIndex].filePath;
  songName.textContent = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  songPlayButton.forEach((element) => {
    element.classList.add("fa-play-circle");
    element.classList.remove("fa-pause-circle");
  });
  songItems.forEach((element) => element.classList.remove("playing"));
  songPlayButton[songIndex].classList.add("fa-pause-circle");
  songItems[songIndex].classList.add("playing");
  playButton.classList.add("fa-pause-circle");
});

nextButton.addEventListener("click", () => {
  if (songIndex >= songItems.length) {
    songIndex = songItems.length - 1;
  } else {
    songIndex++;
  }
  audioElement.src = songs[songIndex].filePath;
  songName.textContent = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  songPlayButton.forEach((element) => {
    element.classList.add("fa-play-circle");
    element.classList.remove("fa-pause-circle");
  });
  songItems.forEach((element) => element.classList.remove("playing"));
  songPlayButton[songIndex].classList.add("fa-pause-circle");
  songItems[songIndex].classList.add("playing");
  playButton.classList.add("fa-pause-circle");
});
