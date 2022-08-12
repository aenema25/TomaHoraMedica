document.getElementById('buscar').addEventListener("click", () => {
    // vaciar contenedor de horas
    document.getElementById('horas').innerHTML = ''
    const buscarMedico = JSON.parse(localStorage.getItem('medicos')).find(medico => medico.apellido.toLowerCase() === document.getElementById("apellido").value.toLowerCase())
    if (buscarMedico) {
        if (buscarMedico.horasTomadas.length === 0) {
            document.getElementById("horas").insertAdjacentHTML("afterbegin", "Sin horas tomadas")
        } else {
            buscarMedico.horasTomadas.forEach(hora => {
                const html = `
                    <div class="row hora w-100 pt-1">
                        <div class="col-10">
                            <p><strong>Hora :</strong> ${hora} </p>
                        </div>
                        <div class="col-2">
                            <button type="button" id="${hora}" class="btn btn-outline-danger py-1"><i class="bi bi-x-square"></i></button>
                        </div>
                    </div>
                    `
                document.getElementById("horas").insertAdjacentHTML("afterbegin", html)
            })
            // buscar todos los botones de eliminar dentro del contenedor horas para poder agregar funcionalidad a los botones
            document.getElementById("horas").querySelectorAll('button').forEach(button => {
                button.addEventListener('click', () => {
                    swal("¿ Estas seguro que deseas cancelar esta hora ?", {
                        buttons: {
                            cancel: "Cancelar",
                            borrar: true
                        },
                    }).then((value) => {
                        if (value === "borrar") {
                            // actualizar lista de pacientes eliminando el paciente que corresponda a la hora
                            const pacientesActualizados = JSON.parse(localStorage.getItem('pacientes')).filter(paciente => paciente.horaAtencion !== button.id)
                            console.log(pacientesActualizados)
                            // actualizar las horas de los medicos borrando la hora tomada y volviendola a agregar a las horas disponibles
                            const medicosActualizados = []
                            JSON.parse(localStorage.getItem('medicos')).forEach(doctor => {
                                if (doctor.apellido === buscarMedico.apellido) {
                                    const horasTomadasActualizadas = doctor.horasTomadas.filter(hora => hora !== button.id)
                                    doctor.horasTomadas = horasTomadasActualizadas
                                    doctor.horasDisponibles.push(button.id)
                                    doctor.horasDisponibles.sort()
                                }
                                medicosActualizados.push(doctor)
                            })
                            console.log(medicosActualizados)
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

        }

    } else {
        document.getElementById("horas").insertAdjacentHTML("afterbegin", "El apellido ingresado no existe en listado de medicos")
    }
})