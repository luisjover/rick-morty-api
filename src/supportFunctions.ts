
import { showEpisode, showCharacter, showOrigin } from "./principalFunctions.js";
import { getEpisodes } from "./APIrequests.js";


export function cleanMain() {
    const mainContent = document.querySelector("#main-content") as HTMLElement | null;
    mainContent?.replaceChildren();
}


export async function getSeasonsNumber(): Promise<number> {

    let currentSeason = 1;
    let totalSeasons = 0;
    let finished = false;
    while (finished === false) {

        let seasonWithZero = ('0' + currentSeason).slice(-2);
        let url = `?episode=S${seasonWithZero}`;

        const data = await getEpisodes(undefined, url);
        if (data.results) {
            currentSeason++;
            totalSeasons += 1;
        } else finished = true;
    }
    return totalSeasons;
}


export function infiniteScroll() {

    let booleanVar = sessionStorage.getItem("fetching");
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


export async function refreshSidebar(): Promise<void> {
    sessionStorage.setItem("fetching", true.toString());
    const nextPage = sessionStorage.getItem("nextMenuPage");
    const scrollBox = document.querySelector("#scroll-box") as HTMLElement | null;
    const sideList = document.querySelector("#sidebar-list") as HTMLElement | null;

    if (nextPage !== null) {
        const data = await getEpisodes(nextPage, undefined);
        const episodes = data.results;

        episodes.forEach(episode => {
            const li = document.createElement("li");
            li.classList.add("sidebar-list-element");
            li.innerText = `${episode.id} - ${episode.name}`;
            li.setAttribute("episode", `${episode.id}`);
            li.addEventListener("click", showEpisode);
            sideList?.appendChild(li)
        });

        if (data.info.next !== null) sessionStorage.setItem("nextMenuPage", data.info.next);
        else {
            scrollBox?.removeEventListener("scroll", infiniteScroll);
            sessionStorage.clear();
            return;
        }
    }
    sessionStorage.setItem("fetching", false.toString());
}

export function toggleBodyFixed() {
    const body = document.querySelector("body") as HTMLElement | null;
    body?.classList.toggle("body-fixed");
}


//EVENT LISTENERS REMOVING

export function removeEpisodesEventListeners() {
    const episodes: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(".clickable-episode-title");
    if (episodes === null) return;
    episodes.forEach(episode => episode.removeEventListener("click", showEpisode));
}

export function removeCharactersEventListeners() {
    const cards: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(".card");
    if (cards === null) return;
    cards.forEach(card => card.removeEventListener("click", showCharacter));
}

export function removeOriginEventListener() {
    const span = document.querySelector(".clickable-span") as HTMLElement | null;
    if (span === null) return;
    span.removeEventListener("click", showOrigin);
}