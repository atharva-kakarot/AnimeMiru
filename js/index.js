const inputBox = document.getElementById("input-box");
const container = document.getElementById("container");
const searchBtn = document.getElementById("search-button");
const navBar = document.getElementById("navbar");

const nextBtn = document.getElementById("next-airing");
const previousBtn = document.getElementById("previous-airing");

function localStorageFunc(str) {
    localStorage.setItem("image", str.images.jpg.large_image_url);
    localStorage.setItem("aired", str.aired.string);
    localStorage.setItem("broadcast", str.broadcast.string);
    localStorage.setItem("type", str.type);
    localStorage.setItem("duration", str.duration);
    localStorage.setItem("episodes", str.episodes);
    localStorage.setItem("popularity", str.popularity);
    localStorage.setItem("rank", str.rank);
    localStorage.setItem("rating", str.rating);
    localStorage.setItem("score", str.score);
    localStorage.setItem("scored by", str.scored_by);
    localStorage.setItem("source", str.source);
    localStorage.setItem("season", str.season);
    localStorage.setItem("status", str.status);
    localStorage.setItem("synopsis", str.synopsis);
    localStorage.setItem("title", str.title);
    localStorage.setItem("title japanese", str.title_japanese);
    localStorage.setItem("year", str.year);
}

//-----------------------------------------------Adding event listeners to scroll buttons--------------------------------------------------

nextBtn.addEventListener("click", function () {
    airingNowDiv.scrollLeft += 400;
});

previousBtn.addEventListener("click", function () {
    airingNowDiv.scrollLeft -= 400;
});


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
                ${aniSeason.slice(1, -1)} ${aired}
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
                    localStorageFunc(anime);

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
                });
            }

            inputBox.value = "";
        });
    Event.stopPropagation();
});

//-----------------------------------------------Fetching airing now anime data and displaying it-------------------------------------------------

const airingNowDiv = document.getElementById("airing-now-container");

fetch(`https://api.jikan.moe/v4/top/anime?filter=airing`)
    .then(response => response.json())
    .then(data => {
        console.log(data, "Currently airing anime");
        for (const anime of data.data) {
            const animeCard = document.createElement("div");
            animeCard.classList.add("anime-cards");

            const image = document.createElement("img");
            image.classList.add("image");
            image.src = anime.images.jpg.large_image_url;

            function nullfunc(str) {
                if (str === null) {
                    return "Unavailable";
                }
                else {
                    return str;
                }
            }
            const broadcastString = nullfunc(anime.broadcast.string);

            const details = document.createElement("div");
            details.classList.add("search-anime-details");
            details.innerHTML = `
                <p class="anime-title">${anime.title}</p>
                <table class="details-table">
                <tr>
                <td>Score:</td>
                <td><i class="fa-solid fa-star" style="color: gold"></i>&nbsp${anime.score}</td>
                </tr>
                <tr>
                <td>Broadcast:</td>
                <td>
                <div class="broadcast-div">
                <div class="broadcast-image">
                <i class="fa-solid fa-tower-broadcast" style="color: limegreen"></i>
                </div>&nbsp
                <div class="broadcast-value-div">
                ${broadcastString}
                </div>
                </div>
                </td>
                </tr>
                </table>`;

            animeCard.appendChild(image);
            animeCard.appendChild(details);
            airingNowDiv.appendChild(animeCard);

            animeCard.addEventListener("click", function () {
                localStorageFunc(anime);
                 
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
    })

//-----------------------------------------------Fetching top anime data and displaying it-------------------------------------------------

const topAnimeDiv = document.getElementById("top-anime-container");
const nextButton = document.getElementById("next-top-anime");
const previousButton = document.getElementById("previous-top-anime");

nextButton.addEventListener("click", function () {
    topAnimeDiv.scrollLeft += 400;
});

previousButton.addEventListener("click", function () {
    topAnimeDiv.scrollLeft -= 400;
});

fetch(`https://api.jikan.moe/v4/top/anime`)
    .then(response => response.json())
    .then(data => {
        console.log(data, "Top anime data");
        for (const anime of data.data) {
            const animeCard = document.createElement("div");
            animeCard.classList.add("anime-cards");

            const image = document.createElement("img");
            image.classList.add("image");
            image.src = anime.images.jpg.large_image_url;

            const details = document.createElement("div");
            details.classList.add("top-anime-details");
            details.innerHTML = `
                <p class="anime-title">${anime.title}</p>
                <table class="details-table">
                <tr>
                <td style="font-size: 20px; text-align: center"><i class="fa-solid fa-star" style="color: gold"></i>&nbsp${anime.score}</td>
                </tr>
                </table>`

            animeCard.appendChild(image);
            animeCard.appendChild(details);
            topAnimeDiv.appendChild(animeCard);

            animeCard.addEventListener("click", function () {
                localStorageFunc(anime);

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
    })

//-----------------------------------------------Fetching popular anime data and displaying it-------------------------------------------------


const popAnimeDiv = document.getElementById("popular-anime-container");
const nextPopButton = document.getElementById("next-popular-anime");
const previousPopButton = document.getElementById("previous-popular-anime");

nextPopButton.addEventListener("click", function () {
    popAnimeDiv.scrollLeft += 400;
});

previousPopButton.addEventListener("click", function () {
    popAnimeDiv.scrollLeft -= 400;
});

fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity`)
    .then(response => response.json())
    .then(data => {
        console.log(data, "Popular anime data");
        for (const anime of data.data) {
            const animeCard = document.createElement("div");
            animeCard.classList.add("anime-cards");

            const image = document.createElement("img");
            image.classList.add("image");
            image.src = anime.images.jpg.large_image_url;

            const details = document.createElement("div");
            details.classList.add("pop-anime-details");
            details.innerHTML = `
                    <p class="anime-title">${anime.title}</p>
                    <table class="details-table">
                    <tr>
                    <td style="font-size: 20px; text-align: center"><i class="fa-solid fa-star" style="color: gold"></i>&nbsp${anime.score}</td>
                    </tr>
                    </table>`

            animeCard.appendChild(image);
            animeCard.appendChild(details);
            popAnimeDiv.appendChild(animeCard);

            animeCard.addEventListener("click", function () {
                localStorageFunc(anime);

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
    })

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
