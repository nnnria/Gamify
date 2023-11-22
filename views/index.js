// Escribe cualquier cosa aquí
const text = "GAMIFY";

// Esta función convierte una cadena en un array
function createLetterArray(string) {
  return string.split("");
}

// Esta función crea capas de letras envueltas en etiquetas span
function createLetterLayers(array) {
  return array.map((letter) => {
    let layer = "";
    // Especifica el número de capas por letra
    for (let i = 1; i <= 2; i++) {
      // Si la letra es un espacio
      if (letter == " ") {
        layer += '<span class="space"></span>';
      } else {
        layer += '<span class="letter-' + i + '">' + letter + "</span>";
      }
    }
    return layer;
  });
}

// Esta función envuelve cada letra en un contenedor principal
function createLetterContainers(array) {
  return array.map((item) => {
    let container = "";
    container += '<div class="wrapper">' + item + "</div>";
    return container;
  });
}

// Utiliza una promesa para mostrar las capas de texto en el DOM primero
const outputLayers = new Promise(function (resolve, reject) {
  document.getElementById("text").innerHTML = createLetterContainers(
    createLetterLayers(createLetterArray(text))
  ).join("");
  resolve();
});

// Luego ajusta el ancho y alto de cada letra
const spans = Array.prototype.slice.call(document.getElementsByTagName("span"));
outputLayers
  .then(() => {
    return spans.map((span) => {
      setTimeout(() => {
        span.parentElement.style.width = span.offsetWidth + "px";
        span.parentElement.style.height = span.offsetHeight + "px";
      }, 250);
    });
  })
  .then(() => {
    // Luego desliza las letras a la vista una por una
    let time = 250;
    return spans.map((span) => {
      time += 75;
      setTimeout(() => {
        span.parentElement.style.top = "0px";
      }, time);
    });
  });
