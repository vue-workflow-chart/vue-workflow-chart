import { cloneDeep } from 'lodash';

export class WorkflowTester {

    constructor() {
        this.states = [];
        this.transitions = [];
    }

    withStates(states) {
        const workflow = cloneDeep(this);
        let i = 1;
        workflow.states = states.map(stateLabel => {
            return {
                id: `state_id${i++}`,
                label: stateLabel,
                width: 20,
                height: 10,
            };
        });
        return workflow;
    }

    andTransitions(transitions) {
        const workflow = new cloneDeep(this);
        workflow.transitions = transitions.map(transition => {
            let i = 1;
            return {
                id: `transition_id${i++}`,
                width: 20,
                height: 10,
                ...transition,
            };
        });
        return workflow;
    }
}

