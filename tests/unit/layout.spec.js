import { LayoutBuilder } from './tester/layout';


const centerOf = (label, items) => {
    return items
        .filter(item => item.label === label)
        .map(item => item.center)[0];
};
const inStatesOf = (layout) => layout.states;
const inTransitionsOf = (layout) => layout.transitions;


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

    it("changes center of state when size changes", () => {
        const layout = new LayoutBuilder().with.states(['first']).build();
        const oldCenter = centerOf('first', inStatesOf(layout));

        layout.setStates([{ id: 'state_id1', label: 'first', width: 100, height: 50 }]);

        expect(centerOf('first', inStatesOf(layout))).not.toEqual(oldCenter);
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

    const labelOf = (transition) => transition.label;
    const firstTransitionIn = (layout) => layout.transitions[0];

    it("sets empty default label if not defined", () => {
        const layout = new LayoutBuilder().with.states(['first', 'second'])
            .and.transitions([{ source: 'state_id1', target: 'state_id2' }])
            .build();

        expect(labelOf(firstTransitionIn(layout))).toEqual({
            point: { x: expect.any(Number), y: expect.any(Number) },
            text: '',
        });
    });

    const centerOfLabel = (label, transitions) => {
        return transitions
            .filter(transition => transition.label.text === label)
            .map(transition => transition.label)
            .map(label => label.point)[0];
    };

    it("changes center of transition when size changes", () => {
        const transition = { source: 'state_id1', target: 'state_id2', label: 'transition' };
        const layout = new LayoutBuilder().with.states(['first', 'second'])
            .and.transitions([transition]).build();
        const oldCenter = centerOfLabel('transition', inTransitionsOf(layout));

        layout.setTransitions([{ ...transition, width: 200, height: 100 }]);

        expect(centerOfLabel('transition', inTransitionsOf(layout))).not.toEqual(oldCenter);
    });

    it("returns size of chart", () => {
        const layout = new LayoutBuilder().with.states(['first']).build();

        expect(layout.size).toEqual({ width: expect.any(Number), height: expect.any(Number) });
    });
});
