<template>
    <svg>
        <state
            v-for="state in layoutStates"
            :id="state.id"
            :key="state.id"
            :label="state.label"
            :center="state.center"
            @size-change="stateSizeChanged" />
        <transition
            v-for="transition in layoutTransitions"
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
        transitions: {
            type: Array,
            required: true,
        },
        states: {
            type: Array,
            required: true,
        },
    },
    data() {
        const layout = new Layout();

        layout.setStates(this.states);
        layout.setTransitions(this.transitions);

        return {
            layout,
            layoutTransitions: layout.transitions,
            layoutStates: layout.states,
        };
    },
    methods: {
        stateSizeChanged(item) {
            this.layout.setStateSize(item.id, item.size);
            this.layoutStates = this.layout.states;
            this.layoutTransitions = this.layout.transitions;
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
