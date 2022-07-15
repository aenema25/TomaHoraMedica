import primerPaso from "./html/primerPaso.js";
import errorAlert from "./html/error.js";
import seleccionarEspecialidad from "./html/seleccionarEspecialidad.js";
import seleccionarEspecialista from "./html/seleccionarEspecialista.js";
import seleccionarHora from "./html/seleccionarHora.js";
import confirmarHora from "./html/confirmarHora.js";

const especialidades = ['Medicina General', 'Pediatria', 'Traumatologia', 'Gastroenterologia']
const medicos = [];
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
class paciente {
    constructor(run, nombre, apellido, medico, horaAtencion) {
        this.run = run,
            this.nombre = nombre,
            this.apellido = apellido,
            this.medico = medico,
            this.horaAtencion = horaAtencion
    }
}
// creacion de medico
medicos.push(new medicoTratante('Campos', 'Medicina General', ['10:00 am', '11:00 am', '12:00 pm', '13:00 pm', '14:00 pm']))
medicos.push(new medicoTratante('Figueroa', 'Medicina General', ['10:30 am', '11:30 am', '12:30 pm', '13:30 pm', '14:30 pm']))
medicos.push(new medicoTratante('Elgueta', 'Pediatria', ['9:30 am', '10:30 am', '11:30 am', '12:00 pm', '13:00 pm', '14:00 pm']))
medicos.push(new medicoTratante('Jara', 'Pediatria', ['9:00 am', '10:00 am', '11:00 am', '12:30 pm', '13:30 pm', '14:30 pm']))
medicos.push(new medicoTratante('Ormazabal', 'Traumatologia', ['9:30 am', '10:30 am', '11:30 am', '12:00 pm', '13:00 pm', '14:00 pm']))
medicos.push(new medicoTratante('Urrutia', 'Traumatologia', ['9:00 am', '10:00 am', '11:00 am', '12:30 pm', '13:30 pm', '14:30 pm']))
medicos.push(new medicoTratante('Parra', 'Gastroenterologia', ['14:00 pm', '15:00 pm', '16:00 pm', '17:00pm', '18:00pm']))
medicos.push(new medicoTratante('Perez', 'Gastroenterologia', ['14:30 pm', '15:30 pm', '16:30 pm', '17:30pm', '18:30pm']))
// verificar si el navegador cuenta con el item medicos en localstorage, de no existir lo agrega
if (localStorage.getItem('medicos') === undefined || localStorage.getItem('medicos') === null) {
    console.log("se ejecuta")
    localStorage.setItem('medicos', JSON.stringify(medicos))
}
// verificar si el navegador cuenta con el item paciente en localstorage, de no existir lo agrega
if (localStorage.getItem('pacientes') === undefined || localStorage.getItem('pacientes') === null) {
    localStorage.setItem('pacientes', JSON.stringify([]))
}

//carga de primer paso en la web
document.getElementById("pasos").innerHTML = primerPaso
//cambios dinamicos por cada paso completado
document.addEventListener('click', function (e) {
    if (e.target && e.target.id == 'paso1') {
        const run = document.getElementById("run").value
        const name = document.getElementById("name").value
        const lastname = document.getElementById("lastname").value
        if (!run || !name || !lastname) {
            document.getElementById("error").innerHTML = errorAlert("Debes rellenar todos los campos solicitados")
        } else {
            document.getElementById("error").style.display = "none"
            const pacienteNuevo = new paciente(run, name, lastname)
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
            pacienteActual.medico = medico
            document.getElementById("pasos").innerHTML = seleccionarHora(medico)
        }
    }
    if (e.target && e.target.id == 'paso4') {
        const horaSeleccionada = document.getElementById("hora").value
        if (horaSeleccionada == "" || horaSeleccionada == "default") {
            document.getElementById("error").innerHTML = errorAlert("Debes seleccionar una hora para poder continuar")
        } else {
            document.getElementById("error").style.display = "none"
            pacienteActual.hora = horaSeleccionada
            document.getElementById("pasos").innerHTML = confirmarHora(pacienteActual)
        }
    }
    if (e.target && e.target.id == 'paso5') {
        //obtener items de localstorage para almancenar la informacion
        let medicosFromStorage = JSON.parse(localStorage.getItem('medicos'))
        let pacientesFromStorage = JSON.parse(localStorage.getItem('pacientes'))
        // actualizar la informacion de los elementos del localstorage
        pacientesFromStorage.push(pacienteActual.paciente)
        const indiceHora = pacienteActual.medico.horasDisponibles.indexOf(pacienteActual.hora)
        medicosFromStorage.find(medico => medico.apellido == pacienteActual.medico.apellido).horasDisponibles.splice(indiceHora, 1)
        medicosFromStorage.find(medico => medico.apellido == pacienteActual.medico.apellido).horasTomadas.push(pacienteActual.hora)
        pacientesFromStorage.find(paciente => paciente.run == pacienteActual.paciente.run).medico = pacienteActual.medico.apellido
        pacientesFromStorage.find(paciente => paciente.run == pacienteActual.paciente.run).horaAtencion = pacienteActual.hora
        alert('Hora agendada con exito')
        document.getElementById("pasos").innerHTML = primerPaso
        // actualizar lista de pacientes y medicos en localstorage
        localStorage.setItem('medicos', JSON.stringify(medicosFromStorage))
        localStorage.setItem('pacientes', JSON.stringify(pacientesFromStorage))
    }
});