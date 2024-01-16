import Page from "./Page";

import App from "App";

export default class ListPage extends Page {

    constructor () {

        const $element = (
            <div className="page-list">
                &lt;list&gt;
            </div>
        )

        super($element);
    }
}