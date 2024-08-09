document.addEventListener("DOMContentLoaded", function() {
  const cursoContainer = document.getElementById("cursoContainer");
  const notaContainer = document.getElementById("notaContainer");
  const btnRegresar = document.getElementById("btnRegresar");
  const notaForm = document.getElementById('notaForm');
  const resultadosDiv = document.getElementById('resultados');
  let notaActualId = null;
  let cursoActualId = null;


  // Función para cargar los cursos
  function cargarCursos() {
    fetch('http://localhost:3000/api/curso/todo')
      .then(response => response.json())
      .then(cursos => {
        const tablaCuerpo = document.querySelector('#tablaCursos tbody');
        tablaCuerpo.innerHTML = '';
        
        cursos.forEach(curso => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
            <td>${curso.nombreCurso}</td>
            <td>${curso.codigo}</td>
            <td>${curso.promedio}</td>
            <td><button class="btnAgregarNota" curso_id=${curso._id} nota-id="${curso.notas}">Agregar Nota</button></td>
          `;
          tablaCuerpo.appendChild(fila);
        });

        // Añadir event listeners a los botones de Agregar Nota
        document.querySelectorAll(".btnAgregarNota").forEach(button => {
          button.addEventListener("click", function() {
            notaActualId = this.getAttribute("nota-id");
            cursoActualId = this.getAttribute("curso_id");
            cursoContainer.style.display = "none";
            notaContainer.style.display = "flex";
            cargarNotaExistente(notaActualId);
          });
        });
      })
      .catch(error => console.error('Error al cargar los cursos:', error));
  }

  // Función para cargar la nota existente si la hay
  function cargarNotaExistente(cursoId) {
    fetch(`http://localhost:3000/api/notas/${cursoId}`)
      .then(response => response.json())
      .then(nota => {
        if (nota) {
          document.getElementById('practica').value = nota.practica || 0;
          document.getElementById('medioCurso').value = nota.medioCurso ||0;
          document.getElementById('final').value = nota.final ||0;
        }
      })
      .catch(error => console.error('Error al cargar la nota:', error));
  }

  // Event listener para el formulario de notas
  notaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const practica = document.getElementById('practica').value;
    const medioCurso = document.getElementById('medioCurso').value;
    const final = document.getElementById('final').value;

    const url = `http://localhost:3000/api/notas/${notaActualId}`;
    const method = 'PUT'; // Asumimos que siempre actualizamos, si no existe se creará

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ practica, medioCurso, final, cursoActualId }),
    });

    const data = await response.json();
    resultadosDiv.innerHTML = '';

    if (response.ok) {
      const notaFinal = (parseFloat(practica) * 0.15) + (parseFloat(medioCurso) * 0.35) + (parseFloat(final) * 0.50);
      const resultado = document.createElement('p');

      resultado.textContent = `Nota final: ${notaFinal.toFixed(2)}`;
      resultado.className = notaFinal >= 10.5 ? 'nota-aprobada' : 'nota-desaprobada';
      resultadosDiv.appendChild(resultado);

      // Actualizar la tabla de cursos
      cargarCursos();
    } else {
      const error = document.createElement('p');
      error.textContent = `Error: ${data.message}`;
      error.className = 'nota-desaprobada';
      resultadosDiv.appendChild(error);
    }
  });

  // Cuando se hace clic en "Regresar"
  btnRegresar.addEventListener("click", function() {
    notaContainer.style.display = "none";
    cursoContainer.style.display = "flex";
    notaForm.reset();
    resultadosDiv.innerHTML = '';
  });

  // Cargar los cursos al iniciar la página
  cargarCursos();
});

  