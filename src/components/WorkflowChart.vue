<template>
    <svg
        width="1000"
        height="1000">
        <state
            v-for="(state, key) in states"
            :key="'state'+key"
            :label="state.label"
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
import { graphlib, layout } from 'dagre';
export default {
    name: 'WorkflowChart',
    components: {
        Transition,
        State,
    },
    props: {
    },
    data() {
        const workflow = {
            states: {
                "static_state_new": {
                    label: "Neu",
                },
                "static_state_deleted": {
                    label: "Gelöscht",
                },
                "Hvfw2ds": {
                    label: "Freigegeben",
                },
            },
            transitions: {
                "Kj7tqn": {
                    sourceState: "static_state_deleted",
                    label: "wiederherstellen",
                    targetState: "static_state_new",
                },
                "Hj56kfc": {
                    sourceState: "Hvfw2ds",
                    label: "löschen",
                    targetState: "static_state_deleted",
                },
                "Tpyly6p": {
                    sourceState: "static_state_new",
                    label: "freigeben",
                    targetState: "Hvfw2ds",
                },
            },
        };
        const g = new graphlib.Graph();

        g.setGraph({});
        g.setDefaultEdgeLabel(() => {});

        for (const [name, state] of Object.entries(workflow.states)) {
            g.setNode(name, { label: state.label, width: 180, height: 60 });
        }

        for (const transition of Object.values(workflow.transitions)) {
            g.setEdge(transition.sourceState, transition.targetState, {
                label: transition.label,
                width: 180,
                height: 50,
            });
        }

        layout(g);

        return {
            workflow,
            graph: g,
        };
    },
    computed: {
        transitions() {
            const transitions = this.graph.edges().map(ids => {
                const data = this.graph.edge(ids);
                return {
                    description: data.label,
                    path: data.points,
                };
            });
            return transitions;
        },
        states() {
            const nodes = this.graph.nodes().map(id => this.graph.node(id));
            return nodes;
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
