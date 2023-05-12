
import { Character, episode, location } from "./types"
//import { Character } from "./classes"

window.addEventListener("load", setMain);

//IN CHARGE OF PRINTIN THE FIRST MENU AND SIDEBAR MENU
async function setMain() {
    const sideMenu = document.querySelector("#side-menu");
    const episodeList = document.createElement("ul");
    episodeList.classList.add("sidebar-list")
    const sideFooter = document.querySelector("#sidebar-footer");
    const footerBtn = document.createElement("button");
    footerBtn.classList.add("sidebar-footer-btn")
    footerBtn.innerText = "Load more episodes";
    sideFooter?.appendChild(footerBtn);


    const response = await fetch("https://rickandmortyapi.com/api/episode")
    const data = await response.json()

    const episodes = data.results

    episodes.forEach(async (episode: any) => {
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
async function showEpisode(event: any) {
    //console.log(typeof event)
    console.log(event.currentTarget)
    const episodeSelected = event.currentTarget
    const episodeNumber = episodeSelected.getAttribute("episode")

    const mainContent = document.querySelector("#main-card")


    const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeNumber}`)
    const episodeData = await response.json()

    const episodeTitle = document.createElement("h2")
    episodeTitle.innerText = `${episodeNumber} - ${episodeData.name}`
    const episodeInfo = document.createElement("p")
    episodeInfo.innerText = `${episodeData.air_date} | ${episodeData.episode}`
    cleanMain()
    mainContent?.appendChild(episodeTitle)
    mainContent?.appendChild(episodeInfo)

    const cardsContainer = document.createElement("div")
    cardsContainer.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-3", "row-cols-xl-4", "g-3", "cards-container")
    mainContent?.appendChild(cardsContainer)
    const episodeCharactersURL = episodeData.characters
    episodeCharactersURL.forEach(async (endpoint: string) => {

        const response = await fetch(endpoint)
        const characterData = await response.json()
        const characterId = characterData.id

        const cardWrapper = document.createElement("div");
        cardWrapper.classList.add("card-wrapper", "col");
        cardsContainer.appendChild(cardWrapper);

        const card = document.createElement("div");
        card.classList.add("card", "px-0", "h-100");
        card.setAttribute("characterId", characterId)
        card.addEventListener("click", showCharacter);


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



//IN CHARGE OF SHOWING SINGLE CHARACTER AND DISPLAY ALL ITS INFORMATION 
async function showCharacter(event: any) {
    cleanMain()

    const selectedCharacter = event.currentTarget;
    const selectedCharacterId = selectedCharacter.getAttribute("characterId")


    const response = await fetch(`https://rickandmortyapi.com/api/character/${selectedCharacterId}`)
    const characterData: Character = await response.json()

    /*const character: Character = new Character(characterData.id, characterData.name, characterData.status, characterData.species, characterData.type, characterData.gender, characterData.origin, characterData.location, characterData.image, characterData.episode, characterData.created)*/


    const id = characterData.id
    const name = characterData.name
    const status = characterData.status
    const specie = characterData.species
    const gender = characterData.gender
    const origin = characterData.origin.name
    const originUrl = characterData.origin.url
    const location = characterData.location.name
    const locationUrl = characterData.location.url
    const imgSrc = characterData.image
    const episodeList = characterData.episode





    const mainContent = document.querySelector("#main-card")

    const characterHeader = document.createElement("div")
    characterHeader.classList.add("row", "g-3", "character-header")

    const characterBody = document.createElement("div")
    characterBody.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-2", "row-cols-xl-4", "g-3", "character-body")

    mainContent?.appendChild(characterHeader);
    mainContent?.appendChild(characterBody);


    const img = document.createElement("img")
    img.src = imgSrc;
    img.classList.add("character-main-img", "col-12", "col-sm-12", "col-md-4", "col-lg-3", "col-xl-2")

    const characterInfo = document.createElement("div")
    characterInfo.classList.add("col-12", "col-sm-12", "col-md-7", "col-lg-8", "col-xl-9")

    const characterTitle = document.createElement("h2")
    characterTitle.innerText = name

    const characterDetails = document.createElement("p")
    characterDetails.innerText = `${specie} | ${status} | ${gender} | ${origin}`

    characterHeader.appendChild(img)
    characterHeader.appendChild(characterInfo)
    characterInfo.appendChild(characterTitle)
    characterInfo.appendChild(characterDetails)

    episodeList.forEach(async (endpoint) => {

        const response = await fetch(endpoint)
        const episodeData: episode = await response.json()

        const episodeContainer = document.createElement("div")
        episodeContainer.classList.add("col")
        episodeContainer.setAttribute("role", "button");
        episodeContainer.setAttribute("episode", `${episodeData.id}`)
        episodeContainer.addEventListener("click", showEpisode);

        const title = document.createElement("h5")
        const code = document.createElement("p")

        title.innerText = episodeData.name
        code.innerText = episodeData.episode



        episodeContainer.appendChild(title)
        episodeContainer.appendChild(code)
        characterBody.appendChild(episodeContainer)
    });

}





//MINOR FUNCTIONS

function cleanMain() {
    const mainContent = document.querySelector("#main-card")
    mainContent?.replaceChildren()
}