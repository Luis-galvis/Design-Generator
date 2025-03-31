let previewArea = document.getElementById("previewArea");
const GRID_SIZE = 20; // Tamaño de la grilla
const elementos = [];

function snapToGrid(value) {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
}
document.getElementById("modoOscuro").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("bg-gray-800");
    document.body.classList.toggle("text-white");
    document.querySelector('.container12').classList.toggle("bg-gray-800");
    document.querySelector('.container12').classList.toggle("text-white");

    // Ajustar el estilo del contenedor del código CSS
    const codigoCSSContainer = document.getElementById('codigoCSSContainer');
    if (document.body.classList.contains("dark-mode")) {
        codigoCSSContainer.classList.add("dark-code");
    } else {
        codigoCSSContainer.classList.remove("dark-code");
    }

    // Ajustar el estilo del contenedor del código HTML
    const codigoHTMLContainer = document.getElementById('codigoHTMLContainer');
    if (document.body.classList.contains("dark-mode")) {
        codigoHTMLContainer.classList.add("dark-code");
    } else {
        codigoHTMLContainer.classList.remove("dark-code");
    }

    // Ajustar el estilo del modal
    const modal = document.getElementById('modal');
    if (document.body.classList.contains("dark-mode")) {
        modal.classList.add("dark-modal");
    } else {
        modal.classList.remove("dark-modal");
    }

    // Ajustar el estilo del contenedor de paletas
    const paletasContainer = document.querySelector('.paletas-container');
    if (document.body.classList.contains("dark-mode")) {
        paletasContainer.classList.add("dark-paletas");
    } else {
        paletasContainer.classList.remove("dark-paletas");
    }

    // Ajustar el estilo del contenedor de degradados
    const degradadoContainer = document.querySelector('.degradado'); // Seleccionar específicamente el contenedor .degradado
    if (document.body.classList.contains("dark-mode")) {
        degradadoContainer.classList.add("dark-degradado");
    } else {
        degradadoContainer.classList.remove("dark-degradado");
    }

    // Ajustar el estilo del contenedor principal
    const container = document.querySelector('.container12');
    if (document.body.classList.contains("dark-mode")) {
        container.classList.add("dark-container12");
    } else {
        container.classList.remove("dark-container12");
    }
    const panelControles = document.querySelector('.panel-controles');
    if (document.body.classList.contains("dark-mode")) {
        panelControles.classList.add("dark-panel");
    } else {
        panelControles.classList.remove("dark-panel");
    }
});

function generarHTML() {
    // Capturar el fondo completo del área de previsualización (incluye degradados e imágenes)
    let backgroundPreview = previewArea.style.background || previewArea.style.backgroundColor || "#ffffff";
    let backgroundImage = previewArea.style.backgroundImage || "none";
    let backgroundSize = previewArea.style.backgroundSize || "cover";
    let backgroundPosition = previewArea.style.backgroundPosition || "center";

    // Si la imagen de fondo es base64, asegúrate de incluirla correctamente
    if (backgroundImage !== "none") {
        let rutaImagen = backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1]; // Extraer la URL de la imagen
        if (rutaImagen && rutaImagen.startsWith("data:image")) {
            backgroundImage = `url('${rutaImagen}')`; // Usar la URL base64 directamente
        }
    }

    // Crear la estructura básica del HTML
    let html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vista Previa</title>
    <style>
        body {
            background: ${backgroundPreview};
            background-image: ${backgroundImage};
            background-size: ${backgroundSize};
            background-position: ${backgroundPosition};
            background-repeat: no-repeat;
            color: #000000;
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
        }
        .elemento {
            position: absolute;
            box-sizing: border-box;
            border: 1px solid #000;
        }
    </style>
</head>
<body>
    <div id="previewArea" style="
        position: relative;
        width: 100%;
        height: 100vh; /* Asegurar que ocupe toda la altura de la pantalla */
        overflow: hidden;
        background: ${backgroundPreview};
        background-image: ${backgroundImage};
        background-size: ${backgroundSize};
        background-position: ${backgroundPosition};
        background-repeat: no-repeat;
    ">
