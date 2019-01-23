<template>
    <svg
        width="500"
        height="1000">
        <state
            x="50"
            y="20" />
        <state
            x="50"
            y="300" />
        <transition
            d="M125 170 L125 275" />
        <transition
            d="M150,170 v100 h100" />
    </svg>
</template>

<script>
import Transition from './Transition';
import State from './State';
export default {
    name: 'HelloWorld',
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
