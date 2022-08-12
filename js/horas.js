document.getElementById('buscar').addEventListener("click", () => {
    // vaciar contenedor de horas
    document.getElementById('horas').innerHTML = ''
    const buscarPaciente = JSON.parse(localStorage.getItem('pacientes')).filter(paciente => paciente.run === document.getElementById("run").value)
    if (buscarPaciente.length !== 0) {
        buscarPaciente.forEach(paciente => {
            const html = `
                <div class="row hora w-100 pt-1">
                    <div class="col-10">
                        <p><strong>Nombre :</strong> ${paciente.nombre} ${paciente.apellido} </p>
                        <p><strong>Hora Atención :</strong> ${paciente.horaAtencion}</p>
                        <p><strong>Apellido medico :</strong> ${paciente.medico}</p>
                    </div>
                    <div class="col-2">
                        <button type="button" id="${paciente.horaAtencion}" class="btn btn-outline-danger py-1"><i class="bi bi-x-square"></i></button>
                    </div>
                </div>
                `
            document.getElementById("horas").insertAdjacentHTML("afterbegin", html)
        })
        // buscar todos los botones de eliminar dentro del contenedor horas para poder agregar funcionalidad a los botones
        document.getElementById("horas").querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                swal("¿ Estas seguro que deseas eliminar el registro ?", {
                    buttons: {
                        cancel: "Cancelar",
                        borrar: true
                    },
                }).then((value) => {
                    if (value === "borrar") {
                        // actualizar lista de pacientes eliminando el paciente que corresponda a la hora
                        const pacientesActualizados = JSON.parse(localStorage.getItem('pacientes')).filter(paciente => paciente.horaAtencion !== button.id)
                        // actualizar las horas de los medicos borrando la hora tomada y volviendola a agregar a las horas disponibles
                        const medicosActualizados = []
                        const pacienteActual = buscarPaciente.find(paciente => paciente.horaAtencion === button.id)
                        JSON.parse(localStorage.getItem('medicos')).forEach(doctor => {
                            if (doctor.apellido === pacienteActual.medico) {
                                const horasTomadasActualizadas = doctor.horasTomadas.filter(hora => hora !== button.id)
                                doctor.horasTomadas = horasTomadasActualizadas
                                doctor.horasDisponibles.push(button.id)
                                doctor.horasDisponibles.sort()
                            }
                            medicosActualizados.push(doctor)
                        })
                        // actualizar los datos en localstorage
                        localStorage.setItem('pacientes', JSON.stringify(pacientesActualizados))
                        localStorage.setItem('medicos', JSON.stringify(medicosActualizados))
                        document.getElementById(button.id).closest('.row').remove()
                        swal("Hora cancelada con exito")
                    } else {
                        swal("No se borro el registro")
                    }
                });
            })
        })
    } else {
        document.getElementById("horas").insertAdjacentHTML("afterbegin", "Paciente sin horas registradas")
    }
})