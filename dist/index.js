var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEpisodes } from "./APIrequests.js";
import { createHeader, createSidebar, createMainContainer, createSideMenu, createSeasonsMenu } from "./DOMmanagement.js";
import { infiniteScroll } from "./supportFunctions.js";
window.addEventListener("load", setMain);
function setMain() {
    return __awaiter(this, void 0, void 0, function* () {
        createHeader();
        createSidebar();
        createMainContainer();
        const scrollBox = document.querySelector("#scroll-box");
        scrollBox === null || scrollBox === void 0 ? void 0 : scrollBox.addEventListener("scroll", infiniteScroll);
        const data = yield getEpisodes();
        const episodes = data.results;
        episodes.forEach(episode => {
            createSideMenu(episode);
        });
        createSeasonsMenu();
        sessionStorage.setItem("fetching", false.toString());
        if (data.info.next !== null)
            sessionStorage.setItem("nextMenuPage", data.info.next);
    });
}
//# sourceMappingURL=index.js.map