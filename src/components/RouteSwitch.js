import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Homepage from "./Homepage";
import Navbar from "./Navbar";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Homepage />} />
          <Route path="/shop" element={<div>Hello from shop</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
