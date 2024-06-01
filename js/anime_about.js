const inputBox = document.getElementById("input-box");
const container = document.getElementById("container");
const searchBtn = document.getElementById("search-button");
const navBar = document.getElementById("navbar");

const nextBtn = document.getElementById("next-airing");
const previousBtn = document.getElementById("previous-airing");


//-----------------------------------------------Adding event listeners to search button-------------------------------------------------


document.body.addEventListener("click", function (event) {
    if (!event.target.closest("#search-button")) {
        container.innerHTML = "";
        container.style.display = "none";
    }
});

searchBtn.addEventListener("click", () => {
    container.style.display = "flex";
    container.style.flexDirection = "column";

    if (inputBox.value === "") {
        container.style.display = "none";
        return false;
    }

    container.innerHTML = "";

    fetch(`https://api.jikan.moe/v4/anime?q=${inputBox.value}&sfw=true`)
        .then(response => response.json())
        .then(data => {
            console.log(data, "Search anime");
            for (const anime of data.data) {
                const animeCard = document.createElement("div");
                animeCard.classList.add("search-anime-cards");

                const image = document.createElement("img");
                image.classList.add("search-anime-image");
                image.src = anime.images.jpg.large_image_url;

                function capitalizeFirstLetter(str) {
                    if (str === "null") {
                        return "";
                    }
                
                    return str.replace(/\w/, function (char) {
                        return char.toUpperCase();
                    });
                }

                const aniSeason = capitalizeFirstLetter(JSON.stringify(anime.season));
                const type = nullfunc(anime.type);
                const episodes = nullfunc(anime.episodes);
                const aired = nullfunc(anime.aired.string);
                const score = nullfunc(anime.score);

                const details = document.createElement("div");
                details.classList.add("search-anime-details");
                details.innerHTML = `
                <h1 class="search-anime-title">${anime.title}</h1>
                <table style="margin-left: 7px; height: 100px">
                <tr>
                <td><i class="fa-solid fa-tv"></i>&nbsp;&nbsp;${type} (${episodes} Episodes)</td>
                </tr>
                <tr>
                <td>
                <div class="search-anime-details-main-div">
                <i class="fa-regular fa-calendar"></i>&nbsp;&nbsp;
                <div class="search-anime-details-div">
                ${aniSeason.slice(1,-1)} ${aired}
                </div>
                </div>
                </td>
                </tr>
                <tr>
                <td><i class="fa-solid fa-star" style="color: gold"></i>&nbsp;&nbsp;${score}</td>
                </tr>
                </table>`

                animeCard.appendChild(image);
                animeCard.appendChild(details);
                container.appendChild(animeCard);

                animeCard.addEventListener("click", function () {
                    localStorage.setItem("image", anime.images.jpg.large_image_url);
                    localStorage.setItem("aired", anime.aired.string);
                    localStorage.setItem("broadcast", anime.broadcast.string);
                    localStorage.setItem("type", anime.type);
                    localStorage.setItem("duration", anime.duration);
                    localStorage.setItem("episodes", anime.episodes);
                    localStorage.setItem("popularity", anime.popularity);
                    localStorage.setItem("rank", anime.rank);
                    localStorage.setItem("rating", anime.rating);
                    localStorage.setItem("score", anime.score);
                    localStorage.setItem("scored by", anime.scored_by);
                    localStorage.setItem("source", anime.source);
                    localStorage.setItem("season", anime.season);
                    localStorage.setItem("status", anime.status);
                    localStorage.setItem("synopsis", anime.synopsis);
                    localStorage.setItem("title", anime.title);
                    localStorage.setItem("title japanese", anime.title_japanese);
                    localStorage.setItem("year", anime.year);


                    const themesList = [];
                    const themes = anime.themes;

                    for (let i = 0; i < themes.length; i++) {
                        themesList.push(" " + themes[i].name);
                    }

                    localStorage.setItem("themes", themesList);

                    const studiosList = [];
                    const studios = anime.studios;

                    for (let i = 0; i < studios.length; i++) {
                        studiosList.push(" " + studios[i].name);
                    }

                    localStorage.setItem("studios", studiosList);

                    const producersList = [];
                    const producers = anime.producers;

                    for (let i = 0; i < producers.length; i++) {
                        producersList.push(" " + producers[i].name);
                    }

                    localStorage.setItem("producers", producersList);

                    const genreList = [];
                    const genres = anime.genres;

                    for (let i = 0; i < genres.length; i++) {
                        genreList.push(" " + genres[i].name);
                    }

                    localStorage.setItem("genre", genreList);
                    window.location.href = "anime_about.html";
                })
            }

            inputBox.value = "";
        });
    Event.stopPropagation();
});