`;

    // Obtener los elementos del `previewArea`
    let elementos = document.querySelectorAll("#previewArea .elemento");

    // Generar el HTML para cada elemento
    elementos.forEach((el, index) => {
        let bgColor = el.style.backgroundColor || "#ffffff";
        let textColor = el.style.color || "#000000";
        let width = (parseInt(el.style.width) / previewArea.clientWidth) * 100 || 10; // Convertir a porcentaje
        let height = (parseInt(el.style.height) / previewArea.clientHeight) * 100 || 10; // Convertir a porcentaje
        let left = (parseInt(el.style.left) / previewArea.clientWidth) * 100 || 0; // Convertir a porcentaje
        let top = (parseInt(el.style.top) / previewArea.clientHeight) * 100 || 0; // Convertir a porcentaje
        let content = el.innerHTML || "";

        html += `
        <div class="elemento elemento-${index}" style="
            background-color: ${bgColor};
            color: ${textColor};
            width: ${width}%; /* Usar porcentaje para el ancho */
            height: ${height}%; /* Usar porcentaje para el alto */
            left: ${left}%; /* Usar porcentaje para la posición horizontal */
            top: ${top}%; /* Usar porcentaje para la posición vertical */
        ">
            ${content}
        </div>
        `;
    });

    // Cerrar las etiquetas del HTML
    html += `
    </div>
