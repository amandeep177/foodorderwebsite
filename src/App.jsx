
import { Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Head from "./components/head"
import onYourMind from "./components/onYourMind"
import RestaurantMenu from "./components/RestaurantMenu"
import { Coordinates, Visibility } from "./context/contextApi"
import { useState } from "react"


function App() {
  const [visible, setVisible] = useState(false);
  const [coord, setCoord] = useState({ lat: 28.65420, lng: 77.23730 })

  return (
    <Coordinates.Provider value={{coord,setCoord}} >

      <Visibility.Provider value={{ visible, setVisible }} >

        <div className={visible ? "max-h-screen overflow-hidden" : " "} >

          <Routes>
            <Route path="/" element={<Head />} >
              <Route path="/" element={<Body />} />
              <Route path="/RestaurantMenu/:id" element={<RestaurantMenu />} />

            </Route>
          </Routes>

        </div>
      </Visibility.Provider>
    </Coordinates.Provider>
  )
}

export default App
