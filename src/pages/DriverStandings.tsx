import DriverStandingsSeasonTable from "components/DriverStandingsSeasonTable";
import Page from "./Page";

import "styles/pages/driver-standings";
import App from "App";

export default class DriverStandings extends Page {
    constructor () {
        const $entries = App.data.seasons.map(s => (
            new DriverStandingsSeasonTable(s)
        ));

        const $element = (
            <div className="page page-driver-standings">
                {$entries}
            </div>
        )

        super($element);
    }
}