</body>
</html>
`;

    // Mostrar el HTML en pantalla
    let codigoHTMLContainer = document.getElementById('codigoHTMLContainer');
    let codigoHTML = document.getElementById('codigoHTML');
    codigoHTML.textContent = html;
    codigoHTMLContainer.classList.remove('hidden'); // Mostrar el contenedor

    return html;
}
function descargarHTML() {
    const html = generarHTML(); // Generar el HTML
    if (!html) return;

    // Crear un archivo Blob para descargar el HTML
    let blob = new Blob([html], { type: 'text/html' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "vista_previa.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function aplicarEstilos() {
    let colorFondo = document.getElementById('colorFondo').value;
    let colorTexto = document.getElementById('colorTexto').value;
    let fuenteTexto = document.getElementById('fuenteTexto').value;
    
    let previewArea = document.getElementById('previewArea');
    previewArea.style.backgroundColor = colorFondo;
    previewArea.style.color = colorTexto;
    previewArea.style.fontFamily = fuenteTexto;
}
function aplicarDegradado() {
    const color1 = document.getElementById('gradienteColor1').value;
    const color2 = document.getElementById('gradienteColor2').value;
    const direccion = document.getElementById('gradienteDireccion').value;

    // Aplicar el degradado al área de previsualización
    previewArea.style.background = `linear-gradient(${direccion}, ${color1}, ${color2})`;
}
function quitarDegradado() {
    // Restablecer el fondo del área de previsualización a un color sólido predeterminado
    previewArea.style.background = ""; // Elimina cualquier degradado
    previewArea.style.backgroundColor = "#ffffff"; // Fondo blanco por defecto
}

function quitarColorFondo() {
    // Restablecer el fondo del área de previsualización a transparente
    previewArea.style.background = "none"; // Elimina cualquier fondo
    previewArea.style.backgroundColor = "transparent"; // Fondo transparente
}

function generarCSS() {
    let previewArea = document.getElementById('previewArea');
    let colorTexto = document.getElementById('colorTexto').value;
    let fuenteTexto = document.getElementById('fuenteTexto').value;

    // Capturar el fondo completo del área de previsualización (incluye degradados e imágenes)
    let backgroundPreview = previewArea.style.background || previewArea.style.backgroundColor || "#ffffff";
    let backgroundImage = previewArea.style.backgroundImage || "none";

    // Reducir la ruta de la imagen si es muy larga
    if (backgroundImage !== "none") {
        let rutaImagen = backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1]; // Extraer la URL de la imagen
        if (rutaImagen) {
            let nombreArchivo = rutaImagen.split('/').pop(); // Obtener solo el nombre del archivo
            backgroundImage = `url('${nombreArchivo}')`; // Usar el nombre del archivo en lugar de la ruta completa
        }
    }

    // Estilos generales
    let codigo = `body {\n    background: ${backgroundPreview};\n    background-image: ${backgroundImage};\n    background-size: cover;\n    background-position: center;\n    color: ${colorTexto};\n    font-family: '${fuenteTexto}', sans-serif;\n}\n\n`;

    // Obtener todas las secciones agregadas dinámicamente
    let elementos = document.querySelectorAll("#previewArea .elemento");

    // Ajustar las dimensiones y posiciones de los elementos
    elementos.forEach((el, index) => {
        let background = el.style.background || el.style.backgroundColor || "#ffffff"; // Capturar el fondo completo (incluye degradados)
        let textColor = el.style.color || "#000000";
        let width = el.style.width || "100px";
        let height = el.style.height || "100px";
        let left = el.style.left || "0px";
        let top = el.style.top || "0px";

        codigo += `.elemento-${index} {\n`;
        codigo += `    background: ${background};\n`; // Usar `background` en lugar de `backgroundColor`
        codigo += `    color: ${textColor};\n`;
        codigo += `    width: ${width};\n`;
        codigo += `    height: ${height};\n`;
        codigo += `    position: absolute;\n`;
        codigo += `    left: ${left};\n`;
        codigo += `    top: ${top};\n`;
        codigo += `    overflow: hidden;\n`; // Ocultar contenido que exceda el contenedor
        codigo += `    text-overflow: ellipsis;\n`; // Mostrar puntos suspensivos si el texto es muy largo
        codigo += `    white-space: nowrap;\n`; // Evitar que el texto se divida en varias líneas
        codigo += `    display: flex;\n`; // Asegurar que el contenido se alinee correctamente
        codigo += `    align-items: center;\n`; // Centrar verticalmente el contenido
        codigo += `    justify-content: center;\n`; // Centrar horizontalmente el contenido
        codigo += `}\n\n`;

        // Asignar la clase generada a cada elemento
        el.classList.add(`elemento-${index}`);
    });

    // Mostrar el CSS en pantalla
    let codigoCSSContainer = document.getElementById('codigoCSSContainer');
    let codigoCSS = document.getElementById('codigoCSS');

    codigoCSS.textContent = codigo;
    codigoCSSContainer.classList.remove('hidden'); // Mostrar el contenedor
}
function descargarCSS() {
    let codigo = document.getElementById('codigoCSS').textContent;
    
    if (!codigo.trim()) {
        alert("Genera el CSS antes de descargarlo.");
        return;
    }

    let blob = new Blob([codigo], { type: 'text/css' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "estilos.css";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

    let elementoSeleccionado = null;
    
    function agregarElemento() {
        let elemento = document.createElement("div");
        elemento.className = "elemento";
        elemento.style.position = "absolute";
        elemento.style.width = "100px";
        elemento.style.height = "100px";
        elemento.style.backgroundColor = "#ddd";
        elemento.style.border = "1px solid #000";
        elemento.innerHTML = "<h3 class='font-bold'>Sección</h3>";
    
        // Buscar el primer espacio libre en la grilla
        let espacioLibre = encontrarEspacioLibre(100, 100); // Tamaño del elemento (ancho y alto)
        if (espacioLibre) {
            elemento.style.left = `${espacioLibre.x}px`;
            elemento.style.top = `${espacioLibre.y}px`;
        } else {
            alert("No hay espacio disponible en la grilla.");
            return;
        }
    
        previewArea.appendChild(elemento);
        elementos.push(elemento); // Agregamos el elemento a la lista para detectar colisiones
        elemento.ondblclick = () => abrirModal(elemento); // Cambiar a doble clic
        hacerDraggable(elemento);
        hacerRedimensionable(elemento);
    }
    
    function encontrarEspacioLibre(ancho, alto) {
        const gridWidth = previewArea.clientWidth;
        const gridHeight = previewArea.clientHeight;
        const padding = 10; // Espacio interno dentro del previewArea
    
        // Iterar sobre las posiciones posibles en la grilla
        for (let y = padding; y < gridHeight - padding; y += GRID_SIZE) {
            for (let x = padding; x < gridWidth - padding; x += GRID_SIZE) {
                // Verificar si el elemento cabe dentro del área de previsualización con padding
                if (x + ancho > gridWidth - padding || y + alto > gridHeight - padding) {
                    continue; // Saltar posiciones fuera de los límites
                }
    
                // Verificar si hay colisión en esta posición
                let colision = elementos.some(el => {
                    return hayColision(el, x, y, ancho, alto);
                });
    
                if (!colision) {
                    // Si no hay colisión, devolver la posición libre
                    return { x, y };
                }
            }
        }
    
        // Si no se encuentra espacio libre, devolver null
        return null;
    }
    
function agregarResizers(elemento) {
    let resizers = ["top-left", "top-right", "bottom-left", "bottom-right", "top", "bottom", "left", "right"];
    resizers.forEach(pos => {
        let resizer = document.createElement("div");
        resizer.className = "resizer " + pos;
        elemento.appendChild(resizer);
    });
}
function abrirModal(elemento) {
    elementoSeleccionado = elemento;
    document.getElementById('editColorFondo').value = rgbToHex(elemento.style.backgroundColor);
    document.getElementById('editColorTexto').value = rgbToHex(elemento.style.color);
    document.getElementById('editFuenteTexto').value = elemento.style.fontFamily || "Arial";
    document.getElementById('modal').style.display = 'block';

    // Agregar un evento para cerrar el modal al hacer clic fuera de este
    document.addEventListener('click', cerrarModalAlHacerClickFuera);
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';

    // Eliminar el evento de clic fuera del modal
    document.removeEventListener('click', cerrarModalAlHacerClickFuera);
}

function cerrarModalAlHacerClickFuera(e) {
    const modal = document.getElementById('modal');
    if (!modal.contains(e.target) && e.target !== modal) {
        cerrarModal();
    }
}

function aplicarCambios() {
    if (elementoSeleccionado) {
        let colorFondo = document.getElementById('editColorFondo').value;
        let colorTexto = document.getElementById('editColorTexto').value;    
        let fuenteTexto = document.getElementById('editFuenteTexto').value;

        console.log("Color de fondo:", colorFondo);
        console.log("Color de texto:", colorTexto);
        console.log("Fuente de texto:", fuenteTexto);

        elementoSeleccionado.style.backgroundColor = colorFondo;
        elementoSeleccionado.style.color = colorTexto;       
        elementoSeleccionado.style.fontFamily = fuenteTexto;
    }
    cerrarModal();
}

function rgbToHex(rgb) {
    if (!rgb) return "#ffffff";
    let rgbArray = rgb.match(/\d+/g);
    if (!rgbArray) return "#ffffff";
    return `#${((1 << 24) + (parseInt(rgbArray[0]) << 16) + (parseInt(rgbArray[1]) << 8) + parseInt(rgbArray[2])).toString(16).slice(1)}`;
}
function hacerDraggable(elemento) {
    let offsetX, offsetY;

    elemento.addEventListener("mousedown", function (e) {
        if (e.target.classList.contains("resizer")) return;
        offsetX = e.clientX - elemento.offsetLeft;
        offsetY = e.clientY - elemento.offsetTop;
        elemento.style.cursor = "grabbing";

        function moverElemento(e) {
            let x = snapToGrid(e.clientX - offsetX);
            let y = snapToGrid(e.clientY - offsetY);

            // Evitar posiciones negativas
            x = Math.max(0, x);
            y = Math.max(0, y);

            // Evitar que se salga del `previewArea`
            let maxWidth = previewArea.clientWidth - elemento.offsetWidth;
            let maxHeight = previewArea.clientHeight - elemento.offsetHeight;
            x = Math.min(x, maxWidth);
            y = Math.min(y, maxHeight);

            // Verificar colisiones antes de mover
            let colision = elementos.some(el => {
                if (el === elemento) return false; // No comparar con sí mismo
                return hayColision(el, x, y, elemento.offsetWidth, elemento.offsetHeight);
            });

            if (colision) {
                // Si hay colisión, no actualizar la posición
                return;
            }

            // Actualizar la posición si no hay colisión
            elemento.style.left = `${x}px`;
            elemento.style.top = `${y}px`;
        }

        function soltarElemento() {
            document.removeEventListener("mousemove", moverElemento);
            document.removeEventListener("mouseup", soltarElemento);
            elemento.style.cursor = "grab";
        }

        document.addEventListener("mousemove", moverElemento);
        document.addEventListener("mouseup", soltarElemento);
    });
}

