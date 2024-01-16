
export type CountryList = {[id: string]: Country};
export type DriverList = {[id: string]: Driver}
export type CircuitList = {[id: string]: Circuit}

export default class SeriesData {
    public seasons: Season[];
    public drivers: DriverList;
    public circuits: CircuitList;
    public countries: CountryList;

    public earliestYear?: number;
    public latestYear?: number;

    public seasonsByYear: {[year: number]: Season} = {};

    public constructor (
        seasons: Season[],
        drivers: DriverList,
        circuits: CircuitList,
        countries: CountryList
    ) {
        this.seasons = seasons;
        this.drivers = drivers;
        this.circuits = circuits;
        this.countries = countries;

        for (const s of this.seasons) {
            this.seasonsByYear[s.year] = s;
        }
    }

    public calculateData () {
        this.createConvenienceFields();
        this.checkConsistency();

        this.calculateYearBounds();
        this.calc_teamStrengthInfo();
        this.calc_driverAges();
        this.calc_driverComparisons();

        this.calc_eventStats();
    }

    /**
     * Creates fields that don't add any new additional data, but make data
     * easier to access. For example, adds a "drivers" field to each team that
     * groups all drivers that belong to that team.
     */
    private createConvenienceFields () {
        for (const s of this.seasons) {
            for (const t of s.teams) {
                t.drivers = s.drivers.filter(d => d.team === t.internal_name);
            }
        }
    }

    /**
     * Checks that no data is missing in any of the data sets.
     */
    private checkConsistency () {
        for (const s of this.seasons) {
            for (const d of s.drivers) {
                if (!this.drivers[d.internal_name]) {
                    console.error(
                        `Driver '${d.internal_name}' was not found in the ` +
                        `driver list.`
                    );
                }
            }
        }
    }

    private calculateYearBounds () {
        for (const s of this.seasons) {
            if (this.earliestYear === undefined || this.earliestYear > s.year) {
                this.earliestYear = s.year;
            }
            if (this.latestYear === undefined || this.latestYear < s.year) {
                this.latestYear = s.year;
            }
        }
    }

    private calc_teamStrengthInfo () {
        this.calculateTeamsStrengthRank();
        this.calc_teamComparisons();
    }

    private calculateTeamsStrengthRank () {
        for (const s of this.seasons) {
            for (let i = 0; i < s.teams.length; i++) {
                s.teams[i].strengthInfo = {};
                s.teams[i].strengthInfo!.rank = i + 1;
            }
        }
    }

    private calc_teamComparisons () {
        for (const s of this.seasons) {
            const year = s.year;
            const lastYear = this.seasonsByYear[year - 1];
            const nextYear = this.seasonsByYear[year + 1];
            
            if (lastYear) {
                for (const t of s.teams) {
                    this.calc_teamLastYearComparison(t, lastYear);
                }
            }

            if (nextYear) {
                for (const t of s.teams) {
                    this.calc_teamNextYearComparison(t, nextYear);
                }
            }
        }
    }

    private calc_teamLastYearComparison (team: SeasonTeam, lastYear: Season) {
        const lastYearTeam = lastYear.teams.find(
            t => t.internal_name === team.internal_name
        );

        if (lastYearTeam) {
            team.strengthInfo!.delta = team.strengthInfo!.rank! -
                lastYearTeam.strengthInfo!.rank!;
            team.isNew = false;
        }
        else {
            team.strengthInfo!.delta = null;
            team.isNew = true;
        }
    }

    private calc_teamNextYearComparison (team: SeasonTeam, nextYear: Season) {
        const nextYearTeam = nextYear.teams.find(
            t => t.internal_name === team.internal_name
        );

        if (nextYearTeam) {
            team.isLastYear = false;
        }
        else {
            team.isLastYear = true;
        }
    }

