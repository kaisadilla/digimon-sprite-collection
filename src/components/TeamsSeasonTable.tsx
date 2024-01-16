import App from "App";
import Delta from "elements/Delta";
import Flag from "elements/Flag";
import IvyElement from "ivy/IvyElement";
import { Season, SeasonTeam } from "logic/SeriesData";
import "styles/components/team-season-table.scss";

export type OnTeamSelectCallback = (id: string) => void;

export interface TeamsSeasonTableProps {
    season: Season,
    onTeamSelect?: OnTeamSelectCallback,
}

export interface TeamsSeasonEntryProps {
    team: SeasonTeam,
    onTeamSelect?: OnTeamSelectCallback,
}

enum HighlightMode {
    None,
    Highlight,
    Depress,
}

export default class TeamsSeasonTable extends IvyElement {
    private entries: TeamsSeasonEntry[];

    public constructor ({
        season,
        onTeamSelect,
    }: TeamsSeasonTableProps) {
        const $entries = season.teams.map(t => new TeamsSeasonEntry({
            team: t,
            onTeamSelect
        }));

        const $element = (
            <div className="team-season">
                <h3>{season.year}</h3>
                <table className="team-season-table">
                    <thead>
                        <tr className="header">
                            <td title="Rank">#</td>
                            <td title="Licensor country">C</td>
                            <td title="Rank change">Δ</td>
                            <td title="Short name">Team</td>
                            <td title="Car strength">str</td>
                        </tr>
                    </thead>
                    <tbody>
                        {$entries}
                    </tbody>
                </table>
            </div>
        );

        super($element);

        this.entries = $entries;
    }

    /**
     * Highlights the team with the id given, and obscures the rest.
     * @param id The id of the string to highlight, or "null" to not
     * highlight anything.
     */
    public selectTeam (id: string | null) {
        if (id === null) {
            for (const team of this.entries) {
                team.setHighlight(HighlightMode.None);
            }
        }
        else {
            for (const team of this.entries) {
                if (team.teamId === id) {
                    team.setHighlight(HighlightMode.Highlight);
                }
                else {
                    team.setHighlight(HighlightMode.Depress);
                }
            }
        }
    }
}

class TeamsSeasonEntry extends IvyElement {
    public teamId: string;

    public constructor ({
        team,
        onTeamSelect,
    }: TeamsSeasonEntryProps) {
        if (team.strengthInfo?.rank === undefined) {
            console.error(`Team '${team.name}' has no strength info > rank.`);
        }
    
        const delta = team.strengthInfo?.delta ?? null;
    
        const perfStyle = {
            width: `${(team.strength - 30) / 0.7}%`
        }

        const clickHandler = onTeamSelect ? 
            () => onTeamSelect(team.internal_name)
            : () => {};
    
        const $element: HTMLElement = (
            <tr className="entry" onClick={clickHandler}>
                <td className="rank">{team.strengthInfo?.rank ?? 0}</td>
                <td className="flag">
                    <div>
                        <Flag id={team.license} maxWidth={30} />
                    </div>
                </td>
                <td className="delta"><Delta value={delta} /></td>
                <td className="team-name">
                    <div className="perf-overlay" style={perfStyle} />
                    <div className="name">{team.name}</div>
                </td>
                <td className="perf">{team.strength}</td>
            </tr>
        );

        super($element);
            
        this.teamId = team.internal_name;
    }

    public setHighlight (highlighted: HighlightMode) {
        if (highlighted === HighlightMode.None) {
            this.element.className = "entry";
        }
        else if (highlighted === HighlightMode.Highlight) {
            this.element.className = "entry highlight";
        }
        else if (highlighted === HighlightMode.Depress) {
            this.element.className = "entry depress";
        }
    }
}