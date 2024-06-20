const routes = {
    '/': homePageDiv,
    '/anime_about': animeAboutDiv,
};


function router() {
    const path = window.location.hash.slice(1) || '/';
    const route = routes[path];

    if (route) {
        if (history.state && history.state.localStorageState) {
            for (const key in history.state.localStorageState) {
                localStorage.setItem(key, history.state.localStorageState[key]);
            }
        }
        route();
    }
    else {
        document.getElementById('anime-div').innerHTML = '404 Page Not Found';
    }
}
window.addEventListener('popstate', router);
window.addEventListener('load', router);


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

    const format = {
        "TV_SHORT": "TV Short",
        "MOVIE": "Movie",
        "SPECIAL": "Special",
        "MUSIC": "Music",
        "MANGA": "Manga",
        "NOVEL": "Novel",
        "ONE_SHOT": "One-shot"
    }

    str.format = format[str.format] || str.format;
    localStorage.setItem("format", str.format);

    const localStorageState = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        localStorageState[key] = localStorage.getItem(key);
    }

    history.pushState({ localStorageState }, null, '#/anime_about');
    router();
}

function nullfunc(str) {
    if (str === null) {
        return "N/A";
    }
    else {
        return str;
    }
}

function animeContainer(str) {
    const animeCard = document.createElement("div");
    animeCard.classList.add("search-anime-cards");

    const image = document.createElement("img");
    image.classList.add("search-anime-image");
    image.src = str.coverImage.extraLarge;

    const format = nullfunc(str.format);

    const formatMap = {
        "TV_SHORT": "TV Short",
        "MOVIE": "Movie",
        "SPECIAL": "Special",
        "MUSIC": "Music",
        "MANGA": "Manga",
        "NOVEL": "Novel",
        "ONE_SHOT": "One-shot"
    }

    const updatedFormatString = formatMap[format] || format;

    const episodes = nullfunc(str.episodes);
    const season = nullfunc(str.season);

    const seasonMap = {
        "WINTER": "Winter",
        "SPRING": "Spring",
        "SUMMER": "Summer",
        "FALL": "Fall",
    };

    const updatedSeasonString = seasonMap[season] || season;

    const endDate = nullfunc(str.endDate.year);
    const averageScore = nullfunc(str.averageScore);

    const details = document.createElement("div");
    details.classList.add("search-anime-details");
    details.innerHTML = `
    <h1 class="search-anime-title">${str.title.romaji}</h1>
    <table style="margin-left: 7px; height: 100px" class="search-anime-details-table">
    <tr>
    <td><i class="fa-solid fa-tv"></i>&nbsp;&nbsp;${updatedFormatString} (${episodes} Episodes)</td>
    </tr>
    <tr>
    <td>
    <div class="search-anime-details-main-div">
    <i class="fa-regular fa-calendar"></i>&nbsp;&nbsp;
    <div class="search-anime-details-div">
    ${updatedSeasonString} ${endDate}
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
        localStorageFunc(str);
        animeAboutDiv();
    });
}

function nullFuncSearch(str) {
    if (str === null) {
        return "N/A";
    }
    else {
        return str;
    }
}

const animeAboutDetailsDiv = document.getElementById("anime-full-details-div");
const animeHomePageDiv = document.getElementById("anime-div");


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
        // console.log(data, "Search anime");
        for (const anime of data.data.Page.media) {
            if (data.data.Page.media.length === 1) {
                container.style.height = "241px";
                animeContainer(anime);
            }
            else {
                container.style.height = "486px";
                animeContainer(anime);
            }
        }
    }

    function handleError(error) {
        alert('Error, check console');
        console.error(error);
    }
});

//-----------------------------------------------Fetching airing now anime data and displaying it-------------------------------------------------

const airingNowDiv = document.getElementById("airing-now-container");

function homePageDiv() {
    animeHomePageDiv.style.display = "block";
    animeAboutDetailsDiv.style.display = "none";

    function fetchAiringNowData() {
        var query = `
    query ($page: Int, $perPage: Int, $season: MediaSeason) {
        Page (page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(season: $season, type: ANIME, status: RELEASING, sort: POPULARITY_DESC, isAdult: false) {
            id
            title {
              romaji
              english
              native
            }
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
            coverImage {
              large
              extraLarge
            }
            bannerImage
            episodes
            format
            duration
            stats {
                scoreDistribution {
                    amount
                }
            }
            popularity
            genres
            favourites
            source
            studios {
                nodes {
                    id
                    name
                }
            }
            status
            description
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
            season
            averageScore
            nextAiringEpisode {
              airingAt
              timeUntilAiring
              episode
            }
          }
        }
      }`;

        function getSeason() {
            const month = new Date().getMonth();

            if (month >= 3 && month <= 5) {
                return "SPRING";
            }
            else if (month >= 6 && month <= 8) {
                return "SUMMER";
            }
            else if (month >= 9 && month <= 11) {
                return "FALL";
            }
            else {
                return "WINTER";
            }
        }

        var variables = {
            page: 1,
            perPage: 10,
            season: getSeason(),
            seasonYear: 2024
        }

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
            .then(handleAiringNowData)
            .catch(handleError);
    }

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleAiringNowData(data) {
        // console.log(data, "Currently airing anime");
        for (const anime of data.data.Page.media) {
            const animeCard = document.createElement("div");
            animeCard.classList.add("airing-now-anime-cards");

            const image = document.createElement("img");
            image.classList.add("airing-now-image");
            image.src = anime.coverImage.extraLarge;

            const averageScore = nullfunc(anime.averageScore);

            const airingDate = new Date(anime.nextAiringEpisode.airingAt * 1000);

            const details = document.createElement("div");
            details.classList.add("airing-now-anime-details");
            details.innerHTML = `
                    <p class="anime-title">${anime.title.romaji}</p>
                    <table class="airing-now-details-table">
                    <tr>
                        <td>Score:</td>
                        <td><i class="fa-solid fa-star" style="color: gold"></i>&nbsp;${averageScore}%</td>
                    </tr>
                    <tr>
                        <td>Broadcast:</td>
                        <td>
                            <div class="broadcast-div">
                            <div class="broadcast-image">
                                <i class="fa-solid fa-tower-broadcast" style="color: limegreen"></i>
                            </div>&nbsp;
                            <div class="broadcast-value-div">
                                ${airingDate}                
                            </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Next Episode:</td>
                        <td><i class="fa-solid fa-tv"></i>&nbsp;${anime.nextAiringEpisode.episode}</td>
                    </td>
                    </table>`;

            animeCard.appendChild(image);
            animeCard.appendChild(details);
            airingNowDiv.appendChild(animeCard);

            animeCard.addEventListener("click", function () {
                localStorageFunc(anime);
            });
        }
    }

    function handleError(error) {
        alert('Error, check console');
        console.error(error);
    }

    fetchAiringNowData();


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

    function fetchPopularAnimeData() {
        var query = `
        query {
            Page {
                media(sort: POPULARITY_DESC, type: ANIME) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    description
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
                    status
                    season
                    studios {
                        nodes {
                            id
                            name
                        }
                    }
                    source
                    favourites
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
                    episodes
                    duration
                    stats {
                        scoreDistribution {
                            amount
                        }
                    }
                    bannerImage
                    genres
                    format
                    averageScore
                    coverImage {
                        large
                        extraLarge
                    }
                    popularity
                }
            }
        }`;

        var url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query
                })
            };

        fetch(url, options).then(handleResponse)
            .then(handlePopularAnimeData)
            .catch(handleError);
    }

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handlePopularAnimeData(data) {
        // console.log(data, "Popular anime data");
        for (const anime of data.data.Page.media) {
            const animeCard = document.createElement("div");
            animeCard.classList.add("anime-cards");

            const image = document.createElement("img");
            image.classList.add("image");
            image.src = anime.coverImage.extraLarge;

            const details = document.createElement("div");
            details.classList.add("pop-anime-details");
            details.innerHTML = `
                            <p class="anime-title">${anime.title.romaji}</p>
                            <table class="details-table">
                            <tr>
                            <td style="font-size: 20px; text-align: center"><i class="fa-solid fa-star" style="color: gold"></i>&nbsp;${anime.averageScore}%</td>
                            </tr>
                            </table>`

            animeCard.appendChild(image);
            animeCard.appendChild(details);
            popAnimeDiv.appendChild(animeCard);

            animeCard.addEventListener("click", function () {
                localStorageFunc(anime);
            });
        }
    }

    function handleError(error) {
        alert('Error, check console');
        console.error(error);
    }

    fetchPopularAnimeData();

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

    function fetchTopAnimeData() {
        var query = `
        query {
            Page {
                media(sort: SCORE_DESC, type: ANIME) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    coverImage {
                        large
                        extraLarge
                    }
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
                    status
                    season
                    studios {
                        nodes {
                            id
                            name
                        }
                    }
                    source
                    favourites
                    popularity
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
                    episodes
                    duration
                    genres
                    stats {
                        scoreDistribution {
                            amount
                        }
                    }
                    format
                    description
                    averageScore
                    bannerImage
                }
            }
        }`;

        var variables = {
            page: 1,
            perPage: 10,
        }

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
            .then(handleTopAnimeData)
            .catch(handleError);
    }

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleTopAnimeData(data) {
        // console.log(data, "Top anime data");
        for (const anime of data.data.Page.media) {
            const animeCard = document.createElement("div");
            animeCard.classList.add("anime-cards");

            const image = document.createElement("img");
            image.classList.add("image");
            image.src = anime.coverImage.extraLarge;

            const details = document.createElement("div");
            details.classList.add("top-anime-details");
            details.innerHTML = `
                    <p class="anime-title">${anime.title.romaji}</p>
                    <table class="details-table">
                    <tr>
                    <td style="font-size: 20px; text-align: center"><i class="fa-solid fa-star" style="color: gold"></i>&nbsp;${anime.averageScore}%</td>
                    </tr>
                    </table>`

            animeCard.appendChild(image);
            animeCard.appendChild(details);
            topAnimeDiv.appendChild(animeCard);

            animeCard.addEventListener("click", function () {
                localStorageFunc(anime);
            });
        }
    }

    function handleError(error) {
        alert('Error, check console');
        console.error(error);
    }

    fetchTopAnimeData();
}

// ---------------------------------------------------------Anime about function------------------------------------------------------


function animeAboutDiv() {
    animeHomePageDiv.style.display = "none";
    animeAboutDetailsDiv.style.display = "inline-block";

    let bannerImage = document.getElementById("banner-image");

    if (localStorage.getItem("banner image") === "null") {
        bannerImage.style.display = "none";
    }
    else {
        bannerImage.style.display = "block";
        bannerImage.src = localStorage.getItem("banner image");
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

    if (localStorage.getItem("relation types") === "") {
        localStorage.removeItem(localStorage.getItem("relation types"));
        localStorage.removeItem(localStorage.getItem("relation titles"));
        localStorage.removeItem(localStorage.getItem("relation ids"));
        relationsDiv.style.display = "none";
    }
    else {
        const dataLength = Math.min(relationTypes.length, relationTitles.length, titleIds.length);
        relationsDiv.innerHTML = "";
        relationsDiv.innerHTML =`<h1 id="relations-header">Related Anime</h1>`
        for (let i = 0; i < dataLength; i++) {
            relationsDiv.innerHTML += `
    <table id="relations-table">
      <tr>
        <td>${JSON.parse(relationTypes[i])}:</td>
        <td id="relation-title-${i}">${relationTitles[i].slice(2, -1)}</td>
      </tr>
    </table>`;
        }
    }

    const titleElements = document.querySelectorAll('#relations-table td:nth-child(2)');

    for (let i = 0; i < titleElements.length; i++) {
        titleElements[i].style.color = "skyblue";
        titleElements[i].classList.add("title-elements");

        titleElements[i].addEventListener('click', function (event) {
            // console.log(event.target.id);
            const animeTitle = titleElements[i].textContent;
            // console.log(titleIds[parseInt(event.target.id.slice(-1))]);

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
                    // console.log(data);
                    localStorageFunc(data.data.Media);
                }

                function handleError(error) {
                    alert('Error, check console');
                    console.error(error);
                }
            }
            fetchAnimeData(animeTitle);
        });
    }
}


document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