    private calc_driverAges () {
        for (const s of this.seasons) {
            for (const d of s.drivers) {
                const driverInfo = this.drivers[d.internal_name];
                d.age = s.year - driverInfo.birthday;
            }
        }
    }

    private calc_driverComparisons () {
        for (const s of this.seasons) {
            const lastYear = this.seasonsByYear[s.year - 1];
            const nextYear = this.seasonsByYear[s.year + 1];
            
            if (lastYear) {
                for (const d of s.drivers) {
                    this.calc_driverLastYearComparison(d, lastYear);
                }
            }

            if (nextYear) {
                for (const d of s.drivers) {
                    this.calc_driverNextYearComparison(d, nextYear);
                }
            }
        }
    }

    private calc_eventStats () {
        for (const s of this.seasons) {
            if (!s.calendar) continue;

            const lastYear = this.seasonsByYear[s.year - 1];
            const nextYear = this.seasonsByYear[s.year + 1];

            let i = 1;
            for (const e of s.calendar) {
                e.position = i++;
                e.date = new Date(e.date);

                if (lastYear?.calendar) {
                    this.calc_eventLastYearComparison(e, lastYear);
                }
                if (nextYear?.calendar) {
                    this.calc_eventNextYearComparison(e, nextYear);
                }
            }
        }
    }

    private calc_driverLastYearComparison (driver: SeasonDriver, lastYear: Season) {
        const lastYearDriver = lastYear.drivers.find(
            d => d.internal_name === driver.internal_name
        );

        if (lastYearDriver) {
            driver.delta = driver.position - lastYearDriver.position;
            driver.isNew = false;
        }
        else {
            driver.delta = null;
            driver.isNew = true;
        }
    }

    private calc_driverNextYearComparison (driver: SeasonDriver, nextYear: Season) {
        const nextYearDriver = nextYear.drivers.find(
            d => d.internal_name === driver.internal_name
        );

        if (nextYearDriver) {
            driver.isLastYear = false;
        }
        else {
            driver.isLastYear = true;
        }
    }

    private calc_eventLastYearComparison (event: SeasonEvent, lastYear: Season) {
        const lastYearEvent = lastYear.calendar?.find(
            e => e.circuit === event.circuit
        );
        
        event.isNewTrack = lastYearEvent === null || lastYearEvent === undefined;
    }

    private calc_eventNextYearComparison (event: SeasonEvent, nextYear: Season) {
        const nextYearEvent = nextYear.calendar?.find(
            e => e.circuit === event.circuit
        );
        
        event.isLastYear = nextYearEvent === null || nextYearEvent === undefined;
    }
}

export interface Season {
    "year": number;
    "teams": SeasonTeam[];
    "drivers": SeasonDriver[];
    "calendar"?: SeasonEvent[]; // TODO: not optional
}

export interface SeasonTeam {
    "internal_name": string;
    "name": string;
    "license": string;
    "strength": number;
    "strengthInfo"?: TeamStrengthInfo;
    "isNew"?: boolean;
    "isLastYear"?: boolean;
    "drivers"?: SeasonDriver[];
}

export interface TeamStrengthInfo {
    "rank"?: number,
    "delta"?: number | null
}

export interface SeasonDriver {
    "internal_name": string;
    "team": string;
    "position": number;
    "score"?: number;
    "acronym"?: string;
    "age"?: number;
    "delta"?: number | null;
    "isNew"?: boolean;
    "isLastYear"?: boolean;
}

export interface SeasonEvent {
    "title": string;
    "circuit": string;
    "date": Date;
    "special"?: boolean;
    "country"?: string;
    "position"?: number;
    "isNewTrack"?: boolean;
    "isLastYear"?: boolean;
}

export interface Driver {
    "name": string;
    "acronym": string;
    "country": string;
    "birthday": number;
    "gender"?: string;
}

export interface Circuit {
    "name": string,
    "country": string,
    "type": string,
}

export interface Country {
    "display_name": string;
    "continent": string;
    "region": string;
}