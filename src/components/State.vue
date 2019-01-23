<template>
    <rect
        :x="x"
        :y="y"
        rx="20"
        ry="20"
        width="150"
        height="150"
        class="state" />
</template>

<script>
export default {
    name: 'State',
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
    },
};
</script>

<style scoped>
.state {
    fill: red;
    stroke: black;
    stroke-width: 5;
    opacity: 0.5;
}
</style>
