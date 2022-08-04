import React, { useState } from "react";
import api from "../api/posts";
import { useNavigate } from "react-router-dom";

const Formbody = () => {
  const nav = useNavigate();
  const [forms, setForms] = useState({
    name: "",
  });
  const addData = async (e) => {
    e.preventDefault();
    try {   
        const response = await api.post("/employees",forms)
    } catch (error) {     
    }
    nav("/")
  };
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
            onChange={(e)=>setForms({...forms,name:e.target.value})}
            value={forms.name}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Formbody;
