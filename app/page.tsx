import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Briefs } from "@/components/Briefs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Briefs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
