import App from "App";
import Delta from "elements/Delta";
import DriverName from "elements/DriverName";
import Flag from "elements/Flag";
import IvyElement from "ivy/IvyElement";
import { Season, SeasonDriver, SeasonTeam } from "logic/SeriesData";

import "styles/components/driver-standings-season-table";

export default class DriverStandingsSeasonTable extends IvyElement {
    public constructor (season: Season) {
        const driversToOrder: SeasonDriver[] = season.drivers.map(d => ({...d}));
        driversToOrder.sort((a, b) => a.position - b.position);

        const $drivers = driversToOrder.map(d => {
            const team = season.teams.find(t => t.internal_name === d.team);

            if (!team) {
                console.error(
                    `Couldn't find team '${d.team}' for driver ` +
                    `'${d.internal_name}' in season ${season.year},`
                );
            }

            return new DriverStandingsSeasonTableEntry(d, team!);
        });

        const $element = (
            <div className="driver-standings-season-container">
                <h3 className="year">{season.year}</h3>
                <table className="default-table driver-standings-season">
                    <thead>
                        <tr>
                            <td title="Position">#</td>
                            <td title="Licensor country">C</td>
                            <td title="Delta">Δ</td>
                            <td title="Driver name">Driver</td>
                            <td title="Gender">G</td>
                            <td title="Acronym">Acr.</td>
                            <td title="Age">Age</td>
                            <td
                                className="first-team-cell"
                                colspan="3"
                                title="Team's country, name and strength"
                            >
                                Team
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {$drivers}
                    </tbody>
                </table>
            </div>
        );

        super($element);
    }
}

class DriverStandingsSeasonTableEntry extends IvyElement {
    public constructor (driver: SeasonDriver, team: SeasonTeam) {
        const driverInfo = App.data.drivers[driver.internal_name];

        const acronym = driver.acronym ?? driverInfo.acronym;

        const $gender = (() => {
            if (driverInfo.gender && driverInfo.gender === "female") {
                return (
                    <td className="gender female">
                        <div>F</div>
                    </td>
                );
            }
            else {
                return <td className="gender" />
            }
        })();

        const $element = (
            <tr className="driver">
                <td className="rank">{driver.position}</td>
                <td className="delta"><Delta value={driver.delta!} /></td>
                <td className="flag">
                    <div>
                        <Flag id={driverInfo.country} maxWidth={30} />
                    </div>
                </td>
                <td className="name"><DriverName name={driverInfo.name} /></td>
                {$gender}
                <td className="acronym">{acronym}</td>
                <td className="age">{driver.age}</td>
                <td className="team-flag first-team-cell">
                    <div>
                        <Flag id={team.license} maxWidth={26} />
                    </div>
                </td>
                <td className="team-name">{team.name}</td>
                <td className="team-strength">({team.strength})</td>
            </tr>
        );

        super($element);
    }
}