import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./layouts/Header";
import Home from "./pages/Home";
import Login from "./components/Login";
import AddBlog from "./pages/AddBlog";

function App() {
  const [open, setOpen] = useState(false);
  const loged = useRef(false);
  const [isLoged, setIsLoged] = useState(false);

  const location = useLocation();
  const hideHeaderRoutes = ["/addBlog"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);
  console.log(555);
  const storedValue = JSON.parse(localStorage.getItem("isLoged")!);

  useEffect(() => {
    if (storedValue !== null) {
      console.log(storedValue);
      setIsLoged(storedValue);
    }
    //JSON.parse(localStorage.getItem("isLoged"));
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoged", JSON.stringify(isLoged));
  }, [isLoged]);

  return (
    <>
      {shouldShowHeader && (
        <Header setOpen={setOpen} loged={loged} isLoged={isLoged} />
      )}

      {open ? (
        <Login setOpen={setOpen} loged={loged} setIsLoged={setIsLoged} />
      ) : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addBlog" element={<AddBlog />} />
      </Routes>
    </>
  );
}

export default App;
