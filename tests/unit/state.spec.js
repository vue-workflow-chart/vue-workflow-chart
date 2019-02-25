import State from '../../src/components/State.vue';
import { Component, build } from './ComponentBuilder';

describe("The state component", () => {

    it("has a rendered label", () => {
        const state = build(new Component(State).with.mount()
            .and.props({ id: 'state_1', label: 'deleted', center: { x: 0, y: 0 } }));

        expect(state.text()).toBe("deleted");
    });
    it("emits click with id when clicked", () => {
        const state = build(new Component(State).with.mount()
            .and.props({ id: 'state_1', label: 'deleted', center: { x: 0, y: 0 } }));

        state.trigger('click');

        expect(state.emitted('click')).toEqual([['state_1']]);
    });
});
