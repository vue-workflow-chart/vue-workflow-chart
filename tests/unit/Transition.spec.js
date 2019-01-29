import transition from '../../src/components/Transition.vue';
import { mount } from '@vue/test-utils';

const build = (path, label) => {
    const wrapper = mount(transition, {
        propsData: {
            id: "1",
            transitionPath: path,
            label: label,
        },
    });
    return wrapper;
};

describe("The transition component", () => {
    it("has a label", () => {
        const path = [ { x: 0, y: 0 }, { x: 100, y: 100 } ];
        const label= {
            text: 'MyLabel',
            point: {
                x: 0,
                y: 0,
            },
        };
        const wrapper = build(path, label);
        expect(wrapper.vm.label.text).toBe('MyLabel');
    });

    describe("calculates the right path with", () => {
        const pathWithTwoPoints = "M0 0 L50 50 L100 100";
        const pathWithThreePoints = "M0 0 L25 25 Q50 50 75 75 L100 100";

        it("two points", () => {
            const path = [ { x: 0, y: 0 }, { x: 100, y: 100 } ];
            const wrapper = build(path);
            expect(wrapper.vm.svgPath).toBe(pathWithTwoPoints);
        });

        it("three points", () => {
            const path = [ { x: 0, y: 0 }, { x:50,y:50 }, { x: 100, y: 100 } ];
            const wrapper = build(path);
            expect(wrapper.vm.svgPath).toBe(pathWithThreePoints);
        });
    });
});
