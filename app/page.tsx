import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
      <div className="animate-fade-in-up">
        <p className="text-primary-400 font-mono text-sm mb-4 tracking-wider">
          Hello, my name is
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-surface-50 leading-[1.1]">
          Ankit Pawar.
        </h1>
        <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-surface-500 leading-tight">
          I build things for the web.
        </h2>
      </div>

      <div className="animate-fade-in-up animate-delay-200 mt-8 max-w-2xl">
        <p className="text-surface-400 text-lg leading-relaxed">
          I&apos;m a self-taught software developer who loves to write clean,
          reusable, and optimised code. Web development is my forte. I have
          experience in both Open Source and Microsoft stack for development of
          scalable, responsive web applications. Currently helping build{" "}
          <a
            href="https://hub.com"
            target="_blank"
            rel="noreferrer"
            className="text-primary-400 hover:text-primary-300 underline underline-offset-4 transition-colors"
          >
            Hub — reinventing the financial services operating model.
          </a>
        </p>
      </div>

      <div className="animate-fade-in-up animate-delay-300 mt-12 flex flex-wrap gap-4">
        <a
          href="mailto:iamankitpawar@gmail.com"
          className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary-600/25"
        >
          Get In Touch
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 border border-surface-700 hover:border-primary-500/50 text-surface-300 hover:text-primary-400 font-medium rounded-lg transition-all duration-200"
        >
          Read My Blog
        </Link>
      </div>
    </section>
  );
}
