import { mount, shallowMount } from '@vue/test-utils';


export function build(component) {
    return component.build();
}

class BaseComponent {
    get with() {
        return this;
    }
    get and() {
        return this;
    }
}

export class Component extends BaseComponent {
    constructor(vueComponent) {
        super();
        this._component = vueComponent;
        this._options = {};
        this._props = {};
        this._data = undefined;
        this.shallowMount();
    }

    mount() {
        this._mountFunction = mount;
        return this;
    }

    shallowMount() {
        this._mountFunction = shallowMount;
        return this;
    }

    props(props) {
        Object.assign(this._props, props);
        return this;
    }

    build() {
        const buildComponent = this._mountFunction(this._component, {
            ...this._options,
            propsData: this._props,
        });

        return buildComponent;
    }
}

