var args = location.search.substr(1).split("&");
// lee los argumentos pasados a este formulario
var parts = []
for (let i = 0; i < args.length; ++i) {
    parts[i] = args[i].split('=');
}

var oldLink = location.href
var newLink = oldLink.slice(oldLink.indexOf('img='))
oldLink = newLink.split('img=')
//extrae la URL de la imagen

console.log(args)
document.getElementById("txtId").value = parts[0][1]
document.getElementById("txtNombre").value = parts[1][1].split(["%20"]).join(" ")
document.getElementById("txtPrecio").value = parts[2][1]
document.getElementById("txtDescripcion").value = parts[3][1].split(["%20"]).join(" ")
document.getElementById("txtImg").value = oldLink[1]

function modificar() {
    let id = document.getElementById("txtId").value
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
    let url = "https://julianete.pythonanywhere.com/pedidos/"+id
    var options = {
        body: JSON.stringify(pedido),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Producto modificado")
            window.location.href = "https://julianramos42.github.io/CRUD/index.html";
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            console.error(err);
            alert("Error al modificar el producto")
        })      
}
