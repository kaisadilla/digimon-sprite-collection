import App from "App";
import Page from "./Page";

import "styles/pages/calendars";
import SeasonCalendar from "components/SeasonCalendar";

export default class Calendars extends Page {
    constructor () {
        const validSeasons = App.data.seasons.filter(s => s.calendar);

        const $calendars = validSeasons.map(s => new SeasonCalendar(s));

        const $element = (
            <div className="page page-calendars">
                {$calendars}
            </div>
        );

        super($element);
    }
}