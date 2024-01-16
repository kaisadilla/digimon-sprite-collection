import App from "App";
import IvyElement from "ivy/IvyElement";
import { $id } from "ivy/ivy";
import GalleryPage from "pages/GalleryPage";
import ListPage from "pages/ListPage";
import Page from "pages/Page";
import "styles/styles.scss";
//import { App } from "App";

enum Tab {
    List,
    Gallery
};

const $tabList = $id("tab-list");
const $tabGallery = $id("tab-gallery");
const $pageContainer = $id("page-container");

const pages: {[name in Tab]: Page} = {
    [Tab.List]: new ListPage().setVisible(false),
    [Tab.Gallery]: new GalleryPage().setVisible(false),
}

$pageContainer?.appendChildren(
    pages[Tab.List],
    pages[Tab.Gallery],
);

$tabList?.element.addEventListener("click", () => showTab(Tab.List));
$tabGallery?.element.addEventListener("click", () => showTab(Tab.Gallery));

function showTab (tab: Tab) {
    for (const p in pages) {
        const page = pages[p as unknown as Tab];
        page.setVisible(p as unknown as Tab == tab);
    }
}

//App.start();