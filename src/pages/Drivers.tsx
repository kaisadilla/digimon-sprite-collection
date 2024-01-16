import Page from "./Page";

import "styles/pages/drivers";
import DriversSeasonTable from "components/DriversSeasonTable";
import App from "App";

export default class Drivers extends Page {
    private tables: DriversSeasonTable[];

    constructor () {
        const $tables = App.data.seasons.map(s => new DriversSeasonTable(s));

        const $element = (
            <div className="page-drivers">
                {$tables}
            </div>
        )

        super($element);

        this.tables = $tables;
    }
}