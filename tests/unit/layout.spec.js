import { LayoutBuilder } from './tester/layout';


describe("the layout component", () => {

    it("has an empty array of states by default", () => {
        const layout = new LayoutBuilder().build();

        expect(layout.states).toEqual([]);
    });

    it("sets width and height in states", () => {
        const layout = new LayoutBuilder().with.states(['first']).build();

        expect(layout.states).toEqual(expect.arrayContaining([{
            id: 'state_id1',
            label: 'first',
            center: { x: expect.any(Number), y: expect.any(Number) },
        }]));
    });

    it("has an empty array of transitions by default", () => {
        const layout = new LayoutBuilder().build();

        expect(layout.transitions).toEqual([]);
    });

    it("sets a transition", () => {
        const layout = new LayoutBuilder()
            .with.states(['first', 'second'])
            .and.transitions([{ source: 'state_id1', target: 'state_id2' }])
            .build();

        expect(layout.transitions).toEqual(expect.arrayContaining([{
            id: 'transition_id1',
            path: expect.any(Array),
            label: {
                point: {
                    x: expect.any(Number),
                    y: expect.any(Number),
                },
                text: expect.any(String),
            },
        }]));
    });
});
