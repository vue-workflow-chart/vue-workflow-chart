import WorkflowChart from '../../src/components/WorkflowChart.vue';
import { Component, build } from './ComponentBuilder';
import { size } from '../../src/lib/DivElement';

const transitions = [{
    id: "Kj7tqn",
    source: "static_state_deleted",
    target: "static_state_new",
    label: "wiederherstellen",
}, {
    id: "delete",
    source: "Hvfw2ds",
    target: "static_state_deleted",
    label: "delete",
}, {
    id: "Tpyly6p",
    source: "static_state_new",
    target: "Hvfw2ds",
    label: "freigeben",
}];

const states= [{
    id: "static_state_new",
    label: "Neu",
}, {
    id: "static_state_deleted",
    label: "Gelöscht",
}, {
    id: "Hvfw2ds",
    label: "Freigegeben",
}];

const stateSemantics= [{
    classname: "new",
    id: "static_state_new",
}, {
    classname: "deleted",
    id: "static_state_deleted",
}];


const layoutTransitionsOf = (chart) => chart.vm.layout.transitions;

const orientationOf = chart => {
    const states = chart.vm.layout.states;
    const last = 1;
    const delta = coord => Math.abs(states[last].center[coord] - states[0].center[coord]);
    const dx = delta('x');
    const dy = delta('y');
    if (dy > 4*dx) {
        return 'vertical';
    } else if (dx > 4*dy) {
        return 'horizontal';
    } else {
        return 'not decided';
    }
};

const classesOf = state => state.classes();

const filterLayoutTransitionsWhereStylingClassIsNew = chart =>
    layoutTransitionsOf(chart).filter(item => item.stylingClass === "new");

const findTransitionOf = (chart) =>
    chart.findComponent({ ref: filterLayoutTransitionsWhereStylingClassIsNew(chart)[0].id })
        .findComponent({ ref: 'label' });


describe("Workflow Chart component", ()  => {

    beforeEach(() => {
        size._getSizeOf = () => ({ width: 20, height: 10 });
    });

    describe("orientation", () => {
        it("is vertical when passed", () => {
            const chart = build(new Component(WorkflowChart)
                .with.props({ transitions, states, orientation: 'vertical' }));

            expect(orientationOf(chart)).toBe('vertical');
        });
    });

    describe("State Semantics", () => {
        it("has the right styling class for states when property is empty", () => {
            const chart = build(new Component(WorkflowChart).with.mount()
                .and.props({ transitions, states }));
            const state = chart.findComponent({ ref: 'static_state_new' });

            expect(classesOf(state)).toEqual([
              "vue-workflow-chart-label",
              "vue-workflow-chart-element",
              "vue-workflow-chart-state"
            ]);
        });

        it("has the right styling classes for states when property is passed", () => {
            const chart = build(new Component(WorkflowChart).with.mount()
                .and.props({ transitions, states, stateSemantics:stateSemantics }));
            const state = chart.findComponent({ ref: 'static_state_new' });

            expect(classesOf(state)).toEqual([
              "vue-workflow-chart-label",
              "vue-workflow-chart-element",
              "vue-workflow-chart-state",
              "vue-workflow-chart-state-new"
            ]);
        });

        it("has the right styling class for transitions when property is passed", () => {
            const chart = build(new Component(WorkflowChart).with.mount()
                .and.props({ transitions, states, stateSemantics }));
            const transitionWithTargetNew = findTransitionOf(chart);

            expect(classesOf(transitionWithTargetNew)).toEqual([
              "vue-workflow-chart-label",
              "vue-workflow-chart-element",
              "vue-workflow-chart-transition-label",
              "vue-workflow-chart-transition-label-new"
            ]);
        });
    });

    it("updates state", async () => {
        const chart = build(new Component(WorkflowChart).mount()
            .and.props({ transitions: [], states: [{ id: 'new', label: 'New' }] }));

        await chart.setProps({ states: [{ id: 'new', label: 'Other label' }] });
        const state = chart.findComponent({ ref: 'new' });

        expect(state.text()).toBe('Other label');
    });

    it("emits size after state is updated", async () => {
        const chart = build(new Component(WorkflowChart)
            .and.props({ transitions: [], states: [{ id: 'new', label: 'New' }] }));

        await chart.setProps({ states: [{ id: 'new', label: 'Other label' }] });

        expect(chart.emitted('size-change').length).toBe(2);
    });

    it("updates transitions", async () => {
        const chart = build(new Component(WorkflowChart).mount()
            .and.props({
                states: [
                    { id: 'state_1', label: 'new' },
                    { id: 'state_2', label: 'deleted' },
                ],
                transitions: [
                    { id: 'trans_1', label: 'delete', target: 'state_2', source: 'state_1' },
                ],
            }));

        await chart.setProps({ transitions: [
            { id: 'trans_1', label: 'changed label', target: 'state_2', source: 'state_1' },
        ] });

        const transition = chart.findComponent({ ref: 'trans_1' });
        expect(transition.text()).toBe('changed label');
    });

    it("emits size of chart", () => {
        const chart = build(new Component(WorkflowChart)
            .with.props({ transitions: [], states: [{ id: '1', label: 'Deleted' }] }));

        expect(chart.emitted('size-change')).toEqual([[{
            width: expect.any(Number),
            height: expect.any(Number),
        }]]);
    });

    it("emits state-click with id when state is clicked", async () => {
        const chart = build(new Component(WorkflowChart).mount()
            .with.props({ transitions: [], states: [{ id: '1', label: 'Deleted' }] }));
        const state = chart.findComponent({ ref: "1" });

        await state.trigger("click");

        expect(chart.emitted('state-click')).toEqual([['1']]);
    });

    it("emits transition-click with id when transition is clicked", async () => {
        const chart = build(new Component(WorkflowChart).mount()
            .with.props({ transitions, states }));
        const transitionLabel = chart.findComponent({ ref: "delete" }).findComponent({ ref: 'label' });

        await transitionLabel.trigger("click");

        expect(chart.emitted('transition-click')).toEqual([['delete']]);
    });

    it("removes displayed state when state-prop is removed", async () => {
        const chart = build(new Component(WorkflowChart).mount()
            .with.props({ transitions: [], states: [{ id: '1', label: 'Deleted' }] }));

        await chart.setProps({ states: [] });

        expect(chart.text()).not.toEqual('Deleted');
    });

});
