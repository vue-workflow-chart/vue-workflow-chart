import State from '../../src/components/State.vue';
import { setBBoxFunction } from '../../src/components/State.vue';
import { Component } from './unit/ComponentBuilder';
import Vue from 'vue';


const build = (component) => {
    return {
        state: component.build(),
    };
};

const labelOf = (state) => {
    const labelElement = state.find({ ref: 'label' });
    return labelElement.text();
};

const stubBBoxFunction = () => {
    setBBoxFunction((label) => ({
        width: label.innerHTML.trim().length*10,
        height: 100,
    }));
};

const positionOf = (state) => {
    const attributes = state.attributes();
    return { x: parseFloat(attributes.x), y: parseFloat(attributes.y) };
};

describe("The state component", () => {
    it("has a rendered label", () => {
        stubBBoxFunction();
        const { state } = build(new Component(State)
            .and.props({ id: 'state_1', label: 'deleted', center: { x: 0, y: 0 } }));

        expect(labelOf(state)).toBe("deleted");
    });

    it("sets position", async () => {
        stubBBoxFunction();
        const { state } = build(new Component(State)
            .and.props({ id: 'state_1', label: 'deleted', center: { x: 0, y: 0 } }));

        await Vue.nextTick();
        expect(positionOf(state)).toEqual({ x: -('deleted'.length*10+20)/2, y: -(100+20)/2 });
    });

    it("emits change when size changes", async () => {
        stubBBoxFunction();
        const { state } = build(new Component(State)
            .and.props({ id: 'state_1', label: 'deleted', center: { x: 0, y: 0 } }));

        await Vue.nextTick();
        expect(state.emitted('size-change')).toEqual(expect.arrayContaining([[
            { id: 'state_1', size: { width: 90, height: 120 } } ]]));
    });

    it("emits change when label changes", async () => {
        stubBBoxFunction();
        const { state } = build(new Component(State)
            .and.props({ id: 'state_1', label: 'deleted', center: { x: 0, y: 0 } }));

        state.setProps({ label: 'updatedLabel' });
        await Vue.nextTick();

        expect(state.emitted('size-change').length).toEqual(2);
        expect(state.emitted('size-change')[1]).toEqual(expect.arrayContaining([
            { id: 'state_1', size: { width: 'updatedLabel'.length*10 + 20, height: 100 + 20 } },
        ]));
    });
});
