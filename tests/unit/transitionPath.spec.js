import TransitionPath from '../../src/components/TransitionPath.vue';
import { Component, build } from './ComponentBuilder';

describe("The transition path component", () => {

    it("sets the path", () => {
        const path = build(new Component(TransitionPath)
            .and.props({ path: [{ x: 0, y: 0 }, { x: 0, y: 50 }, { x: 50, y: 50 }] }));
        const svgPath = path.find({ ref: 'transitionPath' }).attributes('d');

        expect(svgPath).toEqual(expect.stringMatching('M0 0 .* L50 50'));
    });

    it("gets updated when path changes", async () => {
        const path = build(new Component(TransitionPath)
            .and.props({ path: [{ x: 0, y: 0 }, { x: 50, y: 50 }] }));

        await path.setProps({ path: [{ x: 0, y: 0 }, { x: 40, y: 40 }] });
        const svgPath = path.find({ ref: 'transitionPath' }).attributes('d');

        expect(svgPath).toEqual(expect.stringMatching('M0 0.* L40 40'));
    });

    it("sets width in svg", () => {
        const path = build(new Component(TransitionPath)
            .and.props({ path: [{ x: 10, y: 10 }, { x: 60, y: 20 }, { x: 50, y: 50 }] }));

        expect(path.attributes('width')).toBe(`${60 + 20}px`);
    });

    it("sets height in svg", () => {
        const path = build(new Component(TransitionPath)
            .and.props({ path: [{ x: 0, y: 10 }, { x: 0, y: 50 }] }));

        expect(path.attributes('height')).toBe(`${50 + 20}px`);
    });
});
