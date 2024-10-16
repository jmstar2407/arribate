

document.getElementById('open-filter-button').addEventListener('click', function () {
    const filterPanel = document.getElementById('price-filter');
    const openFilterButton = document.getElementById('open-filter-button');

    // Verificar si el filtro está visible (abierto)
    if (filterPanel.classList.contains('open-filter')) {
        // Si está abierto, lo cerramos
        filterPanel.classList.add('close-filter');
        filterPanel.classList.remove('open-filter');

        // Detectar el fin de la animación y ocultar el panel
        filterPanel.addEventListener('animationend', function () {
            filterPanel.style.display = 'none';
        }, { once: true }); // Asegura que el evento solo se ejecute una vez

        // Remover la clase .active del botón
        openFilterButton.classList.remove('active');
    } else {
        // Si está cerrado, lo abrimos
        filterPanel.style.display = 'flex'; // Asegura que el panel sea visible
        filterPanel.classList.add('open-filter');
        filterPanel.classList.remove('close-filter');

        // Agregar la clase .active al botón
        openFilterButton.classList.add('active');
    }
});


// Obtén una referencia al nuevo botón
const openFilterButtonRespon = document.getElementById('open-filter-button-respon');

// Agrega el mismo evento click al nuevo botón
openFilterButtonRespon.addEventListener('click', function () {
    const filterPanel = document.getElementById('price-filter');
    const openFilterButton = document.getElementById('open-filter-button'); // Asegúrate de tener la referencia correcta al botón original

    // ... (El resto del código del evento click es el mismo)
    if (filterPanel.classList.contains('open-filter')) {
        // Si está abierto, lo cerramos
        filterPanel.classList.add('close-filter');
        filterPanel.classList.remove('open-filter');

        // Detectar el fin de la animación y ocultar el panel
        filterPanel.addEventListener('animationend', function () {
            filterPanel.style.display = 'none';
        }, { once: true });

        // Remover la clase .active del botón
        openFilterButton.classList.remove('active');
    } else {
        // Si está cerrado, lo abrimos
        filterPanel.style.display = 'flex';
        filterPanel.classList.add('open-filter');
        filterPanel.classList.remove('close-filter');

        // Agregar la clase .active al botón
        openFilterButton.classList.add('active');
    }
});

document.getElementById('close-filter-button').addEventListener('click', function () {
    const filterPanel = document.getElementById('price-filter');
    const openFilterButton = document.getElementById('open-filter-button');

    // Cerrar el filtro
    filterPanel.classList.add('close-filter');
    filterPanel.classList.remove('open-filter');

    // Detectar el fin de la animación y ocultar el panel
    filterPanel.addEventListener('animationend', function () {
        filterPanel.style.display = 'none';
    }, { once: true }); // Asegura que el evento solo se ejecute una vez

    // Remover la clase .active del botón cuando se cierre el filtro
    openFilterButton.classList.remove('active');
});









