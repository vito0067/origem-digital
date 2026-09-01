import Navbar from "@/components/Navbar";
import HeroCinematic from "@/components/HeroCinematic";
import SocialProof from "@/components/SocialProof";
import About from "@/components/About";
import Statement from "@/components/Statement";
import SaleFlow from "@/components/SaleFlow";
import Comparison from "@/components/Comparison";
import Services from "@/components/Services";
import AgentDemo from "@/components/AgentDemo";
import LossCalculator from "@/components/LossCalculator";
import Offer from "@/components/Offer";
import Guarantee from "@/components/Guarantee";
import HowItWorks from "@/components/HowItWorks";
import Showcase from "@/components/Showcase";
import Projects from "@/components/Projects";
import Differentials from "@/components/Differentials";
import DiagnosticQuiz from "@/components/DiagnosticQuiz";
import Technologies from "@/components/Technologies";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-abyss">
      <Navbar />
      <HeroCinematic />
      <SocialProof />
      <About />
      <Statement />
      <SaleFlow />
      <Comparison />
      <Services />
      <AgentDemo />
      <LossCalculator />
      <Offer />
      <Guarantee />
      <HowItWorks />
      <Showcase />
            <Projects />
      <Differentials />
      <DiagnosticQuiz />
      <Technologies />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
