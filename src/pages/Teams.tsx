import TeamsSeasonTable from "components/TeamsSeasonTable";
import Page from "./Page";

import "styles/pages/teams.scss";
import App from "App";

export default class Teams extends Page {
    private selectedId: string | null = null;

    private tables: TeamsSeasonTable[];

    constructor () {
        const selectTeam = (id: string) => {
            if (id === this.selectedId) {
                for (const t of this.tables) {
                    t.selectTeam(null);
                }
                this.selectedId = null;
            }
            else {
                for (const t of this.tables) {
                    t.selectTeam(id);
                }
                this.selectedId = id;
            }
        };

        const $tables = App.data.seasons.map(s => new TeamsSeasonTable({
            season: s,
            onTeamSelect: selectTeam
        }));

        const $element = (
            <div className="page-teams">
                <div className="teams-season-table scroll-vert">
                    {$tables}
                </div>
            </div>
        )

        super($element);

        this.tables = $tables;
    }
}