import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
import Home from "./components/Home";
import Forecast from "./components/Forecast";
import { useState } from "react";

function App() {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("Napoli");

  return (
    <>
      <div className=" d-flex flex-column min-vh-100">
        <BrowserRouter>
          <header>
            <MyNavbar inputCity={inputCity} setInputCity={setInputCity} setCity={setCity} />
          </header>

          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home city={city} setInputCity={setInputCity} />} />
              <Route path="/Forecast" element={<Forecast city={city} />}></Route>
            </Routes>
          </main>

          <footer>
            <MyFooter />
          </footer>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
