import App from "App";
import DriverName from "elements/DriverName";
import Flag from "elements/Flag";
import IvyElement from "ivy/IvyElement";
import { Season, SeasonEvent } from "logic/SeriesData";
import "styles/components/season-calendar";


export default class SeasonCalendar extends IvyElement {
    public constructor (season: Season) {
        const $events = season.calendar!.map(e => new SeasonCalendarEntry(e));

        const $element = (
            <div className="season-calendar-container">
                <h3 className="year">{season.year}</h3>
                <table className="default-table season-calendar">
                    <thead>
                        <tr>
                            <td title="Number">#</td>
                            <td title="Date">Date</td>
                            <td title="Country">C</td>
                            <td title="Country"> </td>
                            <td title="Official name of the event">Title</td>
                            <td title="Course type">T</td>
                            <td title="Circuit">Circuit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {$events}
                    </tbody>
                </table>
            </div>
        );

        super($element);
    }
}

class SeasonCalendarEntry extends IvyElement {
    public constructor (event: SeasonEvent) {
        const circuit = App.data.circuits[event.circuit];

        if (circuit === undefined) {
            throw `Couldn't find circuit with key '${event.circuit}'`;
        }

        const country = event.country ?? circuit.country;
        const region = App.data.countries[country]?.region;
        const special = event.special ?? false;
        
        const $marker = <div className={`marker ${region}`} />;
        const $type = (() => {
            if (circuit.type === "road") {
                return <div className="road">R</div>;
            }
            else if (circuit.type === "street") {
                return <div className="street">S</div>;
            }
            else if (circuit.type === "oval") {
                return <div className="oval">O</div>;
            }
            else {
                return <></>;
            }
        })();

        const circuitClass = event.isNewTrack ? "circuit new-track" : "circuit";
        const $tdCircuit = (() => {
            if (event.isNewTrack) {
                return (
                    <td
                        className="circuit new-track"
                        title="New circuit in the calendar"
                    >
                        ✦ {circuit.name}
                    </td>
                );
            }
            else if (event.isLastYear) {
                return (
                    <td 
                        className="circuit last-year"
                        title="Last year in the calendar"
                    >
                        ✖ {circuit.name}
                    </td>
                );
            }
            else {
                return <td className="circuit">{circuit.name}</td>
            }
        })();

        const $element = (
            <tr>
                <td className="order">{event.position}</td>
                <td className="date">{formatDate(event.date)}</td>
                <td className="flag">
                    <div>
                        <Flag id={country} maxWidth={30} />
                    </div>
                </td>
                <td className="region">{$marker}</td>
                <td className="title">
                    {special && <span className="special">★</span>}
                    <DriverName name={event.title} />
                </td>
                <td className="type">{$type}</td>
                {$tdCircuit}
            </tr>
        );

        super($element);
    }
}

function formatDate (date: Date) : string {
    const MONTHS = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = date.getMonth();
    const day = date.getDate();

    return day + " " + MONTHS[month];
}