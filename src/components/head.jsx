import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { CartContext, Coordinates, Visibility } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchBar } from "../utils/toggleslice";
function Head() {
  const navItems = [
    {
      name: "Swiggy Corporate",
      image: "fi-rr-shopping-bag flex",
      path: "/corporate"
    },
    {
      name: "Search",
      image: "fi-rr-search",
      path: "/search"
    },
    {
      name: "Offers",
      image: "fi-rr-badge-percent",
      path: "/offers"
    },
    {
      name: "Help",
      image: "fi-rr-info",
      path: "/help"
    },
    {
      name: "Signin",
      image: "fi-tr-sign-in-alt",
      path: "/signin"
    },

    {
      name: "Cart",
      image: "fi-tr-cart-shopping-fast",
      path: "/cart"
    },
  ];

  const [searchResult, setSearchResult] = useState([])
  const [address, setAddress] = useState("")
  // const { visible, setVisible } = useContext(Visibility)
  const { coord, setCoord } = useContext(Coordinates)
  // const { cartData, setCartData } = useContext(CartContext)
 
  // access data from redux sore using useSelector hook
  const cartData = useSelector((state)=> state.cartSlice.cartItems)
  const visible = useSelector((state)=> state.toggleSlice.searchBarToggle)
  const dispatch = useDispatch()
  

  function handleVisibility() {
    // setVisible(data => !data);
    dispatch(toggleSearchBar())

  }

  async function searchResultFun(val) {
    if (val == "") return
    const res = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`)
    const data = await res.json();
    setSearchResult(data.data)
  }

  async function fetchLatandLng(id) {
    if (id == "") return
    const res = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`)
    const data = await res.json();
    console.log(data);
    setCoord({
      lat: data.data[0].geometry.location.lat,
      lng: data.data[0].geometry.location.lng
    })
    setAddress(data.data[0].formatted_address)
    handleVisibility();
  }

  useEffect(() => {
    searchResultFun

  }, [])












  return (
    <div className="relative " >

      <div className="w-full"  >

        <div className={"w-full bg-black/50 h-full  absolute z-10 " + (visible ? "visible " : "invisible ")}  >
          <div className={"text-black bg-white p-10 z-20  absolute w-[40%] h-full duration-500 flex justify-end " + (visible ? "left-0" : "-left-[100%]")} >

            {/* <p className="bg-black text-white p-5 w-[30%]" ></p> */}

            <div className="flex flex-col w-[50%] mr-10  mt-16 " >

              <i className="fi text-2xl fi-rr-cross-small " onClick={handleVisibility}  ></i>
              <input type="text" className="border  py-4  my-10 focus:outline-none focus:shadow-lg  " onChange={(e) => searchResultFun(e.target.value)} />

              <div className="border  " >
                <ul>
                  {searchResult.map((data, index) => {
                    const isLast = (index === searchResult.length - 1)
                    return (
                      <div className="my-5">
                        <div className="flex gap-3">

                          <i class="fi mt-1 fi-rr-marker"></i>
                          <li onClick={() => fetchLatandLng(data.place_id)} >
                            {data.structured_formatting.main_text}
                            <p className="text-sm opacity-50" >{data.structured_formatting.secondary_text}</p>
                            {!isLast && <p className="opacity-35">---------------------------------------</p>}
                          </li>
                        </div>
                      </div>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>


        </div>
      </div>




      <div className=" shadow-xl  h-20 w-full sticky top-0 bg-white z-40 flex justify-center items-center">
        <div className=" w-[75%] flex justify-between">
          <div className="flex items-center gap-4  ">
            <Link to={"/"}>
              <img
                className="w-11"
                src="https://cdn.iconscout.com/icon/free/png-256/free-logo-1889525-1597585.png?f=webp"
                alt=""
              />
            </Link>

            <div className="flex items-center gap-2 " onClick={handleVisibility} >
              <p className="border-b-2 font-bold  border-black ">Other  </p>
              <span className="text-gray-500 font-semibold w-auto line-clamp-1 "> {address}</span>
              <span><i className="fi  mt-2 text-xl text-purple-500 fi-rr-angle-small-down"></i></span>
            </div>
          </div>

          <div className="flex items-center gap-10">
            {navItems.map((data) => (
              <Link to={ data.path}>
                <div className="flex gap-3 items-center">
                  <i className={`mt-1 text-xl fi ${data.image}`} ></i>
                  <p className="text-lg font-medium text-gray-700" >{data.name}</p>
                  {data.name === "Cart" && <p>{cartData.length}</p>}

                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
export default Head;
