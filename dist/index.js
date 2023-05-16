var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEpisodes, getSingleEpisode, getCharacter, getLocation } from "./APIrequests.js";
window.addEventListener("load", setSidebar);
function setSidebar() {
    return __awaiter(this, void 0, void 0, function* () {
        const scrollBox = document.querySelector("#scroll-box");
        const sideMenu = document.querySelector("#side-menu");
        const episodeList = document.createElement("ul");
        const sideFooter = document.querySelector("#sidebar-footer");
        episodeList.classList.add("sidebar-list");
        episodeList.id = "sidebar-list";
        scrollBox === null || scrollBox === void 0 ? void 0 : scrollBox.addEventListener("scroll", infiniteScroll);
        const data = yield getEpisodes();
        const episodes = data.results;
        episodes.forEach(episode => {
            const li = document.createElement("li");
            li.classList.add("sidebar-list-element");
            li.innerText = `${episode.id} - ${episode.name}`;
            li.setAttribute("episode", `${episode.id}`);
            li.addEventListener("click", showEpisode);
            episodeList.appendChild(li);
            sideMenu === null || sideMenu === void 0 ? void 0 : sideMenu.appendChild(episodeList);
        });
    });
}
function showEpisode() {
    return __awaiter(this, void 0, void 0, function* () {
        cleanMain();
        const episodeNumber = this.getAttribute("episode");
        const mainContent = document.querySelector("#main-content");
        if (episodeNumber === null)
            return;
        const episodeData = yield getSingleEpisode(undefined, episodeNumber);
        const episodeTitle = document.createElement("h2");
        const episodeInfo = document.createElement("p");
        const charactersURL = episodeData.characters;
        episodeTitle.innerText = `${episodeNumber} - ${episodeData.name}`;
        episodeInfo.innerText = `${episodeData.air_date} | ${episodeData.episode}`;
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(episodeTitle);
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(episodeInfo);
        printCharacters(charactersURL);
    });
}
function showCharacter() {
    return __awaiter(this, void 0, void 0, function* () {
        cleanMain();
        const selectedCharacterId = this.getAttribute("characterId");
        if (selectedCharacterId === null)
            return;
        const characterData = yield getCharacter(undefined, selectedCharacterId);
        const origin = characterData.origin.name;
        const originUrl = characterData.origin.url;
        const episodeList = characterData.episode;
        const mainContent = document.querySelector("#main-content");
        const characterHeader = document.createElement("div");
        const characterBody = document.createElement("div");
        const img = document.createElement("img");
        const characterInfo = document.createElement("div");
        const characterTitle = document.createElement("h2");
        const characterDetails = document.createElement("p");
        const clickableSpan = document.createElement("span");
        characterHeader.classList.add("row", "g-3", "character-header");
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(characterHeader);
        img.classList.add("character-main-img", "col-12", "col-sm-12", "col-md-4", "col-lg-3", "col-xl-2");
        img.src = characterData.image;
        characterHeader.appendChild(img);
        characterInfo.classList.add("col-12", "col-sm-12", "col-md-7", "col-lg-8", "col-xl-9");
        characterTitle.innerText = characterData.name;
        characterDetails.innerText = `${characterData.species} | ${characterData.status} | ${characterData.gender} | `;
        clickableSpan.innerText = `${origin}`;
        clickableSpan.setAttribute("originUrl", `${originUrl}`);
        characterHeader.appendChild(characterInfo);
        characterInfo.appendChild(characterTitle);
        characterInfo.appendChild(characterDetails);
        characterDetails.appendChild(clickableSpan);
        clickableSpan.addEventListener("click", showOrigin);
        characterBody.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-2", "row-cols-xl-4", "g-3", "character-body");
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(characterBody);
        episodeList.forEach((endpoint) => __awaiter(this, void 0, void 0, function* () {
            const episodeData = yield getSingleEpisode(endpoint, undefined);
            const episodeContainer = document.createElement("div");
            const title = document.createElement("h5");
            const code = document.createElement("p");
            episodeContainer.classList.add("col");
            episodeContainer.setAttribute("role", "button");
            episodeContainer.setAttribute("episode", `${episodeData.id}`);
            episodeContainer.addEventListener("click", showEpisode);
            title.innerText = episodeData.name;
            episodeContainer.appendChild(title);
            code.innerText = episodeData.episode;
            episodeContainer.appendChild(code);
            characterBody.appendChild(episodeContainer);
        }));
    });
}
function showOrigin() {
    return __awaiter(this, void 0, void 0, function* () {
        const originUrl = this.getAttribute("originUrl");
        if (originUrl === "")
            return;
        if (originUrl === null)
            return;
        const mainContent = document.querySelector("#main-content");
        cleanMain();
        const originData = yield getLocation(originUrl);
        const residents = originData.residents;
        const title = document.createElement("h2");
        const originInfo = document.createElement("p");
        title.innerText = originData.name;
        originInfo.innerText = `${originData.type} | ${originData.dimension}`;
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(title);
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(originInfo);
        printCharacters(residents);
    });
}
function printCharacters(charactersUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const mainContent = document.querySelector("#main-content");
        const cardsContainer = document.createElement("div");
        cardsContainer.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-3", "row-cols-xl-4", "g-3", "cards-container");
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(cardsContainer);
        charactersUrl.forEach((endpoint) => __awaiter(this, void 0, void 0, function* () {
            const characterData = yield getCharacter(endpoint, undefined);
            const characterId = characterData.id;
            const cardWrapper = document.createElement("div");
            const card = document.createElement("div");
            const img = document.createElement("img");
            const cardBody = document.createElement("div");
            const cardTitle = document.createElement("h5");
            const cardDetails = document.createElement("p");
            cardWrapper.classList.add("card-wrapper", "col", "text-dark");
            cardsContainer.appendChild(cardWrapper);
            card.classList.add("card", "px-0", "h-100");
            card.setAttribute("characterId", `${characterId}`);
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
            cardDetails.classList.add("card-text");
            cardDetails.innerText = `${characterData.species} | ${characterData.status}`;
            cardBody.appendChild(cardDetails);
        }));
    });
}
function cleanMain() {
    const mainContent = document.querySelector("#main-content");
    mainContent === null || mainContent === void 0 ? void 0 : mainContent.replaceChildren();
}
function infiniteScroll(event) {
    const scrollBox = document.querySelector("#scroll-box");
    if (scrollBox === null)
        return;
    const scrollTop = scrollBox.scrollTop;
    const scrollHeight = scrollBox.scrollHeight;
    const clientHeight = scrollBox.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        refreshSidebar();
    }
    ;
}
function refreshSidebar() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entering function");
        const scrollBox = document.querySelector("#scroll-box");
        const sideList = document.querySelector("#sidebar-list");
        let pageFilterUrl = "";
        if ((sideList === null || sideList === void 0 ? void 0 : sideList.childElementCount) === 20) {
            pageFilterUrl = "?page=2";
        }
        else if ((sideList === null || sideList === void 0 ? void 0 : sideList.childElementCount) === 40) {
            pageFilterUrl = "?page=3";
        }
        else {
            scrollBox === null || scrollBox === void 0 ? void 0 : scrollBox.removeEventListener("scroll", infiniteScroll);
            return;
        }
        const data = yield getEpisodes(undefined, pageFilterUrl);
        console.log("if passed");
        const episodes = data.results;
        episodes.forEach(episode => {
            const li = document.createElement("li");
            li.classList.add("sidebar-list-element");
            li.innerText = `${episode.id} - ${episode.name}`;
            li.setAttribute("episode", `${episode.id}`);
            li.addEventListener("click", showEpisode);
            sideList === null || sideList === void 0 ? void 0 : sideList.appendChild(li);
        });
    });
}
//# sourceMappingURL=index.js.map