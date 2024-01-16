export interface DigimonList {
    [key: string] : Digimon;
}

export interface Digimon {
    id: string;
    displayName: string;
    japaneseName: string;
    year: number;
    images: {[key in ImageCategory]? : ImagePath[]}
}

export type ImageCategory = "bandai"
    | "toei"
    | "digivice"
    | "digiviceTall"
    | "vpet"
    | "xrosLoader"
    | "sprite"
    | "spriteSmall"
    | "icon"
    | "vitalBracelet"
    ;

export interface ImagePath {
    folder: string;
    file: string;
}