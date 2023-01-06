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
let minutes = 00;
let seconds = 00;
let timeInterval;
const prevButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const container = document.querySelector(".container");
let totalDuration = 0;
let limitDuration = 0;

let backgroundColor = [
  "radial-gradient(circle, #0f0d85, #070852)",
  " radial-gradient(circle, #606061, #242323)",
  "radial-gradient(circle, #f56855, #0e87ac)",
  "linear-gradient(90deg, #f0610e, #20bff0)",
  "radial-gradient(circle, #f14949, #f52626)",
];

let songs = [
  {
    songName: "Afrojack - Lose you",
    filePath: "./Audio/1.mp3",
    albumArt: "./Album Art/1.jpg",
    background: "./backgrounds/afrojack.jpg",
  },
  {
    songName: "Calvin Harris - Feels",
    filePath: "./Audio/2.mp3",
    albumArt: "./Album Art/2.jpg",
    background: "./backgrounds/calvin-harris.jpg",
  },
  {
    songName: "Charlie Puth - Light Switch",
    filePath: "./Audio/3.mp3",
    albumArt: "./Album Art/3.jpg",
    background: "./backgrounds/charlie-puth-3.png",
  },
  {
    songName: "Ed Sheeran - Bad Habits ",
    filePath: "./Audio/4.mp3",
    albumArt: "./Album Art/4.jpg",
    background: "./backgrounds/ed-sheeran.jpg",
  },
  {
    songName: "Troye Sivan - Easy",
    filePath: "./Audio/5.mp3",
    albumArt: "./Album Art/5.jpg",
    background: "./backgrounds/troye-sivan-2.jpg",
  },
];

// Handle Play Pause Events

playButton.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    playButton.classList.remove("fa-play-circle");
    playButton.classList.add("fa-pause-circle");
    visualizer.classList.add("active");
    songItems[songIndex].classList.add("playing");
    songItemPlay[songIndex].classList.add("fa-pause-circle");
    songItemPlay[songIndex].classList.remove("fa-play-circle");
    document.body.style.background = backgroundColor[songIndex];
    container.style.backgroundImage = `url(${songs[songIndex].background})`;
  } else {
    audioElement.pause();
    playButton.classList.add("fa-play-circle");
    playButton.classList.remove("fa-pause-circle");
    visualizer.classList.remove("active");
    songItems[songIndex].classList.remove("playing");
    songItemPlay[songIndex].classList.remove("fa-pause-circle");
    songItemPlay[songIndex].classList.add("fa-play-circle");
  }
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
  let seconds = Math.floor(audioElement.currentTime % 60);
  let fullSeconds = seconds < 10 ? "0" + seconds : seconds;
  let minutes = Math.floor(audioElement.currentTime / 60);
  let fullMinutes = minutes < 10 ? "0" + minutes : minutes;
  if (fullSeconds >= 60) {
    fullSeconds = 0;
  }
  duration.textContent = fullMinutes + ":" + fullSeconds;
  if (progress === 100) {
    audioElement.pause();
    audioElement.currentTime = 0;
    playButton.classList.add("fa-play-circle");
    playButton.classList.remove("fa-pause-circle");
    visualizer.classList.remove("active");
    songItems[songIndex].classList.remove("playing");
    songItemPlay[songIndex].classList.remove("fa-pause-circle");
    songItemPlay[songIndex].classList.add("fa-play-circle");
    document.body.style.background =
      "radial-gradient(circle, #3b3a3a, #2e2d2d)";
  }
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
    songItemPlay.forEach((element) => {
      element.classList.add("fa-play-circle");
      element.classList.remove("fa-pause-circle");
    });
    totalDuration = 0;
    minutes = 0;
    seconds = 0;
    setTimeout(() => {
      totalDuration = Math.floor(audioElement.duration);
      console.log(totalDuration);
    }, 40);
    duration.textContent = minutes + ":" + seconds;
    container.style.backgroundImage = `url(${songs[songIndex].background})`;
    document.body.style.background = backgroundColor[songIndex];
    songItems.forEach((element) => element.classList.remove("playing"));
    if (
      e.target.classList.contains("fa-play-circle") &&
      !e.target.classList.contains("fa-pause-circle")
    ) {
      audioElement.play();
      e.target.classList.add("fa-pause-circle");
      e.target.classList.remove("fa-play-circle");
      songItems[i].classList.add("playing");
      visualizer.classList.add("active");
      playButton.classList.add("fa-pause-circle");
      playButton.classList.remove("fa-play-circle");
    } else {
      e.target.classList.remove("fa-pause-circle");
      e.target.classList.add("fa-play-circle");
      audioElement.pause();
      songItems[i].classList.remove("playing");
      visualizer.classList.remove("active");
      playButton.classList.remove("fa-pause-circle");
      playButton.classList.add("fa-play-circle");
    }
    // playButton.classList.add("fa-pause-circle");
    songName.textContent = songs[i].songName;
  });
});

// prev and next song changer
const songPlayButton = document.querySelectorAll(".song--item--play");
prevButton.addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex--;
  }
  audioElement.src = songs[songIndex].filePath;
  document.body.style.background = backgroundColor[songIndex];
  container.style.backgroundImage = `url(${songs[songIndex].background})`;
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
  document.body.style.background = backgroundColor[songIndex];
  container.style.backgroundImage = `url(${songs[songIndex].background})`;
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

// Functions for controlling sound
let volumeSlider = document.querySelector("#volume--slider");
let volumeIcon = document.querySelector(".volume--icon");
volumeSlider.addEventListener("change", () => {
  audioElement.volume = volumeSlider.value / 100;
  if (volumeSlider.value <= 0) {
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.add("fa-volume-xmark");
    volumeIcon.classList.remove("fa-volume-low");
  } else if (volumeSlider.value <= 50) {
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.remove("fa-volume-xmark");
    volumeIcon.classList.add("fa-volume-low");
  } else {
    volumeIcon.classList.add("fa-volume-high");
    volumeIcon.classList.remove("fa-volume-xmark");
    volumeIcon.classList.remove("fa-volume-low");
  }
});
volumeIcon.addEventListener("click", () => {
  if (volumeIcon.classList.contains("fa-volume-high")) {
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.add("fa-volume-xmark");
    audioElement.volume = 0;
    volumeSlider.value = 0;
  } else {
    volumeIcon.classList.remove("fa-volume-xmark");
    volumeIcon.classList.add("fa-volume-high");
    audioElement.volume = 1;
    volumeSlider.value = 100;
  }
});

// Playing the song using spaceBar
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (audioElement.paused || audioElement.currentTime === 0) {
      audioElement.play();
      document.body.style.background = backgroundColor[songIndex];
      container.style.backgroundImage = `url(${songs[songIndex].background})`;
      songItems[songIndex].classList.add("playing");
      songPlayButton[songIndex].classList.add("fa-pause-circle");
      songPlayButton[songIndex].classList.remove("fa-play-circle");
      playButton.classList.add("fa-pause-circle");
      playButton.classList.remove("fa-play-circle");
      visualizer.classList.add("active");
    } else {
      audioElement.pause();
      songItems[songIndex].classList.remove("playing");
      songPlayButton[songIndex].classList.remove("fa-pause-circle");
      songPlayButton[songIndex].classList.add("fa-play-circle");
      playButton.classList.remove("fa-pause-circle");
      playButton.classList.add("fa-play-circle");
      visualizer.classList.remove("active");
    }
  } else {
    return;
  }
});
