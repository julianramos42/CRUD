function guardar() {

    let n = document.getElementById("txtNombre").value
    let p = parseFloat(document.getElementById("txtPrecio").value)
    let d = document.getElementById("txtDescripcion").value
    let i = document.getElementById("txtImg").value

    let pedido = {
        nombre: n,
        precio: p,
        descripcion: d,
        img: i
    }
    let url = "https://julianete.pythonanywhere.com/pedidos"
    var options = {
        body: JSON.stringify(pedido),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Producto añadido con exito")
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar")
            console.error(err);
        })
}

function resetear(){
    document.getElementById('txtNombre').value = ""
    document.getElementById('txtPrecio').value = ""
    document.getElementById('txtDescripcion').value = ""
    document.getElementById('txtImg').value = ""
}