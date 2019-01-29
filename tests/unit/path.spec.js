import { PathBuilder } from './tester/path';

const svgPathOf = (pathComponent) =>  pathComponent.svgPath;

describe("the path component", () => {
    it("has an empty svg string at default", () => {
        const pathComponent = new PathBuilder().build();

        expect(svgPathOf(pathComponent)).toBe("");
    });

    describe("has the right path with", () => {
        const svgPathWithTwoPoints = "M0 0 L50 50 L100 100";
        const svgPathWithThreePoints = "M0 0 L25 25 Q50 50 75 75 L100 100";
        const twoPoints = [ { x: 0, y: 0 }, { x: 100, y: 100 } ];
        const threePoints = [ { x: 0, y: 0 }, { x:50,y:50 }, { x: 100, y: 100 } ];

        it("two points", () => {
            const pathComponent = new PathBuilder().with.transitionPathOf(twoPoints).build();

            expect(svgPathOf(pathComponent)).toBe(svgPathWithTwoPoints);
        });

        it("three points", () => {
            const pathComponent = new PathBuilder().with.transitionPathOf(threePoints).build();

            expect(svgPathOf(pathComponent)).toBe(svgPathWithThreePoints);
        });
    });
});
