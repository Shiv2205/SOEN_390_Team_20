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

function LandingPage({ views, setView}) {
    const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
    return (
        <div>
          <Navigation setView={setView} views={views}/>
          <Header data={landingPageData.Header} />
          <Features data={landingPageData.Features} />
          <About data={landingPageData.About} />
          <Gallery data={landingPageData.Gallery} />
          <Testimonials data={landingPageData.Testimonials} />
          <Team data={landingPageData.Team} />
          <Contact data={landingPageData.Contact} />
        </div>
      );
};

export default LandingPage;
