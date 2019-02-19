import Label from '../../src/components/Label.vue';
import { Component, build } from './ComponentBuilder';
import { installSizeStub, positionOf, installMatcher } from './tester/label';


describe("The chart label", () => {
    beforeAll(() => {
        installSizeStub();
        installMatcher();
    });

    it("shows the text", () => {
        const label = build(new Component(Label).with.props({ text: 'example' }));
        expect(label.text()).toBe('example');
    });

    it("emits size when getting visible", () => {
        const label = build(new Component(Label).with.props({ text: 'example' }));

        label.setProps({ isVisible: true });

        expect(label.emitted()['change-size']).toHavePositiveSize();
    });

    it("does not emit size when invisible", () => {
        const label = build(new Component(Label).with.props({ text: 'example' }));

        label.setProps({ text: 'labelChanged' });

        expect(label.emitted()['change-size']).toBeUndefined();
    });

    it("emits size when label changes", () => {
        const label = build(new Component(Label)
            .with.props({ text: 'example', isVisible: true }));

        label.setProps({ text: 'labelChanged' });

        expect(label.emitted()['change-size']).toHavePositiveSize();
    });

    it("has css class", () => {
        const label = build(new Component(Label)
            .with.props({ text: 'example', styleClass: 'label' }));

        expect(label.classes()).toContain('label');
    });

    it("sets the anchor", () => {
        const label = build(new Component(Label)
            .with.props({ text: 'example', anchor: { x: 15, y: 20 } }));

        expect(positionOf(label)).toEqual({ x: '15px', y: '20px' });
    });
});
