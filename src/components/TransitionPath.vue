<template>
    <svg
        class="vue-workflow-chart-transition-path"
        :width="width"
        :height="height">
        <g>
            <defs>
                <marker
                    :id="'markerArrow'+$.uid"
                    viewBox="0 0 10 10"
                    markerWidth="3"
                    markerHeight="3"
                    refX="5"
                    refY="5"
                    orient="auto">
                    <path
                        class="vue-workflow-chart-transition-arrow"
                        :class="stylingClassArrow"
                        d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>
            <path
                ref="transitionPath"
                :d="svgPath"
                :marker-end="'url(#markerArrow'+$.uid+')'"
                class="vue-workflow-chart-transition-path"
                :class="stylingClassPath" />
        </g>
    </svg>
</template>

<script>
import Path from '../lib/PathRounder.js';

export default {
    name: 'TransitionPath',
    props: {
        path: {
            type: Array,
            required: true,
        },
        radius: {
            type: Number,
            default: 0,
        },
        stylingClass: {
            type: String,
            default: '',
        },
    },
    data() {
        const pathCreator = new Path(this.radius);
        pathCreator.setPath(this.path);

        return { pathCreator };
    },
    computed: {
        svgPath() {
            return this.pathCreator.svgPath;
        },
        width() {
            return this.lengthIn(point => point.x);
        },
        height() {
            return this.lengthIn(point => point.y);
        },
        stylingClassPath() {
            return (this.stylingClass) ? `vue-workflow-chart-transition-path-${this.stylingClass}` : "";
        },
        stylingClassArrow() {
            return (this.stylingClass) ? `vue-workflow-chart-transition-arrow-${this.stylingClass}` : "";
        },
    },
    watch: {
        path() {
            this.pathCreator.setPath(this.path);
        },
    },
    methods: {
        lengthIn(coordinate) {
            const values = this.path.map(coordinate);
            const max = Math.max(...values);
            const min = 0;
            return `${max - min + 20}px`;
        },
    },
};
</script>

<style lang="scss">
.vue-workflow-chart-transition-path {
    display: inline-block;
    position: absolute;
}
</style>

