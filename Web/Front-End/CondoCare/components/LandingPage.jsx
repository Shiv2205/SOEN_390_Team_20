import React, { useState, useEffect } from "react";
import { Navigation } from "./LandingPageComponents/navigation";
import { Header } from "./LandingPageComponents/header";
import { Features } from "./LandingPageComponents/features";
import { About } from "./LandingPageComponents/about";
import { Services } from "./LandingPageComponents/services";
import { Gallery } from "./LandingPageComponents/gallery";
import { Testimonials } from "./LandingPageComponents/testimonials";
import { Team } from "./LandingPageComponents/Team";
import { Contact } from "./LandingPageComponents/contact";
import JsonData from "./LandingPageComponents/data.json";

function LandingPage() {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} id="features" />
      <About data={landingPageData.About} id="about" />
      <Services data={landingPageData.Services} id="services" />
      <Gallery data={landingPageData.Gallery} id="gallery" />
      <Testimonials data={landingPageData.Testimonials} id="testimonials" />
      <Team data={landingPageData.Team} id="team" />
      <Contact data={landingPageData.Contact} id="contact" />
    </div>
  );
}

export default LandingPage;
