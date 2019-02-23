
export function positionOf(label) {
    const style = label.element.style;
    return { x: style.left, y: style.top };
}

