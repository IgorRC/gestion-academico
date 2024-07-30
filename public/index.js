document.getElementById('notaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const practica = document.getElementById('practica').value;
    const medioCurso = document.getElementById('medioCurso').value;
    const final = document.getElementById('final').value;
  
    const response = await fetch('/api/notas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ practica, medioCurso, final }),
    });
  
    const data = await response.json();
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
  
    if (response.status === 201) {
      const notaFinal = (parseFloat(practica) * 0.15) + (parseFloat(medioCurso) * 0.35) + (parseFloat(final) * 0.50);
      const resultado = document.createElement('p');
  
      resultado.textContent = `Nota final: ${notaFinal.toFixed(2)}`;
      resultado.className = notaFinal >= 10.5 ? 'nota-aprobada' : 'nota-desaprobada';
      resultadosDiv.appendChild(resultado);
    } else {
      const error = document.createElement('p');
      error.textContent = `Error: ${data.message}`;
      error.className = 'nota-desaprobada';
      resultadosDiv.appendChild(error);
    }
  });
  