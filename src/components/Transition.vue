<template>
    <g>
        <defs>
            <marker
                id="markerArrow"
                markerWidth="13"
                markerHeight="13"
                refX="7"
                refY="5"
                orient="auto">
                <path
                    class="arrow"
                    d="M2,2 v6 l6,-3z " />
            </marker>
        </defs>
        <path
            :d="svgPath"
            class="path" />
        <text
            :x="label.point.x"
            :y="label.point.y"
            font-family="Verdana"
            font-size="10"
            text-anchor="middle"
            fill="black">
            {{ label.text }}
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
        label: {
            type: Object,
            default: () => ({
                text: '',
                point: {
                    x: 0,
                    y: 0,
                },
            }),
        },
    },
    computed: {
        svgPath() {
            const points = cloneDeep(this.path);
            let start = points.shift();
            let path = `M${start.x} ${start.y}`;

            let next = points.shift();
            let midA;
            let midB = { x: (next.x + start.x)/2, y: (next.y + start.y)/2 };

            path += ` L${midB.x} ${midB.y}`;

            while (points.length > 0) {
                start = next;
                next = points.shift();
                midA = midB;
                midB = { x: (next.x + start.x)/2, y: (next.y + start.y)/2 };
                path += ` Q${start.x} ${start.y} ${midB.x} ${midB.y}`;
            }
            path += ` L${next.x} ${next.y}`;

            /*for (const point of points) {
                path += ` L${point.x} ${point.y}`;
            }*/
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

