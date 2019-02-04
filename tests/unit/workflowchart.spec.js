import WorkflowChart from '../../src/components/WorkflowChart.vue';
import { Component } from './ComponentBuilder';
import { setBBoxFunction } from '../../src/components/State.vue';

import Vue from 'vue';


const build = (workflowchart) => {
    return {
        component : workflowchart.build(),
    };
};

const stubBBoxFunction = () => {
    setBBoxFunction((label) => ({
        width: label.innerHTML.trim().length*10,
        height: 100,
    }));
};
const transitions = [{
    id: "Kj7tqn",
    source: "static_state_deleted",
    target: "static_state_new",
    label: "wiederherstellen",
}, {
    id: "Hj56kfc",
    source: "Hvfw2ds",
    target: "static_state_deleted",
    label: "löschen",
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

const centerOf = (state) => state.center;

const layoutStatesOf = (component, index) => {
    if(index === "undefined") {
        return component.vm.layoutStates;
    }
    return component.vm.layoutStates[index];
};

const layoutTransitionsOf = (component) => {
    return component.vm.layoutTransitions;
};

const stateWithLabelNeuOf = (component) => component.find({ ref: "static_state_new" });

const setLabelOf = (state, label) => state.setProps({ label:label });


describe("Workflow Chart component",()  => {
    it("has transitions and states", () => {
        const { component } = build(new Component(WorkflowChart)
            .and.props({ transitions: transitions, states: states }));

        expect(layoutStatesOf(component)).not.toEqual([]);
        expect(layoutTransitionsOf(component)).not.toEqual([]);
    });

    it("has updated positions", async () => {
        stubBBoxFunction();
        const { component } = build(new Component(WorkflowChart)
            .with.mount()
            .and.props({ transitions: transitions, states: states }));
        const oldState = layoutStatesOf(component,0);

        setLabelOf(stateWithLabelNeuOf(component), "updatedLabel");
        await Vue.nextTick();

        const newState = layoutStatesOf(component,0);
        expect(centerOf(newState)).not.toEqual(centerOf(oldState));
    });
});
