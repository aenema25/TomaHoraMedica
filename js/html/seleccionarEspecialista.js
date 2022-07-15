const seleccionarEspecialista = (especialistas) => {
    let html = `
    <div class="box container p-4 w-100 g-2 d-flex flex-column">
    <div class="h4 agendar">
        Selecciona tu especialista para ver las horas disponible
    </div>
    <div id="error"></div>
    <div class="py-4">
        <select class="form-select" aria-label="Default select example" id="especialista">
            <option value="default" selected>Selecciona una opcion de la lista</option>`
            especialistas.forEach(especialista => html += `<option value="${especialista.apellido}">
                ${especialista.apellido}</option>`)
            html += `
        </select>
    </div>
    <div class="py-2 align-self-end">
        <button class="btn boton" id="paso3">Continuar</button>
    </div>
    </div>`
    return html
}

export default seleccionarEspecialista