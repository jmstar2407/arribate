document.querySelectorAll('.categoria-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remover la clase 'active' de todas las opciones
        document.querySelectorAll('.categoria-option').forEach(opt => {
            opt.classList.remove('active');
        });

        // Agregar la clase 'active' a la opción seleccionada
        this.classList.add('active');

        // Actualizar el valor del input oculto
        const value = this.getAttribute('data-value');
        document.getElementById('categoria-hidden').value = value;
    });
});