import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Ankit Pawar's software development journey.",
};

const milestones = [
  {
    title: "Early Steps",
    content:
      "My journey began in 2017 when I discovered competitive programming. This arena honed my analytical thinking and kindled my love for algorithmic challenges. During this time, I had the privilege of becoming a campus ambassador for HackerEarth, which further solidified my connection to the tech community.",
  },
  {
    title: "Diverse Experience",
    content:
      "My journey has been diverse and enriching. From startups to Fortune 500 companies, I've embraced the spectrum of software development experiences. I've worked with large and small development teams, navigated projects with and without constraints, and learned from both small startups and corporate giants.",
  },
  {
    title: "Crafting Solutions",
    content:
      "As a UI Engineer at HUB, I've played a vital role in building an asset management platform, making individual contributions that matter. During my tenure at Syfe, I contributed as a Mid-level UI Engineer, actively shaping an investment management platform.",
  },
  {
    title: "Leading and Building",
    content:
      "At Meddo Health, I led the frontend development effort as a Team Lead. This role allowed me to guide the development of an e-commerce platform catering to India's healthcare market.",
  },
  {
    title: "Fortifying Skills",
    content:
      "As a Full Stack Software Engineer at MAQ Software, I honed my skills by developing web applications for Fortune 500 clients in data analytics and services.",
  },
  {
    title: "The Continuing Journey",
    content:
      "Presently, I'm dedicated to continuous learning. I aim to expand my skill set and utilize new knowledge to contribute positively to our world.",
  },
];

export default function About() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-surface-50 mb-4">
          Ankit&apos;s Software{" "}
          <span className="gradient-text">Journey</span>
        </h1>
        <p className="text-surface-400 text-lg leading-relaxed max-w-2xl mb-12">
          Hello! My name is Ankit. Since my first encounter with computers,
          I&apos;ve been captivated by their potential. The intersection of this
          fascination and my knack for problem-solving led me to the world of
          software development, a space I&apos;m deeply passionate about.
        </p>
      </div>

      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.title}
            className="animate-fade-in-up group relative pl-8 border-l-2 border-surface-800 hover:border-primary-500/50 transition-colors duration-300"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-surface-800 border-2 border-surface-600 group-hover:border-primary-500 group-hover:bg-primary-500/20 transition-all duration-300" />
            <h2 className="text-xl font-bold text-surface-200 mb-2">
              {milestone.title}
            </h2>
            <p className="text-surface-400 leading-relaxed">
              {milestone.content}
            </p>
          </div>
        ))}
      </div>

      <div className="animate-fade-in-up animate-delay-400 mt-12 p-6 rounded-xl bg-surface-900/50 border border-surface-800">
        <p className="text-surface-400 leading-relaxed">
          My journey in software development has been dynamic, rewarding, and
          filled with learning experiences. With each opportunity, I&apos;ve grown
          both as a developer and as an individual. I&apos;m excited for the
          future as I continue to explore, innovate, and contribute to the
          ever-evolving technology landscape.
        </p>
      </div>
    </section>
  );
}
