import State from '../../src/components/State.vue';
import { Component, build } from './ComponentBuilder';
import { installSizeStub } from './tester/label';

describe("The state component", () => {
    beforeAll(() => {
        installSizeStub();
    });

    it("has a rendered label", () => {
        const state = build(new Component(State).with.mount()
            .and.props({ id: 'state_1', label: 'deleted', center: { x: 0, y: 0 } }));

        expect(state.text()).toBe("deleted");
    });

    it("emits change when visible", async () => {
        const state = build(new Component(State).with.mount()
            .and.props({ id: 'state_1', label: 'deleted', center: { x: 0, y: 0 } }));

        state.setProps({ isVisible: true });

        expect(state.emitted('size-change')).toEqual(expect.arrayContaining([[{
            id: 'state_1',
            size: { width: 'deleted'.length, height: expect.any(Number) },
        }]]));
    });
});
