
import { getEpisodes, getSingleEpisode, getCharacter, getLocation } from "./APIrequests.js";
import { createHeader, createSidebar, createMainContainer } from "./DOMmanipulation.js";

window.addEventListener("load", setMain);

//IN CHARGE OF CREATE AND SHOW FIRST SIDEBAR AND COLLAPSABLE HEADER MENU AND PROPPERLY FULFILL;
async function setMain(): Promise<void> {

    createHeader();
    createSidebar();
    createMainContainer();

    const scrollBox = document.querySelector("#scroll-box")
    const scrollBoxNav = document.querySelector("#scroll-box-nav")
    const episodeList = document.querySelector("#sidebar-list")
    const episodeListNav = document.querySelector("#sidebar-list-nav")
    //const sideFooter = document.querySelector("#sidebar-footer") as HTMLElement | null;

    scrollBox?.addEventListener("scroll", infiniteScroll)
    scrollBoxNav?.addEventListener("scroll", infiniteScroll)

    const data = await getEpisodes()
    const episodes = data.results

    episodes.forEach(episode => {

        if (episodeList === null || episodeListNav === null) return
        const li = document.createElement("li")
        const liNav = document.createElement("li")
        li.classList.add("sidebar-list-element")
        liNav.classList.add("sidebar-list-element")
        li.innerText = `${episode.id} - ${episode.name}`
        liNav.innerText = `${episode.id} - ${episode.name}`
        li.setAttribute("episode", `${episode.id}`)
        liNav.setAttribute("episode", `${episode.id}`)
        li.addEventListener("click", showEpisode);
        liNav.addEventListener("click", showEpisode);
        episodeList.appendChild(li)
        episodeListNav.appendChild(liNav)

    });
    sessionStorage.setItem("fetching", false.toString())
    if (data.info.next !== null) sessionStorage.setItem("nextMenuPage", data.info.next)

}


//IN CHARGE OF SHOWING EPISODE ALWAYS REQUIRED ALONG THE PROGRAM BY READING "EPISODE" CUSTOM ATTRIBUTE
async function showEpisode(this: HTMLElement) {

    cleanMain()

    const episodeNumber = this.getAttribute("episode")
    const mainContent = document.querySelector("#main-content")

    if (episodeNumber === null) return;
    const episodeData = await getSingleEpisode(undefined, episodeNumber)

    const episodeTitle = document.createElement("h2")
    const episodeInfo = document.createElement("p")
    const episodeCharacters = episodeData.characters
    episodeTitle.innerText = `${episodeNumber} - ${episodeData.name}`
    episodeInfo.innerText = `${episodeData.air_date} | ${episodeData.episode}`
    mainContent?.appendChild(episodeTitle)
    mainContent?.appendChild(episodeInfo)

    printCharacters(episodeCharacters)
}



//IN CHARGE OF SHOWING SINGLE CHARACTER AND DISPLAY ALL ITS INFORMATION 
async function showCharacter(this: HTMLElement) {
    cleanMain()

    const selectedCharacterId = this.getAttribute("characterId")
    if (selectedCharacterId === null) return;

    const characterData = await getCharacter(undefined, selectedCharacterId)

    const origin = characterData.origin.name
    const originUrl = characterData.origin.url
    const characterEpisodes = characterData.episode

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
    characterHeader.appendChild(characterInfo)

    characterTitle.innerText = characterData.name
    characterInfo.appendChild(characterTitle)

    characterDetails.innerText = `${characterData.species} | ${characterData.status} | ${characterData.gender} | `
    characterInfo.appendChild(characterDetails)

    clickableSpan.innerText = `${origin}`
    clickableSpan.setAttribute("originUrl", `${originUrl}`)
    clickableSpan.addEventListener("click", showOrigin)
    characterDetails.appendChild(clickableSpan)

    characterBody.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-2", "row-cols-xl-4", "g-3", "character-body")
    characterBody.id = "character-body";
    mainContent?.appendChild(characterBody);

    printEpisodes(characterEpisodes);

}


async function showOrigin(this: HTMLElement) {

    const originUrl = this.getAttribute("originUrl");
    if (originUrl === "") return;
    if (originUrl === null) return;

    const mainContent = document.querySelector("#main-content")

    cleanMain();

    const originData = await getLocation(originUrl)

    const residents = originData.residents

    const title = document.createElement("h2")
    const originInfo = document.createElement("p")

    title.innerText = originData.name
    originInfo.innerText = `${originData.type} | ${originData.dimension}`

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

        const characterData = await getCharacter(endpoint, undefined)
        const cardWrapper = document.createElement("div");
        const card = document.createElement("div");
        const img = document.createElement("img");
        const cardBody = document.createElement("div");
        const cardTitle = document.createElement("h5");
        const cardDetails = document.createElement("p");

        cardWrapper.classList.add("card-wrapper", "col", "text-dark");
        cardsContainer.appendChild(cardWrapper);

        card.classList.add("card", "px-0", "h-100");
        card.setAttribute("characterId", `${characterData.id}`)
        card.setAttribute("role", "button");
        card.addEventListener("click", showCharacter);
        cardWrapper.appendChild(card);

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


async function printEpisodes(episodesUrl: string[]) {

    episodesUrl.forEach(async endpoint => {

        const episodeData = await getSingleEpisode(endpoint, undefined)

        const characterBody = document.querySelector("#character-body")
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

        characterBody?.appendChild(episodeContainer);
    });
}


//MINOR FUNCTIONS

function cleanMain() {
    const mainContent = document.querySelector("#main-content");
    mainContent?.replaceChildren();
}


function infiniteScroll() {

    let booleanVar = sessionStorage.getItem("fetching")
    if (booleanVar === "true") return;

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
    sessionStorage.setItem("fetching", true.toString())
    const nextPage = sessionStorage.getItem("nextMenuPage");
    const scrollBox = document.querySelector("#scroll-box") as HTMLElement | null;
    const sideList = document.querySelector("#sidebar-list")

    if (nextPage !== null) {
        const data = await getEpisodes(nextPage, undefined)
        const episodes = data.results

        episodes.forEach(episode => {
            const li = document.createElement("li")
            li.classList.add("sidebar-list-element")
            li.innerText = `${episode.id} - ${episode.name}`
            li.setAttribute("episode", `${episode.id}`)
            li.addEventListener("click", showEpisode);
            sideList?.appendChild(li)
        });

        if (data.info.next !== null) sessionStorage.setItem("nextMenuPage", data.info.next)
        else {
            scrollBox?.removeEventListener("scroll", infiniteScroll)
            sessionStorage.clear();
            return;
        }
    }
    sessionStorage.setItem("fetching", false.toString())
}