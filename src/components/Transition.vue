<template>
    <div>
        <transition-path
            :path="transitionPath"
            :stylingClass="stylingClass" />
        <chart-label
            :styleClass="stylingClassLabel"
            :text="label.text"
            :anchor="label.point" />
    </div>
</template>

<script>
import Label from './Label.vue';
import TransitionPath from './TransitionPath.vue';

export default {
    name: 'Transition',
    components: {
        chartLabel: Label,
        TransitionPath,
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
        stylingClass: {
            type: String,
            default: '',
        },
    },
    computed: {
        stylingClassLabel() {
            let stylingClass = 'vue-workflow-chart-transition-label';
            stylingClass += (this.stylingClass) ? `-${this.stylingClass}` : '';
            return stylingClass;
        },
    }
};
</script>
