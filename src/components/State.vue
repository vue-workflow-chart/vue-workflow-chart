<template>
    <chart-label
        styleClass="state"
        :anchor="center"
        :isVisible="isVisible"
        :text="label"
        @change-size="emitSize" />
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
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        emitSize(size) {
            this.$emit('size-change', { id: this.id, size });
        },
    },
};
</script>

<style lang='scss' scoped>
@import '../styling.scss';
</style>