function hayColision(elemento, x, y, width, height) {
    let rect1 = {
        x: x,
        y: y,
        width: width,
        height: height
    };

    let rect2 = {
        x: elemento.offsetLeft,
        y: elemento.offsetTop,
        width: elemento.offsetWidth,
        height: elemento.offsetHeight
    };

    return (
        rect1.x < rect2.x + rect2.width && // Colisión a la derecha
        rect1.x + rect1.width > rect2.x && // Colisión a la izquierda
        rect1.y < rect2.y + rect2.height && // Colisión abajo
        rect1.y + rect1.height > rect2.y // Colisión arriba
    );
}
function hacerRedimensionable(elemento) {
    let resizer = document.createElement("div");
    resizer.className = "resizer bottom-right";
    resizer.style.width = "10px";
    resizer.style.height = "10px";
    resizer.style.position = "absolute";
    resizer.style.right = "0";
    resizer.style.bottom = "0";
    resizer.style.cursor = "nwse-resize";
    elemento.appendChild(resizer);

    resizer.addEventListener("mousedown", function (e) {
        e.preventDefault();
        e.stopPropagation(); // Evita que el evento se propague y active el arrastre

        let initialX = e.clientX;
        let initialY = e.clientY;
        let initialWidth = elemento.offsetWidth;
        let initialHeight = elemento.offsetHeight;

        function redimensionar(e) {
            let newWidth = initialWidth + (e.clientX - initialX);
            let newHeight = initialHeight + (e.clientY - initialY);

            // Aplicar la cuadrícula
            newWidth = snapToGrid(newWidth);
            newHeight = snapToGrid(newHeight);

            // Obtener límites del área de previsualización
            let maxWidth = previewArea.clientWidth - elemento.offsetLeft;
            let maxHeight = previewArea.clientHeight - elemento.offsetTop;

            // Evitar que se salga del `previewArea`
            newWidth = Math.max(40, Math.min(newWidth, maxWidth));
            newHeight = Math.max(40, Math.min(newHeight, maxHeight));

            // Verificar colisiones
            let colision = elementos.some(el => {
                if (el === elemento) return false; // No comparar con sí mismo
                return hayColision(el, elemento.offsetLeft, elemento.offsetTop, newWidth, newHeight);
            });

            if (colision) {
                if (confirm("Los elementos se están superponiendo. ¿Deseas fusionarlos?")) {
                    let elementoColisionado = elementos.find(el => el !== elemento && hayColision(el, elemento.offsetLeft, elemento.offsetTop, newWidth, newHeight));
                    if (elementoColisionado) {
                        fusionarElementos(elemento, elementoColisionado);
                    }
                }
                // Detener el redimensionamiento inmediatamente
                soltarRedimension();
                return;
            }

            // Actualizar el tamaño si no hay colisión
            elemento.style.width = `${newWidth}px`;
            elemento.style.height = `${newHeight}px`;
        }

        function soltarRedimension() {
            document.removeEventListener("mousemove", redimensionar);
            document.removeEventListener("mouseup", soltarRedimension);
        }

        document.addEventListener("mousemove", redimensionar);
        document.addEventListener("mouseup", soltarRedimension);
    });
}

