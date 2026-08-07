import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Briefs } from "@/components/Briefs";
import { Tiers } from "@/components/Tiers";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <span id="top-sentinel" aria-hidden="true" />
      <SiteHeader />
      <main>
        <Hero />
        <Briefs />
        <Tiers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
