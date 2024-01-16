import SeriesData from "logic/SeriesData";
//import "data/seasons.json";

export default class App {
    public static data: SeriesData;
    
    public static initialize () {
        const seasons = require("data/seasons.json");
        const drivers = require("data/drivers.json");
        const circuits = require("data/circuits.json");
        const countries = require("data/countries.json");

        App.data = new SeriesData(seasons, drivers, circuits, countries);
        App.data.calculateData();
    }
}