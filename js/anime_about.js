const inputBox = document.getElementById("input-box");
const container = document.getElementById("container");
const searchBtn = document.getElementById("search-button");
const navBar = document.getElementById("navbar");


//----------------------------------------------Adding event listener to navbar----------------------------------------------------------

navBar.addEventListener("scroll", function(){
    if (scrollY > 100){
        navBar.style.backgroundColor = "black";
    }
    else{
        navBar.style.backgroundColor = "none";
    }
})


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

    fetch(`https://api.jikan.moe/v4/anime?q=${inputBox.value}&sfw`)
        .then(response => response.json())
        .then(data => {
            console.log(data, "Search anime");
            for (const anime of data.data) {
                const animeCard = document.createElement("div");
                animeCard.classList.add("search-anime-cards");

                const image = document.createElement("img");
                image.classList.add("search-anime-image");
                image.src = anime.images.jpg.large_image_url;

                const details = document.createElement("div");
                details.classList.add("search-anime-details");
                details.innerHTML = `
                <h1 class="search-anime-title">${anime.title}</h1>
                <table>
                <tr>
                <td></td>
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

//--------------------------------------------------------------------------------------------------------------------------------------------

const AnimeBanner = document.getElementById("banner");

AnimeBanner.


//--------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
