const inputBox = document.getElementById("input-box");
const container = document.getElementById("container");
const searchBtn = document.getElementById("search-button");
const navBar = document.getElementById("navbar");
const nextBtn = document.getElementById("next-airing");
const previousBtn = document.getElementById("previous-airing");

function localStorageFunc(str) {
    localStorage.setItem("image", str.coverImage.extraLarge);
    localStorage.setItem("start year", str.startDate.year);
    localStorage.setItem("start month", str.startDate.month);
    localStorage.setItem("start day", str.startDate.day);
    localStorage.setItem("end year", str.endDate.year);
    localStorage.setItem("end month", str.endDate.month);
    localStorage.setItem("end day", str.endDate.day);
    localStorage.setItem("format", str.format);
    localStorage.setItem("duration", str.duration);
    localStorage.setItem("episodes", str.episodes);
    localStorage.setItem("popularity", str.popularity);
    localStorage.setItem("favourites", str.favourites);
    localStorage.setItem("score", str.averageScore);
    localStorage.setItem("id", str.id);
    localStorage.setItem("banner image", str.bannerImage);

    const sourceMap = {
        "ORIGINAL": "Original",
        "MANGA": "Manga",
        "LIGHT_NOVEL": "Light Novel",
        "VISUAL_NOVEL": "Visual Novel",
        "VIDEO_GAME": "Video Game",
        "OTHER": "Other",
        "NOVEL": "Novel",
        "DOUJINSHI": "Doujinshi",
        "ANIME": "Anime",
        "WEB_NOVEL": "Web Novel",
        "LIVE_ACTION": "Live Action",
        "GAME": "Game",
        "COMIC": "Comic",
        "MULTIMEDIA_PROJECT": "Multimedia Project",
        "PICTURE_BOOK": "Picture Book",
    };

    str.source = sourceMap[str.source] || str.source;
    localStorage.setItem("source", str.source);

    const seasonMap = {
        "WINTER": "Winter",
        "SPRING": "Spring",
        "SUMMER": "Summer",
        "FALL": "Fall",
    };

    str.season = seasonMap[str.season] || str.season;
    localStorage.setItem("season", str.season);

    const statusMap = {
        "FINISHED": "Finished",
        "RELEASING": "Releasing",
        "NOT_YET_RELEASED": "Not Yet Released",
        "CANCELLED": "Cancelled",
        "HIATUS": "Hiatus"
    };

    str.status = statusMap[str.status] || str.status;
    localStorage.setItem("status", str.status);

    localStorage.setItem("description", str.description);
    localStorage.setItem("title", str.title.romaji);
    localStorage.setItem("title native", str.title.native);
    localStorage.setItem("title english", str.title.english);

    const studiosList = [];
    const nodes = str.studios.nodes;

    for (let i = 0; i < nodes.length; i++) {
        studiosList.push(" " + nodes[i].name);
    }

    localStorage.setItem("studios", studiosList);

    const genreList = [];
    const genres = str.genres;

    for (let i = 0; i < genres.length; i++) {
        genreList.push(" " + genres[i]);
    }

    localStorage.setItem("genre", genreList);

    let totalSum = 0;
    for (let i = 0; i < str.stats.scoreDistribution.length; i++) {
        totalSum += str.stats.scoreDistribution[i].amount;
    }

    localStorage.setItem("scored by", totalSum);
    const relationTypeList = [];

    for (let i = 0; i < str.relations.edges.length; i++) {
        const relationMap = {
            "ADAPTATION": "Adaptation",
            "PREQUEL": "Prequel",
            "SEQUEL": "Sequel",
            "SIDE_STORY": "Side Story",
            "PARENT": "Parent",
            "CHARACTER": "Character",
            "SUMMARY": "Summary",
            "ALTERNATIVE": "Alternative",
            "SPIN_OFF": "Spin Off",
            "OTHER": "Other",
            "SOURCE": "Source",
            "COMPILATION": "Compilation",
            "CONTAINS": "Contains",
        };

        str.relations.edges[i].relationType = relationMap[str.relations.edges[i].relationType] || str.relations.edges[i].relationType;
        relationTypeList.push(" " + JSON.stringify(str.relations.edges[i].relationType));
    }

    localStorage.setItem("relation types", relationTypeList);

    const relationTitleList = [];

    for (let i = 0; i < str.relations.edges.length; i++) {
        relationTitleList.push(" " + JSON.stringify(str.relations.edges[i].node.title.romaji));
    }

    localStorage.setItem("relation titles", relationTitleList);

    const relationIdList = [];

    for (let i = 0; i < str.relations.edges.length; i++) {
        relationIdList.push(" " + str.relations.edges[i].id);
    }

    localStorage.setItem("relation ids", relationIdList);
}

