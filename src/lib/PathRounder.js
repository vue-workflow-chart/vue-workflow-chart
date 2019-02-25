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
        const radius = 12;
        let p1;
        let p2 = points.shift();

        let v;
        let norm;
        let q;
        let r;

        let path = `M${p2.x} ${p2.y}`;

        do {
            p1 = p2;
            p2 = points.shift();

            v = { x: (p2.x-p1.x),
                y: (p2.y-p1.y),
            };
            norm = Math.sqrt(v.x * v.x + v.y*v.y);
            v.x /= norm;
            v.y /= norm;

            if (norm < 2*radius) {
                q = { x: (p1.x + norm/2 * v.x),
                    y: (p1.y + norm/2 * v.y),
                };
                r = { x: (p2.x - norm/2 * v.x),
                    y: (p2.y - norm/2 * v.y),
                };

            } else {
                q = { x: (p1.x + radius * v.x),
                    y: (p1.y + radius * v.y),
                };
                r = { x: (p2.x - radius * v.x),
                    y: (p2.y - radius * v.y),
                };
            }

            path += ` Q${p1.x} ${p1.y} ${q.x} ${q.y}`;
            path += ` L${r.x} ${r.y}`;
        } while (points.length > 0);
        if ((r.x !== p2.x) && (r.y !== p2.y)) {
            path += ` L${p2.x} ${p2.y}`;
        }
        this.path = path.trim();
    }
}
