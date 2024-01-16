import IvyElement from "ivy/IvyElement";

export default class Page extends IvyElement {
    constructor (element: HTMLElement) {
        super(element);
    }

    setVisible (isVisible: boolean) : Page {
        if (isVisible) {
            this._element.style.removeProperty("display");
        }
        else {
            this._element.style.display = "none";
        }

        return this;
    }
}