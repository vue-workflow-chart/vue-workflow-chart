import { cloneDeep } from 'lodash';

export default class Path {

    constructor() {
        this.path='';
    }

    get svgPath() {
        return this.path;
    }

    setPath(transitionPath) {
        const points = cloneDeep(transitionPath);
        let start = points.shift();
        let path = `M${start.x} ${start.y}`;

        for (const point of points) {
            path += ` L${point.x} ${point.y}`;
        }

        this.path = path.trim();
    }
}

