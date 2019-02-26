<template>
    <div class="workflow-chart">
        <state
            v-for="state in layoutStates"
            :id="state.id"
            :ref="state.id"
            :key="state.id"
            :label="state.label"
            :center="state.center"
            :stylingClass="state.stylingClass"
            @click="$emit('state-click', $event)" />
        <chart-transition
            v-for="transition in layoutTransitions"
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
import Transition from './Transition.vue';
import State from './State.vue';
import Layout from '../lib/layout';
import { size } from '../lib/DivElement';


export default {
    name: 'WorkflowChart',
    components: {
        State,
        chartTransition: Transition,
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
            required: false,
            default: 12,
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
        addStateStylingClass(state) {
            for(const semantic of this.stateSemantics){
                if(semantic.id === state.id){
                    return { ...state, stylingClass:semantic.classname };
                }
            }
            return state;
        },
        addTransitionStylingClass(transition){
            for(const semantic of this.stateSemantics){
                if(semantic.id === transition.target){
                    return { ...transition, stylingClass:semantic.classname };
                }
            }
            return transition;
        },
        setup(layout) {
            const states = this.states
                .map(this.includeSizeWithClasses('vue-workflow-chart-state')).map(this.addStateStylingClass);
            layout.setStates(states);
            const transitions = this.transitions.
                map(this.includeSizeWithClasses('vue-workflow-chart-transition-label')).map(this.addTransitionStylingClass);
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
