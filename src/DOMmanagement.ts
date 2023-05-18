import { showEpisode, showSeason } from "./principalFunctions.js";
import { getSeasonsNumber, toggleBodyFixed } from "./supportFunctions.js";
import { Episode } from "./types";



export function createHeader(): void {

    const header = document.querySelector("header") as HTMLElement | null;
    const navBar = document.createElement("nav");
    const container = document.createElement("div");
    const heading = document.createElement("h1");
    const toggleButton = document.createElement("button");
    const iconSpan = document.createElement("span");
    const collapseNavbar = document.createElement("div");
    const scrollBoxInnerNav = document.createElement("div");
    const sidebarListNav = document.createElement("ul");

    navBar.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "main-navbar");
    header?.appendChild(navBar);

    container.classList.add("container-fluid", "header-container");
    navBar.appendChild(container);

    heading.classList.add("m-auto", "header-heading");
    heading.innerText = "SEASONS";
    container.appendChild(heading);

    toggleButton.classList.add("navbar-toggler");
    toggleButton.type = "button";
    toggleButton.setAttribute("data-bs-toggle", "collapse");
    toggleButton.setAttribute("data-bs-target", "#navbar-colapse");
    toggleButton.setAttribute("aria-controls", "#navbar-colapse");
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-label", "Toggle navigation");
    toggleButton.addEventListener("click", toggleBodyFixed);
    container.appendChild(toggleButton);

    iconSpan.classList.add("navbar-toggler-icon");
    toggleButton.appendChild(iconSpan);

    collapseNavbar.classList.add("collapse", "navbar-collapse", "collapsable-container");
    collapseNavbar.id = "navbar-colapse";
    container.appendChild(collapseNavbar);

    scrollBoxInnerNav.classList.add("scrollbox-inner");
    scrollBoxInnerNav.id = "side-menu-nav";
    collapseNavbar.appendChild(scrollBoxInnerNav);


    sidebarListNav.classList.add("sidebar-list");
    sidebarListNav.id = "sidebar-list-nav";
    scrollBoxInnerNav.appendChild(sidebarListNav);

}

export async function createSeasonsMenu() {
    const episodeListNav = document.querySelector("#sidebar-list-nav") as HTMLElement | null;
    const img = document.createElement("img");
    const seasonsNumber = await getSeasonsNumber();
    let i = 1;
    while (i <= seasonsNumber) {
        let iWithZero = ('0' + i).slice(-2);
        const liNav = document.createElement("li");
        liNav.classList.add("sidebar-list-element");
        liNav.innerText = `SEASON - ${iWithZero}`;
        liNav.setAttribute("season", `${iWithZero}`);
        liNav.addEventListener("click", showSeason);
        episodeListNav?.appendChild(liNav);
        i++;
    }

    img.classList.add("mobile-menu-img");
    img.src = "/images/picklerick.png";
    img.setAttribute("alt", "Pickle-Riiiick image");
    episodeListNav?.appendChild(img);


}


export function createSidebar() {
    const main = document.querySelector("main") as HTMLElement | null;
    const sidebar = document.createElement("nav");
    const sidebarHeader = document.createElement("div");
    const heading = document.createElement("h2");
    const scrollBox = document.createElement("div");
    const scrollBoxInner = document.createElement("div");
    const sidebarList = document.createElement("ul");
    const sidebarFooter = document.createElement("div");

    sidebar.classList.add("sidebar");
    main?.appendChild(sidebar);

    sidebarHeader.classList.add("sidebar-header");
    sidebar.appendChild(sidebarHeader);

    heading.innerText = "EPISODES";
    sidebarHeader.appendChild(heading);

    scrollBox.classList.add("scrollbox");
    scrollBox.id = "scroll-box";
    sidebar.appendChild(scrollBox);

    scrollBoxInner.classList.add("scrollbox-inner");
    scrollBoxInner.id = "side-menu";
    scrollBox.appendChild(scrollBoxInner);

    sidebarList.classList.add("sidebar-list");
    sidebarList.id = "sidebar-list";
    scrollBoxInner.appendChild(sidebarList);

    sidebarFooter.classList.add("sidebar-footer");
    sidebarFooter.id = "sidebar-footer";
    sidebar.appendChild(sidebarFooter);

}

export function createSideMenu(episode: Episode) {
    const episodeList = document.querySelector("#sidebar-list") as HTMLElement | null;
    if (episodeList === null) return;
    const li = document.createElement("li");
    li.classList.add("sidebar-list-element");
    li.innerText = `${episode.id} - ${episode.name}`;
    li.setAttribute("episode", `${episode.id}`);
    li.addEventListener("click", showEpisode);
    episodeList.appendChild(li);
}


export function createMainContainer() {
    const main = document.querySelector("main") as HTMLElement | null;
    const mainWrapper = document.createElement("div");
    const mainContainer = document.createElement("div");
    const img = document.createElement("img");

    mainWrapper.classList.add("main-wrapper");
    mainWrapper.id = "main-wrapper";
    main?.appendChild(mainWrapper);

    mainContainer.classList.add("container", "main-content");
    mainContainer.id = "main-content";
    mainWrapper.appendChild(mainContainer);

    img.classList.add("main-img");
    img.src = "/images/portalrym.png";
    img.setAttribute("alt", "Rick & Morty - Interdimensional Portal Image");
    mainContainer.appendChild(img);

}