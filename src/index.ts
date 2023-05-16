

import { Character, Episodes, Episode, FullLocation } from "./types"
//import { Character } from "./classes"

window.addEventListener("load", setSidebar);

//IN CHARGE OF PRINTIN THE FIRST MENU AND SIDEBAR MENU
async function setSidebar() {
    const scrollBox = document.querySelector("#scroll-box")
    const sideMenu = document.querySelector("#side-menu") as HTMLElement | null;
    const episodeList = document.createElement("ul");
    const sideFooter = document.querySelector("#sidebar-footer") as HTMLElement | null;
    //const footerBtn = document.createElement("button");
    episodeList.classList.add("sidebar-list")
    episodeList.id = "sidebar-list"
    //footerBtn.classList.add("sidebar-footer-btn")
    //footerBtn.innerText = "Load more episodes";
    //sideFooter?.appendChild(footerBtn);
    scrollBox?.addEventListener("scroll", infiniteScroll)


    const response = await fetch("https://rickandmortyapi.com/api/episode")
    const data: Episodes = await response.json()

    const episodes = data.results

    episodes.forEach(async episode => {
        const li = document.createElement("li")
        li.classList.add("sidebar-list-element")
        li.innerText = `${episode.id} - ${episode.name}`
        li.setAttribute("episode", `${episode.id}`)
        li.addEventListener("click", showEpisode);
        episodeList.appendChild(li)
        sideMenu?.appendChild(episodeList)
    });
}


//IN CHARGE OF SHOWING EPISODE ALWAYS REQUIRED ALONG THE PROGRAM BY READING "EPISODE" CUSTOM ATTRIBUTE
async function showEpisode(this: HTMLElement) {

    cleanMain()

    const episodeNumber = this.getAttribute("episode")
    const mainContent = document.querySelector("#main-content")


    const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeNumber}`)
    const episodeData: Episode = await response.json()

    const episodeTitle = document.createElement("h2")
    const episodeInfo = document.createElement("p")
    const charactersURL = episodeData.characters
    episodeTitle.innerText = `${episodeNumber} - ${episodeData.name}`
    episodeInfo.innerText = `${episodeData.air_date} | ${episodeData.episode}`
    mainContent?.appendChild(episodeTitle)
    mainContent?.appendChild(episodeInfo)

    printCharacters(charactersURL)
}



//IN CHARGE OF SHOWING SINGLE CHARACTER AND DISPLAY ALL ITS INFORMATION 
async function showCharacter(this: HTMLElement) {
    cleanMain()

    const selectedCharacterId = this.getAttribute("characterId")

    const response = await fetch(`https://rickandmortyapi.com/api/character/${selectedCharacterId}`)
    const characterData: Character = await response.json()

    const origin = characterData.origin.name
    const originUrl = characterData.origin.url
    const episodeList = characterData.episode
    const mainContent = document.querySelector("#main-content")
    const characterHeader = document.createElement("div")
    const characterBody = document.createElement("div")
    const img = document.createElement("img")
    const characterInfo = document.createElement("div")
    const characterTitle = document.createElement("h2")
    const characterDetails = document.createElement("p")
    const clickableSpan = document.createElement("span")

    characterHeader.classList.add("row", "g-3", "character-header")
    mainContent?.appendChild(characterHeader);

    img.classList.add("character-main-img", "col-12", "col-sm-12", "col-md-4", "col-lg-3", "col-xl-2")
    img.src = characterData.image;
    characterHeader.appendChild(img)

    characterInfo.classList.add("col-12", "col-sm-12", "col-md-7", "col-lg-8", "col-xl-9")
    characterTitle.innerText = characterData.name
    characterDetails.innerText = `${characterData.species} | ${characterData.status} | ${characterData.gender} | `
    clickableSpan.innerText = `${origin}`
    clickableSpan.setAttribute("originUrl", `${originUrl}`)
    characterHeader.appendChild(characterInfo)
    characterInfo.appendChild(characterTitle)
    characterInfo.appendChild(characterDetails)
    characterDetails.appendChild(clickableSpan)
    clickableSpan.addEventListener("click", showOrigin)

    characterBody.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-2", "row-cols-xl-4", "g-3", "character-body")
    mainContent?.appendChild(characterBody);

    episodeList.forEach(async endpoint => {

        const response = await fetch(endpoint)
        const episodeData: Episode = await response.json()

        const episodeContainer = document.createElement("div")
        const title = document.createElement("h5");
        const code = document.createElement("p");

        episodeContainer.classList.add("col")
        episodeContainer.setAttribute("role", "button");
        episodeContainer.setAttribute("episode", `${episodeData.id}`)
        episodeContainer.addEventListener("click", showEpisode);

        title.innerText = episodeData.name;
        episodeContainer.appendChild(title);
        code.innerText = episodeData.episode;
        episodeContainer.appendChild(code);

        characterBody.appendChild(episodeContainer);
    });
}


