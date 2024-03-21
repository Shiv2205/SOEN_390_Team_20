import React, { useState, useEffect } from "react";

export const MiniProfile = ({ views, setView }) => {
  return (
    <header id="miniProfile">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
                        <div className="miniProfile">
                          <div className="miniProfile-image">
                              <a href="" onClick={(e) => {e. preventDefault(); setView(views.PROFILE)}}  alt={""}><img src='/img/testimonials/05.jpg'/></a>
                          </div>
                            <div className="miniProfile-content">
                                <p>John Doe</p>
                                <a href="" className="page-scroll">
                                    Sign out
                                </a>
                            </div>
                        </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

