import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Ankit Pawar's professional experience and career timeline.",
};

const experiences = [
  {
    company: "HUB",
    designation: "Software Engineer",
    description:
      "Working as UI Engineer in Individual Contributor capacity building asset management platform.",
    startDate: "August 2022",
    endDate: null,
    link: "https://hub.com",
  },
  {
    company: "Syfe",
    designation: "SDE - II",
    description:
      "Worked as a Mid-level UI Engineer building investment management platform.",
    startDate: "March 2022",
    endDate: "July 2022",
    link: "https://syfe.com",
  },
  {
    company: "Meddo Health",
    designation: "Team Lead — Frontend Development",
    description:
      "Leading the frontend development effort at Healthcare E-commerce company catering to primary and secondary healthcare market in India.",
    startDate: "November 2020",
    endDate: "February 2022",
    link: "https://meddo.in",
  },
  {
    company: "MAQ Software",
    designation: "Software Engineer",
    description:
      "Full Stack Software Engineer building web applications for Fortune 500 clients in data analytics and services domain.",
    startDate: "April 2018",
    endDate: "October 2020",
    link: "https://maqsoftware.com",
  },
  {
    company: "HackerEarth",
    designation: "Campus Ambassador",
    description:
      "Conducted hackathons on the Hackerearth platform on a regular basis and worked towards promoting a competitive coding environment in my University Campus.",
    startDate: "February 2017",
    endDate: "May 2018",
    link: "https://www.hackerearth.com/",
  },
];

export default function Experience() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <div className="animate-fade-in-up mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-surface-50 mb-4">
          Where I&apos;ve{" "}
          <span className="gradient-text">Worked</span>
        </h1>
        <p className="text-surface-400 text-lg">
          A timeline of my professional journey in software development.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-surface-700 to-transparent" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.startDate}`}
              className="animate-fade-in-up relative pl-12"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-[9px] top-2 w-3 h-3 rounded-full border-2 ${
                  exp.endDate === null
                    ? "bg-accent-500 border-accent-400 shadow-lg shadow-accent-500/30"
                    : "bg-surface-800 border-surface-600"
                }`}
              />

              {/* Card */}
              <div className="p-6 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-surface-700 transition-all duration-300 hover:shadow-lg hover:shadow-surface-950/50">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-mono tracking-wider text-surface-500">
                    {exp.startDate} — {exp.endDate ?? "Present"}
                  </span>
                  {!exp.endDate && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-accent-500/10 text-accent-400 border border-accent-500/20">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-surface-100 mb-1">
                  {exp.designation}
                </h3>
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors inline-flex items-center gap-1"
                >
                  {exp.company}
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <p className="mt-3 text-surface-400 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
