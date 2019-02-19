import Transition from '../../src/components/Transition.vue';
import { Component, build } from './ComponentBuilder';
import { installSizeStub } from './tester/label';


const path = [ { x: 0, y: 0 }, { x: 100, y: 100 } ];

const changedPath = [ { x: 0, y: 0 }, { x: 50, y: 50 }, { x: 100, y: 100 } ];

const changedSvgPath = 'M0 0 L25 25 Q50 50 75 75 L100 100';

const label = {
    text: 'MyLabel',
    point: {
        x: 0,
        y: 0,
    },
};

const pathAttributeOf = (path) => path.attributes('d');

describe("the transition component", () => {
    beforeAll(() => {
        installSizeStub();
    });

    it("has a label", () => {
        const transition = build(new Component(Transition).with.mount()
            .and.props({ id:"1", label: label, transitionPath: path }));

        expect(transition.text()).toBe('MyLabel');
    });

    it("emits the size when visible", () => {
        const transition = build(new Component(Transition).with.mount()
            .and.props({ id: "1", label: label, transitionPath: path }));

        transition.setProps({ isVisible: true });

        expect(transition.emitted('size-change')).toEqual(expect.arrayContaining([[{
            id: '1',
            size: { width: 'MyLabel'.length, height: expect.any(Number) },
        }]]));
    });

    it("has a path", () => {
        const transition = build(new Component(Transition)
            .and.props({ id:"1", transitionPath: path }));
        const transitionPath = transition.find({ ref:"transitionPath" });

        expect(pathAttributeOf(transitionPath)).not.toBe('');
    });

    it("has a new svg path after changing", () => {
        const transition = build(new Component(Transition)
            .and.props({ id:"1", label: label, transitionPath:path }));
        const transitionPath = transition.find({ ref:"transitionPath" });
        transition.setProps({ transitionPath : changedPath });

        expect(pathAttributeOf(transitionPath)).toBe(changedSvgPath);
    });
});
