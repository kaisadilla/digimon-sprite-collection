const fs = require("fs");
const path = require("path");

const IMAGES_FOLDER = "public/img/sprites/digimon/";
const DATA_FOLDER = "src/data/";

const CATEGORIES = {
    Bandai: "bandai",
    Toei: "toei",
    Digivice: "digivice",
    DigiviceTall: "digiviceTall",
    Vpet: "vpet",
    XrosLoader: "xrosLoader",
    Sprite: "sprite",
    SpriteSmall: "spriteSmall",
    Icon: "icon",
    VitalBracelet: "vitalBracelet",
}

const FOLDER_CATEGORIES = {
    "adventure_02": CATEGORIES.Sprite,
    "adventure_02_ow": CATEGORIES.Icon,
    "bandai": CATEGORIES.Bandai,
    "championship": CATEGORIES.Icon,
    "d_project": CATEGORIES.Icon,
    "digivice_dtector": CATEGORIES.Digivice,
    "digivice_tall": CATEGORIES.DigiviceTall,
    "digivice_window": CATEGORIES.Digivice,
    "dm_ver_s": CATEGORIES.Icon,
    "monster_s": CATEGORIES.SpriteSmall,
    "story": CATEGORIES.Sprite,
    "story_ow": CATEGORIES.Icon,
    "toei": CATEGORIES.Toei,
    "vital_bracelet": CATEGORIES.VitalBracelet,
    "vpet": CATEGORIES.Vpet,
    "xros_loader": CATEGORIES.XrosLoader,
}

const json = require("../src/data/digimon-data.json");

const spriteFolders = fs.readdirSync(IMAGES_FOLDER);

for (const f of spriteFolders) {
    if ((f in FOLDER_CATEGORIES) === false) {
        console.error(`Folder ${f} is not defined in code.`);
        continue;
    }

    exploreSpriteFolder(f);
}

function exploreSpriteFolder (folder) {
    const sprites = fs.readdirSync(IMAGES_FOLDER + folder);
    const category = FOLDER_CATEGORIES[folder];

    for (const file of sprites) {
        const fileName = path.parse(file).name;
        const digimon = fileName.split("-")[0];

        if (json[digimon] === undefined) {
            console.error(`Digimon '${digimon}' not found.`);
            json[digimon] = {images: {}};
        }
        if (json[digimon].images === undefined) {
            json[digimon].images = {};
        }
        if (json[digimon].images[category] === undefined) {
            json[digimon].images[category] = [];
        }

        json[digimon].images[category].push({folder, file});
    }
}

console.log(json);

fs.writeFile(
    DATA_FOLDER + "digimon.json",
    JSON.stringify(json, null, 2),
    err => {
        if (err) console.error(err);
    }
);

console.info(`Created file \"${DATA_FOLDER}/digimon.json\".`);