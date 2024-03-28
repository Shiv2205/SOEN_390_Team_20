import React, { useState, useEffect } from "react";
import Navigation from "./LandingPageComponents/navigation";
import { useLocation } from "react-router-dom";
import { Header } from "./UnitPageComponents/header";

function UnitPage() {
    const { state } = useLocation();
    const propertyData = state && state.propertyData;
  
    console.log(propertyData);
  return (
    <div>
      <Navigation />
      <Header property={propertyData}></Header>
    </div>
  );
}

export default UnitPage;
