import type { SiteContent } from "./types";

export const es = {
  locale: "es",
  reviewStatus: "owner-review-required",
  nav: {
    home: "Inicio",
    services: "Servicios",
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
    title: "Ayuda confiable para los espacios y momentos importantes.",
    summary:
      "JVF Services ofrece limpieza atenta, decoración del hogar, notaría e interpretación español-inglés para clientes en Ohio.",
    primaryCta: "Solicitar cotización",
    secondaryCta: "Explorar servicios",
    availabilityTitle: "Interpretación cuando la necesita",
    availabilityBody:
      "La interpretación español-inglés por teléfono y medios virtuales está disponible las 24 horas. La interpretación en persona está disponible de 8:00 a. m. a 6:00 p. m., hora del Este; después de las 6:00 p. m., el servicio es únicamente virtual.",
    servicesHeading: "Un solo contacto de confianza",
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
      "Comparta algunos detalles prácticos y JVF Services se comunicará para confirmar el siguiente paso adecuado.",
  },
  services: {
    eyebrow: "Servicios",
    title: "Apoyo práctico, brindado con atención.",
    intro:
      "Desde renovar la sensación de su hogar hasta una solicitud urgente de interpretación, JVF Services ofrece ayuda receptiva con expectativas claras y coordinación personal.",
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
      price: "Precio personalizado después de revisar el alcance",
      note: "No se ofrecen trabajos peligrosos ni de riesgo biológico.",
      cta: "Solicitar cotización de limpieza",
    },
    decoration: {
      eyebrow: "Servicios para el hogar",
      title: "Decoración y estilo para el hogar",
      summary:
        "Apoyo cálido y práctico para que una habitación se sienta completa y personal.",
      intro:
        "JVF Services puede ayudar con selección de decoración, organización, estilo y preparación de habitaciones residenciales. Describa el espacio y el ambiente que desea crear para conversar sobre opciones prácticas.",
      features: [
        "Estilo de habitaciones y detalles finales",
        "Apoyo para elegir decoración",
        "Organización de muebles y accesorios",
        "Preparación práctica del espacio",
      ],
      scheduleTitle: "Comience con la habitación y su objetivo",
      scheduleBody:
        "Indique qué habitaciones necesitan atención, qué le gustaría cambiar y cuándo prefiere hacerlo. No se pide presupuesto en la solicitud inicial.",
      price: "Cotización personalizada después de una consulta",
      note:
        "Este es un servicio de decoración y estilo, no un servicio profesional de diseño interior con licencia.",
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
        "La persona firmante debe presentarse en persona con identificación aceptable. JVF Services no ofrece asesoría legal ni elige el acto notarial por el cliente.",
      price:
        "$5 por cada acto notarial presencial; cualquier tarifa de viaje móvil se cotiza y acuerda por adelantado.",
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
      note:
        "Si la línea está ocupada o no recibe respuesta, envíe un mensaje al (716) 748-9117 o solicite una devolución de llamada urgente.",
      cta: "Solicitar intérprete",
    },
  },
  about: {
    eyebrow: "Acerca de JVF Services",
    title: "Un negocio de servicios basado en atención, claridad y cumplimiento.",
    intro:
      "JVF Services apoya a hogares, oficinas pequeñas y clientes de Ohio que necesitan servicios atentos para el hogar o apoyo profesional bilingüe.",
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
    placeholderTitle: "La historia y el retrato de la propietaria se añadirán antes del lanzamiento",
    placeholderBody:
      "Esta versión de revisión no publica el nombre, el retrato, las credenciales ni la historia personal de la propietaria hasta que se verifiquen.",
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
    termsTitle: "Términos y condiciones",
    privacyTitle: "Aviso de privacidad",
    accessibilityTitle: "Declaración de accesibilidad",
    lastUpdated: "Última actualización: 25 de agosto de 2026",
  },
} satisfies SiteContent;
