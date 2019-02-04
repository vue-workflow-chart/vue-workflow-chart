<template>
    <svg
        :x="center.x - size.width/2"
        :y="center.y - size.height/2"
        :width="size.width"
        :height="size.height">
        <rect
            class="state"
            rx="3"
            ry="3"
            width="99%"
            height="99%" />
        <text
            ref="label"
            class="label"
            x="50%"
            y="60%"
            text-anchor="middle"
            alignment-baseline="central">
            {{ label }}
        </text>
    </svg>
</template>

<script>

let textSizeOf = (svgElement) => {
    return svgElement.getBBox();
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
                width: this.textSize.width + 20,
                height: this.textSize.height + 20,
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
