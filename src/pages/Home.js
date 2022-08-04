import React, { useEffect, useState } from "react";
import Body from "../components/Body";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Routes from "../components/Routes";

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/employees").then(
        (res) => res.json()
      );
      console.log(response);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Header />
      <Routes />
      <Body />
      <Pagination/>
    </div>
  );
};

export default Home;
