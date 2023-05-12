var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.addEventListener("load", setMain);
function setMain() {
    return __awaiter(this, void 0, void 0, function* () {
        const sideMenu = document.querySelector("#side-menu");
        const episodeList = document.createElement("ul");
        episodeList.classList.add("sidebar-list");
        const sideFooter = document.querySelector("#sidebar-footer");
        const footerBtn = document.createElement("button");
        footerBtn.innerText = "Load more episodes";
        sideFooter === null || sideFooter === void 0 ? void 0 : sideFooter.appendChild(footerBtn);
        const response = yield fetch("https://rickandmortyapi.com/api/episode");
        const data = yield response.json();
        const episodes = data.results;
        episodes.forEach((episode) => __awaiter(this, void 0, void 0, function* () {
            const li = document.createElement("li");
            li.classList.add("sidebar-list-element");
            li.innerText = `${episode.id} - ${episode.name}`;
            li.setAttribute("episode", `${episode.id}`);
            li.addEventListener("click", showEpisode);
            episodeList.appendChild(li);
            sideMenu === null || sideMenu === void 0 ? void 0 : sideMenu.appendChild(episodeList);
        }));
    });
}
function showEpisode(event) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(event.target);
        const episodeSelected = event.target;
        const episodeNumber = episodeSelected.getAttribute("episode");
        const mainContent = document.querySelector("#main-card");
        const response = yield fetch(`https://rickandmortyapi.com/api/episode/${episodeNumber}`);
        const episodeData = yield response.json();
        const episodeTitle = document.createElement("h2");
        episodeTitle.innerText = `${episodeNumber} - ${episodeData.name}`;
        const episodeInfo = document.createElement("p");
        episodeInfo.innerText = `${episodeData.air_date} | ${episodeData.episode}`;
        cleanMain();
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(episodeTitle);
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(episodeInfo);
        const cardsContainer = document.createElement("div");
        cardsContainer.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-3", "row-cols-xl-4", "g-3");
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(cardsContainer);
        const episodeCharactersURL = episodeData.characters;
        episodeCharactersURL.forEach((endpoint) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(endpoint);
            const characterData = yield response.json();
            const characterId = characterData.id;
            const cardWrapper = document.createElement("div");
            cardWrapper.classList.add("card-wrapper", "col");
            cardsContainer.appendChild(cardWrapper);
            const card = document.createElement("div");
            card.classList.add("card", "px-0", "h-100");
            card.setAttribute("characterId", characterId);
            card.addEventListener("click", showCharacter);
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
            cardDetails.classList.add("card-text");
            cardDetails.innerText = `${characterData.species} | ${characterData.status}`;
            cardBody.appendChild(cardDetails);
        }));
    });
}
function showCharacter(event) {
    return __awaiter(this, void 0, void 0, function* () {
        cleanMain();
        const selectedCharacter = event.currentTarget;
        const selectedCharacterId = selectedCharacter.getAttribute("characterId");
        const response = yield fetch(`https://rickandmortyapi.com/api/character/${selectedCharacterId}`);
        const characterData = yield response.json();
        const id = characterData.id;
        const name = characterData.name;
        const status = characterData.status;
        const specie = characterData.species;
        const gender = characterData.gender;
        const origin = characterData.origin.name;
        const originUrl = characterData.origin.url;
        const location = characterData.location.name;
        const locationUrl = characterData.location.url;
        const imgSrc = characterData.image;
        const episodeList = characterData.episode;
        const mainContent = document.querySelector("#main-card");
        const characterHeader = document.createElement("div");
        characterHeader.classList.add("row", "g-3");
        const characterBody = document.createElement("div");
        characterBody.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-3", "row-cols-xl-4", "g-3");
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(characterHeader);
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(characterBody);
        const img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("character-main-img", "col-12", "col-sm-12", "col-md-3", "col-lg-3", "col-xl-3");
        const characterInfo = document.createElement("div");
        characterInfo.classList.add("col-12", "col-sm-12", "col-md-9", "col-lg-9", "col-xl-9");
        const characterTitle = document.createElement("h3");
        characterTitle.innerText = name;
        const characterDetails = document.createElement("p");
        characterDetails.innerText = `${specie} | ${status} | ${gender} | ${origin}`;
        characterHeader.appendChild(img);
        characterHeader.appendChild(characterInfo);
        characterInfo.appendChild(characterTitle);
        characterInfo.appendChild(characterDetails);
        episodeList.forEach((endpoint) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(endpoint);
            const episodeData = yield response.json();
            const episodeContainer = document.createElement("div");
            episodeContainer.classList.add("col");
            const title = document.createElement("h4");
            const code = document.createElement("p");
            title.innerText = episodeData.name;
            title.setAttribute("episode", `${episodeData.id}`);
            code.innerText = episodeData.episode;
            title.addEventListener("click", showEpisode);
            episodeContainer.appendChild(title);
            episodeContainer.appendChild(code);
            characterBody.appendChild(episodeContainer);
        }));
    });
}
function cleanMain() {
    const mainContent = document.querySelector("#main-card");
    mainContent === null || mainContent === void 0 ? void 0 : mainContent.replaceChildren();
}
export {};
//# sourceMappingURL=index.js.map