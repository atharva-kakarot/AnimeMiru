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

                const animeSeason = JSON.stringify(anime.season);
                function capitalizeFirstLetter(str) {
                    if (str === "null") {
                        return null;
                    }

                    return str.replace(/\w/, function (char) {
                        return char.toUpperCase();
                    });
                }

                const aniSeason = JSON.parse(capitalizeFirstLetter(animeSeason));

                const details = document.createElement("div");
                details.classList.add("search-anime-details");
                details.innerHTML = `
                <h1 class="search-anime-title">${anime.title}</h1>
                <table style="margin-left: 7px; height: 100px">
                <tr>
                <td><i class="fa-solid fa-tv"></i>&nbsp;&nbsp;${anime.type} (${anime.episodes} Episodes)</td>
                </tr>
                <tr>
                <td>
                <div class="search-anime-details-main-div">
                <i class="fa-regular fa-calendar"></i>&nbsp;&nbsp;
                <div class="search-anime-details-div">
                ${aniSeason} ${anime.aired.string}
                </div>
                </div>
                </td>
                </tr>
                <tr>
                <td><i class="fa-solid fa-star" style="color: gold"></i>&nbsp;&nbsp;${anime.score}</td>
                </tr>
                </table>`

                animeCard.appendChild(image);
                animeCard.appendChild(details);
                container.appendChild(animeCard);

                animeCard.addEventListener("click", function () {
                    window.location.href = "anime_about.html";
                })
            }

            inputBox.value = "";
        });
    Event.stopPropagation();
});

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});