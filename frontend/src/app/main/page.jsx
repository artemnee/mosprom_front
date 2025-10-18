"use client";

import Header from "@/components/HeaderMain";
import Hero from "@/components/Hero";
import NewsCarousel from "@/components/NewsCarousel";
import EventsSection from "@/components/EventsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <NewsCarousel />
        <EventsSection />
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}