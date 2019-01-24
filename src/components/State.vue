<template>
    <svg
        :x="center.x-width/2"
        :y="center.y-height/2"
        :width="width"
        :height="height">
        <rect
            class="state"
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
            textBox: {
                width: 0,
                height: 0,
            },
        };
    },
    computed: {
        width() {
            return this.textBox.width + 20;
        },
        height() {
            return this.textBox.height + 20;
        },
    },
    mounted() {
        this.textBox = this.$refs.label.getBBox();
        this.$emit('size-change', { id: this.id, size: { width: this.width, height: this.height } });
    },
};
</script>

<style scoped>
.state {
  fill: #eee;
  stroke: #eee;
}
.label {
    fill: black;
    font-family: "Verdana";
    font-size: 14px;
}
</style>
