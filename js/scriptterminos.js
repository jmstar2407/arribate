
        // Función para mostrar el cuadro
        function mostrarCuadro() {
            const back = document.getElementById("open-terminos-politica");
            const content = document.querySelector(".terminos-politica-content");

            back.style.display = "block";
            back.classList.add('show');
            content.classList.add('show');
        }

        // Función para cerrar el cuadro
        function cerrarCuadro() {
            const back = document.getElementById("open-terminos-politica");
            const content = document.querySelector(".terminos-politica-content");

            back.classList.remove('show');
            back.classList.add('hide');
            content.classList.remove('show');
            content.classList.add('hide');

            setTimeout(function () {
                back.style.display = "none";
                back.classList.remove('hide');
                content.classList.remove('hide');

                // Remueve la clase 'active' de todos los botones al cerrar
                const botonesSecciones = document.querySelectorAll('button[data-seccion]');
                botonesSecciones.forEach(btn => btn.classList.remove('active'));
            }, 300);
        }

        // Información de cada sección (reemplaza con tu contenido real)
        const sobreNosotrosInfo = `
    <h2>Sobre Nosotros</h2>


<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:justify;line-height:115%;'><strong><span style="font-family:Calibri;">Arr&iacute;bate naci&oacute; de una visi&oacute;n simple pero poderosa:</span></strong><span style="font-family:Calibri;">&nbsp;hacer que la b&uacute;squeda de propiedades en la Rep&uacute;blica Dominicana sea m&aacute;s accesible, confiable y eficiente. Como emprendedores comprometidos con el desarrollo de nuestro pa&iacute;s, identificamos una necesidad urgente en el mercado inmobiliario: la falta de plataformas dedicadas exclusivamente a conectar a las personas con propiedades, ya sea para alquilar o comprar.</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:justify;line-height:115%;'><span style="font-family:Calibri;">&nbsp;</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:justify;line-height:115%;'><span style="font-family:Calibri;">Nuestra misi&oacute;n es m&aacute;s que un negocio, es una contribuci&oacute;n al bienestar de nuestra gente. Sabemos que encontrar el hogar ideal o el lugar perfecto para invertir es una de las decisiones m&aacute;s importantes en la vida, y queremos facilitar ese proceso con tecnolog&iacute;a innovadora y un servicio personalizado. Nos dedicamos a ser un puente confiable entre propietarios e inquilinos, ofreciendo una experiencia sin complicaciones, justa y transparente.</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:justify;line-height:115%;'><span style="font-family:Calibri;">&nbsp;</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:justify;line-height:115%;'><span style="font-family:Calibri;">Con Arr&iacute;bate, elevamos la b&uacute;squeda de propiedades a otro nivel, y estamos orgullosos de ser una plataforma hecha por y para dominicanos, impulsada por el deseo de generar un impacto positivo en nuestra comunidad.</span></p>



  <h2>Misión, visión y valores</h2>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style="font-size:13px;font-family:Calibri;color:red;">&nbsp;</span></strong></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:justify;line-height:115%;'><strong><span style="font-family:Calibri;">Visi&oacute;n:</span></strong></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:justify;line-height:115%;'><span style="font-family:Calibri;">En <strong><span style='font-family:"Calibri",sans-serif;'>Arr&iacute;bate</span></strong>, Nuestro objetivo es transformar el mercado local, proporcionando a nuestros usuarios acceso seguro, r&aacute;pido y eficiente a las propiedades. Nos enfocamos en simplificar el proceso de compra, venta y alquiler de inmuebles, garantizando la confiabilidad de cada operaci&oacute;n.</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:justify;line-height:115%;'><span style="font-size:13px;line-height:115%;font-family:Calibri;">&nbsp;</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:justify;line-height:115%;'><strong><span style="font-family:Calibri;">Misi&oacute;n:</span></strong></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:justify;line-height:115%;'><span style="font-family:Calibri;">La misi&oacute;n de <strong><span style='font-family:"Calibri",sans-serif;'>Arr&iacute;bate</span></strong> es ofrecer una plataforma digital intuitiva, accesible y, sobre todo, segura. Nos comprometemos a facilitar transacciones inmobiliarias transparentes al validar las propiedades y realizar controles continuos sobre las publicaciones. De este modo, garantizamos que nuestros usuarios disfruten de una experiencia libre de estafas y riesgos, conectando de manera directa a propietarios con compradores o inquilinos potenciales.</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:justify;line-height:115%;'><strong><span style="font-size:13px;line-height:115%;font-family:Calibri;color:red;">&nbsp;</span></strong></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;text-align:justify;line-height:115%;'><strong><span style="font-family:Calibri;">Valores</span></strong><strong><span style="font-size:13px;line-height:115%;font-family:Calibri;">:</span></strong></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><span style="font-family:Calibri;">Nuestros valores son el fundamento de cada interacci&oacute;n y servicio ofrecido a trav&eacute;s de <strong>Arr&iacute;bate</strong>:</span></p>
<ul type="disc" style="margin-bottom:0cm;">
    <li style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:     Calibri;">Seguridad:</span></strong><span style="font-family:     Calibri;">&nbsp;Implementamos estrictos mecanismos de control en todas las publicaciones. Verificamos cualquier propiedad sospechosa para prevenir fraudes.</span></li>
    <li style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:     Calibri;">Transparencia:</span></strong><span style="font-family:     Calibri;">&nbsp;Priorizamos la claridad y honestidad en cada una de las transacciones, asegurando que la informaci&oacute;n sea completa y precisa.</span></li>
    <li style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:     Calibri;">Innovaci&oacute;n:</span></strong><span style="font-family:     Calibri;">&nbsp;Mantenemos nuestras tecnolog&iacute;as en constante evoluci&oacute;n para satisfacer las cambiantes demandas del mercado, mejorando nuestras herramientas digitales.</span></li>
    <li style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:     Calibri;">Responsabilidad:</span></strong><span style="font-family:     Calibri;">&nbsp;Aseguramos que todas las transacciones sigan los est&aacute;ndares legales, promoviendo pr&aacute;cticas sostenibles y &eacute;ticas en el mercado inmobiliario.</span></li>
    <li style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:     Calibri;">Servicio al Cliente:</span></strong><span style="font-family:Calibri;">&nbsp;Colocamos al cliente en el centro de nuestras operaciones, ofreciendo un servicio de alta calidad en cada etapa del proceso.</span></li>
    <li style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:     Calibri;">Integridad:</span></strong><span style="font-family:     Calibri;">&nbsp;Operamos bajo principios &eacute;ticos s&oacute;lidos, garantizando una experiencia justa y confiable para todas las partes involucradas.</span></li>
</ul>







`;

        const terminosUsoInfo = `
    <h2>Términos de Uso</h2>


<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:Calibri;">Aceptaci&oacute;n de las Condiciones</span></strong><span style="font-family:Calibri;"><br> Al acceder y utilizar la plataforma <strong>Arr&iacute;bate</strong>, el usuario acepta cumplir con estas Condiciones de Uso. Si no est&aacute; de acuerdo con alguno de los t&eacute;rminos establecidos, debe abstenerse de utilizar la plataforma.</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:Calibri;">Uso de la Plataforma</span></strong><span style="font-family:Calibri;"><br> <strong>Arr&iacute;bate</strong> ofrece a los usuarios la posibilidad de buscar y consultar propiedades en alquiler y venta en la Rep&uacute;blica Dominicana. Toda la informaci&oacute;n proporcionada est&aacute; sujeta a cambios y no garantiza la disponibilidad o precisi&oacute;n en tiempo real.</span></p>
<ul type="disc" style="margin-bottom:0cm;">
    <li style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><span style="font-family:     Calibri;">El uso de <strong>Arr&iacute;bate</strong> es exclusivamente con fines informativos.</span></li>
    <li style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><span style="font-family:     Calibri;">Est&aacute; estrictamente prohibido utilizar la plataforma con fines ilegales o fraudulentos.</span></li>
</ul>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:Calibri;">Comunicaci&oacute;n a trav&eacute;s de WhatsApp</span></strong><span style="font-family:Calibri;"><br> En esta etapa inicial, todas las consultas y solicitudes de informaci&oacute;n sobre propiedades ser&aacute;n gestionadas exclusivamente a trav&eacute;s de WhatsApp. <strong>Arr&iacute;bate</strong> no se responsabiliza por el uso inadecuado o malentendidos derivados de la comunicaci&oacute;n en esta plataforma.</span></p>
<ul type="disc" style="margin-bottom:0cm;">
    <li style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><span style="font-family:     Calibri;">Se recomienda a los usuarios no compartir informaci&oacute;n personal o sensible a trav&eacute;s de WhatsApp.</span></li>
</ul>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:Calibri;">Propiedad Intelectual</span></strong><span style="font-family:Calibri;"><br> Todo el contenido, gr&aacute;ficos, marcas y logotipos presentes en <strong>Arr&iacute;bate</strong> est&aacute;n protegidos por leyes de propiedad intelectual. Los usuarios no pueden copiar, modificar ni distribuir ning&uacute;n material sin el consentimiento previo por escrito de <strong>Arr&iacute;bate</strong>.</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:Calibri;">Modificaciones a las Condiciones</span></strong><span style="font-family:Calibri;"><br> <strong>Arr&iacute;bate</strong> se reserva el derecho de modificar estas Condiciones de Uso en cualquier momento. Las modificaciones ser&aacute;n efectivas desde el momento en que sean publicadas en la plataforma.</span></p>







`;

        const politicasPrivacidadInfo = `
    <h2>Políticas de Privacidad</h2>




<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:Calibri;">Recolecci&oacute;n de Datos Personales</span></strong><span style="font-family:Calibri;"><br> En esta fase inicial, <strong>Arr&iacute;bate</strong> no requiere la creaci&oacute;n de perfiles ni la recolecci&oacute;n de datos personales de los usuarios. Todas las interacciones se realizar&aacute;n a trav&eacute;s de WhatsApp, y <strong>Arr&iacute;bate</strong> no almacena informaci&oacute;n personal directamente en la plataforma.</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:Calibri;">Uso de WhatsApp para Comunicaci&oacute;n</span></strong><span style="font-family:Calibri;"><br> Los usuarios interesados en consultar o recibir informaci&oacute;n sobre propiedades deber&aacute;n contactar a <strong>Arr&iacute;bate</strong> a trav&eacute;s de WhatsApp. <strong>Arr&iacute;bate</strong> no se hace responsable de la seguridad de la informaci&oacute;n compartida a trav&eacute;s de dicha plataforma.</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:Calibri;">Seguridad de la Informaci&oacute;n</span></strong><span style="font-family:Calibri;"><br> Se recomienda a los usuarios evitar compartir informaci&oacute;n sensible o financiera por medio de WhatsApp. <strong>Arr&iacute;bate</strong> no es responsable de la seguridad de la informaci&oacute;n que los usuarios decidan compartir mediante esta plataforma.</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:Calibri;">Enlaces a Terceros</span></strong><span style="font-family:Calibri;"><br> La plataforma <strong>Arr&iacute;bate</strong> puede incluir enlaces a aplicaciones o servicios externos (como WhatsApp). Estas aplicaciones de terceros tienen sus propias pol&iacute;ticas de privacidad, por lo que sugerimos a los usuarios revisarlas antes de compartir cualquier informaci&oacute;n.</span></p>
<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;font-size:11.0pt;font-family:"Calibri",sans-serif;line-height:115%;'><strong><span style="font-family:Calibri;">Cambios en la Pol&iacute;tica de Privacidad</span></strong><span style="font-family:Calibri;"><br> <strong>Arr&iacute;bate</strong> se reserva el derecho de modificar esta Pol&iacute;tica de Privacidad en cualquier momento. Cualquier cambio ser&aacute; publicado en esta secci&oacute;n y entrar&aacute; en vigor de inmediato tras su publicaci&oacute;n.</span></p>




    
`;

        // Función para mostrar la información en el contenedor
        function mostrarInformacion(contenido) {
            const displayInfo = document.querySelector('.display-info-all');
            displayInfo.innerHTML = contenido;
        }

        // Esperamos a que la página cargue completamente
        window.onload = function () {
            // Buscamos todos los botones que tengan la clase 'abrir-cuadro' 
            const botonesAbrir = document.querySelectorAll('.abrir-cuadro');

            // A cada botón le agregamos un evento de clic
            botonesAbrir.forEach(boton => {
                boton.addEventListener('click', mostrarCuadro);
            });

            // Buscamos el botón de cerrar
            const botonCerrar = document.querySelector('.cerrar-cuadro');

            // Agregamos el evento de clic al botón de cerrar
            botonCerrar.addEventListener('click', cerrarCuadro);

            // Busca todos los botones con el atributo data-seccion
            const botonesSecciones = document.querySelectorAll('button[data-seccion]');

            // Agrega eventos de clic a cada botón
            botonesSecciones.forEach(boton => {
                boton.addEventListener('click', () => {
                    // Obtiene el nombre de la sección del atributo data-seccion
                    const seccion = boton.dataset.seccion;

                    // Remueve la clase 'active' de todos los botones
                    botonesSecciones.forEach(btn => btn.classList.remove('active'));

                    // Agrega la clase 'active' a todos los botones de la misma sección
                    botonesSecciones.forEach(btn => {
                        if (btn.dataset.seccion === seccion) {
                            btn.classList.add('active');
                        }
                    });

                    // Muestra el cuadro
                    mostrarCuadro();

                    // Muestra la información de la sección correspondiente
                    switch (seccion) {
                        case 'sobre-nosotros':
                            mostrarInformacion(sobreNosotrosInfo);
                            break;
                        case 'terminos-de-uso':
                            mostrarInformacion(terminosUsoInfo);
                            break;
                        case 'politicas-de-privacidad':
                            mostrarInformacion(politicasPrivacidadInfo);
                            break;
                        default:
                            console.error('Sección no válida:', seccion);
                    }
                });
            });
        }


        