async function showOrigin(this: HTMLElement) {

    const originUrl = this.getAttribute("originUrl");
    if (originUrl === "") return;

    const mainContent = document.querySelector("#main-content")

    cleanMain();

    const response = await fetch(`${originUrl}`);
    const originData: FullLocation = await response.json();

    const originName = originData.name
    const type = originData.type
    const dimension = originData.dimension
    const residents = originData.residents
    const title = document.createElement("h2")
    const originInfo = document.createElement("p")

    title.innerText = `${originName}`
    originInfo.innerText = `${type} | ${dimension}`

    mainContent?.appendChild(title)
    mainContent?.appendChild(originInfo)

    printCharacters(residents);
}


async function printCharacters(charactersUrl: string[]) {
    const mainContent = document.querySelector("#main-content")
    const cardsContainer = document.createElement("div")
    cardsContainer.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-3", "row-cols-xl-4", "g-3", "cards-container")
    mainContent?.appendChild(cardsContainer)

    charactersUrl.forEach(async (endpoint: string) => {

        const response = await fetch(endpoint)
        const characterData: Character = await response.json()
        const characterId = characterData.id
        const cardWrapper = document.createElement("div");
        const card = document.createElement("div");
        const img = document.createElement("img");
        const cardBody = document.createElement("div");
        const cardTitle = document.createElement("h5");
        const cardDetails = document.createElement("p");

        cardsContainer.appendChild(cardWrapper);

        cardWrapper.classList.add("card-wrapper", "col", "text-dark");
        cardWrapper.appendChild(card);

        card.classList.add("card", "px-0", "h-100");
        card.setAttribute("characterId", `${characterId}`)
        card.setAttribute("role", "button");
        card.addEventListener("click", showCharacter);

        img.classList.add("card-img-top");
        img.src = characterData.image;
        card.appendChild(img);

        cardBody.classList.add("card-body");
        card.appendChild(cardBody);

        cardTitle.classList.add("card-title");
        cardTitle.innerText = characterData.name;
        cardBody.appendChild(cardTitle);

        cardDetails.classList.add("card-text")
        cardDetails.innerText = `${characterData.species} | ${characterData.status}`
        cardBody.appendChild(cardDetails);
    });
}


//MINOR FUNCTIONS

function cleanMain() {
    const mainContent = document.querySelector("#main-content");
    mainContent?.replaceChildren();
}


function infiniteScroll(event: Event) {

    event.preventDefault()
    const scrollBox = document.querySelector("#scroll-box") as HTMLElement | null;
    if (scrollBox === null) return;

    const scrollTop = scrollBox.scrollTop;
    const scrollHeight = scrollBox.scrollHeight;
    const clientHeight = scrollBox.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 /*&& nextPage !== -1*/) {
        refreshSidebar();

    };
}


async function refreshSidebar() {
    console.log("entering function")
    const scrollBox = document.querySelector("#scroll-box") as HTMLElement | null;
    const sideList = document.querySelector("#sidebar-list")

    let url = ""
    if (sideList?.childElementCount === 20) {
        url = "https://rickandmortyapi.com/api/episode?page=2"
    } else if (sideList?.childElementCount === 40) {
        url = "https://rickandmortyapi.com/api/episode?page=3"
    } else {
        scrollBox?.removeEventListener("scroll", infiniteScroll)
        return;
    }
    const response = await fetch(url)
    const data: Episodes = await response.json()

    console.log("if passed")
    const episodes = data.results

    episodes.forEach(episode => {
        const li = document.createElement("li")
        li.classList.add("sidebar-list-element")
        li.innerText = `${episode.id} - ${episode.name}`
        li.setAttribute("episode", `${episode.id}`)
        li.addEventListener("click", showEpisode);
        sideList?.appendChild(li)
    });
}