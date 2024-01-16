import App from "App";
import Delta from "elements/Delta";
import DriverName from "elements/DriverName";
import Flag from "elements/Flag";
import IvyElement from "ivy/IvyElement"
import { Season, SeasonDriver, SeasonTeam } from "logic/SeriesData";

import "styles/components/driver-season-table";

export default class DriversSeasonTable extends IvyElement {
    public constructor (season: Season) {
        const $teams = [];

        for (const t of season.teams) {
            $teams.push(new DriversSeasonTeam(season, t.internal_name));
        }

        const $element = (
            <div className="drivers-season-section">
                <h3 className="year">{season.year}</h3>
                <div className="drivers-season-table">
                    {$teams}
                </div>
            </div>
        );

        super($element);
    }
}

class DriversSeasonTeam extends IvyElement {
    public constructor (season: Season, teamId: string) {
        const team = season.teams.find(t => t.internal_name === teamId);

        if (team == undefined) {
            throw `Cannot find team with id '${teamId}'`;
        }
        if (!team.drivers || team.drivers.length < 2) {
            throw `Team '${team.internal_name} has less than 2 drivers.'`;
        }

        const $element = (
            <div className="team">
                <div className="team-info">
                    <div className="rank">{team.strengthInfo?.rank}</div>
                    <td className="flag">
                        <Flag id={team.license} maxWidth={36} />
                    </td>
                    <div className="name">{team?.name}</div>
                    <div className="perf">{team.strength}</div>
                </div>
                <div className="drivers">
                    {new DriverSeasonDriver(team.drivers![0])}
                    {new DriverSeasonDriver(team.drivers![1])}
                </div>
            </div>
        );

        super($element);
    }
}

class DriverSeasonDriver extends IvyElement {
    public constructor (driver: SeasonDriver) {
        const driverInfo = App.data.drivers[driver.internal_name];

        if (driverInfo === undefined) {
            console.error(
                `Couldn't find driver with id '${driver.internal_name}'`
            );
        }

        const $gender = (() => {
            if (driverInfo.gender && driverInfo.gender === "female") {
                return <div className="gender female">F</div>
            }
            else {
                return <div className="gender" />
            }
        })();

        const delta = driver.delta ?? null;
        const acronym = driver.acronym ?? driverInfo.acronym;

        const $element = (
            <div className="driver">
                <div className="rank">{driver.position}</div>
                <div className="delta"><Delta value={delta} /></div>
                <div className="flag">
                    <Flag id={driverInfo.country} maxWidth={26} />
                </div>
                <div className="driver"><DriverName name={driverInfo.name} /></div>
                {$gender}
                <div className="alias">{acronym}</div>
                <div className="age">{driver.age}</div>
            </div>
        );

        super($element);
    }
}