const confirmarHora = (datos) => {
    let html = `
    <div class="box container p-4 w-100 g-2 d-flex flex-column">
    <div class="row align-items-center justify-content-center">
        <div class="col-12 pb-5">
            <div class="h1 agendar text-center">
                Confirma que la informacion sea correcta
            </div>
        </div>
        <div class="col-12">
            <div id="error"></div>
        </div>
        <div class="col-8">
            <div class="lead py-4">
                <p class="textoConfirmar"><strong>Nombre Paciente :</strong> ${datos.paciente.nombre}
                    ${datos.paciente.apellido}</p>
                <p class="textoConfirmar"><strong>Apellido Especialista :</strong> ${datos.medico.apellido}
                </p>
                <p class="textoConfirmar"><strong>Hora seleccionada :</strong> ${datos.hora}</p>
            </div>
        </div>
        <div class="col-4">
            <img src="./imagenes/confirmar.svg" alt="confirmar" width="100%">
        </div>
        <div class="col-3 offset-9 pt-5">
                <button class="btn boton w-100" id="paso5">Confirmar</button>
        </div>
    </div>   
    </div>`
    return html
}

export default confirmarHora