<template>
    <chart-label
        class="vue-workflow-chart-state vue-workflow-chart-element"
        :class="stylingClassState"
        :anchor="center"
        :text="label"
        @click="$emit('click', id)" />
</template>

<script setup>
import ChartLabel from "./Label.vue";
defineEmits(["click"]);
</script>
<script>

export default {
    name: "ChartState",
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        stylingClass: {
            type: String,
            default: "",
        },
        center: {
            type: Object,
            required: true,
        },
    },
    computed: {
        stylingClassState() {
            return (this.stylingClass) ? `vue-workflow-chart-state-${this.stylingClass}` : "";
        },
    },
};
</script>
