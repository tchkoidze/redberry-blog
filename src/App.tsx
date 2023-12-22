import { useState } from "react";
import { Route, Routes, useLoaderData, useLocation } from "react-router-dom";
import Header from "./layouts/Header";
import Home from "./pages/Home";
import Login from "./components/Login";
import AddBlog from "./pages/AddBlog";

function App() {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const hideHeaderRoutes = ["/addBlog"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header setOpen={setOpen} />}

      {open ? <Login setOpen={setOpen} /> : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addBlog" element={<AddBlog />} />
      </Routes>
    </>
  );
}

export default App;
