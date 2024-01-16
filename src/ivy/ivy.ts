import IvyElement from "./IvyElement";

interface IvyRef {
    element: IvyElement | null,
}

export function $new (
    tag: string | Function | any,
    props: any,
    ...children: (Node | boolean)[]
) : Node
{
    if (typeof tag === "function") {
        return tag(props, ...children);
    }
    const element: HTMLElement = document.createElement(tag);

    for (const p in props) {
        if (props[p] === null || props[p] === undefined) {
            continue;
        }
        if (p === "ref") {
            props[p].element = $(element);
        }
        else if (p === "style") {
            if (typeof props[p] === "string") {
                element.setAttribute(p, props[p]);
            }
            else {
                element.setAttribute(p, _toCssString(props[p]));
            }
        }
        else if (p === "className" || p === "classname") {
            element.setAttribute("class", props[p]);
        }
        else if (typeof props[p] === "function") { // TODO: && name.toLowerCase() in window
            const evtName = p.startsWith("on") ? p.substring(2) : p;
            element.addEventListener(evtName.toLowerCase(), props[p]);
        }
        else {
            element.setAttribute(p, props[p].toString());
        }
    }

    for (const child of children) {
        // a child could be a boolean with value 'false' if returned by
        // an expression of type "false && IvyElement".
        if (child !== true && child !== false) {
            _appendIvyChild(element, child);
        }
    }

    return element;
}

/*
    props: any,
    ...children: (Node | boolean)[]
    */

export function $newFragment (props: any, ...children: any) {
    const frag = document.createDocumentFragment();

    if (children) {
        for (const c of children) {
            frag.appendChild(c);
        }
    }

    return frag;
}

/**
 * A shorthand for document.querySelector().
 * Returns the first element that meets the condition.
 * @param query A CSS query.
 */
export function $htmlFirst (query: string): Element | null {
    return document.querySelector(query);
}

/**
 * Returns the result of document.querySelector(query) as an IvyElement,
 * or null if the element was not found, or was not an HTMLElement.
 * @param query A CSS query.
 */
export function $first (query: string): IvyElement | null {
    return _toIvyElement($htmlFirst(query));
}

/**
 * A shorthand for document.querySelectorAll().
 * Returns an list with all the elements that meet the condition.
 * @param query A CSS query.
 * @returns 
 */
export function $htmlAll (query: string): NodeListOf<Element> {
    return document.querySelectorAll(query);
}

// TODO: $all

/**
 * A shorthand for document.getElementById().
 * Returns the element with the id given.
 * @param idName The id of the element to find.
 */
export function $htmlId (idName: string) : Element | null {
    return document.getElementById(idName);
}

/**
 * Returns the result of document.getElementById(idName) as an IvyElement,
 * or null if the element was not found, or was not an HTMLElement.
 * @param query The id of the element to find (without '#').
 */
export function $id (idName: string): IvyElement | null {
    return _toIvyElement($htmlId(idName));
}

/**
 * Returns an IvyRef object that can be used to recover refs from JSX calls.
 * @param element The node contained by this reference, which can be null.
 * @returns 
 */
export function $ref (element: HTMLElement | null): IvyRef {
    return {
        element: element ? $(element) : null,
    }
}

/**
 * Returns an array containing the (native) HTMLElements wrapped by
 * the IvyElements given.
 * @param elements 
 * @returns 
 */
export function $html (...elements: IvyElement[]): HTMLElement[] {
    return elements.map(e => e.element);
}


/**
 * Appends the child given to the parent given. The child may be actually an
 * array of children, in which case this function will be executed for each
 * child. This function takes into account if the child given is a normal
 * element, a text element or an IvyElement.
 * @param parent The node to which to append children.
 * @param child The child(ren) to append.
 */
function _appendIvyChild (parent: Node, child: Node | Node[] | any) {
    if (Array.isArray(child)) {
        child.forEach(c => _appendIvyChild(parent, c));
    }
    else {
        if (child instanceof HTMLElement) {
            parent.appendChild(child);
        }
        else if (child instanceof IvyElement) {
            parent.appendChild(child.element);
        }
        else if (child instanceof DocumentFragment) {
            parent.appendChild(child);
        }
        // TODO: Evaluate if this should be accepted behavior.
        else if (typeof child === "object") {
            if (child.element) {
                parent.appendChild(child.element);
            }
            else {
                throw new Error(`Object of type ${child} has no "element" key.`);
            }
        }
        else {
            const txt = document.createTextNode(child?.toString());
            parent.appendChild(txt);
        }
    }
}

function _toCssName (camelCase: string): string {
    let css = camelCase.replace(/([A-Z])/g, "-$1").toLowerCase();
    if (css.startsWith("-")) {
        css = css.substring(1);
    }
    return css;
}

function _toCssString (style: {}) {
    return Object.entries(style).map(([key, value]) => {
        return `${_toCssName(key)}:${value}`;
    }).join(";");
}

function _toIvyElement (element: Element | null): IvyElement | null {
    if (element === null) {
        return null;
    }
    else if (element instanceof HTMLElement) {
        return $(element);
    }
    else {
        return null;
    }
}

/**
 * Returns an intance of Component that wraps the element given.
 * This class contains a handful of methods to manipulate said element.
 * @param element The element to wrap.
 */
export function $ (element: HTMLElement): IvyElement {
    return new IvyElement(element);
}

//$.new = $new;
//$.first = $first;
//$.all = $all;
//$.id = $id;
//$.ref = $ref;

export const Ivy = {
    new: $new,
    newFragment: $newFragment,
    htmlFirst: $htmlFirst,
    htmlAll: $htmlAll,
    htmlId: $htmlId,
    ref: $ref,
    html: $html,
};