<template>
    <div id="app">
        <img
            alt="Vue logo"
            src="./assets/logo.png">
        <div>
            <workflow-chart
                height="1000"
                :transitions="transitions"
                :states="states" />
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
    data: () => ({
        states: [{
            id: "static_state_new",
            label: "Neu",
        }, {
            id: "static_state_deleted",
            label: "Gelöscht",
        }, {
            id: "Hvfw2ds",
            label: "Freigegeben",
        }],
        transitions: [{
            id: "Kj7tqn",
            source: "static_state_deleted",
            target: "static_state_new",
            label: "wiederherstellen",
        }, {
            id: "Hj56kfc",
            source: "Hvfw2ds",
            target: "static_state_deleted",
            label: "löschen",
        }, {
            id: "Tpyly6p",
            source: "static_state_new",
            target: "Hvfw2ds",
            label: "freigeben",
        }],
    }),
};
</script>
