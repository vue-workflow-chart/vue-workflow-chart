<template>
    <chart-label
        styleClass="vue-workflow-chart-state"
        :anchor="center"
        :text="label" />
</template>

<script>
import Label from './Label.vue';

export default {
    name: "State",
    components: {
        chartLabel: Label,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        center: {
            type: Object,
            required: true,
        },
    },
};
</script>
