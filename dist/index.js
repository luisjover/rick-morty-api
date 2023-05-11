"use strict";
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
        const episodeSelected = event.target;
        const episodeNumber = episodeSelected.getAttribute("episode");
        const mainContent = document.querySelector("#main-card");
        const response = yield fetch(`https://rickandmortyapi.com/api/episode/${episodeNumber}`);
        const episodeData = yield response.json();
        const episodeTitle = document.createElement("h2");
        episodeTitle.innerText = `Episode ${episodeNumber}`;
        const episodeInfo = document.createElement("p");
        episodeInfo.innerText = `${episodeData.air_date} | ${episodeData.episode}`;
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.replaceChildren();
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(episodeTitle);
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(episodeInfo);
        const cardsContainer = document.createElement("div");
        cardsContainer.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-3", "row-cols-xl-4", "g-3");
        mainContent === null || mainContent === void 0 ? void 0 : mainContent.appendChild(cardsContainer);
        const episodeCharactersURL = episodeData.characters;
        episodeCharactersURL.forEach((endpoint) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(endpoint);
            const characterData = yield response.json();
            const cardWrapper = document.createElement("div");
            cardWrapper.classList.add("card-wrapper", "col");
            cardsContainer.appendChild(cardWrapper);
            const card = document.createElement("div");
            card.classList.add("card", "px-0", "h-100");
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
//# sourceMappingURL=index.js.map