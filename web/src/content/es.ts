import type { SiteContent } from "./types";

export const es = {
  locale: "es",
  reviewStatus: "owner-review-required",
  nav: {
    home: "Inicio",
    services: "Servicios",
    gallery: "Galería",
    about: "Nosotros",
    contact: "Contacto",
    homeServices: "Servicios para el hogar",
    professionalServices: "Servicios profesionales",
    requestQuote: "Solicitar cotización",
    openMenu: "Abrir menú de navegación",
    closeMenu: "Cerrar menú de navegación",
    language: "Idioma",
    skipToContent: "Saltar al contenido principal",
  },
  common: {
    call: "Llamar al (716) 748-9117",
    text: "Enviar mensaje",
    learnMore: "Más información",
    requestQuote: "Solicitar una cotización personalizada",
    availableInOhio: "Atendemos solicitudes en Ohio según cada caso",
    terms: "Términos",
    privacy: "Privacidad",
    accessibility: "Accesibilidad",
    footerSummary:
      "Servicios atentos para el hogar y apoyo profesional coordinado con comunicación clara.",
    rights: "Todos los derechos reservados.",
  },
  home: {
    eyebrow: "Cuidado del hogar y apoyo profesional bilingüe",
    title: "Servicios confiables para el hogar. Un equipo de confianza.",
    summary:
      "JVF HomeWorks Pro ofrece servicios profesionales y detallistas para el hogar, además de notaría e interpretación español-inglés. Facilitamos la solicitud con expectativas claras.",
    primaryCta: "Solicitar cotización",
    secondaryCta: "Explorar servicios",
    availabilityTitle: "Interpretación cuando la necesita",
    availabilityBody:
      "La interpretación español-inglés por teléfono y medios virtuales está disponible las 24 horas. La interpretación en persona está disponible de 8:00 a. m. a 6:00 p. m., hora del Este; después de las 6:00 p. m., el servicio es únicamente virtual.",
    servicesHeading: "Servicios populares de JVF HomeWorks Pro",
    servicesIntro:
      "Elija el servicio que necesita. Cada solicitud se revisa personalmente según disponibilidad, viaje y alcance.",
    whyHeading: "Atención clara desde el primer contacto",
    whyItems: [
      "Servicio atento y respetuoso",
      "Alcance y precios explicados con claridad",
      "Coordinación flexible por teléfono, mensaje o reunión virtual",
      "Atención en inglés y español",
    ],
    closingTitle: "Cuéntenos qué le ayudaría a vivir con más tranquilidad.",
    closingBody:
      "Comparta algunos detalles prácticos y JVF HomeWorks Pro se comunicará para confirmar el siguiente paso adecuado.",
    stepsHeading: "Servicio profesional en tres pasos sencillos",
    steps: [
      {
        number: "01",
        title: "Solicite una consulta",
        body: "Llame, envíe un mensaje o use el formulario accesible para explicarnos lo que necesita.",
      },
      {
        number: "02",
        title: "Confirme su servicio",
        body: "Revisamos con usted el alcance, horario, ubicación y precio antes de comenzar.",
      },
      {
        number: "03",
        title: "Nos ponemos a trabajar",
        body: "Realizamos el servicio con atención al detalle y comunicación clara.",
      },
    ],
  },
  services: {
    eyebrow: "Servicios",
    title: "Apoyo práctico, brindado con atención.",
    intro:
      "Desde renovar la sensación de su hogar hasta una solicitud urgente de interpretación, JVF HomeWorks Pro ofrece ayuda receptiva con expectativas claras y coordinación personal.",
    homeGroup: "Servicios para el hogar",
    professionalGroup: "Servicios profesionales",
  },
  serviceDetails: {
    housekeeping: {
      eyebrow: "Servicios para el hogar",
      title: "Limpieza para hogares y oficinas pequeñas",
      summary:
        "Un espacio más limpio y tranquilo, organizado según su horario y prioridades.",
      intro:
        "Solicite limpieza estándar, profunda, recurrente, de mudanza o de una sola vez. Revisamos cada solicitud en Ohio y confirmamos el alcance antes del servicio.",
      features: [
        "Limpieza estándar y profunda",
        "Visitas recurrentes o de una sola vez",
        "Limpieza de entrada y salida de vivienda",
        "Hogares y oficinas pequeñas",
      ],
      scheduleTitle: "Un plan adecuado para su espacio",
      scheduleBody:
        "Indique si el espacio es un hogar o una oficina pequeña, el tipo y la frecuencia de limpieza, la fecha preferida y algunos datos básicos del tamaño.",
      price: "Desde $39 por hora",
      cardPrice: "$39 por hora",
      note: "El tiempo y el precio final dependen del alcance confirmado. No se ofrecen trabajos peligrosos ni de riesgo biológico.",
      cta: "Solicitar cotización de limpieza",
    },
    remodeling: {
      eyebrow: "Servicios para el hogar",
      title: "Remodelación del hogar",
      summary:
        "Mejoras prácticas planificadas según su espacio, prioridades y presupuesto.",
      intro:
        "Converse con nosotros sobre mejoras de cocina o baño, pisos, pintura, reemplazo de accesorios y otros proyectos. Revisamos cada solicitud antes de confirmar alcance, horario o precio.",
      features: [
        "Mejoras de cocina y baño",
        "Instalación de pisos",
        "Pintura y acabados interiores",
        "Reemplazo de accesorios",
      ],
      scheduleTitle: "Comience con el objetivo del proyecto",
      scheduleBody:
        "Comparta las habitaciones, el resultado deseado, las condiciones actuales, el plazo y cualquier requisito conocido de permiso u oficio especializado.",
      price: "Desde $59 por hora",
      cardPrice: "$59 por hora",
      note: "Los materiales, permisos, oficios especializados y costos específicos se cotizan por separado cuando corresponda.",
      cta: "Solicitar consulta de remodelación",
    },
    decoration: {
      eyebrow: "Servicios para el hogar",
      title: "Decoración y estilo para el hogar",
      summary:
        "Apoyo cálido y práctico para que una habitación se sienta completa y personal.",
      intro:
        "JVF HomeWorks Pro puede ayudar con selección de decoración, organización, estilo y preparación de habitaciones residenciales. Describa el espacio y el ambiente que desea crear para conversar sobre opciones prácticas.",
      features: [
        "Estilo de habitaciones y detalles finales",
        "Apoyo para elegir decoración",
        "Organización de muebles y accesorios",
        "Preparación práctica del espacio",
      ],
      scheduleTitle: "Comience con la habitación y su objetivo",
      scheduleBody:
        "Indique qué habitaciones necesitan atención, qué le gustaría cambiar y cuándo prefiere hacerlo. No se pide presupuesto en la solicitud inicial.",
      price: "Desde $59 por hora",
      cardPrice: "$59 por hora",
      note: "El precio final se confirma después de una consulta. Este es un servicio de decoración y estilo, no un servicio profesional de diseño interior con licencia.",
      cta: "Solicitar apoyo de decoración",
    },
    notary: {
      eyebrow: "Servicios profesionales",
      title: "Servicio de notaría presencial en Ohio",
      summary:
        "Apoyo notarial con cita y con información sencilla y anticipada sobre las tarifas.",
      intro:
        "El servicio es ofrecido en persona por una Notaria Pública comisionada en Ohio y requiere una cita confirmada. Puede enviar su solicitud a cualquier hora; la confirmación se realiza personalmente.",
      features: [
        "Servicio únicamente en persona",
        "Se requiere cita confirmada",
        "La persona firmante presenta identificación aceptable",
        "Servicio móvil considerado según la solicitud",
      ],
      scheduleTitle: "Antes de su cita",
      scheduleBody:
        "La persona firmante debe presentarse en persona con identificación aceptable. JVF HomeWorks Pro no ofrece asesoría legal ni elige el acto notarial por el cliente.",
      price:
        "$5 por cada acto notarial presencial; cualquier tarifa de viaje móvil se cotiza y acuerda por adelantado.",
      cardPrice: "$5 por acto",
      note: "No se ofrece notarización remota en línea.",
      cta: "Solicitar una cita de notaría",
    },
    interpreting: {
      eyebrow: "Servicios profesionales",
      title: "Interpretación español-inglés",
      summary:
        "Apoyo de comunicación por teléfono, Zoom, reunión virtual o en persona.",
      intro:
        "Se puede considerar interpretación profesional español-inglés para cualquier entorno, según la solicitud, la idoneidad y la disponibilidad.",
      features: [
        "De español a inglés y de inglés a español",
        "Teléfono, Zoom y otras reuniones virtuales",
        "Solicitudes presenciales durante el horario diurno",
        "Solicitudes urgentes de devolución de llamada",
      ],
      scheduleTitle: "Disponibilidad virtual las 24 horas",
      scheduleBody:
        "La interpretación por teléfono y medios virtuales está disponible las 24 horas. La interpretación en persona está disponible de 8:00 a. m. a 6:00 p. m., hora del Este. Después de las 6:00 p. m., las solicitudes deben ser por teléfono o reunión virtual.",
      price: "El precio se confirma después de revisar la solicitud",
      cardPrice: "Precio personalizado",
      note: "Si la línea está ocupada o no recibe respuesta, envíe un mensaje al (716) 748-9117 o solicite una devolución de llamada urgente.",
      cta: "Solicitar intérprete",
    },
  },
  about: {
    eyebrow: "Acerca de JVF HomeWorks Pro",
    title:
      "Un negocio de servicios basado en atención, claridad y cumplimiento.",
    intro:
      "JVF HomeWorks Pro apoya a hogares, oficinas pequeñas y clientes de Ohio que necesitan servicios atentos para el hogar o apoyo profesional bilingüe.",
    missionTitle: "Ayuda práctica con un trato más personal",
    missionBody:
      "Nuestro objetivo es sencillo: escuchar con atención, establecer expectativas claras y ofrecer un servicio que respete su tiempo, su espacio y su privacidad.",
    valuesHeading: "Lo que guía nuestro trabajo",
    values: [
      {
        title: "Cuidado en los detalles",
        body: "Cada solicitud comienza escuchando y comprendiendo claramente el resultado deseado.",
      },
      {
        title: "Comunicación honesta",
        body: "El alcance, el horario, la disponibilidad y las tarifas se confirman antes de comenzar.",
      },
      {
        title: "Respeto por la privacidad",
        body: "Este sitio solo solicita detalles prácticos que no sean confidenciales.",
      },
    ],
    placeholderTitle:
      "La historia y el retrato de la propietaria se añadirán antes del lanzamiento",
    placeholderBody:
      "Esta versión de revisión no publica el nombre, el retrato, las credenciales ni la historia personal de la propietaria hasta que se verifiquen.",
  },
  gallery: {
    eyebrow: "Galería de proyectos",
    title: "Trabajo cuidadoso, terminado con atención.",
    intro:
      "Una vista más cercana de una sala de sótano terminada que aparece en la galería existente de JVF HomeWorks Pro.",
    firstCaption: "Sala de sótano terminada con almacenamiento integrado",
    secondCaption: "Área renovada para convivir en el sótano",
  },
  contact: {
    eyebrow: "Contacto y solicitud de cotización",
    title: "Encontremos el siguiente paso adecuado.",
    intro:
      "Elija un servicio y comparta algunos detalles prácticos. Su solicitud se revisará personalmente antes de confirmar una cita o un precio.",
    directTitle: "¿Prefiere hablar directamente?",
    directBody:
      "Llame o envíe un mensaje al (716) 748-9117. Para interpretación después de las 6:00 p. m., hora del Este, continúan disponibles el teléfono y las reuniones virtuales.",
    formTitle: "Solicitar servicio",
    privacyNote:
      "No envíe documentos, números de identificación, expedientes médicos ni detalles legales confidenciales.",
  },
  legal: {
    lastUpdated: "Última actualización: 25 de agosto de 2026",
    officialNotaryResource: "Información oficial sobre notarías de Ohio",
    terms: {
      title: "Términos y condiciones",
      status: "Borrador para revisión — aún no publicado",
      introduction:
        "Estos términos conceptuales explican cómo funcionarán el sitio web y el proceso de solicitud de JVF HomeWorks Pro. Requieren revisión legal antes de publicar el sitio.",
      sections: [
        {
          title: "Propósito del sitio web",
          paragraphs: [
            "Este sitio ofrece información general sobre JVF HomeWorks Pro y permite solicitar una cotización. El contenido es informativo y no constituye una oferta vinculante, asesoramiento profesional ni garantía de disponibilidad.",
          ],
        },
        {
          title: "Cotizaciones y confirmación del servicio",
          paragraphs: [
            "Enviar una solicitud no crea una cita ni un contrato de servicio. JVF HomeWorks Pro debe confirmar directamente el alcance, precio, posibles tarifas de viaje, horario, lugar y disponibilidad antes de comenzar el trabajo.",
            "Una cotización personalizada puede cambiar si cambia el alcance o la información. El cliente debe proporcionar datos exactos y no confidenciales para evaluar la solicitud.",
          ],
        },
        {
          title: "Servicios para el hogar",
          paragraphs: [
            "Las tarifas iniciales publicadas son $39 por hora para limpieza y $59 por hora para remodelación o decoración. Antes de comenzar se deben confirmar el alcance, horas, materiales, equipo, viaje, permisos, oficios especializados y precio total.",
            "La limpieza se ofrece para hogares y oficinas pequeñas y no incluye trabajos peligrosos ni de riesgo biológico. La decoración incluye estilo, selección, distribución y montaje; no es diseño de interiores con licencia. La remodelación se limita al alcance confirmado y no incluye trabajo regulado no aprobado.",
          ],
        },
        {
          title: "Servicio de notaría",
          paragraphs: [
            "El servicio de notaría se ofrece con cita y solo en persona. El firmante debe comparecer con identificación aceptable y estar dispuesto y capacitado para firmar. JVF HomeWorks Pro no ofrece notarización remota en línea, asesoramiento legal ni selección de documentos.",
            "La tarifa indicada es de $5 por acto notarial en persona. Cualquier tarifa razonable de viaje móvil se cotizará y acordará antes del acto. La notarización puede rechazarse si no se cumplen los requisitos legales o de identificación.",
          ],
        },
        {
          title: "Servicio de interpretación",
          paragraphs: [
            "La interpretación español–inglés es un servicio profesional de comunicación y no se presenta como interpretación certificada ni jurada. El horario presencial es de 8:00 a. m. a 6:00 p. m., hora del Este. La interpretación por teléfono, Zoom u otra modalidad virtual puede solicitarse 24/7, incluso después de las 6:00 p. m.",
            "La interpretación no constituye asesoramiento legal, médico ni financiero. En una emergencia, comuníquese con el servicio de emergencia correspondiente en lugar de depender de este sitio.",
          ],
        },
        {
          title: "Pagos y cancelaciones",
          paragraphs: [
            "Este sitio no acepta pagos, no crea cuentas de cliente ni completa reservas. El método de pago, las condiciones de cancelación y cualquier tarifa de viaje se confirmarán directamente antes del servicio.",
          ],
        },
        {
          title: "Leyes de Ohio y revisión",
          paragraphs: [
            "Estos términos preliminares se regirán por las leyes aplicables de Ohio. No son asesoramiento legal y deben revisarse según la entidad final del negocio, ubicación, seguro y prácticas de servicio antes de su publicación.",
          ],
        },
      ],
    },
    privacy: {
      title: "Aviso de privacidad",
      status: "Borrador para revisión — aún no publicado",
      introduction:
        "Este aviso conceptual describe la información que maneja la versión local de revisión del sitio de JVF HomeWorks Pro. Debe actualizarse y revisarse legalmente antes del lanzamiento público.",
      sections: [
        {
          title: "Información que proporciona el visitante",
          paragraphs: [
            "El formulario solicita nombre, número de teléfono, correo electrónico, ciudad, código postal, servicio elegido, preferencias de horario y una nota breve no confidencial. Las preguntas específicas pueden tratar sobre un hogar u oficina pequeña, objetivos de decoración, una cita notarial o el formato y duración de una interpretación.",
            "No envíe documentos, números de identificación, expedientes médicos, datos de cuentas financieras ni información legal confidencial. El sitio conceptual no permite subir archivos.",
          ],
        },
        {
          title: "Modo de demostración actual",
          paragraphs: [
            "En modo de demostración, el servidor valida la solicitud y devuelve un resultado realista. Solo registra metadatos anónimos: identificador de envío, idioma de la página, servicio elegido y fecha y hora. No registra el nombre, teléfono, correo, ciudad, código postal ni mensaje del visitante.",
            "El concepto no tiene base de datos de clientes, cuentas, respuesta automática por correo o texto ni entrega de correo de producción. El contenido del formulario no se conserva intencionalmente después de completar la respuesta.",
          ],
        },
        {
          title: "Futuro proveedor de entrega por correo",
          paragraphs: [
            "Antes del lanzamiento, JVF HomeWorks Pro podrá configurar un proveedor de correo para enviar solicitudes validadas al negocio. Este aviso deberá identificar al proveedor, la información enviada, reglas de retención, controles de acceso y un contacto de privacidad activo antes de recopilar datos.",
          ],
        },
        {
          title: "Alojamiento y Web Analytics de Vercel",
          paragraphs: [
            "Está previsto alojar el sitio en Vercel. Su infraestructura puede procesar información técnica necesaria para servir y proteger el sitio. Vercel Web Analytics se incluye para medición agregada enfocada en la privacidad; los valores y el contenido del formulario no se envían como eventos analíticos.",
          ],
        },
        {
          title: "Uso e intercambio",
          paragraphs: [
            "JVF HomeWorks Pro usaría la información solo para comprender, responder, proteger y mejorar las solicitudes. No vendemos los datos del formulario. Solo se compartirían con proveedores necesarios para operar el sitio o cuando la ley lo exija, sujeto a la política final.",
          ],
        },
        {
          title: "Sus opciones y contacto",
          paragraphs: [
            "Puede llamar al (716) 748-9117 o escribir a services.jvf@gmail.com en vez de usar el formulario. La dirección postal pública es 2590 Walnut St, Denver, CO 80205. Antes del lanzamiento se deben aprobar el período final de retención y el proceso de eliminación.",
          ],
        },
      ],
    },
    accessibility: {
      title: "Declaración de accesibilidad",
      status: "Borrador para revisión — aún no publicado",
      introduction:
        "JVF HomeWorks Pro desea que las personas con discapacidades puedan conocer los servicios, navegar el sitio y pedir ayuda con dignidad e independencia.",
      sections: [
        {
          title: "Nuestro objetivo de accesibilidad",
          paragraphs: [
            "El objetivo técnico es cumplir las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2 Nivel AA. Esta declaración describe un esfuerzo continuo de buena fe y no garantiza el cumplimiento legal bajo todas las leyes o circunstancias.",
          ],
        },
        {
          title: "Cómo está diseñado el sitio",
          paragraphs: [
            "El sitio usa encabezados y regiones semánticas, enlace para saltar al contenido, navegación y formularios operables con teclado, foco visible, enlaces descriptivos, campos etiquetados, resumen de errores enlazado, avisos de estado, contraste fuerte, ampliación y reajuste del texto y preferencias de movimiento reducido.",
            "Las páginas están pensadas para lectores de pantalla actuales, zoom del navegador, control por voz, dispositivos de conmutación y uso exclusivo del teclado. El sitio no depende solo del color y no usa una capa ni widget de accesibilidad.",
          ],
        },
        {
          title: "Limitaciones conocidas de esta revisión",
          paragraphs: [
            "La versión actual usa el logotipo y algunas imágenes migradas del sitio existente de JVF HomeWorks Pro. Un perfil de la propietaria, fotografías adicionales y futuros cambios visuales requerirán texto alternativo apropiado y otra revisión de accesibilidad.",
            "Las pruebas automáticas ayudan a encontrar barreras, pero no sustituyen las pruebas manuales con teclado, lector de pantalla, zoom y usuarios. El sitio se volverá a revisar cuando cambien contenidos, integraciones o recursos visuales.",
          ],
        },
        {
          title: "Comentarios y asistencia de accesibilidad",
          paragraphs: [
            "Si una página o formulario es difícil de usar, llame o envíe un mensaje al (716) 748-9117 y describa la página, la tarea y, si se siente cómodo, la tecnología de asistencia o navegador. JVF HomeWorks Pro puede ofrecer información y tomar una solicitud por teléfono.",
            "También puede enviar comentarios de accesibilidad a services.jvf@gmail.com. Se revisarán los comentarios y se harán esfuerzos razonables para ofrecer una alternativa accesible mientras se corrige una barrera.",
          ],
        },
      ],
    },
  },
} satisfies SiteContent;
