import primerPaso from "./html/primerPaso.js";
import errorAlert from "./html/error.js";
import seleccionarEspecialidad from "./html/seleccionarEspecialidad.js";
import seleccionarEspecialista from "./html/seleccionarEspecialista.js";
import seleccionarHora from "./html/seleccionarHora.js";
import confirmarHora from "./html/confirmarHora.js";

const especialidades = ['Medicina General', 'Pediatria', 'Traumatologia', 'Gastroenterologia']

let pacienteActual = {
    paciente: '',
    medico: '',
    hora: ''
}
//crear medico tratante
class medicoTratante {
    constructor(apellido, especialidad, horasDisponibles) {
        this.apellido = apellido,
            this.especialidad = especialidad,
            this.horasDisponibles = horasDisponibles,
            this.horasTomadas = []
    }
}
//crear paciente
class crearPaciente {
    constructor(run, nombre, apellido, medico, horaAtencion) {
        this.run = run,
            this.nombre = nombre,
            this.apellido = apellido,
            this.medico = medico,
            this.horaAtencion = horaAtencion
    }
}

// creacion de medicos mediante archivo json y enviar informacion a localstorage

const storageMedicos = localStorage.getItem('medicos')
const storagePacientes = localStorage.getItem('pacientes')
if (!storageMedicos) {
    fetch('https://raw.githubusercontent.com/aenema25/TomaHoraMedica/main/medicos.json', { method: 'GET' })
        .then(response => response.json())
        .then(response => {
            const medicos = [];
            response.forEach(medico => {
                medicos.push(
                    new medicoTratante(medico.apellido, medico.especialidad, medico.horasDisponibles)
                )
            })
            localStorage.setItem('medicos', JSON.stringify(medicos))
        })
        .catch(e => console.log(e))
}
if (!storagePacientes) {
    localStorage.setItem('pacientes', JSON.stringify([]))
}

//carga de primer paso en la web
document.getElementById("pasos").innerHTML = primerPaso
//cambios dinamicos por cada paso completado
document.addEventListener('click', (e) => {
    if (e.target && e.target.id == 'paso1') {
        const run = document.getElementById("run").value
        const name = document.getElementById("name").value
        const lastname = document.getElementById("lastname").value
        if (!run || !name || !lastname) {
            document.getElementById("error").innerHTML = errorAlert("Debes rellenar todos los campos solicitados")
        } else {
            document.getElementById("error").style.display = "none"
            const pacienteNuevo = new crearPaciente(run, name, lastname)
            pacienteActual.paciente = pacienteNuevo
            document.getElementById("pasos").innerHTML = seleccionarEspecialidad(especialidades, pacienteActual.paciente.nombre)
        }
    }
    if (e.target && e.target.id == 'paso2') {
        const especialidad = document.getElementById("especialidad").value
        if (especialidad == "" || especialidad == "default") {
            document.getElementById("error").innerHTML = errorAlert("Debes seleccionar una especialidad para poder continuar")
        } else {
            document.getElementById("error").style.display = "none"
            const medicosEspecialidad = JSON.parse(localStorage.getItem('medicos')).filter(medico => medico.especialidad == especialidad)
            console.log(medicosEspecialidad)
            document.getElementById("pasos").innerHTML = seleccionarEspecialista(medicosEspecialidad)
        }
    }
    if (e.target && e.target.id == 'paso3') {
        const medicoSeleccionado = document.getElementById("especialista").value
        if (medicoSeleccionado == "" || medicoSeleccionado == "default") {
            document.getElementById("error").innerHTML = errorAlert("Debes seleccionar un especialista para poder continuar")
        } else {
            document.getElementById("error").style.display = "none"
            const medico = JSON.parse(localStorage.getItem('medicos')).find(medico => medico.apellido == medicoSeleccionado)
            console.log(medico)
            pacienteActual.medico = medico
            document.getElementById("pasos").innerHTML = seleccionarHora(medico)
        }
    }
    if (e.target && e.target.id == 'paso4') {
        const horaSeleccionada = document.getElementById("hora").value
        console.log(horaSeleccionada)
        if (horaSeleccionada == "" || horaSeleccionada == "default") {
            document.getElementById("error").innerHTML = errorAlert("Debes seleccionar una hora para poder continuar")
        } else {
            document.getElementById("error").style.display = "none"
            pacienteActual.hora = horaSeleccionada
            document.getElementById("pasos").innerHTML = confirmarHora(pacienteActual)
            console.log(pacienteActual)
        }
    }
    if (e.target && e.target.id == 'paso5') {
        //obtener items de localstorage para almancenar la informacion
        let medicosFromStorage = JSON.parse(localStorage.getItem('medicos'))
        let pacientesFromStorage = JSON.parse(localStorage.getItem('pacientes'))
        // Desestructurar objeto
        const { paciente: nuevoPaciente, medico: medicoSeleccionado, hora: hora } = pacienteActual
        // actualizar la informacion de los elementos del localstorage
        nuevoPaciente.horaAtencion = hora
        nuevoPaciente.medico = medicoSeleccionado.apellido
        pacientesFromStorage.push(nuevoPaciente)

        const indiceHora = medicoSeleccionado.horasDisponibles.indexOf(hora)

        medicosFromStorage.find(medico => medico.apellido == medicoSeleccionado.apellido).horasDisponibles.splice(indiceHora, 1)
        medicosFromStorage.find(medico => medico.apellido == medicoSeleccionado.apellido).horasTomadas.push(hora)

        localStorage.setItem('medicos', JSON.stringify(medicosFromStorage))
        localStorage.setItem('pacientes', JSON.stringify(pacientesFromStorage))

        swal({
            icon: "success",
            title: "Hora agendada con exito",
        }).then(() => window.location.reload(true))


    }
});