import Page from "./Page";

import App from "App";

export default class GalleryPage extends Page {

    constructor () {

        const $element = (
            <div className="page-gallery">
                &lt;gallery&gt;
            </div>
        )

        super($element);
    }
}