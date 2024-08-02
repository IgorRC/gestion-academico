import suma from "../src/controllers/suma.js";

test('suma de a + b', () => {
    expect(suma(1, 2)).toBe(3);
    expect(suma(2, 4)).toBe(6);
    expect(suma(-1, -1)).toBe(-2);
    expect(suma(0, 0)).toBe(0);
    expect(suma(100, 200)).toBe(300);

});