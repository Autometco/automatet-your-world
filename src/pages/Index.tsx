import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { ROICalculator } from "@/components/ROICalculator";
import { CaseStudies } from "@/components/CaseStudies";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main>
        <Hero />
        <Services />
        <ROICalculator />
        <CaseStudies />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;