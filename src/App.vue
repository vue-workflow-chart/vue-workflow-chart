<template>
    <div id="app">
        <img
            alt="Vue logo"
            src="./assets/logo.png">
        <workflow-chart
            :transitions="transitions"
            :states="states"
            :stateSemantics="stateSemantics" />
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
            "label": "Auditing",
        }, {
            "id": "Jcxrmx",
            "label": "Released",
        }, {
            "id": "Tu2vqbl",
            "label": "Verification by responsible",
        }, {
            "id": "static_state_deleted",
            "label": "Deleted",
        }, {
            "id": "static_state_new",
            "label": "New",
        }],
        transitions: [{
            "id": "Dz2un1r",
            "label": "ask for auditing",
            "target": "J4zloua",
            "source": "Tu2vqbl",
        }, {
            "id": "Ev0huzn",
            "label": "restore",
            "target": "static_state_new",
            "source": "static_state_deleted",
        }, {
            "id": "Fst7op",
            "label": "release",
            "target": "Jcxrmx",
            "source": "Tu2vqbl",
        }, {
            "id": "Lwed6qb",
            "label": "discard draft",
            "target": "static_state_deleted",
            "source": "Tu2vqbl",
        }, {
            "id": "Mmpn8w",
            "label": "discard request",
            "target": "static_state_deleted",
            "source": "J4zloua",
        }, {
            "id": "Qw136br",
            "label": "delete",
            "target": "static_state_deleted",
            "source": "Jcxrmx",
        }, {
            "id": "Stf8g2b",
            "label": "revise request",
            "target": "J4zloua",
            "source": "static_state_new",
        }, {
            "id": "Tznk4f5",
            "label": "start new revision",
            "target": "J4zloua",
            "source": "Jcxrmx",
        }, {
            "id": "Usvtzqi",
            "label": "release revision",
            "target": "Tu2vqbl",
            "source": "J4zloua",
        }],
        stateSemantics: [{
            "classname": "delete",
            "id":"static_state_deleted",
        }],
    }),
    created() {
        const approveLabel = state => state.label === 'Freigegeben';
        const semantic = item => ({ id: item.id, classname: 'approve' });

        const approvedState = this.states.filter(approveLabel).map(semantic);
        this.stateSemantics = [ ...this.stateSemantics, ...approvedState ];
    },
};
</script>
<style lang="scss">
@import './styling.scss';
$approve-color: #1eb2a4;
$delete-color: #d64b61;

.vue-workflow-chart-state {
    &-approve {
        color: white;
        background: $approve-color;
    }

    &-delete {
        color: white;
        background: $delete-color;
    }
}

.vue-workflow-chart-transition-arrow {
    &-approve {
        fill: $approve-color;
    }

    &-delete {
        fill: $delete-color;
    }
}

.vue-workflow-chart-transition-path {
    &-approve {
        stroke: $approve-color;
    }

    &-delete {
        stroke: $delete-color;
    }
}
</style>
