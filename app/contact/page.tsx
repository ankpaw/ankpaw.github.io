import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ankit Pawar.",
};

export default function Contact() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-20">
      <div className="animate-fade-in-up text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-surface-50 mb-4">
          Get In <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-surface-400 text-lg max-w-md mx-auto">
          Have a project in mind or just want to say Hi 👋🏻? Feel free to get in
          touch using the form below.
        </p>
      </div>

      <form
        action="mailto:iamankitpawar@gmail.com"
        className="animate-fade-in-up animate-delay-200 space-y-6"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-surface-300 mb-2"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 bg-surface-900 border border-surface-700 rounded-lg text-surface-100 placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-surface-300 mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Let me know how I can help"
            required
            className="w-full px-4 py-3 bg-surface-900 border border-surface-700 rounded-lg text-surface-100 placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-surface-300 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Write your message here..."
            className="w-full px-4 py-3 bg-surface-900 border border-surface-700 rounded-lg text-surface-100 placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary-600/25 flex items-center justify-center gap-2"
        >
          Send Message
          <svg
            className="w-4 h-4"
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
        </button>
      </form>
    </section>
  );
}
