const addSize = (sizeCalculation, classes) =>
    item => ({ ...item, ...sizeCalculation.ofDivWith(item, classes) });

const addStylingClassesFor = (semantics, isItemId) =>
    item => {
        for(const semantic of semantics) {
            if(isItemId(semantic.id, item)) {
                return { ...item, stylingClass: semantic.classname };
            }
        }
        return item;
    };

const isSelectedState = (id, state) => id === state.id;
const isTransitionTarget = (id, transition) => id === transition.target;


export default class Workflow {

    constructor({ states, transitions }) {
        this.states = states;
        this.transitions = transitions;
    }

    addLabelSize(sizeCalculation) {
        return new Workflow({
            states: this.states.map(addSize(sizeCalculation, 'vue-workflow-chart-state')),
            transitions: this.transitions.map(
                addSize(sizeCalculation, 'vue-workflow-chart-transition-label')),
        });
    }

    addStylingClassesFor(semantics) {
        return new Workflow({
            states: this.states.map(addStylingClassesFor(semantics, isSelectedState)),
            transitions: this.transitions.map(
                addStylingClassesFor(semantics, isTransitionTarget)),
        });
    }
}
