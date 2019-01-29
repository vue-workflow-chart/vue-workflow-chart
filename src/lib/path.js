
export default class Path {

    constructor() {
        this.path='';
    }

    get getPath() {
        return this.path;
    }

    setPath(points) {
        let start = points.shift();
        this.path = `M${start.x} ${start.y}`;

        let next = points.shift();
        let midB = { x: (next.x + start.x)/2, y: (next.y + start.y)/2 };

        this.path += ` L${midB.x} ${midB.y}`;

        while (points.length > 0) {
            start = next;
            next = points.shift();
            midB = { x: (next.x + start.x)/2, y: (next.y + start.y)/2 };
            this.path += ` Q${start.x} ${start.y} ${midB.x} ${midB.y}`;
        }
        this.path += ` L${next.x} ${next.y}`;
    }
}
