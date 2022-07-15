document.getElementById('buscar').addEventListener("click", () => {
    const horas = []
    const pacientes = JSON.parse(localStorage.getItem('pacientes'))
    pacientes.forEach(paciente => {
        if (paciente.run === document.getElementById("run").value) {
            horas.push(paciente)
        }
    });
    if (horas.length !== 0) {
        horas.forEach(hora => {
            const html = `
            <div class="hora">
            <p><strong>Nombre :</strong> ${hora.nombre} ${hora.apellido} </p>
            <p><strong>Hora Atención :</strong> ${hora.horaAtencion}</p>
            <p><strong>Apellido medico :</strong> ${hora.medico}</p>
            </div>
            `
            document.getElementById("horas").insertAdjacentHTML("afterbegin", html)
        })
    } else {
        document.getElementById("horas").insertAdjacentHTML("afterbegin", "Sin horas tomadas")
    }
})