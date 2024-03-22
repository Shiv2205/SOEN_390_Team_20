import React from "react";
import { useState } from "react";

export const Navigation = ({ views, setView }) => {
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
              <a href="" className="page-scroll">
                Home
              </a>
            </li>
            <li>
              <a href="" onClick={(e) => {
                e.preventDefault();
                setView(views.REQUESTFORUM);
              }}
                 className="page-scroll">
                request services
              </a>
            </li>
            <li>
              <a href="" className="page-scroll">
                Forum
              </a>
            </li>
            <li>
              <a href="" className="page-scroll">
                facilities
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
