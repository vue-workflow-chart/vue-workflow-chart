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
            :d="d"
            stroke="green"
            stroke-width="3"
            style="marker-end: url(#markerArrow); fill:none" />
    </g>
</template>

<script>
export default {
    name: 'Transition',
    props: {
        d: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>

</style>

