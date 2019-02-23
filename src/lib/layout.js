import { graphlib, layout } from 'dagre';


export default class Layout {

    constructor() {
        this._graph = new graphlib.Graph();
        this._graph.setGraph({ rankdir: 'TB' });
    }

    setStates(states) {
        for (const state of states) {
            const width = state.width ? state.width : 20;
            const height = state.height ? state.height : 10;
            this._graph.setNode(state.id, { label: state.label, width, height });
        }
        layout(this._graph);
    }

    get states() {
        return this._graph.nodes().map(id => {
            const node = this._graph.node(id);
            return {
                id,
                label: node.label,
                center: {
                    x: node.x,
                    y: node.y,
                },
            };
        });
    }

    setTransitions(transitions) {
        for (const transition of transitions) {
            this._graph.setEdge(transition.source, transition.target, {
                id: transition.id,
                label: transition.label ? transition.label : '',
                width: transition.width ? transition.width : 20,
                height: transition.height ? transition.height : 10,
                labelpos: 'c',
            });
        }
        layout(this._graph);
    }

    get transitions() {
        const transitions = this._graph.edges().map(ids => {
            const data = this._graph.edge(ids);
            return {
                id: data.id,
                path: data.points,
                label: {
                    point: {
                        x: data.x,
                        y: data.y,
                    },
                    text: data.label,
                },
            };
        });
        return transitions;
    }

    get size() {
        const graph = this._graph.graph();
        return { width: graph.width, height: graph.height };
    }

}
