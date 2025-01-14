const series = "https://gateway.marvel.com:443/v1/public/events?ts=1&apikey=51ad38030902c1c6fdfa29a0d2773578&hash=0c918638222c7ac46664ab3eaa4844e8&limit=10";
const section = document.getElementById("comics");

let offset = 0;

/**
 * esta función hace la extructura de la forma en que tienen que aparecer los comics
 *
 */
function formaDeMostrar(info) {
    if (!document.getElementById(info.id) ) {

        console.log("nombre imagen"+info.thumbnail.path+"."+info.thumbnail.extension)
        const div = document.createElement("div");
        const img = document.createElement("img");
        div.className = "fotos";
        let id = info.id;
        div.id = info.id;
        img.src = info.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? "img/no-image.jpg" : info.thumbnail.path+"."+info.thumbnail.extension;
        div.appendChild(img);
        section.appendChild(div);


        img.addEventListener("click", () => {
            sessionStorage.setItem("id", id);
            window.location.href = "comics.html";
        })
    }
}

/**
 * Esta función lo que hace es de la api sacar la información de los comics y luego darle el diseño de la función
 * formaDeMostrar
 */
function mostrarComics() {
    const url = "https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=51ad38030902c1c6fdfa29a0d2773578&hash=0c918638222c7ac46664ab3eaa4844e8&limit=8&offset="+offset;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const personajes = data.data.results;
            personajes.forEach(element => {
                formaDeMostrar(element);
            });

            offset += 8;
             
        });
}
/**
 * Aesta función lo que hace es que cuando el usuario llega casi al final de la pagina llama a la función des mostrar los
 * comics y muestra más 
 * @param {*} funtipo 
 */
function scroll(funtipo){
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            funtipo();
    
        }
    })
}

const lista = document.getElementById("lista");
/**
 * muestra las diferentes series de comics que hay para elegir 
 */
function mostrarLista(){
fetch(series)
    .then(res => res.json())
    .then(data => {
        const personajes = data.data.results;
        personajes.forEach(element => {
            console.log("nombre:" + element.title);
            const opcion = document.createElement("option");
            opcion.textContent = element.title;
            opcion.value = element.id;
            lista.appendChild(opcion);
        });

    });
}
/**
 * Muestra los comics de la lista que has elegido.
 */
function mostrarElegido(){
lista.addEventListener("change", () => {
    let idSerie = lista.value;
    section.innerHTML = "";
    const listado = "https://gateway.marvel.com:443/v1/public/events/" + idSerie + "/comics?ts=1&apikey=51ad38030902c1c6fdfa29a0d2773578&hash=0c918638222c7ac46664ab3eaa4844e8&limit=8";
    fetch(listado)
        .then(res => res.json())
        .then(
            data => {
                const personajes = data.data.results;
                personajes.forEach(element => {
                    formaDeMostrar(element);
                }
                )
            }
        )
})
}
/**
 * cierra la sesión del usuario y borra el carrito
 */
function cerrarSesion(){
    const cerrar = document.getElementById("cerrar");
    cerrar.addEventListener("click",()=>{
        localStorage.removeItem("guardado");

        window.location.href = "./login.html";
        console.log("cerrarsesion")
    })
}
mostrarComics();
scroll(mostrarComics);
mostrarLista();
mostrarElegido();
cerrarSesion();