<template>
    <div
        class="vue-workflow-chart-label vue-workflow-chart-element"
        :style="position"
        @click="$emit('click')"
        v-text="text" />
</template>

<script>

export default {
    name: 'ChartLabel',
    props: {
        text: {
            type: String,
            required: true,
        },
        anchor: {
            type: Object,
            default: () => ({ x: 0, y: 0 }),
        },
    },
    emits: ['click'],
    computed: {
        position() {
            return {
                top: this.anchor.y + 'px',
                left: this.anchor.x + 'px',
            };

        },
    },
};
</script>
<style lang="scss">
.vue-workflow-chart-label {
    display: flex 1 0 0;
    flex-wrap: wrap;
    transform: translate(-50%, -50%);
    z-index: 1;
}

</style>
