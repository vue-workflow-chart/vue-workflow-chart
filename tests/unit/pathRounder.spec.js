import Path from '../../src/lib/PathRounder';

describe("The path rounder", () => {
    it("creates radius on rect", () => {
        const path = new Path();
        path.setPath([ { x: 0, y: 0 }, { x:0, y:10 }, { x: 10, y: 10 } ]);

        expect(path.svgPath).toBe('M0 0 L0 10 L10 10');
    });
});
