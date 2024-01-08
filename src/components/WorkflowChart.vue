<template>
    <div class="workflow-chart">
        <chart-state
            v-for="state in layout.states"
            :id="state.id"
            :ref="state.id"
            :key="state.id"
            :label="state.label"
            :center="state.center"
            :stylingClass="state.stylingClass"
            @click="$emit('state-click', $event)" />
        <chart-transition
            v-for="transition in layout.transitions"
            :id="transition.id"
            :ref="transition.id"
            :key="transition.id"
            :transitionPath="transition.path"
            :transitionPathRadius="transitionPathRadius"
            :label="transition.label"
            :stylingClass="transition.stylingClass"
            @click="$emit('transition-click', $event)" />
    </div>
</template>

<script>
import ChartState from './State.vue';
import ChartTransition from './Transition.vue';
import Layout from '../lib/layout';
import Workflow from '../lib/workflow';
import { size as sizeCalculation } from '../lib/DivElement';

export default {
    name: 'WorkflowChart',
    components: {
        ChartState,
        ChartTransition,
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
