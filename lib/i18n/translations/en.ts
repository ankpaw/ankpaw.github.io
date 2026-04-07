export interface Job {
  id: string;
  company: string;
  designation: string;
  location: string;
  startDate: string;
  endDate: string | null;
  link: string;
  logo: string;
  shortDescription: string;
  details: string[];
  skills: string[];
}

export interface Translations {
  nav: {
    about: string;
    experience: string;
    blog: string;
    contact: string;
    resume: string;
    signIn: string;
    signOut: string;
    admin: string;
  };
  home: {
    overline: string;
    greeting: string;
    name: string;
    tagline: string;
    bio: string;
    hubLink: string;
    getInTouch: string;
    readBlog: string;
  };
  about: {
    overline: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    milestones: {
      origin: { year: string; badge: string; title: string; content: string; tags: string[] };
      engineer: { year: string; badge: string; title: string; content: string; tags: string[] };
      teamLead: { year: string; badge: string; title: string; content: string; tags: string[] };
      architect: { year: string; badge: string; title: string; content: string; tags: string[] };
      present: { year: string; badge: string; title: string; content: string; tags: string[] };
    };
    stats: {
      years: { value: string; label: string };
      domains: { value: string; label: string };
      enterprise: { value: string; label: string };
    };
  };
  experience: {
    overline: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    present: string;
    current: string;
    jobs: Job[];
  };
  blog: {
    overline: string;
    title: string;
    subtitle: string;
    comingSoon: string;
    comingSoonText: string;
    backToBlog: string;
    allPosts: string;
  };
  contact: {
    overline: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendMessage: string;
  };
  footer: {
    role: string;
  };
}

