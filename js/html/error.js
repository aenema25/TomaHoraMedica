const errorAlert = (texto) => (
    `<div class="container alert alert-danger alert-dismissible fade show" id="errors" role="alert">
    <strong id="textoError">${texto}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
)

export default errorAlert
