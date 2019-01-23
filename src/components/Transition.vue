<template>
    <g>
        <defs>
            <marker
                id="markerArrow"
                markerWidth="13"
                markerHeight="13"
                refX="2"
                refY="6"
                orient="auto">
                <path
                    d="M2,2 v8 l8,-4z "
                    style="fill: #000000;" />
            </marker>
        </defs>
        <path
            :d="svgPath"
            stroke="green"
            stroke-width="3"
            style="marker-end: url(#markerArrow); fill:none" />
    </g>
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

</style>

