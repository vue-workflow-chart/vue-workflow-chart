<template>
    <div>
        <transition-path
            :path="transitionPath" />
        <chart-label
            ref="label"
            styleClass="vue-workflow-chart-transition-label"
            :text="label.text"
            :anchor="label.point"
            @click="$emit('click', id)" />
    </div>
</template>

<script>
import Label from './Label.vue';
import TransitionPath from './TransitionPath.vue';

export default {
    name: 'Transition',
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
    },
};
</script>
