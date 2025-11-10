const latitude = 39.4765;
const longitude = -6.3722;

fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m&timezone=auto&forecast_days=1`
)
  .then((response) => response.json())
  .then((json) => {
    const horaActual = new Date().getHours();
    const datos = json.hourly;
    pintarTemperaturaActual(datos, horaActual);
  });

function pintarTemperaturaActual(datos, horaActual) {
  const container = document.getElementById("container");

  const temperaturaActual = datos.temperature_2m[horaActual + 2];
  const humedadActual = datos.relative_humidity_2m[horaActual + 2];

  container.innerHTML = `
            <div class="weather-card">
                <p>Temperatura actual: ${temperaturaActual}°C</p>
                <p>Humedad relativa: ${humedadActual} %</p>
            </div>
        `;
}
fetch(`https://jsonplaceholder.typicode.com/posts`)
  .then((response) => response.json())
  .then((json) => {
    const userId = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    // Filtrar las frases que pertenecen al usuario con el ID especificado
    const frasesUsuario = json.filter((post) => post.userId === userId);
    const aleatorio = Math.floor(Math.random() * frasesUsuario.length);
    const id = frasesUsuario[aleatorio].id;
    const titulo = frasesUsuario[aleatorio].title;
    const body = frasesUsuario[aleatorio].body;
    mostrarFrases(userId, id, titulo, body);
  });

function mostrarFrases(userId, id, titulo, body) {
  const cont = document.getElementById("frases");

  cont.innerHTML = `
    <div class="weather-card">
      <p>ID de Usuario: ${userId}</p>
      <p>ID de Frase: ${id}</p>
      <p>Título: ${titulo}</p>
      <p>Frase: ${body}</p>
    </div>
  `;
}

let database = [
  {
    name: "Portatil Dell",
    price: 500,
    disp: true,
    category: "Informática",
    estado: "Nuevo",
  },

  {
    name: "Ratón Logitech",
    price: 25,
    disp: false,
    category: "Informática",
    estado: "Usado",
  },

  {
    name: "Teclado Mecánico",
    price: 80,
    disp: true,
    category: "Informática",
    estado: "Nuevo",
  },
];
let contador = database.length;

function getFormData() {
  let name = document.getElementById("name").value.trim();
  let price = parseFloat(document.getElementById("price").value);
  let disp = document.getElementById("disp").checked;
  let category = document.getElementById("category").value;
  let estado = document.querySelector("input[name='estado']:checked").value;

  return { name, price, disp, category, estado };
}

function insertProduct() {
  // Recoger valores
  let { name, price, disp, category, estado } = getFormData();

  // Validar campos vaco
  if (name === "") {
    alert("El campo no puede estar vacío");
    return;
  }

  if (name.length > 30) {
    alert("El nombre no puede ser mayor a 30 caracteres");
    return;
  }

  if (isNaN(price) || price <= 0 || price >= 2500) {
    alert("Introduce un precio válido. Mayor que 0 y menor o igual a 2500");
    return;
  }

  if (category === "") {
    alert("Selecciona una categoría");
    return;
  }

  let duplicado = database.some(
    (prod) => prod.name.toLowerCase() === name.toLowerCase()
  );
  if (duplicado) {
    alert("El producto ya existe.");
    return;
  }

  // añadirlo al array
  database.push({ name, price, disp, category, estado });
  contador++;

  console.log(
    "Producto añadido - Nombre:",
    name,
    "| Precio:",
    price,
    "| Disponible:",
    disp
  );

  // Limpia formulario después de añadir
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("disp").checked = false;
  document.getElementById("category").value = "";
  document.querySelector("input[name='estado'][value='Nuevo']").checked = true;

  alert("Producto añadido");
}

function showProducts() {
  for (n = 0; n < database.length; n++) {
    window.alert(
      `Nombre: ${database[n].name} | Precio: $${
        database[n].price
      } | Disponible: ${database[n].disp ? "Sí" : "No"} | Categoría: ${
        database[n].category
      } | Estado: ${database[n].estado}`
    );
  }
}

function deleteProduct() {
  let name = prompt("Introduce el nombre del producto que deseas eliminar:");
  if (!name) {
    return;
  }

  let index = database.findIndex(
    (prod) => prod.name.toLowerCase() === name.toLowerCase()
  );
  if (index === -1) {
    alert("No se encontró el producto.");
    return;
  }

  database.splice(index, 1);
  contador--;
  alert(`Producto "${name}" eliminado correctamente.`);
}

function finalizar() {
  if (database.length === 0) {
    alert("No hay productos para mostrar.");
    return;
  }

  database.sort((a, b) => a.name.localeCompare(b.name));

  let salida = "Productos:\n\n";
  for (let prod of database) {
    salida += `- ${prod.name}\n  Precio: $${prod.price}\n  Disponible: ${
      prod.disp ? "Sí" : "No"
    }\n  Categoría: ${prod.category}\n  Estado: ${prod.estado}\n\n`;
  }

  salida += `Total de productos: ${contador}`;
  alert(salida);
}

//MODIFICA TU PRACTICA FASE3
//PARA QUE MUESTRE UN DIV
//USANDO SETINTERVAL UN RELOJ DIGITAL
//QUE SE ACTUALICE CADA SEGUNDO

let intervalo = setInterval(mostrarHora, 1000);

function mostrarHora() {
  const re = document.getElementById("reloj");
  re.innerHTML = `
    <div class="time-card">
      <p id="hora"></p>
      <button type="button" onclick="detenerHora();">Detener Reloj</button>
    </div>`;
    let ahora = new Date();
    document.getElementById("hora").textContent = ahora.toLocaleTimeString();
}

function detenerHora(){
  if(intervalo){
    clearInterval(intervalo);
    intervalo = null;
    const re = document.getElementById("reloj");
    re.innerHTML = `
      <div class="time-card">
        <p>Reloj detenido.</p>
        <br>
        <button type="button" onclick="detenerHora();">Reanudar Reloj</button>
      </div>
      `
  }else{
    mostrarHora();
    intervalo = setInterval(mostrarHora, 1000);
  };
}