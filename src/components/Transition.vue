<template>
    <div>
        <transition-path
            :path="transitionPath"
            :radius="transitionPathRadius"
            :stylingClass="stylingClass" />
        <chart-label
            ref="label"
            class="vue-workflow-chart-transition-label"
            :class="stylingClassLabel"
            :text="label.text"
            :anchor="label.point"
            @click="$emit('click', id)" />
    </div>
</template>

<script>
import Label from './Label.vue';
import TransitionPath from './TransitionPath.vue';

export default {
    name: 'ChartTransition',
    components: {
        chartLabel: Label,
        TransitionPath,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        transitionPath: {
            type: Array,
            required: true,
        },
        transitionPathRadius: {
            type: Number,
            default: 0,
        },
        label: {
            type: Object,
            default: () => ({
                text: '',
                point: {
                    x: 0,
                    y: 0,
                },
            }),
        },
        stylingClass: {
            type: String,
            default: '',
        },
    },
    emits: ['click'],
    computed: {
        stylingClassLabel() {
            return (this.stylingClass) ? `vue-workflow-chart-transition-label-${this.stylingClass}` : "";
        },
    },
};
</script>
