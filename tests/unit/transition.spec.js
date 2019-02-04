import Transition from '../../src/components/Transition.vue';
import { Component } from './ComponentBuilder';


const path = [ { x: 0, y: 0 }, { x: 100, y: 100 } ];

const changedPath = [ { x: 0, y: 0 }, { x: 50, y: 50 }, { x: 100, y: 100 } ];

const changedSvgPath = 'M0 0 L25 25 Q50 50 75 75 L100 100';

const label= {
    text: 'MyLabel',
    point: {
        x: 0,
        y: 0,
    },
};

const build = (transitions) => {
    return {
        component : transitions.build(),
    };
};

const textOf = (label) => {
    return label.text();
};

const pathAttributeOf = (ref) => ref.attributes().d;

describe("the transition component", () => {
    it("has a label", () => {
        const { component } = build(new Component(Transition)
            .and.props({ id:"1", label: label, transitionPath: path }));
        const transitionLabel = component.find({ ref: "transitionLabel" });

        expect(textOf(transitionLabel)).toBe('MyLabel');
    });

    it("has a path", () => {
        const { component } = build(new Component(Transition)
            .and.props({ id:"1", transitionPath: path }));
        const transitionPath = component.find({ ref:"transitionPath" });

        expect(pathAttributeOf(transitionPath)).not.toBe('');
    });

    it("has a new svg path after changing", () => {
        const { component } = build(new Component(Transition)
            .and.props({ id:"1", label: label, transitionPath:path }));
        const transitionPath = component.find({ ref:"transitionPath" });
        component.setProps({ transitionPath : changedPath });

        expect(pathAttributeOf(transitionPath)).toBe(changedSvgPath);
    });
});
