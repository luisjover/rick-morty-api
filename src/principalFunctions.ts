
import { getEpisodes, getSingleEpisode, getCharacter, getLocation } from "./APIrequests.js";
import { cleanMain } from "./supportFunctions.js";
import { Episode } from "./types";


//IN CHARGE OF SHOWING EPISODE ALWAYS REQUIRED ALONG THE PROGRAM BY READING "EPISODE" CUSTOM ATTRIBUTE
export async function showEpisode(this: HTMLElement) {

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


export async function showSeason(this: HTMLElement) {

    cleanMain();

    const season = this.getAttribute("season");
    const mainContent = document.querySelector("#main-content")
    const seasonTitle = document.createElement("h2")
    const seasonInfo = document.createElement("p")
    const seasonEpisodes = document.createElement("div");

    seasonTitle.innerText = `SEASON - ${season}`
    mainContent?.appendChild(seasonTitle)
    seasonInfo.innerText = `S${season} | Rick & Morty`
    mainContent?.appendChild(seasonInfo)

    seasonEpisodes.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-2", "row-cols-xl-4", "g-3", "character-body")
    seasonEpisodes.id = "season-episodes";
    mainContent?.appendChild(seasonEpisodes);

    const data = await getEpisodes(undefined, `?episode=S${season}`)
    const episodes = data.results

    printSeasonEpisodes(episodes)
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

    img.classList.add("character-main-img", "col-12", "col-sm-12", "col-md-4", "col-lg-4", "col-xl-4")
    img.src = characterData.image;
    characterHeader.appendChild(img)

    characterInfo.classList.add("col-12", "col-sm-12", "col-md-7", "col-lg-7", "col-xl-7")
    characterHeader.appendChild(characterInfo)

    characterTitle.innerText = characterData.name
    characterInfo.appendChild(characterTitle)

    characterDetails.innerText = `${characterData.species} | ${characterData.status} | ${characterData.gender} | `
    characterInfo.appendChild(characterDetails)

    clickableSpan.innerText = origin;
    clickableSpan.classList.add("clickable-span");
    clickableSpan.setAttribute("originUrl", originUrl);
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


//PRINT FUNCTIONS

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

        title.innerText = `${episodeData.id}. ${episodeData.name}`;
        title.classList.add("clickable-episode-title");
        title.setAttribute("episode", `${episodeData.id}`);
        title.addEventListener("click", showEpisode);
        title.setAttribute("role", "button");
        episodeContainer.appendChild(title);

        code.innerText = episodeData.episode;
        episodeContainer.appendChild(code);

        characterBody?.appendChild(episodeContainer);
    });
}


async function printSeasonEpisodes(episodeList: Episode[]) {



    episodeList.forEach(async episode => {
        const url = episode.url
        const episodeData = await getSingleEpisode(url, undefined)

        const seasonEpisodes = document.querySelector("#season-episodes")
        const episodeContainer = document.createElement("div")
        const title = document.createElement("h5");
        const code = document.createElement("p");

        episodeContainer.classList.add("col")

        title.innerText = `${episodeData.id}. ${episodeData.name}`;
        title.classList.add("clickable-episode-title");
        title.setAttribute("episode", `${episodeData.id}`);
        title.addEventListener("click", showEpisode);
        title.setAttribute("role", "button");
        episodeContainer.appendChild(title);

        code.innerText = episodeData.episode;
        episodeContainer.appendChild(code);

        seasonEpisodes?.appendChild(episodeContainer); TextMetrics
    });
}