const songs = [
  {
    title: "Superman",
    artist: "Eminem",
    src: "songs/song1.mp3",
    cover: "images/image1.jpeg",
  },
  {
    title: "Not Afraid",
    artist: "Eminem",
    src: "songs/song2.mp3",
    cover: "images/image2.jpeg",
  },
  {
    title: "Mocking Bird",
    artist: "Eminem",
    src: "songs/song3.mp3",
    cover: "images/image3.jpeg",
  },
];

let currentSongIndex = 0;
const audio = document.getElementById("audio");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const coverImage = document.getElementById("cover-image");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const volumeSlider = document.getElementById("volume-slider");
const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

// Load a song
function loadSong(song) {
  songTitle.textContent = song.title;
  artist.textContent = song.artist;
  coverImage.src = song.cover;
  audio.src = song.src;
}

// Play or pause the song
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

// Update progress bar
function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;

  // Update current time
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);
  currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  // Update duration
  const totalMinutes = Math.floor(audio.duration / 60);
  const totalSeconds = Math.floor(audio.duration % 60);
  duration.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, "0")}`;
}

// Set progress
function setProgress() {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
}

// Change volume
function setVolume() {
  audio.volume = volumeSlider.value;
}

// Play next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Play previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Event Listeners
playPauseBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
volumeSlider.addEventListener("input", setVolume);
progressBar.addEventListener("input", setProgress);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

// Load the first song initially
loadSong(songs[currentSongIndex]);