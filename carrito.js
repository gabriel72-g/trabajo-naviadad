const ids = JSON.parse(localStorage.getItem("guardado"));

const section = document.getElementById("carrito");


/**
 * Genera el lugar dode se muestra la información
 */
function dieseñoDePagina(comics) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const h4 = document.createElement("h4");
    div.className = "car";
    img.src = comics.thumbnail.path + "." + comics.thumbnail.extension;
    h4.textContent = comics.title;
    div.appendChild(img);
    div.appendChild(h4);
    section.appendChild(div);
}
/**
 * busca en la api las id que saque del array.
 */
function mostrar() {
    ids.forEach(id => {
        const link = "https://gateway.marvel.com:443/v1/public/comics/" + id + "?ts=1&apikey=51ad38030902c1c6fdfa29a0d2773578&hash=0c918638222c7ac46664ab3eaa4844e8&limit=100";

        fetch(link)
            .then(res => res.json())
            .then(data => {
                const comics = data.data.results;
                comics.forEach(element => {
                    dieseñoDePagina(element);
                });
            });
    });
}

mostrar();