import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import Pokemon from "./Pokemon";
import Shop from "./Shop";

function RouteSwitch() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Homepage />} />
          <Route path="/shop" element={<Shop />}>
            <Route index element={<div>Index element</div>} />
            <Route path="/shop/:pokemonId" element={<Pokemon />} />
            <Route path="/shop/checkout" element={<div></div>} />
          </Route>
          <Route
            path="*"
            element={<h1>There's nothing here. Try going to the home page.</h1>}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default RouteSwitch;
