<template>
    <svg
        width="500"
        height="1000">
        <state
            v-for="(state, index) in states"
            :key="index"
            :description="state.description"
            :x="state.x"
            :y="state.y"
            :width="state.width"
            :height="state.height" />
        <transition
            v-for="(transition, index) in transitions"
            :key="index"
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
                path: [{ x: 125, y:170 },{ x: 125, y:230 },{ x: 125, y: 275 }],
                description: 'Description for transition',
            }];
        },
        states() {
            return [
                { x: 50, y: 20, description: 'New', width: 150, height: 150 },
                { x: 50, y: 300, description: 'Longer description for a State', width: 150, height: 150 },
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
