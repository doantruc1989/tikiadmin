import React from "react";

function Homepage() {
  return (
    <>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>
      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className="rounded bg-gray-200 h-40 shadow-sm">
          
        </div>
        <div className="rounded bg-gray-200 h-40 shadow-sm"></div>
        <div className="rounded bg-gray-200 h-40 shadow-sm"></div>
      </div>
      <div className="grid col-1 bg-gray-200 h-96 shadow-sm"></div>
    </>
  );
}

export default Homepage;
