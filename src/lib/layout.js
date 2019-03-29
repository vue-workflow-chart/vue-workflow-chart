import dagre, { layout } from 'dagre';


export default class Layout {

    static from(workflow, orientation) {
        const layout = new Layout(orientation);
        layout.setWorkflow(workflow);

        return layout;
    }

    constructor(orientation) {
        const rankdir = orientation === 'vertical' ? 'TB' : 'LR';
        this._graph = new dagre.graphlib.Graph().setGraph({ rankdir });
    }

    setWorkflow(workflow) {
        this._setStates(workflow.states);
        this._setTransitions(workflow.transitions);
        layout(this._graph);
    }

    _setStates(states) {
        for (const { id, label, width, height, stylingClass } of states) {
            this._graph.setNode(id, { label, width, height, stylingClass });
        }
    }

    _setTransitions(transitions) {
        for (const transition of transitions) {
            this._graph.setEdge(transition.source, transition.target, {
                id: transition.id,
                label: transition.label ? transition.label : '',
                width: transition.width,
                height: transition.height,
                labelpos: 'c',
                stylingClass: transition.stylingClass,
            });
        }
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
                stylingClass: node.stylingClass,
            };
        });
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
                stylingClass: data.stylingClass,
            };
        });
        return transitions;
    }

    get size() {
        const graph = this._graph.graph();
        return { width: graph.width, height: graph.height };
    }

}
