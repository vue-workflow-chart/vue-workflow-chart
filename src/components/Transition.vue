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
            ref="transitionPath"
            :d="svgPath"
            class="path" />
        <text
            ref="transitionLabel"
            :x="label.point.x"
            :y="label.point.y"
            class="label-arrow"
            text-anchor="middle">
            {{ label.text }}
        </text>
    </g>
</template>

<script>
import Path from '../lib/path.js';

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
        path.setPath(this.transitionPath);

        return {
            path,
        };
    },
    computed: {
        svgPath(){
            return this.path.svgPath;
        },
    },
    watch: {
        transitionPath() {
            this.path.setPath(this.transitionPath);
        },
    },

};
</script>

<style lang="scss" scoped>
@import '../styling.scss';
</style>

