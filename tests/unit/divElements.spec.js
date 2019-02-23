import { Size } from '../../src/lib/DivElement';


const lengthOfMock = (style) => {
    return {
        marginLeft: 20,
        marginRight: 30,
        marginTop: 40,
        marginBottom: 50,
    }[style];
};
const MOCK_WIDTH = 0;
const MOCK_HEIGHT = 0;


describe("The size component", () => {

    it("creates no div element when constructed", () => {
        const size = new Size();

        expect(size.element).toBeFalsy();
    });

    it("initializes element when getting size for the first time", () => {
        const size = new Size();

        size.ofDivWith('label', 'class');

        expect(size.element).toBeTruthy();
    });

    it("messures size of margin div", () => {
        const htmlSize = new Size(lengthOfMock);

        const size = htmlSize.ofDivWith('label', 'class');

        expect(size).toEqual({ width: 20 + MOCK_WIDTH + 30, height: 40 + MOCK_HEIGHT + 50 });
    });
});
