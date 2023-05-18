
import { getEpisodes } from "./APIrequests.js";
import { createHeader, createSidebar, createMainContainer, createSideMenu, createSeasonsMenu } from "./DOMmanagement.js";
import { infiniteScroll } from "./supportFunctions.js";

window.addEventListener("load", setMain);

async function setMain(): Promise<void> {

    createHeader();
    createSidebar();
    createMainContainer();

    const scrollBox = document.querySelector("#scroll-box") as HTMLElement | null;

    scrollBox?.addEventListener("scroll", infiniteScroll);

    const data = await getEpisodes();
    const episodes = data.results;

    episodes.forEach(episode => {

        createSideMenu(episode);
    });

    createSeasonsMenu();


    sessionStorage.setItem("fetching", false.toString());
    if (data.info.next !== null) sessionStorage.setItem("nextMenuPage", data.info.next);

}