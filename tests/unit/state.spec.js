import State from '../../src/components/State.vue';
import { setBBoxFunction } from '../../src/components/State.vue';
import { Component } from './ComponentBuilder';
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
        width: label.textContent.trim().length*10,
        height: 100,
    }));
};

describe("The state component", () => {
    it("has a rendered label", () => {
        stubBBoxFunction();
        const { state } = build(new Component(State)
            .and.props({ id: 'state_1', label: 'deleted', center: { x: 0, y: 0 } }));

        expect(labelOf(state)).toBe("deleted");
    });

    it("emits change when size changes", async () => {
        stubBBoxFunction();
        const { state } = build(new Component(State)
            .and.props({ id: 'state_1', label: 'deleted', center: { x: 0, y: 0 } }));

        await Vue.nextTick();
        expect(state.emitted('size-change')).toEqual(expect.arrayContaining([[
            { id: 'state_1', size: { width: 70, height: 100 } } ]]));
    });

    it("emits change when label changes", async () => {
        stubBBoxFunction();
        const { state } = build(new Component(State)
            .and.props({ id: 'state_1', label: 'deleted', center: { x: 0, y: 0 } }));

        state.setProps({ label: 'updatedLabel' });
        await Vue.nextTick();

        expect(state.emitted('size-change').length).toEqual(2);
        expect(state.emitted('size-change')[1]).toEqual(expect.arrayContaining([
            { id: 'state_1', size: { width: 'updatedLabel'.length*10, height: 100 } },
        ]));
    });
});
