// ==========================================
// PRODUCTOS
// ==========================================

const productos = [

    {
        id: 1,
        nombre: "Fresa",

        // ⭐ RUTA DE LA IMAGEN DE FRESA
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmwrUqe1H1mPXKj_1vtfgf0T1kHRT7CRBuO1cYjdbKqw&s=10",

        precio: 8.99,
        stock: 25
    },

    {
        id: 2,
        nombre: "Sandía",

        // ⭐ RUTA DE LA IMAGEN DE SANDÍA
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFw8khjdO9CX9B1nKFn0VlzJhiHe_1RMWzlNMQSZI6BA&s=10",

        precio: 8.99,
        stock: 18
    },

    {
        id: 3,
        nombre: "Uva",

        // ⭐ RUTA DE LA IMAGEN DE UVA
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_7k2Q2wftdE5jiogHjs-532HI9DBpgGw91yWUlE9ng&s=10",

        precio: 9.50,
        stock: 12
    },

    {
        id: 4,
        nombre: "Mango",

        // ⭐ RUTA DE LA IMAGEN DE MANGO
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9eUfGwZrU5OQKZPfO78brfViPrFe7I0a_OMBjlFDlCA&s=10",

        precio: 9.50,
        stock: 20
    }

];


// ==========================================
// CARRITO
// ==========================================

let carrito = [];


// ==========================================
// ELEMENTOS HTML
// ==========================================

const pantallaEdad =
    document.getElementById("pantallaEdad");

const pantallaLogin =
    document.getElementById("pantallaLogin");

const pantallaCatalogo =
    document.getElementById("pantallaCatalogo");

const btnMayor =
    document.getElementById("btnMayor");

const btnMenor =
    document.getElementById("btnMenor");

const btnLogin =
    document.getElementById("btnLogin");

const btnCerrarSesion =
    document.getElementById("btnCerrarSesion");

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const mensajeError =
    document.getElementById("mensajeError");

const usuarioMostrar =
    document.getElementById("usuarioMostrar");

const listaProductos =
    document.getElementById("listaProductos");

const detalles =
    document.getElementById("detalles");

const btnAbrirCarrito =
    document.getElementById("btnAbrirCarrito");

const btnCerrarCarrito =
    document.getElementById("btnCerrarCarrito");

const fondoCarrito =
    document.getElementById("fondoCarrito");

const listaCarrito =
    document.getElementById("listaCarrito");

const totalCarrito =
    document.getElementById("totalCarrito");

const contadorCarrito =
    document.getElementById("contadorCarrito");

const btnVaciarCarrito =
    document.getElementById("btnVaciarCarrito");


// ==========================================
// EDAD
// ==========================================

btnMayor.addEventListener(
    "click",
    function () {

        pantallaEdad.classList.add("oculto");

        pantallaLogin.classList.remove("oculto");

    }
);


btnMenor.addEventListener(
    "click",
    function () {

        alert(
            "No puedes continuar si no eres mayor de edad."
        );

    }
);


// ==========================================
// LOGIN
// ==========================================

btnLogin.addEventListener(
    "click",
    function () {

        const correo =
            email.value.trim();

        const contraseña =
            password.value.trim();


        if (
            correo === "" ||
            contraseña === ""
        ) {

            mensajeError.textContent =
                "Introduce el correo y la contraseña.";

            return;
        }


        mensajeError.textContent = "";

        usuarioMostrar.textContent =
            correo;

        pantallaLogin.classList.add(
            "oculto"
        );

        pantallaCatalogo.classList.remove(
            "oculto"
        );

        mostrarProductos();

    }
);


// ==========================================
// MOSTRAR PRODUCTOS
// ==========================================

function mostrarProductos() {

    listaProductos.innerHTML = "";


    productos.forEach(
        function (producto, indice) {

            const tarjeta =
                document.createElement("article");


            tarjeta.className =
                "producto";


            tarjeta.innerHTML = `

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    class="producto-imagen"
                >

                <h3>
                    ${producto.nombre}
                </h3>

                <p class="precio">
                    Precio:
                    ${formatearPrecio(producto.precio)}
                </p>

                <p class="stock">
                    Stock:
                    ${producto.stock} unidades
                </p>

                <div class="botones-producto">

                    <button
                        onclick="verDetalles(${indice})"
                    >
                        Ver detalles
                    </button>

                    <button
                        onclick="agregarAlCarrito(${indice})"
                    >
                        🛒 Añadir
                    </button>

                </div>

            `;


            listaProductos.appendChild(
                tarjeta
            );

        }
    );

}


// ==========================================
// FORMATEAR PRECIO
// ==========================================

function formatearPrecio(precio) {

    return precio
        .toFixed(2)
        .replace(".", ",") + " €";

}


// ==========================================
// DETALLES
// ==========================================

