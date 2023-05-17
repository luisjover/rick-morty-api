var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { showEpisode } from "./principalFunctions.js";
import { getEpisodes } from "./APIrequests.js";
export function cleanMain() {
    const mainContent = document.querySelector("#main-content");
    mainContent === null || mainContent === void 0 ? void 0 : mainContent.replaceChildren();
}
export function getSeasonsNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        let currentSeason = 1;
        let totalSeasons = 0;
        let finished = false;
        while (finished === false) {
            let seasonWithZero = ('0' + currentSeason).slice(-2);
            let url = `?episode=S${seasonWithZero}`;
            const data = yield getEpisodes(undefined, url);
            if (data.results) {
                currentSeason++;
                totalSeasons += 1;
            }
            else
                finished = true;
        }
        console.log(totalSeasons);
        return totalSeasons;
    });
}
export function infiniteScroll() {
    let booleanVar = sessionStorage.getItem("fetching");
    if (booleanVar === "true")
        return;
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
export function refreshSidebar() {
    return __awaiter(this, void 0, void 0, function* () {
        sessionStorage.setItem("fetching", true.toString());
        const nextPage = sessionStorage.getItem("nextMenuPage");
        const scrollBox = document.querySelector("#scroll-box");
        const sideList = document.querySelector("#sidebar-list");
        if (nextPage !== null) {
            const data = yield getEpisodes(nextPage, undefined);
            const episodes = data.results;
            episodes.forEach(episode => {
                const li = document.createElement("li");
                li.classList.add("sidebar-list-element");
                li.innerText = `${episode.id} - ${episode.name}`;
                li.setAttribute("episode", `${episode.id}`);
                li.addEventListener("click", showEpisode);
                sideList === null || sideList === void 0 ? void 0 : sideList.appendChild(li);
            });
            if (data.info.next !== null)
                sessionStorage.setItem("nextMenuPage", data.info.next);
            else {
                scrollBox === null || scrollBox === void 0 ? void 0 : scrollBox.removeEventListener("scroll", infiniteScroll);
                sessionStorage.clear();
                return;
            }
        }
        sessionStorage.setItem("fetching", false.toString());
    });
}
export function toggleBodyFix() {
    const body = document.querySelector("body");
    body === null || body === void 0 ? void 0 : body.classList.toggle("body-fixed");
}
//# sourceMappingURL=supportFunctions.js.map