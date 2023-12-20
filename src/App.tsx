import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./layouts/Header";
import Home from "./pages/Home";
import Login from "./components/Login";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header setOpen={setOpen} />
      {open ? <Login setOpen={setOpen} /> : null}

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
