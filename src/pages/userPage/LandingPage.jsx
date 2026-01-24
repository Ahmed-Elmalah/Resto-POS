import React from "react";
import Hero from "../../components/userComponents/Hero";
import ReservationWidget from "../../components/userComponents/ReservationWidget";
import MenuPreview from "../../components/userComponents/MenuPreview";

export default function LandingPage() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <ReservationWidget />
      <MenuPreview />
    </div>
  );
}
