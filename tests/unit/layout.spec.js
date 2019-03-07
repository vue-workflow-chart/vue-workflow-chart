import Layout from '../../src/lib/layout';
import { WorkflowTester } from './tester/workflow';
import { installOrientationMatcher, orientation } from './tester/layout';

const { VERTICAL, HORIZONTAL } = orientation;


const centerOf = (label, items) =>
    items
        .filter(item => item.label === label)
        .map(item => item.center)[0];

const inStatesOf = (layout) => layout.states;

const simpleWorkflow = new WorkflowTester()
    .withStates(['first', 'second'])
    .andTransitions([{ source: 'state_id1', target: 'state_id2' }]);

const workflowWithTransitionLabel = label =>
    simpleWorkflow.andTransitions([{ source: 'state_id1', target: 'state_id2', label }]);


describe("the layout component", () => {

    it("has an empty array of states by default", () => {
        const layout = Layout.from(new WorkflowTester());

        expect(layout.states).toEqual([]);
    });

    it("sets width and height in states", () => {
        const layout = Layout.from(new WorkflowTester().withStates(['first']));

        expect(layout.states).toEqual(expect.arrayContaining([{
            id: 'state_id1',
            label: 'first',
            center: { x: expect.any(Number), y: expect.any(Number) },
        }]));
    });

    it("updates center of state when size changes", () => {
        const layout = Layout.from(new WorkflowTester().withStates(['first']));
        const oldCenter = centerOf('first', inStatesOf(layout));

        layout.setWorkflow(new WorkflowTester()
            .withStates([{ id: 'state_id1', label: 'first', width: 100, height: 50 }]));

        expect(centerOf('first', inStatesOf(layout))).not.toEqual(oldCenter);
    });

    it("has an empty array of transitions by default", () => {
        const layout = Layout.from(new WorkflowTester());

        expect(layout.transitions).toEqual([]);
    });

    it("sets a transition", () => {
        const layout = Layout.from(workflowWithTransitionLabel('trans'));

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
        const layout = Layout.from(simpleWorkflow);

        expect(labelOf(firstTransitionIn(layout))).toEqual({
            point: { x: expect.any(Number), y: expect.any(Number) },
            text: '',
        });
    });

    it("returns size of chart", () => {
        const layout = Layout.from(new WorkflowTester().withStates(['first']));

        expect(layout.size).toEqual({ width: expect.any(Number), height: expect.any(Number) });
    });

    describe("orientation", () => {

        const pathsOf = transitions => transitions.map(transition => transition.path);

        beforeAll(() => {
            installOrientationMatcher();
        });

        it("is horizontal by default", () => {
            const layout = Layout.from(simpleWorkflow);

            expect(pathsOf(layout.transitions)).toHaveOrientation(HORIZONTAL);
        });

        it("is vertical when passed", () => {
            const layout = Layout.from(simpleWorkflow, 'vertical');

            expect(pathsOf(layout.transitions)).toHaveOrientation(VERTICAL);
        });

        it("is horizontal when passed prop is wrong", () => {
            const layout = Layout.from(simpleWorkflow, 'WrongOrientation');

            expect(pathsOf(layout.transitions)).toHaveOrientation(HORIZONTAL);
        });
    });
});
