import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import React from "react";
import Productpage from "./pages/Productpage";
const LazyHome = React.lazy(() => import("./pages/Home"));
const LazyForm = React.lazy(() => import("./pages/Form"));
function App() {
  return (
    <React.Suspense fallback={<h1>Still Loading…</h1>}>
      <Routes>
        <Route exact path="/" element={<LazyHome />} />
        <Route path="/form" element={<LazyForm />} />
        <Route path="/products" element={<Productpage />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
