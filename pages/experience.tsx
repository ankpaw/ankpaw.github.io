import React from "react";
/* This is the experience page
 * @return {JSX.Element}: The JSX code for experience page.
 */
const Experience = () => {
  const experiences = [
    {
      company: "HUB",
      description:
        "Working as UI Engineer in Individual Contributor capacity building asset management platform.",
      designation: "Software Engineer",
      endDate: null,
      link: "https://hub.com",
      startDate: "August 2022",
    },
    {
      company: "Syfe",
      description:
        "Worked as a Mid-level UI Engineer building investment management platform.",
      designation: "SDE - II",
      endDate: "July 2022",
      link: "https://syfe.com",
      startDate: "March 2022",
    },
    {
      company: "Meddo Health",
      description:
        "Leading the frontend development effort at Healthcare E-commerce company catering to primary and secondary healthcare market in India.",
      designation: "Team Lead - Frontend Development",
      endDate: "February 2022",
      link: "https://meddo.in",
      startDate: "November 2020",
    },
    {
      company: "MAQ Software",
      description:
        "Full Stack Software Engineer building web applications for Fortune 500 clients in data analytics and services domain.",
      designation: "Software Engineer",
      endDate: "October 2020",
      link: "https://maqsoftware.com",
      startDate: "April 2018",
    },
    {
      company: "HackerEarth",
      description:
        "Conducted hackathons on the Hackerearth platform on a regular basis and worked towards promoting a competitive coding environment in my University Campus.",
      designation: "Campus Ambassador",
      endDate: "May 2018",
      link: "https://www.hackerearth.com/",
      startDate: "February 2017",
    },
  ];
  return (
    <div className="container mx-auto">
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {experiences.map((experience, index) => (
          <li key={`experience-${index}`} className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {`${experience.startDate} - ${experience.endDate ?? "Present"}`}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {`${experience.company} - ${experience.designation}`}
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              {experience.description}
            </p>
            {experience.link && (
              <a
                target="_blank"
                href={experience.link}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                rel="noreferrer"
              >
                Learn more
                <svg
                  className="w-3 h-3 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};
export default Experience;
