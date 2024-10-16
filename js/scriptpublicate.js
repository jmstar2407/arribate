const openPublicateRespon = document.getElementById('open-publicate-respon');
const openPublicate = document.getElementById('open-publicate');
const backgroundPublicateModal = document.getElementById('background-publicate-modal');
const publicateModal = document.getElementById('publicate-modal');
const closePublicateModal = document.getElementById('close-publicate-modal');

// Función para abrir el modal
function openModalPublicate() {
  backgroundPublicateModal.classList.add('show');
  publicateModal.classList.add('show');
  openPublicateRespon.classList.add('active');
  openPublicate.classList.add('active');
}

// Función para cerrar el modal
function closeModalPublicate() {
  backgroundPublicateModal.classList.add('hide'); // Iniciar la animación de salida del fondo
  publicateModal.classList.add('hide'); // Iniciar la animación de salida del modal
  openPublicateRespon.classList.remove('active');
  openPublicate.classList.remove('active');

  // Esperar a que las animaciones de salida se completen antes de ocultar los elementos
  setTimeout(() => {
    backgroundPublicateModal.classList.remove('show', 'hide'); // Ocultar el fondo y resetear las clases de animación
    publicateModal.classList.remove('show', 'hide'); // Ocultar el modal y resetear las clases de animación
  }, 300); // 300ms es la duración de las animaciones de salida definidas en el CSS
}

// Asignar eventos a los activadores y al botón de cerrar
openPublicateRespon.addEventListener('click', openModalPublicate);
openPublicate.addEventListener('click', openModalPublicate);
closePublicateModal.addEventListener('click', closeModalPublicate);

// Cerrar el modal al hacer clic fuera de él
backgroundPublicateModal.addEventListener('click', (event) => {
  if (event.target === backgroundPublicateModal) {
    closeModalPublicate();
  }
});



// Manejo del evento 'popstate' para cerrar el modal cuando el usuario presiona "atrás"
window.addEventListener('popstate', (event) => {
  if (publicateModal.classList.contains('show')) {
    closeModalPublicate(); // Cierra el modal si está abierto
  }
});



// Obtén los botones por su ID
const btnAlquilar = document.getElementById('publicate-btn-alquilar');
const btnVender = document.getElementById('publicate-btn-vender');

// Define tu número de WhatsApp (reemplaza con tu número real)
const numeroWhatsApp = '+18299605566';

// Define los mensajes predeterminados (puedes cambiarlos fácilmente aquí)
const mensajeAlquilar = 'Hola, tengo interés en poner en alquiler una propiedad.';
const mensajeVender = 'Hola, tengo interés en vender una propiedad.';

// Agrega un evento de clic a cada botón
btnAlquilar.addEventListener('click', () => {
  // Crea el enlace de WhatsApp con el mensaje predeterminado
  const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensajeAlquilar)}`;

  // Abre el enlace en una nueva pestaña o ventana
  window.open(enlaceWhatsApp, '_blank');
});

btnVender.addEventListener('click', () => {
  // Crea el enlace de WhatsApp con el mensaje predeterminado
  const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensajeVender)}`;

  // Abre el enlace en una nueva pestaña o ventana
  window.open(enlaceWhatsApp, '_blank');
});