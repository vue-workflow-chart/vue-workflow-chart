const lengthOf = (style, element) => {
    return parseInt(window.getComputedStyle(element, null)[style], 0);
};


export class Size {
    constructor(lengthOfFunction = null) {
        this.lengthOf = lengthOfFunction ? lengthOfFunction : lengthOf;
        this.element = null;
        this.content = null;
    }

    _getSizeOf(element) {
        const lengthOf = (style) => this.lengthOf(style, element);
        return {
            width: element.offsetWidth + lengthOf('marginLeft') + lengthOf('marginRight'),
            height: element.offsetHeight + lengthOf('marginTop') + lengthOf('marginBottom'),
        };
    }

    ofDivWith(item, classes) {
        if (!this.element) {
            this._createElementWhenBodyExists();
        }
        this.element.setAttribute('class', classes);
        this.content.nodeValue = item.label;

        return this._getSizeOf(this.element);
    }

    _createElementWhenBodyExists() {
        const { element, content } = this._createHiddenElement();
        this.element = element;
        this.content = content;
    }

    _createHiddenElement() {
        const element = document.createElement('div');
        const content = document.createTextNode('');
        element.appendChild(content);
        element.style.left = "-1000px";
        element.style.position = 'absolute';
        document.body.appendChild(element);

        return { element, content };
    }
}


export const size = new Size();

