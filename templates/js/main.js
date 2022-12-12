if (document.getElementById("app")) {
    const { createApp } = Vue
    createApp({
        data() {
            return {
                pedidos: [],
                errored: false,
                loading: true,
                url: "https://julianete.pythonanywhere.com/pedidos"
            }
        },
        methods: {
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.pedidos = data;
                        this.loading = false;
                    })
                    .catch(err => {
                        this.errored = true
                    })
            },
            eliminar(producto) {
                valida = prompt('Estas seguro de querer borrar este producto? Digita "SI"')
                if (valida == "SI" || valida == "si") {
                    const url = 'https://julianete.pythonanywhere.com/pedidos/' + producto;
                    var options = {
                        method: 'DELETE',
                    }
                    fetch(url, options)
                        .then(res => res.text()) // or res.json()
                        .then(res => {
                            location.reload();
                        })
                }
            }
        },
        created() {
            this.fetchData(this.url) 
        }
         
    }).mount('#app')
}
