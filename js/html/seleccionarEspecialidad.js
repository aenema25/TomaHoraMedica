const seleccionarEspecialidad = (especialidades, nombrePaciente) => {
    let html = `
    <div class="box container p-4 w-100 g-2 d-flex flex-column">
    <div class="h2 agendar">
        ¡ Bienvenido ${nombrePaciente} !
    </div>
    <div class="py-2 agendar">
        ¿Para que especialidad desea solicitar su hora?
    </div>
    <div id="error"></div>
    <div class="py-2">
        <select class="form-select" aria-label="Default select example" id="especialidad">
            <option value="default" selected>Selecciona una opcion de la lista</option>`
            especialidades.forEach(especialidad => html += `<option value="${especialidad}">${especialidad}
            </option>`)
            html += `
        </select>
    </div>
    <div class="py-2 align-self-end">
        <button class="btn boton" id="paso2">Continuar</button>
    </div>
    </div>
    `
    return html
}

export default seleccionarEspecialidad