function nullFuncSearch(str) {
    if (str === null) {
        return "N/A";
    }
    else {
        return str;
    }
}


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

    var query = `
query ($title: String) {
    Page {
        media (search: $title, type: ANIME, isAdult: false) {
            id
            title {
              romaji
              english
              native
            }
            description
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      episodes
      relations {
        edges {
            id
            relationType
                node {
                    title {
                        romaji
                        english
                        native
                    }
                }         
            }
        }
      duration
      format
      status
      studios {
        nodes {
            id
            name
        }
      }
      genres
      source
      stats {
        scoreDistribution {
          amount
        }
      }
      averageScore
      popularity
      favourites
      coverImage {
        large
        extraLarge
      }
      bannerImage

          }
        }
    }`;

    var variables = {
        title: inputBox.value,
    };

    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    fetch(url, options).then(handleResponse)
        .then(handleData)
        .catch(handleError);

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        console.log(data, "Search anime");
        for (const anime of data.data.Page.media) {
            const animeCard = document.createElement("div");
            animeCard.classList.add("search-anime-cards");

            const image = document.createElement("img");
            image.classList.add("search-anime-image");
            image.src = anime.coverImage.extraLarge;

            const format = nullFuncSearch(anime.format);
            const episodes = nullFuncSearch(anime.episodes);
            const season = nullFuncSearch(anime.season);
            const endDate = nullFuncSearch(anime.endDate.year);
            const averageScore = nullFuncSearch(anime.averageScore);

            const details = document.createElement("div");
            details.classList.add("search-anime-details");
            details.innerHTML = `
                    <h1 class="search-anime-title">${anime.title.romaji}</h1>
                    <table style="margin-left: 7px; height: 100px">
                    <tr>
                    <td><i class="fa-solid fa-tv"></i>&nbsp;&nbsp;${format} (${episodes} Episodes)</td>
                    </tr>
                    <tr>
                    <td>
                    <div class="search-anime-details-main-div">
                    <i class="fa-regular fa-calendar"></i>&nbsp;&nbsp;
                    <div class="search-anime-details-div">
                    ${season} ${endDate}
                    </div>
                    </div>
                    </td>
                    </tr>
                    <tr>
                    <td><i class="fa-solid fa-star" style="color: gold"></i>&nbsp;&nbsp;${averageScore}%</td>
                    </tr>
                    </table>`

            animeCard.appendChild(image);
            animeCard.appendChild(details);
            container.appendChild(animeCard);

            animeCard.addEventListener("click", function () {
                localStorageFunc(anime);
                window.location.href = "anime_about.html";
            });
        }
    }

    function handleError(error) {
        alert('Error, check console');
        console.error(error);
    }
});

//----------------------------------------------------------------------------------------------------------------------------------------

const bannerImageDiv = document.getElementById("banner-image-div");
const bannerImage = document.createElement("img");
bannerImage.classList.add("banner-image");
bannerImage.src = localStorage.getItem("banner image");

if (bannerImage.src === "http://127.0.0.1:5500/null") {
    bannerImageDiv.style.display = "none";
}
else {
    bannerImageDiv.appendChild(bannerImage);
}

const animeImage = document.getElementById("anime-image");
animeImage.src = localStorage.getItem("image");

const animeTitle = document.getElementById("anime-title");
const titleKey = localStorage.getItem("title");
animeTitle.innerText = `${titleKey}`;

const animeTitleJap = document.getElementById("anime-title-jap");
const titleJapKey = localStorage.getItem("title native");
animeTitleJap.innerText = `${titleJapKey}`;

const animeTitleEng = document.getElementById("anime-title-eng");
const titleEngKey = localStorage.getItem("title english");
animeTitleEng.innerText = `${nullfunc(titleEngKey)}`;

const synopsisDiv = document.getElementById("synopsis-div");
const synopsis = nullfunc(localStorage.getItem("description"));
synopsisDiv.innerHTML = `<h1 id="synopsis-header">Synopsis</h1>
                         <p>${synopsis}</p>`;

const genreDiv = document.getElementById("genre-div");
const genreList = localStorage.getItem("genre");

genreDiv.innerText = `${genreList}`;

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

const type = nullfunc(localStorage.getItem("format"));
const episodes = nullfunc(localStorage.getItem("episodes"));
const duration = nullfunc(localStorage.getItem("duration"));

