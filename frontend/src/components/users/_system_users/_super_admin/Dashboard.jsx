import React from "react";
import Navbar from './Navbar'
import Sidebar from "./Sidebar";
import Center from "./Center";


const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Center />
    </div>
  );
};

export default Dashboard;
