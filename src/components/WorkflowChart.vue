<template>
    <svg
        width="1000"
        height="1000">
        <state
            v-for="(state, key) in states"
            :key="'state'+key"
            :description="state.description"
            :x="state.x"
            :y="state.y"
            :width="state.width"
            :height="state.height" />
        <transition
            v-for="(transition, key) in transitions"
            :key="'trans'+key"
            :description="transition.description"
            :path="transition.path" />
    </svg>
</template>

<script>
import Transition from './Transition';
import State from './State';
export default {
    name: 'WorkflowChart',
    components: {
        Transition,
        State,
    },
    props: {
        msg: {
            type: String,
            default: "",
        },
    },
    computed: {
        transitions() {
            return [{
                path: [{ x: 125, y:170 }, { x: 125, y:230 }, { x: 125, y: 275 }],
                description: 'Description for transition',
            }];
        },
        states() {
            return [
                { x: 50, y: 20, description: 'New' },
                { x: 50, y: 300, description: 'Longer description for a State' },
            ];
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
