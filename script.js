let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
// let songItems = Array.from(document.getElementsByClassName("songItem"));
const btnContainer = document.querySelector(".btn-container");

// Songs
let songs = [
  {
    id: 0,
    category: "Party",
    songName: "Faltu-Fully Faltu",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
    time: "05:34",
  },
  {
    id: 1,
    category: "Party",
    songName: "Hookah Bar (Khiladi 786)",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    id: 2,
    category: "Romantic",
    songName: "Jhalla Wallah",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    id: 3,
    category: "Party",
    songName: "Aa Re Pritam Pyaare ",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    id: 4,
    category: "Party",
    songName: "Afghan Jalebi (Ya Baba) ",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    id: 5,
    category: "Party",
    songName: "Lat Lag Gayee",
    filePath: "songs/2.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    id: 6,
    category: "Party",
    songName: "High Heels ",
    filePath: "songs/2.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    id: 7,
    category: "Party",
    songName: "Satisfya Imran Khan",
    filePath: "songs/2.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    id: 8,
    category: "Party",
    songName: "Beedi Jalaile",
    filePath: "songs/2.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    id: 9,
    category: "Party",
    songName: "Balma (Khiladi 786)",
    filePath: "songs/4.mp3",
    coverPath: "covers/10.jpg",
  },
  {
    id: 10,
    category: "Romantic",
    songName: "Humsafar",
    filePath: "songs/4.mp3",
    coverPath: "covers/11.jpg",
  },
  {
    id: 11,
    category: "Sad",
    songName: "Roke Na Ruke Naina",
    filePath: "songs/4.mp3",
    coverPath: "covers/12.jpg",
  },
  {
    id: 12,
    category: "Romantic",
    songName: "Shershaah",
    filePath: "songs/4.mp3",
    coverPath: "covers/13.jpg",
  },
  {
    id: 9,
    category: "Sad",
    songName: "Bhula Dena",
    filePath: "songs/4.mp3",
    coverPath: "covers/14.jpg",
  },
];

// let audioElememt = new Audio("1.mp3");

// Dynamic display songs
let songItemContainer = document.querySelector(".songItemContainer");

function diplaysongItems(songItems) {
  let displaysong = songItems.map(function (item) {
    return `<div class="songItem">
    <img src=${item.coverPath} alt=${item.filePath} class="photo" />
    <span class="songName">${item.songName}</span>
    <span class="songlistplay"
    >
    <i id=${item.id} class="far songItemPlay fa-play-circle"></i> </span
    ></span>
    </div>`;
  });
  displaysong = displaysong.join("");

  songItemContainer.innerHTML = displaysong;
}

diplaysongItems(songs);

function displaysongButtons() {
  const categories = songs.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  const categoryBtns = categories
    .map(function (category) {
      return `<button type="button" class="filter-btn" data-id=${category}>
          ${category}
        </button>`;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;
  const filterBtns = btnContainer.querySelectorAll(".filter-btn");
  console.log(filterBtns);

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      const songCategory = songs.filter(function (songItem) {
        if (songItem.category === category) {
          return songItem;
        }
      });
      if (category === "all") {
        diplaysongItems(songs);
        playSongs();
      } else {
        diplaysongItems(songCategory);
        playSongs();
      }
    });
  });
}

displaysongButtons();

// play songs
function playSongs() {
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
    progress = parseInt(
      (audioElement.currentTime / audioElement.duration) * 100
    );
    myProgressBar.value = progress;
  });
  //
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
  // particluar click song play
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
  // On next play button song play
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

  // previous button song play
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
}
