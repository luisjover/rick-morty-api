window.addEventListener("load", setMain);

function setMain() {
    const sideMenu = document.querySelector("#side-menu");
    const episodeList = document.createElement("ul");
    episodeList.classList.add("sidebar-list")
    const sideFooter = document.querySelector("#sidebar-footer");
    const footerBtn = document.createElement("button");
    footerBtn.innerText = "Load more episodes";
    sideFooter?.appendChild(footerBtn);
    let counter = 1;


    for (let i = 0; i < 20; i++) {

        const episode = document.createElement("li")
        episode.classList.add("sidebar-list-element")
        episode.innerText = `Episode ${counter}`
        episode.setAttribute("episode", `${counter}`)
        episode.addEventListener("click", showEpisode);
        episodeList.appendChild(episode)
        sideMenu?.appendChild(episodeList)
        counter++


    };
}

async function showEpisode(event: any) {
    const episodeSelected = event.target
    const episodeNumber = episodeSelected.getAttribute("episode")

    const mainContent = document.querySelector("#main-card")

    const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeNumber}`)
    const episodeData = await response.json()

    const episodeTitle = document.createElement("h2")
    episodeTitle.innerText = `Episode ${episodeNumber}`
    const episodeInfo = document.createElement("p")
    episodeInfo.innerText = `${episodeData.air_date} | ${episodeData.episode}`
    mainContent?.replaceChildren()
    mainContent?.appendChild(episodeTitle)
    mainContent?.appendChild(episodeInfo)

    const cardsContainer = document.createElement("div")
    cardsContainer.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-3", "row-cols-xl-4", "g-3")
    mainContent?.appendChild(cardsContainer)
    const episodeCharactersURL = episodeData.characters
    episodeCharactersURL.forEach(async (endpoint: string) => {

        console.log("dentro de foreach")

        const response = await fetch(endpoint)
        const characterData = await response.json()

        const cardWrapper = document.createElement("div");
        cardWrapper.classList.add("card-wrapper", "col");
        cardsContainer.appendChild(cardWrapper);

        const card = document.createElement("div");
        card.classList.add("card", "px-0", "h-100");
        //card.style = "width: 18rem;";

        //INTERESTING
        card.setAttribute("role", "button");
        cardWrapper.appendChild(card);

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = characterData.image;
        card.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.appendChild(cardBody);

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = characterData.name;
        cardBody.appendChild(cardTitle);

        const cardDetails = document.createElement("p");
        cardDetails.classList.add("card-text")
        cardDetails.innerText = `${characterData.species} | ${characterData.status}`
        cardBody.appendChild(cardDetails);
    });


}

