import React from "react";

const Body = ({ isSidebarExpanded }) => (
  <div
    id="gjs"
    className={`main-content ${isSidebarExpanded ? "expanded" : "collapsed"}`}
  ></div>
);

export default Body;
