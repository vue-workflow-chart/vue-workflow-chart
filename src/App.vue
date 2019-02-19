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
            "id": "J4zloua",
            "label": "Überarbeitung",
        }, {
            "id": "Jcxrmx",
            "label": "Freigegeben",
        }, {
            "id": "Tu2vqbl",
            "label": "Prüfung durch Verantwortlichen",
        }, {
            "id": "static_state_deleted",
            "label": "Gelöscht",
        }, {
            "id": "static_state_new",
            "label": "Neu",
        }],
        transitions: [{
            "id": "Dz2un1r",
            "label": "Um Überarbeitung bitten",
            "target": "J4zloua",
            "source": "Tu2vqbl",
        }, {
            "id": "Ev0huzn",
            "label": "wiederherstellen",
            "target": "static_state_new",
            "source": "static_state_deleted",
        }, {
            "id": "Fst7op",
            "label": "Freigeben",
            "target": "Jcxrmx",
            "source": "Tu2vqbl",
        }, {
            "id": "Lwed6qb",
            "label": "Entwurf verwerfen",
            "target": "static_state_deleted",
            "source": "Tu2vqbl",
        }, {
            "id": "Mmpn8w",
            "label": "Antrag verwerfen",
            "target": "static_state_deleted",
            "source": "J4zloua",
        }, {
            "id": "Qw136br",
            "label": "Löschen",
            "target": "static_state_deleted",
            "source": "Jcxrmx",
        }, {
            "id": "Stf8g2b",
            "label": "Antrag Überarbeiten",
            "target": "J4zloua",
            "source": "static_state_new",
        }, {
            "id": "Tznk4f5",
            "label": "Neue Überarbeitung starten",
            "target": "J4zloua",
            "source": "Jcxrmx",
        }, {
            "id": "Usvtzqi",
            "label": "Überarbeitung freigeben",
            "target": "Tu2vqbl",
            "source": "J4zloua",
        }],
    }),
};
</script>
