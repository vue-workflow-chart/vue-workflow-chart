import { textSize } from '../../../src/components/Label.vue';

export function installSizeStub() {
    textSize.of = (text) => {
        return {
            width: text.textContent.trim().length,
            height: 10,
        };
    };
}

export function positionOf(label) {
    const style = label.element.style;
    return { x: style.left, y: style.top };
}

export function installMatcher() {
    expect.extend({
        toHavePositiveSize(received) {
            let pass;
            try {
                const size = received[0][0];
                pass = size.width > 0 && size.height > 0;
            } catch {
                pass = false;
            }
            const expected = "[[{width: number > 0, height: number > 0}]]";
            const message = () =>
                this.utils.matcherHint('toHavePositiveSize') + '\n\n' +
                    `Expected: ${this.utils.printExpected(expected)}\n` +
                    `Received: ${this.utils.printReceived(received)}\n`;
            return { pass, message };
        },
    });
}
