// Variables globales
const modal = document.getElementById('propertyModal');
const modalDetails = document.getElementById('modalPropertyDetails');
const whatsappButton = document.getElementById('whatsappButton');
const mainImage = document.getElementById('currentImage');
const thumbnailsContainer = document.querySelector('.thumbnails');

// Abrir modal con la propiedad
function openModal(property) {
    setupWhatsappButton(property);
    updateModalDetails(property);
    updateGallery(property.id, property.imageCount); // Cambiar a property.id
    history.pushState(null, '', `#id-${property.id}`);

    const modalContent = modal.querySelector('.modal-content');

    modal.classList.add('modal-in-anim'); // Animación de entrada para el modal
    modalContent.classList.add('modal-content-in-anim'); // Animación de entrada para el contenido

    modal.style.display = "block";
}

// Cerrar modal
function closeModal() {
    const modalContent = modal.querySelector('.modal-content');

    modal.classList.add('modal-out-anim'); // Animación de salida para el modal
    modalContent.classList.add('modal-content-out-anim'); // Animación de salida para el contenido

    // Espera a que las animaciones terminen antes de ocultar el modal
    modal.addEventListener('animationend', () => {
        modal.style.display = "none";
        history.pushState(null, '', window.location.pathname); // Eliminar id del link al cerrar el modal
        modal.classList.remove('modal-out-anim');
        modalContent.classList.remove('modal-content-out-anim');
    }, { once: true }); // Asegúrate de que el evento solo se dispare una vez.
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
    let images = createImageArray(id, imageCount);
    clearGallery();
    addThumbnails(images);
    if (images.length > 0) {
        mainImage.src = images[0];
        updateActiveThumbnail(0);
    }
    setupGalleryNavigation(images);
    setupFullscreen(images);
    setupTouchNavigation(images); // Agregar navegación por touch
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

// Actualizar miniatura activa
function updateActiveThumbnail(index) {
    document.querySelectorAll('.thumbnails img').forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

// Navegación de la galería
function setupGalleryNavigation(images) {
    let currentIndex = 0;

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
        fullscreenModal.style.display = 'block';
    }

    function closeFullscreenModal() {
        fullscreenModal.style.display = 'none';
    }

    document.querySelector('.close-fullscreen').addEventListener('click', closeFullscreenModal);
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeFullscreenModal();
        }
    });

    document.getElementById('prevFullscreenImage').addEventListener('click', () => {
        currentFullscreenIndex = (currentFullscreenIndex - 1 + images.length) % images.length;
        fullscreenImage.src = images[currentFullscreenIndex];
    });

    document.getElementById('nextFullscreenImage').addEventListener('click', () => {
        currentFullscreenIndex = (currentFullscreenIndex + 1) % images.length;
        fullscreenImage.src = images[currentFullscreenIndex];
    });

    // Abrir el modal de pantalla completa al hacer clic en la imagen principal
    mainImage.addEventListener('click', () => openFullscreenModal(currentFullscreenIndex));
}

// Navegación por touch
function setupTouchNavigation(images) {
    let startX = 0;
    let currentIndex = 0;

    mainImage.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    mainImage.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        if (deltaX > 50) {
            // Deslizamiento hacia la izquierda (anterior imagen)
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        } else if (deltaX < -50) {
            // Deslizamiento hacia la derecha (siguiente imagen)
            currentIndex = (currentIndex + 1) % images.length;
        }

        mainImage.src = images[currentIndex];
        updateActiveThumbnail(currentIndex);
    });
}

// Manejar el evento "popstate" para el botón de "atrás"
window.addEventListener('popstate', (event) => {
    const modal = document.getElementById('propertyModal');
    if (modal.style.display === 'block') {
        closeModal(); // Si el modal está abierto, lo cierra
    }
});

// Verificar ID en la URL al cargar
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash.startsWith('#id-')) {
        const propertyId = parseInt(hash.substring('#id-'.length));
        const property = [...alquileres, ...ventas].find(p => p.id === propertyId);
        if (property) {
            openModal(property);
        }
    }
});

// Desplazamiento de thumbnails
window.addEventListener('DOMContentLoaded', () => {
    const scrollLeftButton = document.querySelector('.scroll-button.left');
    const scrollRightButton = document.querySelector('.scroll-button.right');

    scrollLeftButton.addEventListener('click', () => {
        thumbnailsContainer.scrollLeft -= 150;
    });

    scrollRightButton.addEventListener('click', () => {
        thumbnailsContainer.scrollLeft += 150;
    });
});