const en: Translations = {
  nav: {
    about: "About",
    experience: "Experience",
    blog: "Blog",
    contact: "Contact",
    resume: "Resume",
    signIn: "Sign In",
    signOut: "Sign Out",
    admin: "Admin",
  },
  home: {
    overline: "UI ARCHITECT",
    greeting: "Hello, my name is",
    name: "Ankit Pawar",
    tagline: "I architect the frontend layer.",
    bio: "Results-driven UI Architect with 8+ years designing scalable micro-frontend systems, defining front-end engineering standards, and shipping production interfaces that handle real financial decisions. Currently leading front-end architecture at Hub — reinventing the financial services operating model.",
    hubLink: "",
    getInTouch: "Get In Touch",
    readBlog: "Read My Blog",
  },
  about: {
    overline: "UI Architect — Career Timeline",
    title: "Building systems, ",
    titleHighlight: "shaping experiences.",
    subtitle: "8 years of crafting interfaces at scale — from competitive algorithms to production platforms.",
    milestones: {
      origin: {
        year: "2017",
        badge: "ORIGIN",
        title: "Where the foundation was poured",
        content: "Competitive programming sharpened the thinking that now drives every architecture decision. Served as HackerEarth campus ambassador — an early signal of leadership before the role had a name.",
        tags: ["algorithmic thinking", "problem decomposition", "community"]
      },
      engineer: {
        year: "2018",
        badge: "ENGINEER",
        title: "Fortune 500, from the inside",
        content: "At MAQ Software, built data analytics web applications for some of the world's largest companies. Learned what resilient, scalable frontend architecture looks like under enterprise constraints — and what breaks when it doesn't exist.",
        tags: ["full stack", "data viz", "enterprise scale"]
      },
      teamLead: {
        year: "2020",
        badge: "TEAM LEAD",
        title: "Leading the build at Meddo Health",
        content: "Stepped into a frontend team lead role and guided the development of a healthcare e-commerce platform for the Indian market — a domain where UX decisions carry real human consequence. Led people, not just pixels.",
        tags: ["team leadership", "healthcare UX", "e-commerce"]
      },
      architect: {
        year: "2022",
        badge: "ARCHITECT",
        title: "Platforms that move money & assets",
        content: "Contributed as a UI engineer to an asset management platform at HUB and an investment management platform at Syfe — high-stakes products where interface decisions directly influence financial outcomes. Precision, trust, and performance were table stakes.",
        tags: ["fintech", "asset management", "investment UX", "high-stakes UI"]
      },
      present: {
        year: "Now",
        badge: "PRESENT",
        title: "Compounding knowledge into craft",
        content: "Eight years across startups, scale-ups, and Fortune 500 companies. The through-line: building systems that humans actually use — from competitive algorithms to financial platforms. The next chapter is architecture at the intersection of complexity and clarity.",
        tags: ["system design", "design systems", "frontend architecture"]
      }
    },
    stats: {
      years: { value: "8", label: "years building" },
      domains: { value: "4+", label: "platform domains" },
      enterprise: { value: "F500", label: "enterprise exposure" }
    }
  },
  experience: {
    overline: "ENGINEERING FOOTPRINT",
    title: "Where I've",
    titleHighlight: "Worked",
    subtitle: "A timeline of my professional journey — tap any role to expand.",
    present: "Present",
    current: "Current",
    jobs: [
      {
        id: "hub-lead",
        company: "HUB",
        designation: "Lead Software Engineer / UI Architect",
        location: "Gurugram",
        startDate: "Aug 2022",
        endDate: null,
        link: "https://hub.com",
        logo: "/images/companies/hub.png",
        shortDescription: "Promoted to de-facto front-end technical lead for the org. Architected scalable micro-frontend systems, defined engineering standards, and worked directly with CTO, CPO, and Head of Product to align technical initiatives with business outcomes.",
        details: [
          "Architected micro-frontend systems using ReactJS and Webpack Module Federation — enabling multiple teams to independently ship AI-generated UIs at scale",
          "Built and maintained an internal Storybook component library (Material UI) adopted across 5+ product teams, eliminating duplication",
          "Designed custom workflows for automated UI component generation, cutting development time by 35% in 4 months",
          "Built an MCP server for the internal component library, enabling AI-assisted component discovery and integration",
          "Led performance optimization using Google Lighthouse and Core Web Vitals, achieving measurable page speed gains",
          "Owned GitLab CI/CD pipeline setup, Octopus Deploy configuration, and front-end observability improvements",
          "Mentored engineers across teams, building a front-end culture centred on code quality and modern practices"
        ],
        skills: ["ReactJS", "TypeScript", "Micro Frontends", "Webpack Module Federation", "Storybook", "MCP", "GitLab CI/CD", "WCAG 2.1"]
      },
      {
        id: "hub-senior",
        company: "HUB",
        designation: "Senior Software Engineer (Frontend)",
        location: "Gurugram",
        startDate: "Aug 2022",
        endDate: "2023",
        link: "https://hub.com",
        logo: "/images/companies/hub.png",
        shortDescription: "Joined as the first front-end hire and built the Trade Connect platform from scratch — establishing architecture, testing culture, and DevOps foundations before being promoted to UI Architect.",
        details: [
          "Led UI development for Trade Connect from zero, achieving 80% test coverage with React Testing Library and Jest",
          "Created POCs for emerging technologies including Microsoft CCF, evaluating feasibility and presenting architectural recommendations",
          "Managed pipeline setup, maintenance, and debugging to ensure reliable, consistent deployments"
        ],
        skills: ["ReactJS", "Jest", "React Testing Library", "DevOps", "Microsoft CCF"]
      },
      {
        id: "syfe",
        company: "Syfe",
        designation: "Software Development Engineer II",
        location: "Gurugram",
        startDate: "Mar 2022",
        endDate: "Jul 2022",
        link: "https://syfe.com",
        logo: "/images/companies/syfe.png",
        shortDescription: "Contributed to Syfe's investment management platform — a fintech product where performance directly impacts user trust and financial decisions. Focused on measurable improvements in both page speed and CI/CD efficiency.",
        details: [
          "Enhanced marketing website performance using Ruby on Rails, reducing page load time by 30% through asset optimization",
          "Improved Jenkins CI/CD pipeline runtime by incorporating npm caching, accelerating build cycles and developer feedback loops"
        ],
        skills: ["Ruby on Rails", "Jenkins", "Performance Optimization", "CI/CD"]
      },
      {
        id: "meddo",
        company: "Meddo Health",
        designation: "Team Lead – Frontend Development",
        location: "Gurugram",
        startDate: "Nov 2020",
        endDate: "Feb 2022",
        link: "https://meddo.in",
        logo: "/images/companies/meddo.png",
        shortDescription: "First leadership role — led the frontend team at a healthcare e-commerce startup serving India's primary and secondary care market. Shipped impactful features under tight timelines while managing and mentoring the team.",
        details: [
          "Led migration from ReactJS to Next.js, boosting click-through rate by 2% through SSR performance gains and SEO improvements",
          "Developed a COVID-19 telehealth module that increased product sales by 20%, coordinating with product and backend teams for rapid delivery"
        ],
        skills: ["Next.js", "ReactJS", "SSR", "SEO", "Team Leadership", "Healthcare"]
      },
      {
        id: "maq",
        company: "MAQ Software",
        designation: "Software Engineer",
        location: "Hyderabad",
        startDate: "Apr 2018",
        endDate: "Oct 2020",
        link: "https://maqsoftware.com",
        logo: "/images/companies/maqsoftware.png",
        shortDescription: "Full-stack engineer building data analytics web applications for Fortune 500 clients. Pioneered micro-frontend architecture at the company and took on onboarding and process improvement responsibilities early in tenure.",
        details: [
          "Implemented micro-frontend architecture supporting both AngularJS and React — one of the first at the company to pioneer this pattern",
          "Provided onboarding training to new hires and automated deployment processes, improving team ramp-up time and release reliability"
        ],
        skills: ["ReactJS", "AngularJS", "Micro Frontends", "ASP.NET", "Fortune 500", "Data Analytics"]
      },
      {
        id: "hackerearth",
        company: "HackerEarth",
        designation: "Campus Ambassador",
        location: "University",
        startDate: "Feb 2017",
        endDate: "May 2018",
        link: "https://www.hackerearth.com/",
        logo: "/images/companies/hackerearth.png",
        shortDescription: "The origin story. Competitive programming sharpened algorithmic thinking that still drives every architecture decision today. Built and ran a coding community on campus before \"technical leadership\" was even a label that applied.",
        details: [
          "Conducted regular hackathons and coding contests on the HackerEarth platform",
          "Promoted a competitive programming culture across the university campus"
        ],
        skills: ["Competitive Programming", "Community Building", "Hackathons"]
      }
    ]
  },
  blog: {
    overline: "TECHNICAL OBSERVATIONS",
    title: "Blog",
    subtitle:
      "Technical write-ups, tutorials, and thoughts on software development.",
    comingSoon: "Coming Soon",
    comingSoonText: "I'm working on some great content. Stay tuned!",
    backToBlog: "Back to Blog",
    allPosts: "All Posts",
  },
  contact: {
    overline: "REACH OUT",
    title: "Get In",
    titleHighlight: "Touch",
    subtitle:
      "Have a project in mind or just want to say Hi 👋🏻? Feel free to get in touch.",
    emailLabel: "Your Email",
    emailPlaceholder: "you@example.com",
    subjectLabel: "Subject",
    subjectPlaceholder: "Let me know how I can help",
    messageLabel: "Message",
    messagePlaceholder: "Write your message here...",
    sendMessage: "Send Message",
  },
  footer: {
    role: "Software Developer",
  },
};

export default en;
