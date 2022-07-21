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
            <div class="row hora w-100 pt-1">
            <div class="col-10">
            <p><strong>Nombre :</strong> ${hora.nombre} ${hora.apellido} </p>
            <p><strong>Hora Atención :</strong> ${hora.horaAtencion}</p>
            <p><strong>Apellido medico :</strong> ${hora.medico}</p>
            </div>
            <div class="col-2">
            <button type="button" class="btn btn-outline-danger py-1" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-x-square"></i></button>
            </div>
            </div>
            `
            document.getElementById("horas").insertAdjacentHTML("afterbegin", html)
        })
    } else {
        document.getElementById("horas").insertAdjacentHTML("afterbegin", "Sin horas tomadas")
    }
})

document.getElementById("cancelarHora").addEventListener("click",()=>{
    alert('En contrucción')
})