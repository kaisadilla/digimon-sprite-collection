export default abstract class Constants {
    //--------//
    // ONLINE //
    //--------//
    static readonly CONNECTION_URL = "https://localhost:5000/hub";

    //--------//
    // ASSETS //
    //--------//
    static readonly TYPE_ICON_FOLDER = "/img/type-icon";
    static readonly TYPE_BOX_FOLDER = "/img/type-box";
    static readonly CATEGORY_BOX_FOLDER = "/img/category-box";
    static readonly FIGHTER_MODEL_FOLDER = "/img/fighter/render";
    static readonly ICON_FOLDER = "/img/fighter/icon";
    static readonly SMALLICON_FOLDER = "/img/fighter/smallicon";
    static readonly AVATAR_FOLDER = "/img/trainer";

    //---------------//
    // HTML ELEMENTS //
    //---------------//
    static readonly ID_TOOLTIP_ORIGIN = "tooltip-origin";
    static readonly ID_PAGE_CONTAINER = "page-container";
    static readonly ID_SECTION_TABS_CONTAINER = "section-tab-group";
    static readonly ID_ROOM_TABS_CONTAINER = "room-tab-group";

    //-------------//
    // LOGICAL IDS //
    //-------------//
    static readonly HOME_ID = "home";

    //-----------------//
    // BATTLE - VISUAL //
    //-----------------//
    static readonly FRIENDLY_SCALE = 1.5;
    /**
     * The amount of delay before each animation, in milliseconds.
     */
    static readonly ANIM_DELAY = 250;

    //----------------//
    // BATTLE - LOGIC //
    //----------------//
    static readonly MAX_TEAM_SIZE = 6;
    static readonly MAX_ENERGY = 100;
}

export enum ResponseType {
    cancel = "Cancel",
    chooseTeam = "ChooseTeam",
}