import Layout from '../../../src/lib/layout';

export class LayoutBuilder {
    constructor() {
        this._states = [];
        this._transitions = [];
    }

    get with() {
        return this;
    }

    get and() {
        return this;
    }

    states(states) {
        let i = 1;
        this._states = states.map(stateLabel => {
            return {
                id: `state_id${i++}`,
                label: stateLabel,
            };
        });
        return this;
    }

    transitions(transitions) {
        this._transitions = transitions.map(transition => {
            let i = 1;
            return {
                id: `transition_id${i++}`,
                ...transition,
            };
        });
        return this;
    }

    build() {
        const layout = new Layout();
        layout.setStates(this._states);
        layout.setTransitions(this._transitions);
        return layout;
    }
}
