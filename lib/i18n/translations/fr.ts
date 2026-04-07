import type { Translations } from "./en";

const fr: Translations = {
  nav: {
    about: "À propos",
    experience: "Expérience",
    blog: "Blog",
    contact: "Contact",
    resume: "CV",
    signIn: "Connexion",
    signOut: "Déconnexion",
    admin: "Admin",
  },
  home: {
    overline: "ARCHITECTE UI",
    greeting: "Bonjour, je m'appelle",
    name: "Ankit Pawar",
    tagline: "J'architecte la couche frontend.",
    bio: "Architecte UI avec plus de 8 ans d'expérience dans la conception de systèmes micro-frontend évolutifs, la définition de standards d'ingénierie frontend et la livraison d'interfaces de production qui gèrent de véritables décisions financières. Actuellement à la tête de l'architecture frontend chez Hub — réinventant le modèle opérationnel des services financiers.",
    hubLink: "",
    getInTouch: "Me Contacter",
    readBlog: "Lire le Blog",
  },
  about: {
    overline: "ARCHITECTE UI — PARCOURS DE CARRIÈRE",
    title: "Construire des systèmes, ",
    titleHighlight: "façonner des expériences.",
    subtitle: "8 ans de création d'interfaces à grande échelle — des algorithmes compétitifs aux plateformes de production.",
    milestones: {
      origin: {
        year: "2017",
        badge: "ORIGINE",
        title: "Où les fondations ont été posées",
        content: "La programmation compétitive a affiné la pensée qui guide désormais chaque décision d'architecture. Ambassadeur campus HackerEarth — un signal précoce de leadership avant que le rôle ait un nom.",
        tags: ["pensée algorithmique", "décomposition de problèmes", "communauté"]
      },
      engineer: {
        year: "2018",
        badge: "INGÉNIEUR",
        title: "Fortune 500, de l'intérieur",
        content: "Chez MAQ Software, j'ai construit des applications web d'analyse de données pour certaines des plus grandes entreprises mondiales. J'ai appris ce qu'est une architecture frontend résiliente et évolutive sous contraintes d'entreprise.",
        tags: ["full stack", "data viz", "échelle entreprise"]
      },
      teamLead: {
        year: "2020",
        badge: "CHEF D'ÉQUIPE",
        title: "Diriger la construction chez Meddo Health",
        content: "J'ai pris le rôle de chef d'équipe frontend et guidé le développement d'une plateforme e-commerce de santé pour le marché indien — un domaine où les décisions UX ont de vraies conséquences humaines.",
        tags: ["leadership", "UX santé", "e-commerce"]
      },
      architect: {
        year: "2022",
        badge: "ARCHITECTE",
        title: "Plateformes qui bougent argent et actifs",
        content: "Contribué comme ingénieur UI à une plateforme de gestion d'actifs chez HUB et une plateforme de gestion d'investissements chez Syfe — des produits à enjeux élevés où les décisions d'interface influencent directement les résultats financiers.",
        tags: ["fintech", "gestion d'actifs", "UX investissement", "UI haute responsabilité"]
      },
      present: {
        year: "Maintenant",
        badge: "PRÉSENT",
        title: "Capitaliser les connaissances en savoir-faire",
        content: "Huit ans entre startups, scale-ups et entreprises Fortune 500. Le fil conducteur : construire des systèmes que les humains utilisent vraiment — des algorithmes compétitifs aux plateformes financières.",
        tags: ["design système", "systèmes de design", "architecture frontend"]
      }
    },
    stats: {
      years: { value: "8", label: "ans de développement" },
      domains: { value: "4+", label: "domaines de plateforme" },
      enterprise: { value: "F500", label: "exposition entreprise" }
    }
  },
  experience: {
    overline: "EMPREINTE D'INGÉNIERIE",
    title: "Où j'ai",
    titleHighlight: "Travaillé",
    subtitle: "Une chronologie de mon parcours professionnel — appuyez sur un rôle pour le développer.",
    present: "Présent",
    current: "Actuel",
    jobs: [
      {
        id: "hub-lead",
        company: "HUB",
        designation: "Ingénieur Logiciel Principal / Architecte UI",
        location: "Gurugram",
        startDate: "Août 2022",
        endDate: null,
        link: "https://hub.com",
        logo: "/images/companies/hub.png",
        shortDescription: "Promu chef technique frontend de facto pour l'organisation. Architecturé des systèmes micro-frontend évolutifs et travaillé directement avec le CTO, CPO et Responsable Produit.",
        details: [
          "Architecturé des systèmes micro-frontend avec ReactJS et Webpack Module Federation",
          "Construit et maintenu une bibliothèque de composants Storybook interne adoptée par 5+ équipes produit",
          "Conçu des workflows pour la génération automatisée de composants UI, réduisant le temps de développement de 35%",
          "Construit un serveur MCP pour la bibliothèque de composants interne",
          "Dirigé l'optimisation des performances avec Google Lighthouse et Core Web Vitals",
          "Géré les pipelines CI/CD GitLab et la configuration Octopus Deploy",
          "Mentoré des ingénieurs dans plusieurs équipes, construisant une culture frontend centrée sur la qualité du code"
        ],
        skills: ["ReactJS", "TypeScript", "Micro Frontends", "Webpack Module Federation", "Storybook", "MCP", "GitLab CI/CD", "WCAG 2.1"]
      },
      {
        id: "hub-senior",
        company: "HUB",
        designation: "Ingénieur Logiciel Senior (Frontend)",
        location: "Gurugram",
        startDate: "Août 2022",
        endDate: "2023",
        link: "https://hub.com",
        logo: "/images/companies/hub.png",
        shortDescription: "Première recrue frontend. Construit la plateforme Trade Connect de zéro, établissant l'architecture, la culture de tests et les fondations DevOps.",
        details: [
          "Dirigé le développement UI de Trade Connect depuis zéro, atteignant 80% de couverture de tests",
          "Créé des POCs pour des technologies émergentes dont Microsoft CCF",
          "Géré la configuration et le débogage des pipelines pour des déploiements fiables"
        ],
        skills: ["ReactJS", "Jest", "React Testing Library", "DevOps", "Microsoft CCF"]
      },
      {
        id: "syfe",
        company: "Syfe",
        designation: "Ingénieur Développement Logiciel II",
        location: "Gurugram",
        startDate: "Mars 2022",
        endDate: "Juil 2022",
        link: "https://syfe.com",
        logo: "/images/companies/syfe.png",
        shortDescription: "Contribué à la plateforme de gestion d'investissements de Syfe, améliorant les performances et l'efficacité CI/CD.",
        details: [
          "Amélioré les performances du site marketing avec Ruby on Rails, réduisant le temps de chargement de 30%",
          "Amélioré le temps d'exécution du pipeline Jenkins en intégrant le cache npm"
        ],
        skills: ["Ruby on Rails", "Jenkins", "Optimisation des Performances", "CI/CD"]
      },
      {
        id: "meddo",
        company: "Meddo Health",
        designation: "Chef d'Équipe – Développement Frontend",
        location: "Gurugram",
        startDate: "Nov 2020",
        endDate: "Fév 2022",
        link: "https://meddo.in",
        logo: "/images/companies/meddo.png",
        shortDescription: "Premier rôle de leadership — dirigé l'équipe frontend dans une startup e-commerce de santé pour le marché indien.",
        details: [
          "Dirigé la migration de ReactJS vers Next.js, augmentant le taux de clics de 2%",
          "Développé un module de télésanté COVID-19 qui a augmenté les ventes de 20%"
        ],
        skills: ["Next.js", "ReactJS", "SSR", "SEO", "Leadership", "Santé"]
      },
      {
        id: "maq",
        company: "MAQ Software",
        designation: "Ingénieur Logiciel",
        location: "Hyderabad",
        startDate: "Avr 2018",
        endDate: "Oct 2020",
        link: "https://maqsoftware.com",
        logo: "/images/companies/maqsoftware.png",
        shortDescription: "Ingénieur full-stack développant des applications web d'analyse de données pour des clients Fortune 500. Pionnier de l'architecture micro-frontend dans l'entreprise.",
        details: [
          "Implémenté une architecture micro-frontend supportant AngularJS et React",
          "Fourni une formation d'intégration et automatisé les processus de déploiement"
        ],
        skills: ["ReactJS", "AngularJS", "Micro Frontends", "ASP.NET", "Fortune 500", "Analyse de Données"]
      },
      {
        id: "hackerearth",
        company: "HackerEarth",
        designation: "Ambassadeur Campus",
        location: "Université",
        startDate: "Fév 2017",
        endDate: "Mai 2018",
        link: "https://www.hackerearth.com/",
        logo: "/images/companies/hackerearth.png",
        shortDescription: "L'histoire des origines. La programmation compétitive a affiné la pensée algorithmique qui guide chaque décision d'architecture aujourd'hui.",
        details: [
          "Organisé des hackathons et concours de programmation réguliers",
          "Promu une culture de programmation compétitive sur le campus universitaire"
        ],
        skills: ["Programmation Compétitive", "Construction Communauté", "Hackathons"]
      }
    ]
  },
  blog: {
    overline: "OBSERVATIONS TECHNIQUES",
    title: "Blog",
    subtitle:
      "Articles techniques, tutoriels et réflexions sur le développement logiciel.",
    comingSoon: "Bientôt Disponible",
    comingSoonText:
      "Je travaille sur du contenu génial. Restez à l'écoute !",
    backToBlog: "Retour au Blog",
    allPosts: "Tous les Articles",
  },
  contact: {
    overline: "DISCUTONS",
    title: "Discutons",
    titleHighlight: "",
    subtitle:
      "Vous avez un projet en tête ou vous voulez simplement dire bonjour 👋🏻 ? Écrivez-moi sans hésiter.",
    emailLabel: "Votre email",
    emailPlaceholder: "vous@exemple.com",
    subjectLabel: "Sujet",
    subjectPlaceholder: "Dites-moi comment je peux vous aider",
    messageLabel: "Message",
    messagePlaceholder: "Écrivez votre message ici...",
    sendMessage: "Envoyer le message",
  },
  footer: {
    role: "Architecte UI",
  },
};

export default fr;
