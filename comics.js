const id = sessionStorage.getItem("id");
const link = "https://gateway.marvel.com:443/v1/public/comics/"+id+"?ts=1&apikey=51ad38030902c1c6fdfa29a0d2773578&hash=0c918638222c7ac46664ab3eaa4844e8";
const usuarios = "https://gateway.marvel.com:443/v1/public/comics/"+id+"/characters?ts=1&apikey=51ad38030902c1c6fdfa29a0d2773578&hash=0c918638222c7ac46664ab3eaa4844e8&limit=100";


const com = document.getElementById("comprar");
const per = document.getElementById("personajes");
const informacion = document.getElementById("info");
/**
 * muestra la información del comic elegido
 */
function mostrarImg(){
    fetch(link)
    .then(res => res.json())
        .then(data=>{
            const comics = data.data.results;
            comics.forEach(element => {
                const p = document.createElement("p");
                const img =  document.createElement("img");
                const h2 =  document.getElementById("titulo");
                p.textContent= element.description;
                img.src = element.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? "img/no-image.jpg" : element.thumbnail.path+"."+element.thumbnail.extension;

                h2.textContent =element.title;
                com.appendChild(img);

            });
        });
    
}
/**
 * muestra los personajes que aparecen en el comic
 */
function mostrarPersonajes(){
    fetch(usuarios)
    .then(res => res.json())
        .then(data=>{
            const personajes = data.data.results;
            personajes.forEach(element => {
    
                
                console.log("nombre"+element.name);
                console.log("personajes"+element.characters);
                console.log("precio "+element.prices);
                console.log("creators "+element.creators );
                const img2 =  document.createElement("img");
                const p = document.createElement("p");
                img2.src = element.thumbnail.path+"."+element.thumbnail.extension;
                p.textContent = element.name;
                per.appendChild(img2);
               /*  per.appendChild(p); */
            });
        });
}
/**
 * esta función hace que al darle al botón se añada el comic a la id y te lleve a el carrito
 */
function añadirCarrito(){
    const tocken = localStorage.getItem("tocken");
    if(tocken){
        const boton = document.getElementById("add");
        boton.addEventListener("click",()=>{
            const arrayComics=localStorage.getItem("guardado");
            let array
            if(arrayComics){
                 array = JSON.parse(arrayComics);
            }else{
                 array =[];
            }
            array.push(id);
            localStorage.setItem("guardado",JSON.stringify(array));
            window.location.href ="carrito.html";
        })        
    }

}

mostrarImg();
mostrarPersonajes();
añadirCarrito();