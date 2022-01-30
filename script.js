let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    id: 0,
    songName: "Faltu-Fully Faltu",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
    time: "05:34",
  },
  {
    id: 1,
    songName: "Hookah Bar (Khiladi 786)",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    id: 2,
    songName: "Jhalla Wallah",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    id: 3,
    songName: "Aa Re Pritam Pyaare ",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    id: 4,
    songName: "Afghan Jalebi (Ya Baba) ",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    id: 5,
    songName: "Lat Lag Gayee",
    filePath: "songs/2.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    id: 6,
    songName: "High Heels ",
    filePath: "songs/2.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    id: 7,
    songName: "Satisfya Imran Khan",
    filePath: "songs/2.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    id: 8,
    songName: "Beedi Jalaile",
    filePath: "songs/2.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    id: 9,
    songName: "Balma (Khiladi 786)",
    filePath: "songs/4.mp3",
    coverPath: "covers/10.jpg",
  },
];

let audioElememt = new Audio("1.mp3");

let songItemContainer = document.querySelector(".songItemContainer");

function diplayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    return `<div class="songItem">
    <img src=${item.coverPath} alt=${item.filePath} class="photo" />
    <span class="songName">${item.songName}</span>
    <span class="songlistplay"
    >
    <i id=${item.id} class="far songItemPlay fa-play-circle"></i> </span
    ></span>
    </div>`;
  });
  displayMenu = displayMenu.join("");

  songItemContainer.innerHTML = displayMenu;
}

diplayMenuItems(songs);

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

let makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= songs.length) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
