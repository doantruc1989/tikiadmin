import axios from "axios";
import { Breadcrumb } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaDollarSign, FaShoppingBag, FaUsers, FaUniversity, FaHome } from "react-icons/fa";
import LineChart from "./LineChart";

function Homepage() {
  const [users, setUsers] =useState();
  useEffect (() => {
    axios.get('http://localhost:3006/users/total')
    .then(res => {
      setUsers(res.data)
    })
  },[])

  return (
    <div>
      <Breadcrumb aria-label="Default breadcrumb example" className="my-6">
        <Breadcrumb.Item icon={FaHome}>
          Dashboard
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mb-6">
        <div className="rounded-lg bg-gray-100 h-40 shadow-sm">
          <div className="col-12 lg:col-6 xl:col-3">
            <div className="card mb-0 p-5 ">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Orders
                  </span>
                  <div className="text-900 font-medium text-xl">152</div>
                </div>
                <div
                  className="flex items-center justify-center bg-blue-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <FaShoppingBag className="text-center text-2xl text-blue-600" />
                </div>
              </div>
              <span className="text-green-600 font-medium text-xl">
                24 new{" "}
              </span>
              <span className="text-500">since last visit</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-100 h-40 shadow-sm">
          <div className="col-12 lg:col-6 xl:col-4">
            <div className="card mb-0 p-5 ">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Revenue
                  </span>
                  <div className="text-900 font-medium text-xl">152</div>
                </div>
                <div
                  className="flex items-center justify-center bg-orange-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <FaDollarSign className="text-center text-2xl text-orange-500" />
                </div>
              </div>
              <span className="text-green-600 font-medium text-xl">
                24 new{" "}
              </span>
              <span className="text-500">since last visit</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-100 h-40 shadow-sm">
          <div className="col-12 lg:col-6 xl:col-4">
            <div className="card mb-0 p-5 ">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Sales
                  </span>
                  <div className="text-900 font-medium text-xl">152</div>
                </div>
                <div
                  className="flex items-center justify-center bg-purple-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <FaUniversity className="text-center text-2xl text-cyan-500" />
                </div>
              </div>
              <span className="text-green-600 font-medium text-xl">
                24 new{" "}
              </span>
              <span className="text-500">since last visit</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-100 h-40 shadow-sm">
          <div className="col-12 lg:col-6 xl:col-4">
            <div className="card mb-0 p-5 ">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Customers
                  </span>
                  <div className="text-900 font-medium text-xl">{users}</div>
                </div>
                <div
                  className="flex items-center justify-center bg-cyan-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <FaUsers className="text-center text-2xl text-purple-500" />
                </div>
              </div>
              <span className="text-green-600 font-medium text-xl">
                {users + " " + "new "}
              </span>
              <span className="text-500">since last visit</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-5">
        <div className="bg-gray-100 w-full shadow-sm md:col-start-0 md:col-end-1 rounded-lg p-5">
          <LineChart/>
        </div>
        <div className="bg-gray-100 w-full shadow-sm md:col-start-1 md:col-end-2 rounded-lg p-5">
          asadaskjlkasd
        </div>
      </div>
    </div>
  );
}

export default Homepage;
