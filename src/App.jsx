
import { Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Head from "./components/head"
import onYourMind from "./components/onYourMind"
import RestaurantMenu from "./components/RestaurantMenu"
import { CartContext, Coordinates, Visibility } from "./context/contextApi"
import { useState ,useEffect} from "react"
import Cart from "./components/Cart"

import { useDispatch, useSelector } from "react-redux"


function App() {
  // const [visible, setVisible] = useState(false);

  const visible = useSelector((state)=> state.toggleSlice.searchBarToggle)
  const dispatch = useDispatch()
  const [coord, setCoord] = useState({ lat: 28.65420, lng: 77.23730 })
  // const [cartData,setCartData]= useState([])

  // function getDataStorageFromLocalStorage(){
  //   let data = JSON.parse(localStorage.getItem("cartData")) || []
  //   setCartData(data)

  // }
  // useEffect(() => {
  //   getDataStorageFromLocalStorage()
  
    
  // }, [])
  
 
  
  return (
    // < CartContext.Provider value={{ cartData, setCartData }} >
      <Coordinates.Provider value={{ coord, setCoord }} >
        {/* <Visibility.Provider value={{ visible, setVisible }} > */}
          <div className={visible ? "max-h-screen overflow-hidden" : " "} >
            <Routes>
              <Route path="/" element={<Head />} >
                <Route path="/" element={<Body />} />
                <Route path="/RestaurantMenu/:id" element={<RestaurantMenu />} />
                <Route path="/Cart" element={<Cart/>} />
                <Route path="*" element={<h1> coming soon.......</h1> } />
              </Route>
            </Routes>
          </div>
        {/* </Visibility.Provider> */}
      </Coordinates.Provider>
    // </CartContext.Provider>


  )
}

export default App




