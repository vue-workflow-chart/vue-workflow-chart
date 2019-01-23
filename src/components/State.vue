<template>
    <svg
        :x="x"
        :y="y"
        :height="height"
        :width="width">
        <rect
            width="100%"
            height="100%"
            fill="white"
            stroke="black" />
        <text
            x="50%"
            y="50%"
            font-family="Verdana"
            font-size="10"
            text-anchor="middle"
            alignment-baseline="central"
            fill="black">
            {{ description }}
        </text>
    </svg>
</template>

<script>
export default {
    name: "State",
    props: {
        description: {
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
        msg: {
            type: String,
            default: "",
        },
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style scoped>
.state {
  fill: white;
  stroke: black;
  stroke-width: 5;
  opacity: 0.5;
}
</style>
