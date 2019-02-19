<template>
    <div
        ref="text"
        :class="styleClass"
        :style="position"
        v-text="text" />
</template>

<script>

export const textSize = {
    of(element) {
        const lengthOf = (style) => parseInt(window.getComputedStyle(element, null)[style], 0);
        return {
            width: element.offsetWidth + lengthOf('marginLeft') + lengthOf('marginRight'),
            height: element.offsetHeight + lengthOf('marginTop') + lengthOf('marginBottom'),
        };
    },
};

export default {
    name: 'Label',
    props: {
        styleClass: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            required: true,
        },
        isVisible: {
            type: Boolean,
            default: false,
        },
        anchor: {
            type: Object,
            default: () => ({ x: 0, y: 0 }),
        },
    },
    computed: {
        position() {
            return {
                top: this.anchor.y + 'px',
                left: this.anchor.x + 'px',
            };

        },
    },
    watch: {
        text() {
            this.emitSize();
        },
        isVisible() {
            this.emitSize();
        },
    },
    methods: {
        emitSize() {
            if (this.isVisible) {
                this.$emit('change-size', textSize.of(this.$refs.text));
            }
        },
    },
};
</script>