function fusionarElementos(elemento1, elemento2) {
    // Combinar estilos de ambos elementos
    elemento1.style.backgroundColor = mezclarColores(
        elemento1.style.backgroundColor,
        elemento2.style.backgroundColor
    );
    elemento1.style.color = elemento1.style.color || elemento2.style.color;
    elemento1.style.width = `${Math.max(elemento1.offsetWidth, elemento2.offsetWidth)}px`;
    elemento1.style.height = `${Math.max(elemento1.offsetHeight, elemento2.offsetHeight)}px`;

    // Eliminar el segundo elemento
    elemento2.parentNode.removeChild(elemento2);
    elementos.splice(elementos.indexOf(elemento2), 1);
}

function mezclarColores(color1, color2) {
    // Convertir colores a RGB y calcular el promedio
    let rgb1 = color1.match(/\d+/g).map(Number);
    let rgb2 = color2.match(/\d+/g).map(Number);

    let r = Math.round((rgb1[0] + rgb2[0]) / 2);
    let g = Math.round((rgb1[1] + rgb2[1]) / 2);
    let b = Math.round((rgb1[2] + rgb2[2]) / 2);

    return `rgb(${r}, ${g}, ${b})`;
}
function guardarDiseno() {
    const elementosGuardados = elementos.map(el => ({
        backgroundColor: el.style.backgroundColor,
        background: el.style.background, // Guardar el fondo completo (incluye degradados)
        color: el.style.color,
        width: el.style.width,
        height: el.style.height,
        left: el.style.left,
        top: el.style.top,
        content: el.innerHTML
    }));

    const data = {
        elementos: elementosGuardados,
        colorFondo: document.getElementById('colorFondo').value,
        colorTexto: document.getElementById('colorTexto').value,
        fuenteTexto: document.getElementById('fuenteTexto').value,
        fondoPreview: previewArea.style.background, // Guardar el fondo del área de previsualización (incluye degradados)
        imagenFondo: previewArea.style.backgroundImage // Guardar la imagen de fondo si existe
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "diseno.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function cargarDiseno(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = JSON.parse(e.target.result);

        // Restaurar colores y fuente
        document.getElementById('colorFondo').value = data.colorFondo;
        document.getElementById('colorTexto').value = data.colorTexto;
        document.getElementById('fuenteTexto').value = data.fuenteTexto;
        aplicarEstilos();

        // Restaurar el fondo del área de previsualización (incluye degradados)
        if (data.fondoPreview) {
            previewArea.style.background = data.fondoPreview;
        }

        // Restaurar la imagen de fondo si existe
        if (data.imagenFondo) {
            previewArea.style.backgroundImage = data.imagenFondo;
            previewArea.style.backgroundSize = 'cover';
            previewArea.style.backgroundPosition = 'center';
        } else {
            previewArea.style.backgroundImage = 'none';
        }

        // Limpiar elementos existentes
        previewArea.innerHTML = '';
        elementos.length = 0;

        // Restaurar elementos
        data.elementos.forEach(item => {
            const elemento = document.createElement('div');
            elemento.className = "elemento";
            elemento.style.position = "absolute";
            elemento.style.backgroundColor = item.backgroundColor;
            elemento.style.background = item.background; // Restaurar el fondo completo (incluye degradados)
            elemento.style.color = item.color;
            elemento.style.width = item.width;
            elemento.style.height = item.height;
            elemento.style.left = item.left;
            elemento.style.top = item.top;
            elemento.innerHTML = item.content;

            previewArea.appendChild(elemento);
            elementos.push(elemento);
            hacerDraggable(elemento);
            hacerRedimensionable(elemento);
        });
    };

    reader.readAsText(file);
}
function aplicarImagenFondo() {
    const fileInput = document.getElementById('imagenFondo');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewArea.style.backgroundImage = `url('${e.target.result}')`;
            previewArea.style.backgroundSize = 'cover'; // Ajustar la imagen al tamaño del contenedor
            previewArea.style.backgroundPosition = 'center'; // Centrar la imagen
        };
        reader.readAsDataURL(file);
    } else {
        alert("Por favor selecciona una imagen o GIF.");
    }
}

