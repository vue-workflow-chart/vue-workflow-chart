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
            .and.transitions([{ source: 'state_id1', target: 'state_id2', label: 'trans' }])
            .build();

        expect(layout.transitions).toEqual(expect.arrayContaining([{
            id: 'transition_id1',
            path: expect.any(Array),
            label: {
                point: {
                    x: expect.any(Number),
                    y: expect.any(Number),
                },
                text: 'trans',
            },
        }]));
    });

    const centerOf = (stateId, layout) => {
        const states = layout.states.filter(state => state.id === stateId);
        for (const state of states ) {
            return state.center;
        }
    };

    it("sets size for a state", () => {
        const layout = new LayoutBuilder().with.states(['first']).build();

        layout.setStateSize('state_id1', { width: 100, height: 50 });

        expect(centerOf('state_id1', layout)).toEqual({ x: 50, y: 25 });
    });
});
