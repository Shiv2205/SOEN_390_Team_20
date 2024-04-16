import React, { useState, useEffect } from "react";
import Navigation from "./LandingPageComponents/navigation";
import { useLocation } from "react-router-dom";
import { Header } from "./UnitPageComponents/header";
import ExampleWithProviders from "./UnitPageComponents/Requests";

function UnitPage({userData}) {
    const { state } = useLocation();
    const propertyData = state && state.propertyData;
  
    console.log(propertyData);
  return (
    <div>
      <Navigation userData={userData}/>
      <Header property={propertyData}></Header>
      <ExampleWithProviders></ExampleWithProviders>
    </div>
  );
}

export default UnitPage;
