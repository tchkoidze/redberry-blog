import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./layouts/Header";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
