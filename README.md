Workflow Charts for vue.js [![Build Status](https://cloud.drone.io/api/badges/vue-workflow-chart/vue-workflow-chart/status.svg)](https://cloud.drone.io/vue-workflow-chart/vue-workflow-chart)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=vue-workflow-chart_vue-workflow-chart&metric=alert_status)](https://sonarcloud.io/dashboard/index/vue-workflow-chart_vue-workflow-chart)
[![Code coverage](https://sonarcloud.io/api/project_badges/measure?project=vue-workflow-chart_vue-workflow-chart&metric=coverage)](https://sonarcloud.io/dashboard/index/vue-workflow-chart_vue-workflow-chart)
[![NPM version](https://badge.fury.io/js/vue-workflow-chart.svg)](https://badge.fury.io/js/vue-workflow-chart)
 [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
 ========================

## What is vue-workflow-chart?

Vue-Workflow-Chart is developed to visualize processes or workflows. In a company for example, workflows can get complicated and confusing very easily, so an illustration can help to understand the process.

As Workflows consist of states and transitions, these elements must be passed to vue-workflow-chart. The given data will be modeled and rendered.

As an OpenSource - project, vue-workflow-chart comes under the GPLv3 - license.

## Requirements

* npm

## Installation

Just get the [npm package](https://www.npmjs.com/package/vue-workflow-chart) with

```
npm i vue-workflow-chart
```
for the latest version.

## Example

A minimal example with two states and a transition from one to the other.
```html
<template>
    <div id="app">
        <workflow-chart
            :transitions="transitions"
            :states="states" />
    </div>
</template>

<script>
import WorkflowChart from 'vue-workflow-chart';

export default {
    name: "App",
    components: {
        WorkflowChart,
    },
    data: () => ({
        states: [{
            "id": "state_1",
            "label": "State 1",
        }, {
            "id": "state_2",
            "label": "State 2",
        }],
        transitions: [{
            "id": "transition_1",
            "label": "this is a transition",
            "target": "state_2",
            "source": "state_1",
        }],
    }),
};
</script>
```

For a more complex example see [example/App.vue](./example/App.vue).

## Click events

As you click on a state or a transmission, these elements emit an event. For a state, this will be a 'state-click' with the id of the element as parameter. Transmissions emit a 'transmission-click' with id. 

See the minimal example below:

```html
<template>
    <div id="app">
        <workflow-chart
            :transitions=[]
            :states="states"
            @state-click="onStateClick($event)" />
    </div>
</template>

<script>
import WorkflowChart from 'vue-workflow-chart';

export default {
    name: "App",
    components: {
        WorkflowChart,
    },
    data: () => ({
        states: [{
            "id": "state_1",
            "label": "State 1",
        }],
    }),
    methods: {
        onStateClick(id) {
            alert(`Clicked on state with id: ${id}`);
        },
    },
};
</script>
```

Clicking the state will trigger the state-click event. In the workflow-chart, this event will fire the 'onStateClick' - method. As a result, the alert with text "Clicked on state with id: state_1" will show. 

For another example see [example/App.vue](./example/App.vue).

## Giving states a semantic

Single states can be given a special semantic by passing an additional class name. The state and
its targeting transitions can be styled accordingly.

The classes to be styled with its suffixes are

* `.vue-workflow-chart-state-` for the state
* `.vue-workflow-chart-transition-arrow-` for the arrow of the transition path
* `.vue-workflow-chart-transition-path-` for the transition path


```html
<template>
    <workflow-chart
        :transitions="transitions"
        :states="states"
        :stateSemantics="stateSemantics" />
</template>
<script>
import WorkflowChart from 'vue-workflow-chart';

export default {
    components: {
        WorkflowChart,
    },
    data: () => ({
        states: [{
            "id": "static_state_deleted",
            "label": "Deleted",
        }, {
            "id": "static_state_new",
            "label": "New",
        }],
        transitions: [{
            'id': 'delete',
            'label': 'delete',
            'target': 'static_state_deleted',
            'source': 'static_state_new',
        }],
        stateSemantics: [{
            "classname": "delete",
            "id":"static_state_deleted",
        }],
    }),
};
</script>
<style lang="scss">
@import '~vue-workflow-chart/dist/vue-workflow-chart.css';

.vue-workflow-chart-state-delete {
    color: white;
    background: red;
}

.vue-workflow-chart-transition-arrow-delete {
    fill: red;
}

.vue-workflow-chart-transition-path-delete {
    stroke: red;
}
</stle>
```

## Contributing

[Contributing](./CONTRIBUTING.md)

🔥 [Our Contributors](./Contributors.md) 🔥

## Code of conduct

[Code of Conduct](./CODE_OF_CONDUCT.md)

## LICENSE

[License](./LICENSE)
