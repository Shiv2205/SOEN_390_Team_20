import React, { useState, useEffect } from "react";
import Navigation from "./LandingPageComponents/navigation";
import { useLocation } from "react-router-dom";
import { Header } from "./UnitPageComponents/header";
import RequestForm from "./UnitPageComponents/RequestForm";
import ServiceListCustomer from "./UnitPageComponents/Servicerequestlist_customer";
import ServiceRequestList from "./UnitPageComponents/Servicerequestlist";

function UnitPage() {
    const { state } = useLocation();
    const propertyData = state && state.propertyData;
  
    console.log(propertyData);
  return (
    <div>
      <Navigation />
      <Header property={propertyData}></Header>
      <ServiceListCustomer/>
      <ServiceRequestList/>
      <RequestForm/>
    </div>
  );
}

export default UnitPage;
