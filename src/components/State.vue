<template>
    <div
        ref="label"
        class="state"
        :style="nodeStyle">
        <div
            class="label"
            v-text="label" />
    </div>
</template>

<script>

let textSizeOf = (svgElement) => {
    return {
        width: svgElement.offsetWidth,
        height: svgElement.offsetHeight,
    };
};

export function setBBoxFunction(bBoxFunction) {
    textSizeOf = bBoxFunction;
}

export default {
    name: "State",
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
    data() {
        return {
            textSize: {
                width: 0,
                height: 0,
            },
        };
    },
    computed: {
        size() {
            return {
                width: this.textSize.width,
                height: this.textSize.height,
            };
        },
        nodeStyle() {
            return {
                top: this.center.y + 'px',
                left: this.center.x + 'px',
            };

        },
    },
    watch: {
        label() {
            this.emitSize();
        },
    },
    mounted() {
        this.emitSize();
    },
    methods: {
        async emitSize() {
            await this.$nextTick();
            this.textSize = textSizeOf(this.$refs.label);
            this.$emit('size-change', { id: this.id, size: this.size });
        },
    },
};
</script>

<style lang='scss' scoped>
@import '../styling.scss';
</style>
