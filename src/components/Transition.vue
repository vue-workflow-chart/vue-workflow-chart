<template>
    <path
        :d="svgPath"
        stroke="green"
        stroke-width="3" />
</template>

<script>
export default {
    name: 'Transition',
    props: {
        path: {
            type: Array,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
    },
    computed: {
        svgPath() {
            console.log(this.path);
            const [start, middle, end] = this.path;
            return `M${start.x} ${start.y} L${middle.x} ${middle.y} L${end.x} ${end.y}`;
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

