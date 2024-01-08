import Transition from '../../src/components/Transition.vue';
import { Component, build } from './ComponentBuilder';


class TransitionComponent extends Component {
    constructor() {
        super(Transition);
        this.with.mount()
            .and.props({
                id: 'transition_id',
                transitionPath: [ { x: 0, y: 0 }, { x: 100, y: 100 } ],
            });
    }
}

const pathAttributeOf = (transition) => {
    const path = transition.findComponent({ name: 'TransitionPath' })
        .find({ ref:"transitionPath" });
    return path.attributes('d');
};

const labelOf = (transition) => transition.findComponent({ ref: 'label' });


describe("The transition component", () => {
    it("has a label", () => {
        const transition = build(new TransitionComponent()
            .with.props({ label: { text: 'MyLabel' } }));

        expect(transition.text()).toBe('MyLabel');
    });

    it("has a path", () => {
        const transition = build(new TransitionComponent()
            .with.props({ transitionPath: [ { x: 0, y: 0 }, { x: 100, y: 100 } ] }));

        expect(pathAttributeOf(transition)).toEqual(expect.stringMatching('M0 0.* L100 100'));
    });

    it("emits click with id when clicked", async () => {
        const transition = build(new TransitionComponent().with.props({ id: '1' }));

        await labelOf(transition).trigger('click');

        expect(transition.emitted('click')).toEqual([['1']]);
    });
});
