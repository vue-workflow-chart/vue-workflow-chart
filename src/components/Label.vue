<template>
    <div
        :style="position"
        @click="$emit('click')"
        v-text="text" />
</template>

<script>

export default {
    name: 'Label',
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
<style lang="scss" scoped>
div {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 1;
}

</style>
