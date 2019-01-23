<template>
    <div id="app">
        <img
            alt="Vue logo"
            src="./assets/logo.png">
        <div>
            <workflow-chart msg="Welcome to Your Vue.js App" />
        </div>
    </div>
</template>

<script>
import WorkflowChart from './components/WorkflowChart.vue';

export default {
    name: "App",
    components: {
        WorkflowChart,
    },
};
</script>
