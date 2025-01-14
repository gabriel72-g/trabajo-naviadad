const usuarios_API = "http://localhost:3000/usuarios";
const usuario = document.getElementById("nombre");
const contraseña = document.getElementById("contraseña");
const h4 = document.createElement("h4");
const boton = document.createElement("button");
boton.textContent = "Enviar";
const input = document.createElement("input");
/**
 * Esta función comprueba si el usuario existe en el archivo json lugo comprueba a trabes del tocken  si el usuario 
 * ya ha entrado o no, si no ha entrado borra el carrito y añade su id como tocken, por ultimo genera la zona de 
 * donde se comprueba si el usuario es un robot o no.
 */
function comprobacionUsuario(){
  const entrar = document.getElementById("entrar");
  entrar.addEventListener("click",()=>{
    let tocken = localStorage.getItem("tocken");   
    fetch(usuarios_API)
    .then(res => res.json())
    .then(data=>{
      const persona = data.find(user=> user.nombre === usuario.value)
  
      if(persona && persona.id ===tocken){
        console.log(persona.id)
      input.type ="text";
      h4.textContent = antiBut();
     
      const dic = document.getElementById("antiboot");
      dic.innerHTML = ""; 
  
      dic.appendChild(h4);
      dic.appendChild(input);
      dic.appendChild(boton);
      
      }else{
        tocken= persona.id;
        localStorage.setItem("tocken", tocken);
        localStorage.removeItem("guardado");
      }
    })
  })  
}
/**
 * Esta función comprueba a traves de lo que se ha generado en la función comprobacionUsuario que si el usuario es
 * un robot o no, haciendo que el usuario tenga que escribir lo que genere la función antiBut
 */
function comprobacionRobot(){
  boton.addEventListener("click",()=>{

    if(input.value === h4.textContent){
      
      location.href="index.html";
    
  
  }
  })
}
/**
 * La función registrar guarda un usuario en el archivo json
 */
function registrar(){
  const registrarse = document.getElementById("registrarse");
  registrarse.addEventListener("click",()=>{
    fetch(usuarios_API,{
    method: "POST",
    body: JSON.stringify({nombre : usuario.value,password :contraseña.value})
})});
}

/**
 * Esta dunción genera una clave aleatoria de no más de 8 caracteres 
 * @returns da la frase que el usuario tiene que escribir
 */
function antiBut(){
  let texto = "";
  const caracteres = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for(let i =0;i<8;i++){
      const numAleatorio = Math.floor(Math.random()*caracteres.length);
      texto+= caracteres[numAleatorio];
}

return texto

}
comprobacionUsuario();
comprobacionRobot();
registrar();