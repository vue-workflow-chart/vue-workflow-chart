import Path from '../../../src/lib/path';

export class PathBuilder {
    constructor() {
        this._transitionPath;
    }

    get with() {
        return this;
    }

    transitionPathOf(points) {
        this._transitionPath = points;
        return this;
    }

    build() {
        const svgPath = new Path();
        if (this._transitionPath) {
            svgPath.setPath(this._transitionPath);
        }
        return svgPath;
    }
}
