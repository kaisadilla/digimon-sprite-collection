import "styles/pages/list-page.scss";

import { Digimon, DigimonList, ImagePath } from "data/models";
import Page from "./Page";

import App from "App";
import { $ref } from "ivy/ivy";

export default class ListPage extends Page {

    constructor () {
        const list: DigimonList = require("data/digimon.json");
        const $tbody = $ref(null);

        const $element = (
            <div className="page page-list">
                <h2>List of digimon</h2>
                <table className="digimon-list-table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Bandai</td>
                            <td>Toei</td>
                            <td title="Digivice">dv</td>
                            <td title="Digivice tall">dv tall</td>
                            <td>vpet</td>
                            <td>Xros Loader</td>
                            <td>sprite</td>
                            <td title="small sprite">small spr.</td>
                            <td>icon</td>
                            <td title="Vital Bracelet">vb</td>
                        </tr>
                    </thead>
                    <tbody ref={$tbody}>

                    </tbody>
                </table>
            </div>
        )

        super($element);

        const $rows = [];
        
        for (const d in list) {
            $rows.push(this.buildDigimonRow(list[d]));
        }

        $tbody.element?.appendChildren($rows);
    }

    buildDigimonRow (digimon: Digimon) {
        console.log(digimon)
        return (
            <tr>
                <td className="names">
                    <span className="display-name">{digimon.displayName}</span>
                    <span className="jp-name">{digimon.japaneseName}</span>
                </td>
                {this.buildDigimonCell("bandai", digimon.images.bandai)}
                {this.buildDigimonCell("toei", digimon.images.toei)}
                {this.buildDigimonCell("", digimon.images.digivice)}
                {this.buildDigimonCell("", digimon.images.digiviceTall)}
                {this.buildDigimonCell("", digimon.images.vpet)}
                {this.buildDigimonCell("", digimon.images.xrosLoader)}
                {this.buildDigimonCell("", digimon.images.sprite)}
                {this.buildDigimonCell("", digimon.images.spriteSmall)}
                {this.buildDigimonCell("", digimon.images.icon)}
                {this.buildDigimonCell("", digimon.images.vitalBracelet)}
            </tr>
        )
    }

    buildDigimonCell (groupName: string, images?: ImagePath[]) {
        if (images === undefined) {
            return <td className={"group-" + groupName}></td>;
        }

        const $imgs = [];

        for (const img of images) {
            $imgs.push(<img src={this.getImagePath(img)} />);
        }

        return <td className={"group-" + groupName}>{$imgs}</td>;
    }

    getImagePath (path: ImagePath) {
        return `img/sprites/digimon/${path.folder}/${path.file}`;
    }
}

/*    Bandai: "bandai",
    Toei: "toei",
    Digivice: "digivice",
    DigiviceTall: "digivice_tall",
    Vpet: "vpet",
    XrosLoader: "xros_loader",
    Sprites: "sprites",
    SpritesSmall: "sprites_small",
    Icon: "icon",
    VitalBracelet: "vital_bracelet", */