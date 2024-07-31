import limite from "../src/controllers/limite.js";

test('valor limite', () => {
    expect(limite(-1, 0, 10)).toBe("Nota practica debe estar en el rango de 0 a 20");
    expect(limite(11, 10, 21)).toBe("Nota final debe estar en el rango de 0 a 20");
    expect(limite(0, 10, 11)).toBeCloseTo(9.0, 1);
});