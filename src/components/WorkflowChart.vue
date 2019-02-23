<template>
    <div class="workflow-chart">
        <state
            v-for="state in layoutStates"
            :id="state.id"
            :ref="state.id"
            :key="state.id"
            :label="state.label"
            :center="state.center" />
        <transition
            v-for="transition in layoutTransitions"
            :id="transition.id"
            :ref="transition.id"
            :key="transition.id"
            :transitionPath="transition.path"
            :label="transition.label" />
    </div>
</template>

<script>
import Transition from './Transition.vue';
import State from './State.vue';
import Layout from '../lib/layout';
import { size } from '../lib/DivElement';


export default {
    name: 'WorkflowChart',
    components: {
        State,
        Transition,
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

        this.setup(layout);

        return {
            layout,
            ...this.propsOf(layout),
        };
    },
    watch: {
        transitions() {
            this.setup(this.layout);
            this.updateComputedLayout();
        },
        states() {
            this.setup(this.layout);
            this.updateComputedLayout();
        },
    },
    mounted() {
        return this.emitSize();
    },
    methods: {
        emitSize() {
            this.$emit('size-change', this.layout.size);
        },
        propsOf(layout) {
            return {
                layoutTransitions: layout.transitions,
                layoutStates: layout.states,
            };
        },
        updateComputedLayout() {
            for (const [key, value] of Object.entries(this.propsOf(this.layout))) {
                this[key] = value;
            }
            this.emitSize();
        },
        includeSizeWithClasses(classes) {
            return item => ({ ...item, ...size.ofDivWith(item, classes) });
        },
        setup(layout) {
            const states = this.states
                .map(this.includeSizeWithClasses('vue-workflow-chart-state'));
            layout.setStates(states);
            const transitions = this.transitions.
                map(this.includeSizeWithClasses('vue-workflow-chart-transition-label'));
            layout.setTransitions(transitions);
        },

    },
};
</script>

<style lang='scss'>
@import '../styling.scss';
</style>
<style lang='scss' scoped>
div {
    position: absolute;
}
</style>