// Filtro de precio
// Función para filtrar los marcadores en el mapa según el rango de precios y la cantidad
function filterMarkers() {
    const minPrice = parseInt(document.getElementById('min-price-range').value);
    const maxPrice = parseInt(document.getElementById('max-price-range').value);
    const isMaxPriceAtLimit = (activeType === 'alquiler' && maxPrice === 100000) || (activeType === 'venta' && maxPrice === 30000000);

    const showHouses = filterHouse.classList.contains('active');
    const showBuildings = filterBuilding.classList.contains('active');
    const showLand = filterLand.classList.contains('active');

    const locations = activeType === 'alquiler' ? alquileres : ventas;
    const markers = activeType === 'alquiler' ? alquilerMarkers : ventaMarkers;

    markers.forEach((marker, index) => {
        const location = locations[index];
        const markerPrice = location.price;
        const isHouse = location.icon === houseIcon;
        const isBuilding = location.icon === buildingIcon;
        const isLand = location.icon === landIcon;

        // Aplicar TODOS los filtros en conjunto
        const showMarker =
            (markerPrice >= minPrice && (isMaxPriceAtLimit || markerPrice <= maxPrice)) &&
            (currentRooms === 0 || (currentRooms <= 7 && location.rooms === currentRooms) || (currentRooms > 7 && location.rooms >= 7)) &&
            (currentBathrooms === 0 || (currentBathrooms <= 5 && location.bathrooms === currentBathrooms) || (currentBathrooms > 5 && location.bathrooms >= 5)) &&
            (currentParking === 0 || (currentParking <= 5 && location.parking === currentParking) || (currentParking > 5 && location.parking >= 5)) &&
            ((showHouses && isHouse) || (showBuildings && isBuilding) || (showLand && isLand));

        if (showMarker) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
}




function toggleMarkers(type) {
    activeType = type;

    // Ajustar los rangos de precios según el tipo de propiedad (Price y Tipo de propiedad)
    if (type === 'alquiler') {
        updatePriceSlider(1000, 30000000, 1000);  // Rango para alquileres
        filterLand.style.display = 'none'; // Ocultar el botón de solares en alquiler
    } else if (type === 'venta') {
        updatePriceSlider(200000, 30000000, 10000);  // Rango para ventas
        filterLand.style.display = 'inline-block'; // Mostrar el botón de solares en venta
    }

    // Restablecer el range-highlight
    const rangeHighlight = document.getElementById('range-highlight');
    rangeHighlight.style.left = '0%';
    rangeHighlight.style.width = '100%';

    // Restablecer los valores de los controles deslizantes al cambiar de tipo
    document.getElementById('min-price-range').value = document.getElementById('min-price-range').min;
    document.getElementById('max-price-range').value = document.getElementById('max-price-range').max;

    // Restablecer botones de tipo de propiedad
    filterHouse.classList.add('active');
    filterBuilding.classList.add('active');
    if (type === 'venta') {
        filterLand.classList.add('active');
    } else {
        filterLand.classList.remove('active');
    }

    // Actualizar las etiquetas de los precios
    updatePriceLabels();

    // Aplicar el filtro de precio con el nuevo rango
    filterByType();
    filterMarkers();
}

// Filtros de cantidad
const roomsCount = document.getElementById('rooms-count');
const bathroomsCount = document.getElementById('bathrooms-count');
const parkingCount = document.getElementById('parking-count');

let currentRooms = 0;
let currentBathrooms = 0;
let currentParking = 0;

function updateCount(element, count, max) {
    if (count === 0) {
        element.textContent = 'Cualquiera';
    } else if (count > max) {
        element.textContent = `${max}+`;
    } else {
        element.textContent = count;
    }
}

function filterByQuantity() {
    const showHouses = filterHouse.classList.contains('active');
    const showBuildings = filterBuilding.classList.contains('active');
    const showLand = filterLand.classList.contains('active');

    const locations = activeType === 'alquiler' ? alquileres : ventas;
    const markers = activeType === 'alquiler' ? alquilerMarkers : ventaMarkers;

    markers.forEach((marker, index) => {
        const location = locations[index];
        const isHouse = location.icon === houseIcon;
        const isBuilding = location.icon === buildingIcon;
        const isLand = location.icon === landIcon;

        // Aplicar filtros de cantidad Y tipo de propiedad
        const showMarker =
            ((currentRooms === 0 || (currentRooms <= 7 && location.rooms === currentRooms) || (currentRooms > 7 && location.rooms >= 7)) &&
                (currentBathrooms === 0 || (currentBathrooms <= 5 && location.bathrooms === currentBathrooms) || (currentBathrooms > 5 && location.bathrooms >= 5)) &&
                (currentParking === 0 || (currentParking <= 5 && location.parking === currentParking) || (currentParking > 5 && location.parking >= 5))) &&
            ((showHouses && isHouse) || (showBuildings && isBuilding) || (showLand && isLand));

        if (showMarker) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
}







// Función para actualizar las etiquetas de los precios
function updatePriceLabels() {
    const minPrice = parseInt(document.getElementById('min-price-range').value);
    const maxPrice = parseInt(document.getElementById('max-price-range').value);

    document.getElementById('min-price').value = `RD$${formatNumber(minPrice)}`;
    const isMax = (activeType === 'alquiler' && maxPrice === 100000) || (activeType === 'venta' && maxPrice === 30000000);
    document.getElementById('max-price').value = `RD$${formatNumber(maxPrice)}${isMax ? '+' : ''}`;
}



// Event listeners para los controles deslizantes de precio
document.getElementById('min-price-range').addEventListener('input', () => {
    const minPriceRange = document.getElementById('min-price-range');
    const maxPriceRange = document.getElementById('max-price-range');

    if (parseInt(minPriceRange.value) > parseInt(maxPriceRange.value)) {
        minPriceRange.value = maxPriceRange.value;
    }
    updatePriceLabels();
    filterMarkers();
});










document.getElementById('max-price-range').addEventListener('input', () => {
    const minPriceRange = document.getElementById('min-price-range');
    const maxPriceRange = document.getElementById('max-price-range');

    if (parseInt(maxPriceRange.value) < parseInt(minPriceRange.value)) {
        maxPriceRange.value = minPriceRange.value;
    }
    updatePriceLabels();
    filterMarkers();
});









function updateRangeHighlight() {
    const minPriceRange = document.getElementById('min-price-range');
    const maxPriceRange = document.getElementById('max-price-range');
    const rangeHighlight = document.getElementById('range-highlight');

    const minValue = parseInt(minPriceRange.value);
    const maxValue = parseInt(maxPriceRange.value);

    const minPercentage = (minValue - minPriceRange.min) / (minPriceRange.max - minPriceRange.min) * 100;
    const maxPercentage = (maxValue - maxPriceRange.min) / (maxPriceRange.max - maxPriceRange.min) * 100;

    rangeHighlight.style.left = `${minPercentage}%`;
    rangeHighlight.style.width = `${maxPercentage - minPercentage}%`;
}

// Inicializa el rango al cargar la página
updateRangeHighlight();

// Escucha los eventos de cambio en los inputs de rango
document.getElementById('min-price-range').addEventListener('input', updateRangeHighlight);
document.getElementById('max-price-range').addEventListener('input', updateRangeHighlight);











// Event listeners para los campos de texto de precio
document.getElementById('min-price').addEventListener('input', () => {
    const minPrice = parseInt(document.getElementById('min-price').value.replace(/\D/g, ''), 10); // Eliminar caracteres no numéricos
    const minPriceRange = document.getElementById('min-price-range');
    const maxPriceRange = document.getElementById('max-price-range');

    if (!isNaN(minPrice) && minPrice <= parseInt(maxPriceRange.value)) {
        minPriceRange.value = minPrice;
        updatePriceLabels();
        filterMarkers();
    }
});

document.getElementById('max-price').addEventListener('input', () => {
    const maxPrice = parseInt(document.getElementById('max-price').value.replace(/\D/g, ''), 10); // Eliminar caracteres no numéricos
    const minPriceRange = document.getElementById('min-price-range');
    const maxPriceRange = document.getElementById('max-price-range');

    if (!isNaN(maxPrice) && maxPrice >= parseInt(minPriceRange.value)) {
        maxPriceRange.value = maxPrice;
        updatePriceLabels();
        filterMarkers();
    }
});










// Event listeners para el filtro de cantidad

document.getElementById('decrease-rooms').addEventListener('click', () => {
    currentRooms = Math.max(0, currentRooms - 1);
    updateCount(roomsCount, currentRooms, 7);
    filterByQuantity();
});

document.getElementById('increase-rooms').addEventListener('click', () => {
    currentRooms = Math.min(8, currentRooms + 1); // Máximo de 8 para mostrar 7+
    updateCount(roomsCount, currentRooms, 7);
    filterByQuantity();
});


document.getElementById('decrease-bathrooms').addEventListener('click', () => {
    currentBathrooms = Math.max(0, currentBathrooms - 1);
    updateCount(bathroomsCount, currentBathrooms, 5);
    filterByQuantity();
});

document.getElementById('increase-bathrooms').addEventListener('click', () => {
    currentBathrooms = Math.min(6, currentBathrooms + 1); // Máximo de 6 para mostrar 5+
    updateCount(bathroomsCount, currentBathrooms, 5);
    filterByQuantity();
});

// Event listeners para los botones de parqueos
document.getElementById('decrease-parking').addEventListener('click', () => {
    currentParking = Math.max(0, currentParking - 1);
    updateCount(parkingCount, currentParking, 5);
    filterByQuantity();
});

document.getElementById('increase-parking').addEventListener('click', () => {
    currentParking = Math.min(6, currentParking + 1); // Máximo de 6 para mostrar 5+
    updateCount(parkingCount, currentParking, 5);
    filterByQuantity();
});










// Filtro de tipo de propiedad
const filterHouse = document.getElementById('filter-house');
const filterBuilding = document.getElementById('filter-building');
const filterLand = document.getElementById('filter-land');

function filterByType() {
    const showHouses = filterHouse.classList.contains('active');
    const showBuildings = filterBuilding.classList.contains('active');
    const showLand = filterLand.classList.contains('active');

    // Get current filter values
    const minPrice = parseInt(document.getElementById('min-price-range').value);
    const maxPrice = parseInt(document.getElementById('max-price-range').value);
    const isMaxPriceAtLimit = (activeType === 'alquiler' && maxPrice === 100000) || (activeType === 'venta' && maxPrice === 30000000);

    // Filtrar según el tipo activo (alquiler o venta)
    const locations = activeType === 'alquiler' ? alquileres : ventas;
    const markers = activeType === 'alquiler' ? alquilerMarkers : ventaMarkers;

    markers.forEach((marker, index) => {
        const location = locations[index];
        const isHouse = location.icon === houseIcon;
        const isBuilding = location.icon === buildingIcon;
        const isLand = location.icon === landIcon;
        const markerPrice = location.price;

        // Check if marker satisfies other filters
        const satisfiesOtherFilters =
            (markerPrice >= minPrice && (isMaxPriceAtLimit || markerPrice <= maxPrice)) &&
            (currentRooms === 0 || (currentRooms <= 7 && location.rooms === currentRooms) || (currentRooms > 7 && location.rooms >= 7)) &&
            (currentBathrooms === 0 || (currentBathrooms <= 5 && location.bathrooms === currentBathrooms) || (currentBathrooms > 5 && location.bathrooms >= 5)) &&
            (currentParking === 0 || (currentParking <= 5 && location.parking === currentParking) || (currentParking > 5 && location.parking >= 5));

        // Mostrar u ocultar el marcador según el tipo y TODOS los filtros
        // Solo mostrar si coincide con ALGÚN tipo activo Y cumple con los otros filtros
        if (
            satisfiesOtherFilters && (
                (showHouses && isHouse) ||
                (showBuildings && isBuilding) ||
                (showLand && isLand)
            )
        ) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
}

filterHouse.addEventListener('click', () => {
    filterHouse.classList.toggle('active');
    filterByType();
});

filterBuilding.addEventListener('click', () => {
    filterBuilding.classList.toggle('active');
    filterByType();
});

filterLand.addEventListener('click', () => {
    filterLand.classList.toggle('active');
    filterByType();
});
// Filtro de tipo de propiedad FIN







// Función para actualizar los controles deslizantes y las etiquetas de precio
function updatePriceSlider(minValue, maxValue, step) {
    const minPriceRange = document.getElementById('min-price-range');
    const maxPriceRange = document.getElementById('max-price-range');

    minPriceRange.min = minValue;
    minPriceRange.max = maxValue;
    minPriceRange.value = minValue;

    maxPriceRange.min = minValue;
    maxPriceRange.max = maxValue;
    maxPriceRange.value = maxValue;

    minPriceRange.step = step;
    maxPriceRange.step = step;

    updatePriceLabels();
}

// Función para manejar el cambio entre alquiler y venta
function toggleMarkers(type) {
    activeType = type;


    // Ajustar los rangos de precios según el tipo de propiedad (Price y Tipo de propiedad)
    if (type === 'alquiler') {
        updatePriceSlider(1000, 100000, 1000);  // Rango para alquileres
        filterLand.style.display = 'none'; // Ocultar el botón de solares en alquiler****
    } else if (type === 'venta') {
        updatePriceSlider(200000, 30000000, 10000);  // Rango para ventas
        filterLand.style.display = 'inline-block'; // Mostrar el botón de solares en venta****
    }
    //Ajustar los rangos de precios  FIN

    // Mostrar los marcadores correctos según el tipo y filtrar
    const showMarkers = type === 'alquiler' ? alquilerMarkers : ventaMarkers;
    const hideMarkers = type === 'alquiler' ? ventaMarkers : alquilerMarkers;

    showMarkers.forEach(marker => marker.addTo(map));
    hideMarkers.forEach(marker => map.removeLayer(marker));




    //Restablece al cambiar de alquiler a venta
    // Restablecer los valores de los controles deslizantes al cambiar de tipo** Price
    document.getElementById('min-price-range').value = document.getElementById('min-price-range').min;
    document.getElementById('max-price-range').value = document.getElementById('max-price-range').max;


    // Restablecer filtros de cantidad
    currentRooms = 0;
    currentBathrooms = 0;
    currentParking = 0;
    updateCount(roomsCount, currentRooms, 7);
    updateCount(bathroomsCount, currentBathrooms, 5);
    updateCount(parkingCount, currentParking, 5);


    // Restablecer el range-highlight
    const rangeHighlight = document.getElementById('range-highlight');
    rangeHighlight.style.left = '0%';
    rangeHighlight.style.width = '100%';


    // Restablecer botones de tipo de propiedad** Tipo de propiedad
    filterHouse.classList.add('active');
    filterBuilding.classList.add('active');
    if (type === 'venta') {
        filterLand.classList.add('active');
    } else {
        filterLand.classList.remove('active');
    }
    //Restablece al cambiar de alquiler a venta FIN




    // Actualizar las etiquetas de los precios
    updatePriceLabels();

    // Aplicar el filtro de precio con el nuevo rango
    filterByType();
    filterMarkers();
}

// Función para formatear números con comas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Inicializar el filtro con el rango para alquileres
toggleMarkers('alquiler');

// Filtros FIN