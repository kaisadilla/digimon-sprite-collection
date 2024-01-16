/**
 * The base class of any component in the project. It contains its HTMLElement
 * and a get accessor for it.
 */
export default class IvyElement {
    /**
     * The HTML element this IvyElement is wrapping.
     */
    protected _element: HTMLElement;

    constructor (element: HTMLElement) {
        this._element = element;
    }

    get element () {
        return this._element;
    }

    /**
     * Hides this element by setting its display css property to "none".
     */
    hide () {
        this.element.style.display = "none";
    }

    /**
     * Shows this element by removing its display css property.
     */
    show () {
        this.element.style.removeProperty("display");
    }

    /**
     * Adds the class given if the condition is true, or
     * removes it if the condition is false.
     */
    boolClass (className: string, condition: boolean) {
        if (condition) {
            this.element.classList.add(className);
        }
        else {
            this.element.classList.remove(className);
        }
        return this;
    }

    /**
     * Removes all child nodes from this element.
     */
    clearChildren () {
        while (this.element.lastElementChild) {
            this.element.removeChild(this.element.lastElementChild);
        }
        return this;
    }

    /**
     * Appends, in order, all nodes given.
     */
    appendChildren (...children: (Node | IvyElement | any)[]) {
        for (const c of children) {
            if (c instanceof IvyElement) {
                this.element.appendChild(c.element);
            }
            else if (c instanceof Node) {
                this.element.appendChild(c);
            }
            else if (typeof c === "object") {
                if (c.element) {
                    this.element.appendChild(c.element);
                }
                else {
                    throw new Error(`Object of type ${c} has no "element" key.`);
                }
            }
        }
        return this;
    }
}