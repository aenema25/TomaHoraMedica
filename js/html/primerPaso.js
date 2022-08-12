const primerPaso = `
<div class="hero container">
<div class="row align-items-center justify-content-center">
    <div class="col-sm-6 col-xs-12 ">
        <p class="display-3 titulo">Solicita tu hora medica aqui</p>
        <p class="h3 parrafo">Los mejores profesionales al alcanze de un click</p>
    </div>
    <div class="col-sm-6 col-xs-12">
        <img alt="doctor" src="./imagenes/doctor.svg" width="100%"
            style="filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));">
    </div>
</div>
</div>
<div class="container">
<div class="box p-3 pb-4">
    <div id="error"></div>
    <p class="h4 p-2 agendar">Agenda tu hora</p>
    <div class="row g-3 p-2">
        <div class="col-md-3 col-sm-4 col-xs-12">
            <input type="text" class="form-control" placeholder="RUT" aria-label="RUT" id="run">
        </div>
        <div class="col-md-3 col-sm-4 col-xs-12">
            <input type="text" class="form-control" placeholder="Nombre" aria-label="Nombre" id="name">
        </div>
        <div class="col-md-3 col-sm-4 col-xs-12">
            <input type="text" class="form-control" placeholder="Apellido" aria-label="Apellido" id="lastname">
        </div>
        <div class="col-md-3 col-sm-12 col-xs-12">
            <button class="btn boton w-100" id="paso1">Comenzar</button>
        </div>
    </div>
</div>
</div>

`
export default primerPaso