import equivalencia from "../src/controllers/particion_equivalencia.js";

test('equivalencia', () => {
    expect(equivalencia(-4, 5, 24)).toBe("Nota practica debe estar en el rango de 0 a 20");
    expect(equivalencia(-50, 12, 10)).toBe("Nota practica debe estar en el rango de 0 a 20");
    expect(equivalencia(4, -18, -14)).toBe("Nota medio curso debe estar en el rango de 0 a 20");
    expect(equivalencia(14, 12, 9)).toBeCloseTo(10.8, 1);
});