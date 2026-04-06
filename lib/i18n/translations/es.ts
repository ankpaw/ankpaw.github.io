import type { Translations } from "./en";

const es: Translations = {
  nav: {
    about: "Acerca de",
    experience: "Experiencia",
    blog: "Blog",
    contact: "Contacto",
    resume: "Currículum",
    signIn: "Iniciar Sesión",
    signOut: "Cerrar Sesión",
    admin: "Admin",
  },
  home: {
    overline: "INGENIERO DE SOFTWARE",
    greeting: "Hola, mi nombre es",
    name: "Ankit Pawar",
    tagline: "Construyo cosas para la web.",
    bio: "Soy un desarrollador de software autodidacta al que le encanta escribir código limpio, reutilizable y optimizado. El desarrollo web es mi especialidad. Tengo experiencia tanto en la pila de Open Source como en la de Microsoft para el desarrollo de aplicaciones web escalables y responsivas. Actualmente estoy ayudando a construir",
    hubLink: "Hub — reinventando el modelo operativo de los servicios financieros.",
    getInTouch: "Contáctame",
    readBlog: "Leer Mi Blog",
  },
  about: {
    overline: "MI TRAYECTORIA",
    title: "Building systems, ",
    titleHighlight: "shaping experiences.",
    subtitle: "8 años creando interfaces a escala — desde algoritmos competitivos hasta plataformas en producción.",
    milestones: {
      origin: {
        year: "2017",
        badge: "ORIGEN",
        title: "Donde se pusieron las bases",
        content: "La programación competitiva agudizó el pensamiento que ahora impulsa cada decisión de arquitectura. Embajador de campus en HackerEarth — una señal temprana de liderazgo antes de que tuviera nombre.",
        tags: ["pensamiento algorítmico", "descomposición de problemas", "comunidad"]
      },
      engineer: {
        year: "2018",
        badge: "INGENIERO",
        title: "Fortune 500, desde adentro",
        content: "En MAQ Software, construí aplicaciones web de análisis de datos para algunas de las empresas más grandes del mundo. Aprendí cómo se ve la arquitectura frontend resiliente y escalable bajo restricciones empresariales.",
        tags: ["full stack", "visualización de datos", "escala empresarial"]
      },
      teamLead: {
        year: "2020",
        badge: "LÍDER DE EQUIPO",
        title: "Liderando la construcción en Meddo Health",
        content: "Asumí el rol de líder del equipo frontend y guié el desarrollo de una plataforma de e-commerce de salud para el mercado indio — un dominio donde las decisiones de UX tienen consecuencias humanas reales.",
        tags: ["liderazgo", "UX de salud", "e-commerce"]
      },
      architect: {
        year: "2022",
        badge: "ARQUITECTO",
        title: "Plataformas que mueven dinero y activos",
        content: "Contribuí como ingeniero de UI a una plataforma de gestión de activos en HUB y una plataforma de gestión de inversiones en Syfe — productos de alto impacto donde las decisiones de interfaz influyen directamente en resultados financieros.",
        tags: ["fintech", "gestión de activos", "UX de inversiones", "UI de alto impacto"]
      },
      present: {
        year: "Hoy",
        badge: "PRESENTE",
        title: "Acumulando conocimiento en oficio",
        content: "Ocho años entre startups, scale-ups y empresas Fortune 500. El hilo conductor: construir sistemas que los humanos realmente usan — desde algoritmos competitivos hasta plataformas financieras.",
        tags: ["diseño de sistemas", "design systems", "arquitectura frontend"]
      }
    },
    stats: {
      years: { value: "8", label: "años construyendo" },
      domains: { value: "4+", label: "dominios de plataforma" },
      enterprise: { value: "F500", label: "exposición empresarial" }
    }
  },
  experience: {
    overline: "HUELLA DE INGENIERÍA",
    title: "Donde he",
    titleHighlight: "Trabajado",
    subtitle: "Una línea temporal de mi trayectoria profesional — toca cualquier rol para expandir.",
    present: "Presente",
    current: "Actual",
    jobs: [
      {
        id: "hub-lead",
        company: "HUB",
        designation: "Ingeniero de Software Principal / Arquitecto UI",
        location: "Gurugram",
        startDate: "Ago 2022",
        endDate: null,
        link: "https://hub.com",
        logo: "/images/companies/hub.png",
        shortDescription: "Promovido a líder técnico de facto de frontend para la organización. Arquitecté sistemas micro-frontend escalables y trabajé directamente con el CTO, CPO y Jefe de Producto.",
        details: [
          "Arquitecté sistemas micro-frontend usando ReactJS y Webpack Module Federation",
          "Construí y mantuve una librería de componentes Storybook interna adoptada por 5+ equipos de producto",
          "Diseñé flujos de trabajo para generación automatizada de componentes UI, reduciendo tiempo de desarrollo en 35%",
          "Construí un servidor MCP para la librería de componentes interna",
          "Lideré optimización de rendimiento usando Google Lighthouse y Core Web Vitals",
          "Gestioné pipelines CI/CD en GitLab y configuración de Octopus Deploy",
          "Mentoré ingenieros en múltiples equipos, construyendo una cultura de frontend centrada en calidad de código"
        ],
        skills: ["ReactJS", "TypeScript", "Micro Frontends", "Webpack Module Federation", "Storybook", "MCP", "GitLab CI/CD", "WCAG 2.1"]
      },
      {
        id: "hub-senior",
        company: "HUB",
        designation: "Ingeniero de Software Senior (Frontend)",
        location: "Gurugram",
        startDate: "Ago 2022",
        endDate: "2023",
        link: "https://hub.com",
        logo: "/images/companies/hub.png",
        shortDescription: "Primera contratación de frontend. Construí la plataforma Trade Connect desde cero, estableciendo arquitectura, cultura de pruebas y fundamentos DevOps.",
        details: [
          "Lideré el desarrollo UI de Trade Connect desde cero, alcanzando 80% de cobertura de pruebas",
          "Creé POCs para tecnologías emergentes incluyendo Microsoft CCF",
          "Gestioné configuración y depuración de pipelines para despliegues confiables"
        ],
        skills: ["ReactJS", "Jest", "React Testing Library", "DevOps", "Microsoft CCF"]
      },
      {
        id: "syfe",
        company: "Syfe",
        designation: "Ingeniero de Desarrollo de Software II",
        location: "Gurugram",
        startDate: "Mar 2022",
        endDate: "Jul 2022",
        link: "https://syfe.com",
        logo: "/images/companies/syfe.png",
        shortDescription: "Contribuí a la plataforma de gestión de inversiones de Syfe, mejorando el rendimiento y la eficiencia del CI/CD.",
        details: [
          "Mejoré el rendimiento del sitio web usando Ruby on Rails, reduciendo el tiempo de carga en 30%",
          "Mejoré el tiempo de ejecución del pipeline Jenkins incorporando caché de npm"
        ],
        skills: ["Ruby on Rails", "Jenkins", "Optimización de Rendimiento", "CI/CD"]
      },
      {
        id: "meddo",
        company: "Meddo Health",
        designation: "Líder de Equipo – Desarrollo Frontend",
        location: "Gurugram",
        startDate: "Nov 2020",
        endDate: "Feb 2022",
        link: "https://meddo.in",
        logo: "/images/companies/meddo.png",
        shortDescription: "Primer rol de liderazgo — lideré el equipo frontend en una startup de e-commerce de salud para el mercado indio.",
        details: [
          "Lideré la migración de ReactJS a Next.js, aumentando el click-through rate en 2%",
          "Desarrollé un módulo de telesalud COVID-19 que aumentó las ventas en 20%"
        ],
        skills: ["Next.js", "ReactJS", "SSR", "SEO", "Liderazgo", "Salud"]
      },
      {
        id: "maq",
        company: "MAQ Software",
        designation: "Ingeniero de Software",
        location: "Hyderabad",
        startDate: "Abr 2018",
        endDate: "Oct 2020",
        link: "https://maqsoftware.com",
        logo: "/images/companies/maqsoftware.png",
        shortDescription: "Ingeniero full-stack construyendo aplicaciones web de análisis de datos para clientes Fortune 500. Pionero en arquitectura micro-frontend en la empresa.",
        details: [
          "Implementé arquitectura micro-frontend compatible con AngularJS y React",
          "Proporcioné capacitación de incorporación y automaticé procesos de despliegue"
        ],
        skills: ["ReactJS", "AngularJS", "Micro Frontends", "ASP.NET", "Fortune 500", "Análisis de Datos"]
      },
      {
        id: "hackerearth",
        company: "HackerEarth",
        designation: "Embajador de Campus",
        location: "Universidad",
        startDate: "Feb 2017",
        endDate: "May 2018",
        link: "https://www.hackerearth.com/",
        logo: "/images/companies/hackerearth.png",
        shortDescription: "La historia de origen. La programación competitiva agudizó el pensamiento algorítmico que impulsa cada decisión de arquitectura hoy.",
        details: [
          "Realicé hackathons y concursos de programación regulares",
          "Promoví una cultura de programación competitiva en el campus universitario"
        ],
        skills: ["Programación Competitiva", "Construcción de Comunidad", "Hackathons"]
      }
    ]
  },
  blog: {
    overline: "OBSERVACIONES TÉCNICAS",
    title: "Blog",
    subtitle:
      "Artículos técnicos, tutoriales y reflexiones sobre desarrollo de software.",
    comingSoon: "Próximamente",
    comingSoonText:
      "Estoy trabajando en contenido genial. ¡Mantente al tanto!",
    backToBlog: "Volver al Blog",
    allPosts: "Todos los Artículos",
  },
  contact: {
    overline: "PONERSE EN CONTACTO",
    title: "Ponte en",
    titleHighlight: "Contacto",
    subtitle:
      "¿Tienes un proyecto en mente o solo quieres decir hola 👋🏻? No dudes en contactarme.",
    emailLabel: "Tu Email",
    emailPlaceholder: "tu@ejemplo.com",
    subjectLabel: "Asunto",
    subjectPlaceholder: "Dime cómo puedo ayudarte",
    messageLabel: "Mensaje",
    messagePlaceholder: "Escribe tu mensaje aquí...",
    sendMessage: "Enviar Mensaje",
  },
  footer: {
    role: "Desarrollador de Software",
  },
};

export default es;
