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
            d="M125 170 L125 275"
            stroke="green"
            stroke-width="3"
            style="marker-end: url(#markerArrow);" />
    </g>
</template>

<script>
export default {
    name: 'Transition',
    props: {
    },
};
</script>

<style scoped>

</style>

