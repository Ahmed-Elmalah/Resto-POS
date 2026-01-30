 import Hero from "../../components/userComponents/Hero";
import ReservationWidget from "../../components/userComponents/ReservationWidget";
import MenuPreview from "../../components/userComponents/MenuPreview";
import AboutSection from "../../components/userComponents/AboutSection";

export default function LandingPage() {
  return (
    <div className="animate-fade-in">
      <section id="hero">
        <Hero />
      <ReservationWidget />

      </section>

      <section id="offers" className="py-16 bg-slate-50 dark:dark:bg-background-dark">        
         <MenuPreview isOfferSection={true} /> 
      </section>

      <AboutSection/>
    </div>
  );
}
