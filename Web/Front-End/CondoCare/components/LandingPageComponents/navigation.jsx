import React, { useState, useEffect } from "react";


export function Navigation(){
  const storedUserData = localStorage.getItem("userData");
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
          <a className="navbar-brand page-scroll" href="/#page-top">
            CondoCare
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            { storedUserData ? null:
              <li>
                <a href="/#features" className="page-scroll">
                  Features
                </a>
              </li>
            }
            { storedUserData ? null:
              <li>
                <a href="/#about" className="page-scroll">
                  About
                </a>
              </li>
            }
            { storedUserData ? null:
              <li>
                <a href="/#portfolio" className="page-scroll">
                  Gallery
                </a>
              </li>
            }
            { storedUserData ? 
              <li>
              <a href="/blog" className="page-scroll">
                Forum
              </a>
            </li>
            :
              <li>
                <a href="/#testimonials" className="page-scroll">
                  Testimonials
                </a>
              </li>
            }
            <li>
              <a href="/#contact" className="page-scroll">
                Contact
              </a>
            </li>
            { storedUserData ?  
            <li>
              <a href="/" className="page-scroll"  onClick={() => localStorage.removeItem("userData")}>
                Logout
              </a>
            </li>
                : 
            <li>
              <a href="/#team" className="page-scroll">
                Team
              </a>
            </li>
            }
            <li>
              { storedUserData ?  
                  <a href="/userDashboard" className="page-scroll">
                    home
                  </a>
                : 
                <button className="btn btn-custom"> 
                  <a href="/login" className="page-scroll" style={{color:"white"}}>
                  Sign in
                  </a>
                </button>
              }
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
