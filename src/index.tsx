import App from "App";
import IvyElement from "ivy/IvyElement";
import { $id } from "ivy/ivy";
import Calendars from "pages/Calendars";
import DriverStandings from "pages/DriverStandings";
import Drivers from "pages/Drivers";
import Page from "pages/Page";
import Teams from "pages/Teams";
import "styles/styles.scss";
//import { App } from "App";

console.info("Initializing app...");
App.initialize();

enum Tab {
    Teams,
    Drivers,
    DriverStandings,
    Calendars
}

const $tabTeams = $id("tab-teams");
const $tabDrivers = $id("tab-drivers");
const $tabDriverStandings = $id("tab-driver-standings");
const $tabCalendars = $id("tab-calendars");
const $pageContainer = $id("page-container");

const pages: {[name in Tab]: Page} = {
    [Tab.Teams]: new Teams().setVisible(false),
    [Tab.Drivers]: new Drivers().setVisible(false),
    [Tab.DriverStandings]: new DriverStandings().setVisible(false),
    [Tab.Calendars]: new Calendars().setVisible(true),
}

$pageContainer?.appendChildren(
    pages[Tab.Teams],
    pages[Tab.Drivers],
    pages[Tab.DriverStandings],
    pages[Tab.Calendars],
);

$tabTeams?.element.addEventListener("click", () => showTab(Tab.Teams));
$tabDrivers?.element.addEventListener("click", () => showTab(Tab.Drivers));
$tabDriverStandings?.element.addEventListener(
    "click",
    () => showTab(Tab.DriverStandings)
);
$tabCalendars?.element.addEventListener("click", () => showTab(Tab.Calendars));

function showTab (tab: Tab) {
    for (const p in pages) {
        const page = pages[p as unknown as Tab];
        page.setVisible(p as unknown as Tab == tab);
    }
}

//App.start();