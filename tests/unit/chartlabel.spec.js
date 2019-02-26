import Label from '../../src/components/Label.vue';
import { Component, build } from './ComponentBuilder';
import { positionOf } from './tester/label';


describe("The chart label", () => {
    it("shows the text", () => {
        const label = build(new Component(Label).with.props({ text: 'example' }));
        expect(label.text()).toBe('example');
    });

    it("sets the anchor", () => {
        const label = build(new Component(Label)
            .with.props({ text: 'example', anchor: { x: 15, y: 20 } }));

        expect(positionOf(label)).toEqual({ x: '15px', y: '20px' });
    });

    it("emits click when clicked", ()=>{
        const label=build(new Component(Label).with.props({ text: 'example' }));
        label.trigger('click');
        expect(label.emitted('click')).toBeTruthy();
    });
});
