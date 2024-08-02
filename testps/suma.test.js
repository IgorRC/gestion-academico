import suma from "../src/controllers/suma.js";

describe('suma', () => {
    test.each([
        [1, 2, 3],
        [2, 4, 6],
        [-1, -1, -2],
        [0, 0, 0],
        [100, 200, 300]
    ])('suma de a + b', (a, b, expected) => {
        expect(suma(a, b)).toBe(expected);
    });
});