function quitarImagenFondo() {
    // Restablecer el fondo del área de previsualización a un color sólido predeterminado
    previewArea.style.backgroundImage = 'none'; // Elimina cualquier imagen de fondo
}
function duplicarElemento(elemento) {
    const nuevoElemento = elemento.cloneNode(true); // Clonar el elemento
    nuevoElemento.style.left = `${parseInt(elemento.style.left) + 20}px`; // Mover ligeramente
    nuevoElemento.style.top = `${parseInt(elemento.style.top) + 20}px`;

    // Asignar el evento de doble clic para abrir el modal
    nuevoElemento.ondblclick = () => abrirModal(nuevoElemento);

    // Agregar el nuevo elemento al área de previsualización
    previewArea.appendChild(nuevoElemento);
    elementos.push(nuevoElemento); // Agregarlo a la lista de elementos

    // Hacer que el nuevo elemento sea draggable y redimensionable
    hacerDraggable(nuevoElemento);
    hacerRedimensionable(nuevoElemento);
}
function eliminarElemento(elemento) {
    previewArea.removeChild(elemento);
    const index = elementos.indexOf(elemento);
    if (index > -1) {
        elementos.splice(index, 1);
    }
}
function alinearElementos(direccion) {
    const espacioDisponible = previewArea.clientWidth; // Ancho del área de previsualización
    const espacioVertical = previewArea.clientHeight; // Alto del área de previsualización
    let posicionActual = 0; // Posición inicial para la alineación horizontal o vertical

    elementos.forEach(el => {
        const anchoElemento = parseInt(el.style.width);
        const altoElemento = parseInt(el.style.height);

        if (direccion === 'izquierda') {
            el.style.left = '0px'; // Alinear a la izquierda
            el.style.top = `${posicionActual}px`; // Posicionar verticalmente
            posicionActual += altoElemento + 10; // Incrementar la posición para el siguiente elemento
        } else if (direccion === 'derecha') {
            el.style.left = `${espacioDisponible - anchoElemento}px`; // Alinear a la derecha
            el.style.top = `${posicionActual}px`; // Posicionar verticalmente
            posicionActual += altoElemento + 10; // Incrementar la posición para el siguiente elemento
        } else if (direccion === 'centro') {
            el.style.left = `${(espacioDisponible - anchoElemento) / 2}px`; // Centrar horizontalmente
            el.style.top = `${posicionActual}px`; // Posicionar verticalmente
            posicionActual += altoElemento + 10; // Incrementar la posición para el siguiente elemento
        } else if (direccion === 'arriba') {
            el.style.top = '0px'; // Alinear arriba
            el.style.left = `${posicionActual}px`; // Posicionar horizontalmente
            posicionActual += anchoElemento + 10; // Incrementar la posición para el siguiente elemento
        } else if (direccion === 'abajo') {
            el.style.top = `${espacioVertical - altoElemento}px`; // Alinear abajo
            el.style.left = `${posicionActual}px`; // Posicionar horizontalmente
            posicionActual += anchoElemento + 10; // Incrementar la posición para el siguiente elemento
        }
    });
}

