<template>
    <svg
        width="500"
        height="1000">
        <rect
            x="50"
            y="20"
            rx="20"
            ry="20"
            width="150"
            height="150"
            style="fill:red;stroke:black;stroke-width:5;opacity:0.5" />
        <rect
            x="50"
            y="300"
            rx="20"
            ry="20"
            width="150"
            height="150"
            style="fill:red;stroke:black;stroke-width:5;opacity:0.5" />
        <path
            d="M125 170 L125 300"
            stroke="green"
            stroke-width="3" />
    </svg>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: {
            type: String,
            default: '',
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
