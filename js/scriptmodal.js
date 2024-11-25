// Variables globales
const modal = document.getElementById('propertyModal');
const modalDetails = document.getElementById('modalPropertyDetails');
const whatsappButton = document.getElementById('whatsappButton');
const mainImage = document.getElementById('currentImage');
const thumbnailsContainer = document.querySelector('.thumbnails');
let images = []; // Inicializa el array de imágenes
let currentIndex = 0; // Índice actual de la imagen

// Abrir modal con la propiedad
function openModal(property) {
    setupWhatsappButton(property);
    updateModalDetails(property);
    updateGallery(property.id, property.imageCount);
    history.pushState(null, '', `#id-${property.id}`);

    const modalContent = modal.querySelector('.modal-content');

    modal.classList.add('modal-in-anim');
    modalContent.classList.add('modal-content-in-anim');

    modal.style.display = "block";
}

// Cerrar modal
function closeModal() {
    const modalContent = modal.querySelector('.modal-content');

    modal.classList.add('modal-out-anim');
    modalContent.classList.add('modal-content-out-anim');

    modal.addEventListener('animationend', () => {
        modal.style.display = "none";
        history.pushState(null, '', window.location.pathname);
        modal.classList.remove('modal-out-anim');
        modalContent.classList.remove('modal-content-out-anim');
    }, { once: true });
}

// Configurar botón de WhatsApp
function setupWhatsappButton(property) {
    const propertyLink = `https://arribate.com/#id-${property.id}`;
    const whatsappMessage = `Me interesa saber más información sobre la propiedad con el ID ${property.id}: ${propertyLink}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+18299605566&text=${encodeURIComponent(whatsappMessage)}`;
    whatsappButton.href = whatsappUrl;
}

// Actualizar detalles del modal
function updateModalDetails(property) {
    const isAlquiler = alquileres.some(alquiler => alquiler.id === property.id);
    const lat = property.latLng ? property.latLng[0] : property.lat;
    const lng = property.latLng ? property.latLng[1] : property.lng;
    const priceText = `RD$ ${formatNumber(property.price)}${isAlquiler ? "/mes" : ""}`;

    modalDetails.innerHTML = `
        <h2>${priceText}</h2>
        <div class="share-button-container">
            <button id="shareButton" class="share-button" onclick="shareProperty()"><img src="./img/icons/compartir3.png"></button>
        </div>
        <h3>ID: ${property.id}</h3>
        <h4>${property.title}</h4>
        <div class="detallesmodalicon"> 
            ${createIconItem(roomIcon, `${property.rooms} Habitaciones`)}
            ${createIconItem(bathroomIcon, `${property.bathrooms} Baños`)}
            ${createIconItem(parkingIcon, `${property.parking} Parqueos`)}
            ${createIconItem(areaIcon, `${property.area} m²`)}
        </div>
        <div class="detallesmodaltext"> 
            <p><strong>Características:</strong> ${property.caracteristicas}</p>
        </div>
        <div class="box-modal-googlemap"><p>Ubicación</p>
            <iframe 
            src="https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        frameborder="0" 
                scrolling="no" 
                style="width: 100%;height: 100%;box-shadow: 0px 0px 0px 2px rgb(0 0 0 / 0%);border-radius: 12px;">
            </iframe>
        </div>

        <div class="info-bottom-modal">
            <img id="logo-down-modal" src="./img/logo2.svg">
            <p>&#169; ArríbaTe 2024</p>
            <div class="info-mini-bottom-modal">
                <p>ArríbaTe se compromete a garantizar la accesibilidad digital para personas con discapacidades.<br> Trabajamos continuamente para mejorar la accesibilidad de nuestra experiencia web para todos.</p>
            </div>
             <div class="info-mini-bottom-modal">
                <p><strong>Aviso:</strong> La información presentada es de carácter informativo y está sujeta a cambios sin previo aviso.<br>
               Al utilizar nuestra plataforma, reconoces y aceptas cumplir con nuestras <button class="boton-terminos-modal" data-seccion="terminos-de-uso">Condiciones de uso</button> y <button class="boton-terminos-modal" data-seccion="politicas-de-privacidad">Políticas de privacidad</button></p>
            </div>
            <button class="boton-terminos-modal" data-seccion="politicas-de-privacidad">Políticas de privacidad</button>
            </div>
            <div class="info-mini-redes">
                <h6>Síguenos:</h6>
                <div>
                    <img src="./img/icons/instagram2.png">
                    <img src="./img/icons/facebook2.png">
                    <img src="./img/icons/x2.png">
                </div>
            </div>
            <div class="modal-down-background"></div>
        </div>
    `;
}

// Crear un ítem de icono para los detalles
function createIconItem(icon, text) {
    return `
        <div class="item">
            <img src="${icon}"><p>${text}</p>
        </div>`;
}

// Actualizar galería
function updateGallery(id, imageCount) {
    images = createImageArray(id, imageCount); // Asigna las imágenes a la variable global
    clearGallery();
    addThumbnails(images);
    if (images.length > 0) {
        mainImage.src = images[0];
        updateActiveThumbnail(0);
    }
    setupGalleryNavigation(images);
    setupFullscreen(images);
    setupTouchAndMouseSupport(); // Inicializa el soporte táctil y de mouse
}

