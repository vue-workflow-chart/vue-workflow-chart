import dagre, { layout } from 'dagre';

if (!Array.isArray) {
    console.log('criando isArray');
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

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
            if (Array.isArray(transition.target)) {
                let targetIdx = 0;

                for(const target of transition.target) {
                    targetIdx++;

                    let targetState = this._graph.node(target);

                    this._graph.setEdge(
                        transition.source,
                        target, {
                            id: transition.id + '_' + targetIdx,
                            label: targetState.label ? targetState.label : '',
                            width: targetState.width,
                            height: targetState.height,
                            labelpos: 'c',
                            stylingClass: transition.stylingClass,
                        }
                    );
                }

                continue;
            }

            if (Array.isArray(transition.source)) {
                let sourceIdx = 0;

                for(const source of transition.source) {
                    sourceIdx++;

                    let sourceState = this._graph.node(source);

                    this._graph.setEdge(
                        source,
                        transition.target, {
                            id: transition.id + '_' + sourceIdx,
                            label: sourceState.label ? sourceState.label : '',
                            width: sourceState.width,
                            height: sourceState.height,
                            labelpos: 'c',
                            stylingClass: transition.stylingClass,
                        }
                    );
                }

                continue;
            }

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
