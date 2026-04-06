import type { Metadata } from "next";
import ExperienceContent from "./ExperienceContent";

export const metadata: Metadata = {
  title: "Experience",
  description: "Ankit Pawar's professional experience and career timeline.",
};

export default function Experience() {
  return <ExperienceContent />;
}
