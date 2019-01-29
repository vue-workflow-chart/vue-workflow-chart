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
import Path from '../lib/path.js';
import { cloneDeep } from 'lodash';

export default {
    name: 'Transition',
    props: {
        id: {
            type: String,
            required: true,
        },
        transitionPath: {
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
    data() {
        const path = new Path();
        return {
            path,
        };
    },
    computed: {
        svgPath(){
            this.path.setPath(cloneDeep(this.transitionPath));
            return this.path.getPath;
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

