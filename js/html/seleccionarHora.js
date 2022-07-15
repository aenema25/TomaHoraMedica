const seleccionarHora = (medico) => {
    let html = `
    <div class="box container p-4 w-100 g-2 d-flex flex-column">
    <div class="h4">
        Selecciona una de las horas disponible
    </div>
    <div id="error"></div>
    <div class="py-4">
    <select class="form-select" aria-label="Default select example" id="hora">
        <option value="default" selected>Selecciona una opcion de la lista</option>`
    medico.horasDisponibles.forEach(hora => html += `<option value="${hora}">${hora}</option>`)
    html += `</select>
    </div>
    <div class="py-2  align-self-end">
    <button class="btn boton" id="paso4">Continuar</button>
    </div>
    </div>`
    return html
}

export default seleccionarHora