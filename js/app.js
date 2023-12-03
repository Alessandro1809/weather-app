//variables
const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();
  //validar el clima
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;
  if (ciudad === "" || pais === "") {
    mostrarAlerta("ambos campos son obligatorios");
  }
  //consultar la api
  consultaAPI(ciudad, pais);
}
function mostrarAlerta(mensaje) {
  const alertaError = document.querySelector(".bg-red-100");
  if (!alertaError) {
    const alertaError = document.createElement("div");
    alertaError.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "mx-w-md",
      "mx-auto,",
      "mt-6",
      "text-center"
    );
    alertaError.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;
    container.appendChild(alertaError);
    setTimeout(() => {
      alertaError.remove();
    }, 4000);
  }
}

function consultaAPI(ciudad, pais) {
  const appId = "428f2672b7efb7ac5ee414520dbfd681";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    //muestra un spinner de craga
    spinner();
     
    

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
        limpiarHTML();
      if (result.cod === "404") {
        mostrarAlerta("CIUDAD NO ENCONTRADA");
        return;
      }

      //imprime la respuesta en el html
     
      mostrarClima(result);
    })
    .catch((error) => {});
}
function mostrarClima(datosClima) {
    console.log(datosClima);
  const {name, main: { temp, temp_max, temp_min }} = datosClima;

  const centigradosmin = kelvinACentigrados(temp_min);
  const centigradosmax = kelvinACentigrados(temp_max);
  const centigrados = kelvinACentigrados(temp);
  const nombreCiudad= document.createElement('p');
  nombreCiudad.textContent=`Clima en: ${name}`;
  nombreCiudad.classList.add('font-bold','text-2xl');

  const actual = document.createElement("p");
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const temperaturaMaxima= document.createElement('p');
  temperaturaMaxima.innerHTML=`Max: ${centigradosmax} &#8451;`
    temperaturaMaxima.classList.add('text-xl');

    const temperaturaMinima= document.createElement('p');
    temperaturaMinima.innerHTML=`Min: ${centigradosmin} &#8451;`
    temperaturaMinima.classList.add('text-xl');
  
  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");

  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(temperaturaMaxima);
  resultadoDiv.appendChild(temperaturaMinima);
  resultado.appendChild(resultadoDiv);
}
function limpiarHTML(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
const kelvinACentigrados=grados=>{
 return parseInt(grados-273.15);
}
function spinner(){
    
    const divSpinner= document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML=`
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
    `;
    resultado.appendChild(divSpinner);
}