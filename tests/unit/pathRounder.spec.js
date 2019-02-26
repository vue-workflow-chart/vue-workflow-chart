import Path from '../../src/lib/PathRounder';

describe("The path rounder", () => {
    it("creates path with edgy corners", () => {
        const path = new Path(0);
        path.setPath([ { x: 0, y: 0 }, { x:0, y:10 }, { x: 10, y: 10 } ]);

        expect(path.svgPath).toBe("M0 0 L0 10 Q0 10 0 10 L10 10");
    });

    it("creates straight line", () => {
        const path = new Path(12);
        path.setPath([ { x: 0, y: 0 }, { x:10, y:10 } ]);

        expect(path.svgPath).toBe("M0 0 L10 10");
    });

    it("creates path with rounded corner with radius 12", () => {
        const path = new Path(12);
        path.setPath([ { x: 0, y: 0 }, { x:0, y:30 }, { x: 30, y: 30 } ]);

        expect(path.svgPath).toBe("M0 0 L0 18 Q0 30 12 30 L30 30");
    });

    it("creates path with rounded corner when radius is to large", () => {
        const path = new Path(15);
        path.setPath([ { x: 0, y: 0 }, { x:0, y:10 }, { x: 40, y: 10 } ]);

        expect(path.svgPath).toBe("M0 0 L0 5 Q0 10 5 10 L40 10");
    });
});
