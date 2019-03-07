export const orientation = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
    AMBIGUOUS: 'ambiguous',
};

const min = coord => (min, point) => Math.min(min, point[coord]);
const max = coord => (max, point) => Math.max(max, point[coord]);
const toPathSize = path => {
    const x = {
        min: path.reduce(min('x'), +Infinity),
        max: path.reduce(max('x'), -Infinity),
    };
    const y = {
        min: path.reduce(min('y'), Infinity),
        max: path.reduce(max('y'), -Infinity),
    };
    return {
        width: x.max - x.min,
        height: y.max - y.min,
    };
};
const toTotalPathSize = (total, transition) => {
    total.width += transition.width;
    total.height += transition.height;
};

export const orientationOf = path => {
    const total = path.map(toPathSize).reduce(toTotalPathSize);

    if (total.height > 2*total.width) {
        return orientation.VERTICAL;
    } else if (total.width > 2*total.height) {
        return orientation.HORIZONTAL;
    } else {
        return orientation.AMBIGUOUS;
    }
};

export function installOrientationMatcher() {
    expect.extend({
        toHaveOrientation(received, expected) {
            const options = {
                isNot: this.isNot,
                promise: this.promise,
            };
            const pass = orientationOf(received) === expected;
            const message = () =>
                this.utils.matcherHint('.toHaveOrientation', undefined, undefined, options)
                + `\n\nExpected orientation: ${this.utils.printExpected(expected)}\n`
                + `Received: ${this.utils.printReceived(received)}`;

            return { actual: received, message, pass };
        },
    });
}


