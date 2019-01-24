<template>
    <svg
        width="1000"
        height="1000">
        <state
            v-for="state in states"
            :id="state.id"
            :key="state.id"
            :label="state.label"
            :center="state.center"
            @size-change="stateSizeChanged" />
        <transition
            v-for="transition in transitions"
            :id="transition.id"
            :key="transition.id"
            :path="transition.path"
            :label="transition.label" />
    </svg>
</template>

<script>
import Transition from './Transition';
import State from './State';
import Layout from '../lib/layout';

export default {
    name: 'WorkflowChart',
    components: {
        Transition,
        State,
    },
    props: {
    },
    data() {
        const layout = new Layout();

        const workflow = {
            states: [{
                id: "static_state_new",
                label: "Neu",
            }, {
                id: "static_state_deleted",
                label: "Gelöscht",
            }, {
                id: "Hvfw2ds",
                label: "Freigegeben",
            }],
            transitions: [{
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
            }],
        };

        layout.setStates(workflow.states);
        layout.setTransitions(workflow.transitions);
        console.log(layout.transitions);

        return {
            layout,
            transitions: layout.transitions,
            states: layout.states,
        };
    },
    methods: {
        stateSizeChanged(item) {
            this.layout.setStateSize(item.id, item.size);
            this.states = this.layout.states;
            this.transitions = this.layout.transitions;
        },
    },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