//----------------------------------------------------------------------------------------------------------------------------------------

const animeImage = document.getElementById("anime-image");
animeImage.src = localStorage.getItem("image");

const animeTitle = document.getElementById("anime-title");
const titleKey = localStorage.getItem("title");
animeTitle.innerText = `${titleKey}`;

const animeTitleJap = document.getElementById("anime-title-jap");
const titleJapKey = localStorage.getItem("title japanese");
animeTitleJap.innerText = `${titleJapKey}`;

const synopsisDiv = document.getElementById("synopsis-div");
const synopsis = nullfunc(localStorage.getItem("synopsis"));
synopsisDiv.innerHTML = `<p>${synopsis}</p>`

const genreDiv = document.getElementById("genre-div");
const genreList = localStorage.getItem("genre");
const themeList = localStorage.getItem("themes");

if (themeList === '') {
    genreDiv.innerText = `${genreList}`;
}
else if (genreList === '') {
    genreDiv.innerText = `${themeList}`;
}
else {
    genreDiv.innerText = `${genreList},${themeList}`;
}

function capitalizeFirstLetter(str) {
    if (str === "null") {
        return "Unavailable";
    }

    return str.replace(/\w/, function (char) {
        return char.toUpperCase();
    });
}

function nullfunc(str) {
    if (str === "null") {
        return "Unavailable";
    }
    else {
        return str;
    }
}

const year = nullfunc(localStorage.getItem("year"));
const type = nullfunc(localStorage.getItem("type"));
const rating = nullfunc(localStorage.getItem("rating"));
const episodes = nullfunc(localStorage.getItem("episodes"));
const duration = nullfunc(localStorage.getItem("duration"));
const broadcast = nullfunc(localStorage.getItem("broadcast"));
const statusKey = nullfunc(localStorage.getItem("status"));
const source = nullfunc(localStorage.getItem("source"));
const studios = nullfunc(localStorage.getItem("studios"));
const producers = nullfunc(localStorage.getItem("producers"));
const aired = nullfunc(localStorage.getItem("aired"));

const aniSeason = capitalizeFirstLetter(localStorage.getItem("season"));

const animeDetailsDiv = document.getElementById("anime-details-div");
animeDetailsDiv.innerHTML =
    `<table id="anime-info-table">
        <tr>
            <td>Type:</td>
            <td>${type}</td>
        </tr>
        <tr>
            <td>Rating:</td>
            <td>${rating}</td>
        </tr>
        <tr>
            <td>Episodes:</td>
            <td>${episodes}</td>
        </tr>
        <tr>
            <td>Duration:</td>
            <td>${duration}</td>
        </tr>
        <tr>
            <td>Broadcast:</td>
            <td>${broadcast}</td>
        </tr>
        <tr>
            <td>Status:</td>
            <td>${statusKey}</td>
        </tr>
        <tr>
            <td>Source:</td>
            <td>${source}</td>
        </tr>
        <tr>
            <td>Studios:</td>
            <td>${studios}</td>
        </tr>
        <tr>
            <td>Producers:</td>
            <td>${producers}</td>
        </tr>
        <tr>
            <td>Aired:</td>
            <td>${aired}</td>
        </tr>
        <tr>
            <td>Season:</td>
            <td>${aniSeason}</td>
        </tr>
        <tr>
            <td>Year:</td>
            <td>${year}</td>
        </tr>
    </table>`;

const score = nullfunc(localStorage.getItem("score"));
const scoredBy = nullfunc(localStorage.getItem("scored by"));
const rank = nullfunc(localStorage.getItem("rank"));
const popularity = nullfunc(localStorage.getItem("popularity"));


const animeStatsDiv = document.getElementById("anime-stats-div");
animeStatsDiv.innerHTML =
    `<table id="anime-stats-table">
        <tr>
            <td>Score:</td>
            <td>${score} (${scoredBy})</td>
        </tr>
        <tr>
            <td>Rank:</td>
            <td>#${rank}</td>
        </tr>
        <tr>
            <td>Popularity:</td>
            <td>#${popularity}</td>
        </tr>
    </table>`;

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});