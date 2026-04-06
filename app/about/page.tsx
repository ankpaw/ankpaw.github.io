import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Ankit Pawar's software development journey.",
};

export default function About() {
  return <AboutContent />;
}
