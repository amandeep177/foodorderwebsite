import React, { useContext, useEffect, useState } from "react";
import OnYourMind from "./onYourMind";
import TopRestaurant from "./TopRestaurant";
import OnlineFoodDel from "./OnlineFoodDel";
import { Coordinates } from "../context/contextApi";

const Body = () => {
  const [TopRestaurantdata, setTopRestaurantData] = useState([]);
  const [topResTitle, setTopResTitle] = useState("");
  const [onlineTitle, setOnlineTitle] = useState("");
  const [onyourminddata, setonyourmindData] = useState([]);
  const[unservicedata,setUnserviceData] = useState({})
  const{coord:{lat,lng}} = useContext(Coordinates)

  async function fetchData() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      
    );
    const result = await data.json();

     setUnserviceData(result.data)
    setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title)
   setOnlineTitle(result?.data?.cards[2]?.card?.card?.title)
   
    setTopRestaurantData(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setonyourmindData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  }

  useEffect(() => {
    fetchData();
  }, [lat,lng]);

  if(unservicedata.communication){
    return (
      <div className="flex flex-col items-center justify-center h-auto  text-center p-6 mt-44">
        <div className="mb-6">
        
          <img  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_490,h_476/portal/m/location_unserviceable.png" alt="Location Unserviceable" className="w-36 h-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Location Unserviceable</h2>
        <p className="text-gray-600">We don’t have any services here till now. Try changing location.</p>
      </div>
    );
  
  }

  return (
    <div className="w-full ">
      <div className="w-[75%] mx-auto  mt-4  overflow-hidden">
        <OnYourMind data={onyourminddata}  />
        <TopRestaurant data={TopRestaurantdata} title={topResTitle} />
        <OnlineFoodDel  data={TopRestaurantdata} title={onlineTitle} />
      </div>
    </div>
  );
};

export default Body;