// Crear array de imágenes
function createImageArray(id, imageCount) {
    return Array.from({ length: imageCount }, (_, i) => 
        `https://firebasestorage.googleapis.com/v0/b/arribate-com.firebasestorage.app/o/propiedades%2F${id}%2Fimg%2F${i + 1}.jpg?alt=media`
    );
}

// Limpiar galería
function clearGallery() {
    mainImage.src = '';
    thumbnailsContainer.innerHTML = '';
}

// Agregar miniaturas a la galería
function addThumbnails(images) {
    images.forEach((imgSrc, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imgSrc;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.dataset.index = index;
        thumbnail.addEventListener('click', () => {
            mainImage.src = imgSrc;
            updateActiveThumbnail(index);
        });
        thumbnailsContainer.appendChild(thumbnail);
    });
}

// Actualizar miniatura activa y centrarla
function updateActiveThumbnail(index) {
    const thumbnails = document.querySelectorAll('.thumbnails img');
    thumbnails.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });

    const thumbnail = thumbnails[index];
    const container = thumbnailsContainer;

    // Tamaños y posición
    const thumbnailRect = thumbnail.getBoundingClientRect(); // Dimensiones de la miniatura activa
    const containerRect = container.getBoundingClientRect(); // Dimensiones del contenedor

    // Cálculo del desplazamiento
    const offset =
        container.scrollLeft + thumbnailRect.left - containerRect.left - (containerRect.width / 2) + (thumbnailRect.width / 2);

    // Asegurarse de no exceder los límites
    const maxScroll = container.scrollWidth - container.clientWidth;
    const adjustedOffset = Math.max(0, Math.min(offset, maxScroll));

    // Aplicar el desplazamiento
    container.scrollTo({
        left: adjustedOffset,
        behavior: 'smooth',
    });
}

// Navegación de la galería
function setupGalleryNavigation(images) {
    document.getElementById('prevMainImage').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        mainImage.src = images[currentIndex];
        updateActiveThumbnail(currentIndex);
    });

    document.getElementById('nextMainImage').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        mainImage.src = images[currentIndex];
        updateActiveThumbnail(currentIndex);
    });
}

// Pantalla completa
function setupFullscreen(images) {
    const fullscreenModal = document.getElementById('fullscreenModal');
    const fullscreenImage = document.getElementById('fullscreenModalImage');
    let currentFullscreenIndex = 0;

    function openFullscreenModal(index) {
        currentFullscreenIndex = index;
        fullscreenImage.src = images[currentFullscreenIndex];
        fullscreenModal.style.display = "block";
    }

    function closeFullscreenModal() {
        fullscreenModal.style.display = "none";
    }

    fullscreenImage.addEventListener('click', () => {
        currentFullscreenIndex = (currentFullscreenIndex + 1) % images.length;
        fullscreenImage.src = images[currentFullscreenIndex];
    });

    document.getElementById('fullscreenButton').addEventListener('click', () => {
        openFullscreenModal(currentIndex);
    });

    fullscreenModal.addEventListener('click', closeFullscreenModal);
}

// Soporte para desplazamiento táctil y con mouse
function setupTouchAndMouseSupport() {
    let startX;
    let isDragging = false;

    const handleStart = (event) => {
        startX = event.touches ? event.touches[0].clientX : event.clientX;
        isDragging = true;
    };

    const handleMove = (event) => {
        if (!isDragging) return;

        const moveX = event.touches ? event.touches[0].clientX : event.clientX;
        const diffX = startX - moveX;

        // Mostrar la imagen siguiente/previa parcialmente
        if (Math.abs(diffX) < 50) {
            const nextImageIndex = (currentIndex + (diffX < 0 ? -1 : 1) + images.length) % images.length;
            mainImage.src = images[nextImageIndex];
            mainImage.style.transform = `translateX(${diffX}px)`; // Desplazamiento cruzado
        }
    };

    const handleEnd = () => {
        isDragging = false;
        mainImage.style.transform = 'translateX(0)'; // Restablecer el desplazamiento
    };

    mainImage.addEventListener('touchstart', handleStart);
    mainImage.addEventListener('mousedown', handleStart);

    mainImage.addEventListener('touchmove', handleMove);
    mainImage.addEventListener('mousemove', (event) => {
        if (isDragging) handleMove(event);
    });

    mainImage.addEventListener('touchend', handleEnd);
    mainImage.addEventListener('mouseup', handleEnd);
    mainImage.addEventListener('mouseleave', handleEnd); // Para manejar el mouse saliendo de la imagen
}

// Función de compartir
function shareProperty() {
    // Implementa la lógica para compartir la propiedad aquí
    alert('Función de compartir no implementada.');
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Aquí puedes inicializar tu aplicación o cargar datos iniciales
    // Por ejemplo, agregar eventos a botones de apertura de modal, etc.
});

// Cerrar modal al hacer clic fuera del contenido
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Manejar el estado de la historia
window.addEventListener('popstate', () => {
    closeModal();
});
