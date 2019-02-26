import { cloneDeep } from 'lodash';

export default class Path {

    constructor(radius) {
        this.path='';
        this.radius = radius;
    }

    get svgPath() {
        return this.path;
    }

    setPath(transitionPath) {
        const points = cloneDeep(transitionPath);

        let p1 = points.shift();
        let p2 = points.shift();

        let v01;
        let norm01;
        let q;
        let r;

        let v12 = { x: (p2.x-p1.x),
            y: (p2.y-p1.y),
        };
        let norm12 = Math.sqrt(v12.x * v12.x + v12.y*v12.y);
        v12.x /= norm12;
        v12.y /= norm12;

        let path = `M${p1.x} ${p1.y}`;

        while (points.length > 0) {
            p1 = p2;
            p2 = points.shift();
            v01 = v12;
            norm01 = norm12;

            v12 = { x: (p2.x-p1.x),
                y: (p2.y-p1.y),
            };
            norm12 = Math.sqrt(v12.x * v12.x + v12.y*v12.y);
            v12.x /= norm12;
            v12.y /= norm12;

            if ((norm01 < 2*this.radius) || (norm12 < 2*this.radius))  {
                let norm = Math.min(norm01, norm12);
                q = { x: (p1.x - norm/2 * v01.x),
                    y: (p1.y - norm/2 * v01.y),
                };
                r = { x: (p1.x + norm/2 * v12.x),
                    y: (p1.y + norm/2 * v12.y),
                };
            } else {
                q = { x: (p1.x - this.radius * v01.x),
                    y: (p1.y - this.radius * v01.y),
                };
                r = { x: (p1.x + this.radius * v12.x),
                    y: (p1.y + this.radius * v12.y),
                };
            }

            path += ` L${q.x} ${q.y}`;
            path += ` Q${p1.x} ${p1.y} ${r.x} ${r.y}`;
        }
        path += ` L${p2.x} ${p2.y}`;
        this.path = path.trim();
    }
}