function verDetalles(indice) {

    const producto =
        productos[indice];


    detalles.innerHTML = `

        <div class="detalle-imagen">

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >

        </div>


        <div class="detalle-texto">

            <h2>
                ${producto.nombre}
            </h2>

            <h3>
                Precio:
                ${formatearPrecio(producto.precio)}
            </h3>

            <p>
                Stock disponible:
                ${producto.stock} unidades
            </p>

            <p>
                Información del producto:
                ${producto.nombre}.
            </p>

            <button
                class="boton-principal"
                onclick="agregarAlCarrito(${indice})"
            >
                🛒 Añadir al carrito
            </button>

        </div>

    `;

}


// ==========================================
// AÑADIR AL CARRITO
// ==========================================

function agregarAlCarrito(indice) {

    const producto =
        productos[indice];


    const productoExistente =
        carrito.find(
            item => item.id === producto.id
        );


    if (productoExistente) {

        if (
            productoExistente.cantidad <
            producto.stock
        ) {

            productoExistente.cantidad++;

        } else {

            alert(
                "No hay más unidades disponibles."
            );

            return;
        }

    } else {

        carrito.push({

            id: producto.id,

            nombre: producto.nombre,

            imagen: producto.imagen,

            precio: producto.precio,

            cantidad: 1

        });

    }


    actualizarCarrito();

    fondoCarrito.classList.remove(
        "oculto"
    );

}


// ==========================================
// MOSTRAR CARRITO
// ==========================================

function actualizarCarrito() {

    listaCarrito.innerHTML = "";


    if (carrito.length === 0) {

        listaCarrito.innerHTML = `

            <div class="carrito-vacio">

                🛒

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Añade algún producto para
                    verlo aquí.
                </p>

            </div>

        `;


        totalCarrito.textContent =
            "0,00 €";

        contadorCarrito.textContent =
            "0";

        return;
    }


    let total = 0;

    let cantidadTotal = 0;


    carrito.forEach(
        function (item, indice) {

            const subtotal =
                item.precio *
                item.cantidad;


            total += subtotal;

            cantidadTotal +=
                item.cantidad;


            const elemento =
                document.createElement("div");


            elemento.className =
                "item-carrito";


            elemento.innerHTML = `

                <img
                    src="${item.imagen}"
                    alt="${item.nombre}"
                >


                <div class="info-carrito">

                    <h3>
                        ${item.nombre}
                    </h3>

                    <p>
                        ${formatearPrecio(item.precio)}
                    </p>


                    <div class="controles-cantidad">

                        <button
                            onclick="cambiarCantidad(${indice}, -1)"
                        >
                            −
                        </button>


                        <strong>
                            ${item.cantidad}
                        </strong>


                        <button
                            onclick="cambiarCantidad(${indice}, 1)"
                        >
                            +
                        </button>


                        <button
                            class="eliminar"
                            onclick="eliminarDelCarrito(${indice})"
                        >
                            🗑
                        </button>

                    </div>

                </div>

            `;


            listaCarrito.appendChild(
                elemento
            );

        }
    );


    totalCarrito.textContent =
        formatearPrecio(total);


    contadorCarrito.textContent =
        cantidadTotal;

}


// ==========================================
// CAMBIAR CANTIDAD
// ==========================================

function cambiarCantidad(
    indice,
    cambio
) {

    const item =
        carrito[indice];


    const producto =
        productos.find(
            producto =>
                producto.id === item.id
        );


    const nuevaCantidad =
        item.cantidad + cambio;


    if (nuevaCantidad <= 0) {

        carrito.splice(indice, 1);

    } else if (
        nuevaCantidad <= producto.stock
    ) {

        item.cantidad =
            nuevaCantidad;

    } else {

        alert(
            "No hay más unidades disponibles."
        );

    }


    actualizarCarrito();

}


// ==========================================
// ELIMINAR DEL CARRITO
// ==========================================

function eliminarDelCarrito(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();

}


// ==========================================
// ABRIR CARRITO
// ==========================================

btnAbrirCarrito.addEventListener(
    "click",
    function () {

        actualizarCarrito();

        fondoCarrito.classList.remove(
            "oculto"
        );

    }
);


// ==========================================
// CERRAR CARRITO
// ==========================================

btnCerrarCarrito.addEventListener(
    "click",
    function () {

        fondoCarrito.classList.add(
            "oculto"
        );

    }
);


// ==========================================
// CERRAR AL PULSAR FUERA
// ==========================================

fondoCarrito.addEventListener(
    "click",
    function (evento) {

        if (
            evento.target === fondoCarrito
        ) {

            fondoCarrito.classList.add(
                "oculto"
            );

        }

    }
);


// ==========================================
// VACIAR CARRITO
// ==========================================

btnVaciarCarrito.addEventListener(
    "click",
    function () {

        carrito = [];

        actualizarCarrito();

    }
);


// ==========================================
// CERRAR SESIÓN
// ==========================================

btnCerrarSesion.addEventListener(
    "click",
    function () {

        carrito = [];

        actualizarCarrito();


        pantallaCatalogo.classList.add(
            "oculto"
        );


        pantallaLogin.classList.remove(
            "oculto"
        );


        email.value = "";

        password.value = "";

        mensajeError.textContent = "";

    }
);