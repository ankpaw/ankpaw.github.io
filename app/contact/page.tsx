import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ankit Pawar.",
};

export default function Contact() {
  return <ContactContent />;
}
