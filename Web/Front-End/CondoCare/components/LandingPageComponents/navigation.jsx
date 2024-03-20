import React, { useState } from 'react';
import ServiceRequestList from '../Servicerequestlist';
import ServiceListCustomer from '../Servicerequestlist_customer';

const Navigation = ({ onServiceRequestClick }) => {
  const [dropdownOpenService, setDropdownOpenService] = useState(false);
  const [dropdownOpenCustomer, setDropdownOpenCustomer] = useState(false);

  const toggleDropdownService = () => {
    setDropdownOpenService(!dropdownOpenService);
    // Close Customer dropdown when opening Service dropdown
    setDropdownOpenCustomer(false);
  };

  const toggleDropdownCustomer = () => {
    setDropdownOpenCustomer(!dropdownOpenCustomer);
    // Close Service dropdown when opening Customer dropdown
    setDropdownOpenService(false);
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            CondoCare
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" onClick={toggleDropdownService}>
                Service Request List<span className="caret"></span>
              </a>
              <ul className={`dropdown-menu ${dropdownOpenService ? 'show' : ''}`}>
                <li><ServiceRequestList onSelect={onServiceRequestClick}/></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" onClick={toggleDropdownCustomer}>
                Customer Service Request List<span className="caret"></span>
              </a>
              <ul className={`dropdown-menu ${dropdownOpenCustomer ? 'show' : ''}`}>
                <li><ServiceListCustomer onSelect={onServiceRequestClick}/></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
