import Transition from '../../src/components/Transition.vue';
import { Component, build } from './ComponentBuilder';

const path = [ { x: 0, y: 0 }, { x: 100, y: 100 } ];

const label = {
    text: 'MyLabel',
    point: {
        x: 0,
        y: 0,
    },
};

const pathAttributeOf = (transition) => {
    const path = transition.find({ name: 'TransitionPath' })
        .find({ ref:"transitionPath" });
    return path.attributes('d');
};

describe("the transition component", () => {
    it("has a label", () => {
        const transition = build(new Component(Transition).with.mount()
            .and.props({ id:"1", label: label, transitionPath: path }));

        expect(transition.text()).toBe('MyLabel');
    });

    it("has a path", () => {
        const transition = build(new Component(Transition).mount()
            .and.props({ id:"1", transitionPath: [ { x: 0, y: 0 }, { x: 100, y: 100 } ] }));

        expect(pathAttributeOf(transition))
            .toEqual(expect.stringMatching('M0 0.* L100 100'));
    });
    it("emits click with id when clicked", () => {
        const transition = build(new Component(Transition).mount()
            .and.props({ id:"1", transitionPath: [ { x: 0, y: 0 }, { x: 100, y: 100 } ] }));
        const label=transition.find({ ref:'label' });

        label.trigger('click');

        expect(transition.emitted('click')).toEqual([['1']]);
    });
});
