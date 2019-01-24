<template>
    <g>
        <defs>
            <marker
                id="markerArrow"
                markerWidth="13"
                markerHeight="13"
                refX="9"
                refY="6"
                orient="auto">
                <path
                    class="arrow"
                    d="M2,2 v8 l8,-4z " />
            </marker>
        </defs>
        <path
            :d="svgPath"
            class="path" />
        <text
            :x="x"
            :y="y"
            font-family="Verdana"
            font-size="10"
            text-anchor="middle"
            fill="black">
            {{ description }}
        </text>
    </g>
</template>

<script>
import { cloneDeep } from 'lodash';
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
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
    },
    computed: {
        svgPath() {
            const points = cloneDeep(this.path);
            const start = points.shift();
            let path = `M${start.x} ${start.y}`;
            for (const point of points) {
                path += ` L${point.x} ${point.y}`;
            }
            return path;
        },
    },
};
</script>

<style scoped>
.arrow {
    fill: green;
}
.path {
    marker-end: url(#markerArrow);
    fill: none;
    stroke: green;
    stroke-width: 3;
}
</style>

