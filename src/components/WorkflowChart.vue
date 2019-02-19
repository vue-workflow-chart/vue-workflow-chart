<template>
    <div
        v-observe-visibility="visibilityChanged"
        class="workflow-chart">
        <state
            v-for="state in layoutStates"
            :id="state.id"
            :ref="state.id"
            :key="state.id"
            :label="state.label"
            :center="state.center"
            :isVisible="isVisible"
            @size-change="stateSizeChanged" />
        <transition
            v-for="transition in layoutTransitions"
            :id="transition.id"
            :ref="transition.id"
            :key="transition.id"
            :transitionPath="transition.path"
            :label="transition.label"
            :isVisible="isVisible"
            @size-change="transitionSizeChanged" />
    </div>
</template>

<script>
import Transition from './Transition.vue';
import State from './State.vue';
import Layout from '../lib/layout';

import { } from 'intersection-observer';
import Vue from 'vue';
import VueObserveVisibility from 'vue-observe-visibility';

Vue.use(VueObserveVisibility);

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
            layoutTransitions: layout.transitions,
            layoutStates: layout.states,
            isVisible: false,
        };
    },
    watch: {
        transitions() {
            this.layout.setTransitions(this.transitions);
            this.updateComputedLayout();
        },
        states() {
            this.layout.setStates(this.states);
            this.updateComputedLayout();
        },
    },
    methods: {
        visibilityChanged(isVisible) {
            this.isVisible = isVisible;
        },
        stateSizeChanged(item) {
            this.layout.setStateSize(item.id, item.size);
            this.updateComputedLayout();
        },
        transitionSizeChanged(item) {
            this.layout.setTransitionSize(item.id, item.size);
            this.updateComputedLayout();
        },
        updateComputedLayout() {
            this.layoutStates = this.layout.states;
            this.layoutTransitions = this.layout.transitions;
        },
        setup(layout) {
            layout.setStates(this.states);
            layout.setTransitions(this.transitions);
        },

    },
};
</script>

<style lang='scss' scoped>
@import '../styling.scss';
</style>