let startYear = localStorage.getItem("start year");
let startMonth = localStorage.getItem("start month");
let startDay = localStorage.getItem("start day");
let endYear = localStorage.getItem("end year");
let endMonth = localStorage.getItem("end month");
let endDay = localStorage.getItem("end day");

if (endDay === "null") {
    endDay = "?";
}
if (endMonth === "null") {
    endMonth = "?";
}
if (endYear === "null") {
    endYear = "?";
}
if (startDay === "null") {
    startDay = "?";
}
if (startMonth === "null") {
    startMonth = "?";
}
if (startYear === "null") {
    startYear = "?";
}

const statusKey = nullfunc(localStorage.getItem("status"));
const source = nullfunc(localStorage.getItem("source"));
const studios = nullfunc(localStorage.getItem("studios"));

const aniSeason = capitalizeFirstLetter(localStorage.getItem("season"));

const animeDetailsDiv = document.getElementById("anime-details-div");
animeDetailsDiv.innerHTML =
    `<table id="anime-info-table">
        <tr>
            <td>Type:</td>
            <td>${type}</td>
        </tr>
        <tr>
            <td>Episodes:</td>
            <td>${episodes}</td>
        </tr>
        <tr>
            <td>Duration:</td>
            <td>${duration} min</td>
        </tr>
        <tr>
            <td>Broadcast:</td>
            <td>${startDay}/${startMonth}/${startYear} to ${endDay}/${endMonth}/${endYear}</td>
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
            <td>Season:</td>
            <td>${aniSeason}</td>
        </tr>
    </table>`;

const score = nullfunc(localStorage.getItem("score"));
const scoredBy = nullfunc(localStorage.getItem("scored by"));
const favourites = nullfunc(localStorage.getItem("favourites"));
const popularity = nullfunc(localStorage.getItem("popularity"));


const animeStatsDiv = document.getElementById("anime-stats-div");
animeStatsDiv.innerHTML =
    `<table id="anime-stats-table">
        <tr>
            <td>Score:</td>
            <td>${score}% (${scoredBy})</td>
        </tr>
        <tr>
            <td>Favourites:</td>
            <td>#${favourites}</td>
        </tr>
        <tr>
            <td>Popularity:</td>
            <td>#${popularity}</td>
        </tr>
    </table>`;

const relationsDiv = document.getElementById("relations-div");
const relationTitles = localStorage.getItem("relation titles").split(",");
const relationTypes = localStorage.getItem("relation types").split(",");
const titleIds = localStorage.getItem("relation ids").split(",");

const dataLength = Math.min(relationTypes.length, relationTitles.length, titleIds.length);
for (let i = 0; i < dataLength; i++) {
    relationsDiv.innerHTML += `
    <table id="relations-table">
      <tr>
        <td>${JSON.parse(relationTypes[i])}:</td>
        <td id="relation-title-${i}">${relationTitles[i].slice(2,-1)}</td>
      </tr>
    </table>`;
}

const titleElements = document.querySelectorAll('#relations-table td:nth-child(2)');

for (let i = 0; i < titleElements.length; i++) {
    titleElements[i].style.color = "skyblue";
    titleElements[i].classList.add("title-elements");

    titleElements[i].addEventListener('click', function (event) {
        console.log(event.target.id);
        const animeTitle = titleElements[i].textContent;
        console.log(titleIds[parseInt(event.target.id.slice(-1))]);

        function fetchAnimeData(title) {
            var query = `
            query ($title: String) {
                Media(search: $title, type: ANIME) {
                    id
            title {
              romaji
              english
              native
            }
            description
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      episodes
      relations {
        edges {
            id
            relationType
                node {
                    title {
                        romaji
                        english
                        native
                    }
                }         
            }
        }
      duration
      format
      status
      studios {
        nodes {
            id
            name
        }
      }
      genres
      source
      stats {
        scoreDistribution {
          amount
        }
      }
      averageScore
      popularity
      favourites
      coverImage {
        large
        extraLarge
      }
      bannerImage
                }
            }`;

            var variables = {
                title: title
            };

            var url = 'https://graphql.anilist.co',
                options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        query: query,
                        variables: variables
                    })
                };

            fetch(url, options).then(handleResponse)
                .then(handleData)
                .catch(handleError);

            function handleResponse(response) {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            }

            function handleData(data) {
                console.log(data);
                localStorageFunc(data.data.Media);                
                window.location.href = "anime_about.html";
            }

            function handleError(error) {
                alert('Error, check console');
                console.error(error);
            }
        }
        fetchAnimeData(animeTitle);
    });
}

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});