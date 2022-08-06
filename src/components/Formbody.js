import React, { useEffect, useState } from "react";
import api from "../api/posts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Formbody = () => {
  const [searchResult, setSearchResult] = useState({});
  const [search, setSearch] = useState("");
  const nav = useNavigate();
  const [forms, setForms] = useState({
    name: "",
  });
  const addData = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/employees", forms);
    } catch (error) {}
    nav("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?id=${search}`
      );
      console.log(response.data);
    };
    fetchData();
  }, [search]);
  return (
    <div>
      <form onSubmit={addData}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            onChange={(e) => setForms({ ...forms, name: e.target.value })}
            value={forms.name}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
};

export default Formbody;
