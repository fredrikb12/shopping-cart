import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import Pokemon from "./Pokemon";
import Shop from "./Shop";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Homepage />} />
          <Route path="/shop" element={<Shop />}>
            <Route index element={<div>Index element</div>} />
            <Route path="/shop/:pokemonId" element={<Pokemon />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
