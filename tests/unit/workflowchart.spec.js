import WorkflowChart from '../../src/components/WorkflowChart.vue';
import { Component, build } from './ComponentBuilder';
import { installSizeStub, positionOf } from './tester/label';
import { cloneDeep } from 'lodash';

import Vue from 'vue';


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

const layoutStatesOf = (chart) => chart.vm.layoutStates;

const layoutTransitionsOf = (chart) => chart.vm.layoutTransitions;


const positionIn = (chart, ref) => {
    const state = chart.find({ ref });
    return positionOf(state);
};

const ofState = (label) => label;

describe("Workflow Chart component", ()  => {
    beforeAll(() => {
        installSizeStub();
    });

    it("has transitions and states", () => {
        const chart = build(new Component(WorkflowChart)
            .and.props({ transitions, states }));

        expect(layoutStatesOf(chart)).not.toEqual([]);
        expect(layoutTransitionsOf(chart)).not.toEqual([]);
    });

    it("updates state", async () => {
        const chart = build(new Component(WorkflowChart).mount()
            .with.options({ sync: false })
            .and.props({ transitions: [], states: [{ id: 'new', label: 'New' }] }));
        chart.vm.visibilityChanged(true);

        chart.setProps({ states: [{ id: 'new', label: 'Other label' }] });
        await Vue.nextTick();
        const state = chart.find({ ref: 'new' });

        expect(state.text()).toBe('Other label');
    });

    xit("updates transitions", async () => {
        const chart = build(new Component(WorkflowChart).mount()
            .with.options({ sync: false })
            .and.props({ transitions, states }));
        chart.setData({ isVisible: true });

        chart.setProps({ transitions: [{
            id: "delete",
            source: "Hvfw2ds",
            target: "static_state_deleted",
            label: "label changed",
        }] });
        await Vue.nextTick();

        const transition = chart.find({ ref: 'delete' });
        expect(transition.text()).toBe('loeschen');
    });

    xit("updates state position when getting visible", async () => {
        const chart = build(new Component(WorkflowChart).mount()
            .with.props({ states, transitions, isVisible: true }));
        const oldPosition = positionIn(chart, ofState('static_state_new'));

        const newStates = cloneDeep(states);
        const newState = newStates.filter(state => state.id === 'static_state_new')[0];
        newState.label = 'New Value and longer value';

        chart.setProps({ newStates });

        expect(positionIn(chart, ofState('static_state_new'))).not.toEqual(oldPosition);
    });
});
