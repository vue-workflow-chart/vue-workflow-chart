<template>
    <div class="vue-workflow-chart">
        <chart-state
            v-for="state in layout.states"
            :id="state.id"
            :ref="state.id"
            :key="state.id"
            :label="state.label"
            :center="state.center"
            :stylingClass="state.stylingClass"
            @click="onStateClicked" />
        <chart-transition
            v-for="transition in layout.transitions"
            :id="transition.id"
            :ref="transition.id"
            :key="transition.id"
            :transitionPath="transition.path"
            :transitionPathRadius="transitionPathRadius"
            :label="transition.label"
            :stylingClass="transition.stylingClass"
            @click="onTransitionClicked" />
    </div>
</template>
<script setup>
import ChartState from './State.vue';
import ChartTransition from './Transition.vue';
</script>
<script>
import Layout from '../lib/layout';
import Workflow from '../lib/workflow';
import { size as sizeCalculation } from '../lib/DivElement';

export default {
    name: 'WorkflowChart',
    props: {
        transitions: {
            type: Array,
            required: true,
        },
        states: {
            type: Array,
            required: true,
        },
        stateSemantics: {
            type: Array,
            default: () => [],
        },
        transitionPathRadius: {
            type: Number,
            default: 12,
        },
        orientation: {
            type: String,
            default: 'horizontal',
        },
    },
    emits: ['size-change', 'state-click', 'transition-click'],
    computed: {
        layout() {
            const workflow = new Workflow({ states: this.states, transitions: this.transitions });

            const workflowForLayouting = workflow
                .addStylingClassesFor(this.stateSemantics)
                .addLabelSize(sizeCalculation);

            return Layout.from(workflowForLayouting, this.orientation);
        },
    },
    watch: {
        layout() {
            this.emitSize();
        },
    },
    mounted() {
        this.emitSize();
    },
    methods: {
        emitSize() {
            this.$emit('size-change', this.layout.size);
        },
        onStateClicked(event) {
            this.$emit('state-click', event);
        },
        onTransitionClicked(event) {
            this.$emit('transition-click', event);
        },
    },
};
</script>
<style lang='scss'>
@import '../styling.scss';
.vue-workflow-chart {
  position: relative;
}
.vue-workflow-chart-element {
    position: absolute;
}
</style>
