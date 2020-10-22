<template>
    <div id="app">
        <workflow-chart
            :style="size"
            :transitions="transitions"
            :states="states"
            :stateSemantics="stateSemantics"
            :orientation="'horizontal'"
            @state-click="onLabelClicked('state',$event)"
            @transition-click="onLabelClicked('transition', $event)"
            @size-change="sizeChanged" />
    </div>
</template>

<script>
import WorkflowChart from '../src/components/WorkflowChart.vue';

export default {
    name: "App",
    components: {
        WorkflowChart,
    },
    data: () => ({
        states: [
            {
                "id": "nao_iniciada",
                "label": "Não iniciada"
            },
            {
                "id": "aguardando_anexos",
                "label": "Aguardando anexos"
            },
            {
                "id": "aguardando_instituicao",
                "label": "Aguardando instituição"
            },
            {
                "id": "aguardando_area_conhecimento",
                "label": "Aguardando área de conhecimento"
            },
            {
                "id": "aguardando_orcamento",
                "label": "Aguardando orçamento"
            },
            {
                "id": "anexos_enviados",
                "label": "Anexos enviados"
            },
            {
                "id": "instituicao_enviada",
                "label": "Instituição enviada"
            },
            {
                "id": "area_conhecimento_enviada",
                "label": "Área de conhecimento enviada"
            },
            {
                "id": "orcamento_enviado",
                "label": "Orçamento enviado"
            },
            {
                "id": "submetida",
                "label": "Proposta submetida"
            },
            {
                "id": "cancelada",
                "label": "Proposta cancelada"
            }
        ],
        transitions: [
            {
                "id": "abrir",
                "label": "Abrir",
                "source": "nao_iniciada",
                "target": [
                    "aguardando_instituicao",
                    "aguardando_area_conhecimento",
                    "aguardando_anexos",
                    "aguardando_orcamento"
                ]
            },
            {
                "id": "enviar_instituicao",
                "label": "Enviar instituicao",
                "source": "aguardando_instituicao",
                "target": "instituicao_enviada"
            },
            {
                "id": "enviar_area_conhecimento",
                "label": "Enviar área de conhecimento",
                "source": "aguardando_area_conhecimento",
                "target": "area_conhecimento_enviada"
            },
            {
                "id": "enviar_anexos",
                "label": "Enviar anexos",
                "source": "aguardando_anexos",
                "target": "anexos_enviados"
            },
            {
                "id": "enviar_orcamento",
                "label": "Enviar orçamento",
                "source": "aguardando_orcamento",
                "target": "orcamento_enviado"
            },
            {
                "id": "enviar_orcamento",
                "label": "Enviar orçamento",
                "source": [
                    "anexos_enviados",
                    "instituicao_enviada",
                    "area_conhecimento_enviada",
                    "orcamento_enviado"
                ],
                "target": "submetida"
            },
            {
                "id": "cancelar",
                "label": "Cancelar",
                "source": "submetida",
                "target": "cancelada",
            }
        ],
        stateSemantics: [{
            "classname": "delete",
            "id":"cancelada",
        }],
        size: { width: '0px', height: '0px' },
    }),
    created() {
        const approveLabel = state => state.label === 'Proposta submetida';
        const semantic = item => ({ id: item.id, classname: 'approve' });

        const approvedState = this.states.filter(approveLabel).map(semantic);
        this.stateSemantics = [ ...this.stateSemantics, ...approvedState ];
    },
    methods: {
        onLabelClicked(type, id) {
            alert(`Clicked on ${type} with id: ${id}`);
        },
        sizeChanged(size) {
            this.size = {
                width: `${size.width}px`,
                height: `${size.height}px`,
            };
        },
    },
};
</script>
<style lang="scss">
@import '../src/styling.scss';
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
<style lang="scss" scoped>
#app {
    display: flex;
    justify-content: center;
    padding-top: 100px;
}

.vue-workflow-chart-transition-label {
    border: 1px solid grey;
    padding: 8px 16px;
}
</style>