function exportarComoImagen() {
    html2canvas(previewArea).then(canvas => {
        const link = document.createElement('a');
        link.download = 'diseño.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
function generarPaletas() {
    const paletasContainer = document.getElementById('paletas');
    paletasContainer.innerHTML = ''; // Limpiar las paletas anteriores

    for (let i = 0; i < 5; i++) {
        const paleta = document.createElement('div');
        paleta.className = 'paleta';

        for (let j = 0; j < 5; j++) {
            const color = generarColorAleatorio();
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color';
            colorDiv.style.backgroundColor = color;

            // Agregar evento para seleccionar el color
            colorDiv.onclick = () => {
                document.getElementById('colorFondo').value = color;
                aplicarEstilos();
            };

            paleta.appendChild(colorDiv);
        }

        paletasContainer.appendChild(paleta);
    }
}

function generarColorAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}



// Función para manejar el botón de mostrar/ocultar el panel
function configurarPanelControles() {
    const toggleButton = document.getElementById("togglePanel");
    const panel = document.querySelector(".panel-controles");
    const container = document.querySelector(".container12");

    // Mostrar/ocultar el panel al hacer clic en el botón
    toggleButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Evitar que el clic en el botón cierre el panel
        panel.classList.toggle("visible");

        // Ajustar el contenedor según la visibilidad del panel
        if (panel.classList.contains("visible")) {
            container.classList.add("panel-visible");
        } else {
            container.classList.remove("panel-visible");
        }
    });

    // Cerrar el panel si se hace clic fuera de él
    document.addEventListener("click", (e) => {
        if (!panel.contains(e.target) && !toggleButton.contains(e.target)) {
            panel.classList.remove("visible");
            container.classList.remove("panel-visible");
        }
    });
}

// Llamar a la función después de que el DOM esté cargado
document.addEventListener("DOMContentLoaded", configurarPanelControles);
