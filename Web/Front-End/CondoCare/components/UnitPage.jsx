import React, { useState, useEffect } from "react";
import Navigation from "./LandingPageComponents/navigation";
import { useLocation } from "react-router-dom";
import { Header } from "./UnitPageComponents/header";
import ExampleWithProviders from "./UnitPageComponents/Requests";

function UnitPage() {
    const { state } = useLocation();
    const propertyData = state && state.propertyData;
  
    console.log(propertyData);
  return (
    <div>
      <Navigation />
      <Header property={propertyData}></Header>
      <ExampleWithProviders id={'43cc3d25-5297-4a5e-8b23-7dc246042cb2'} isAdmin={false}/>
    </div>
  );
}
// employee/admin id: cb29c3c8-936d-4a67-9c0a-2902349c07f7
// tenant id: 43cc3d25-5297-4a5e-8b23-7dc246042cb2

export default UnitPage;
