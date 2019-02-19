<template>
    <div>
        <svg class="workflow-chart-transition">
            <g>
                <defs>
                    <marker
                        id="markerArrow"
                        viewBox="0 0 10 10"
                        markerWidth="3"
                        markerHeight="3"
                        refX="5"
                        refY="5"
                        orient="auto-start-reverse">
                        <path
                            class="arrow"
                            d="M 0 0 L 10 5 L 0 10 z" />
                    </marker>
                </defs>
                <path
                    ref="transitionPath"
                    :d="svgPath"
                    class="path" />
            </g>
        </svg>
        <chart-label
            styleClass="transition-label"
            :text="label.text"
            :anchor="label.point"
            :isVisible="isVisible"
            @change-size="emitSize" />
    </div>
</template>

<script>
import Label from './Label.vue';
import Path from '../lib/path.js';

export default {
    name: 'Transition',
    components: {
        chartLabel: Label,
    },
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
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        const path = new Path();
        path.setPath(this.transitionPath);

        return { path };
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
    methods: {
        emitSize(size) {
            this.$emit('size-change', { id: this.id, size });
        },
    },

};
</script>

<style lang="scss" scoped>
@import '../styling.scss';
</style>

