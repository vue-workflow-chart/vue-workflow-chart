<template>
    <svg
        :x="x"
        :y="y"
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
        label: {
            type: String,
            required: true,
        },
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
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
