import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

const TopRestaurant = ({ data ,title}) => {
  // const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  // async function fetchData() {
  //   const data = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.66500&lng=77.44770&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );
  //   const result = await data.json();

  //   console.log(
  //     result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
  //       ?.restaurants
  //   );
  //   setData(
  //     result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
  //       ?.restaurants
  //   );
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  function handleprev() {
    value <= 0 ? "" : setValue((prev) => prev - 35);
  }
  function handlenext() {
    value >= 315 ? "" : setValue((prev) => prev + 35);
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between mt-3">
        <h1 className="font-bold text-2xl"> {title}</h1>
        <div className="flex gap-2 px-1 mt-1">
          <div
            onClick={handleprev}
            className={
              `bg-gray-200 cursor-pointer rounded-full w-8 h-8 flex justify-center items-center ` +
              (value <= 0 ? "bg-gray-100" : "bg-gray-200")
            }
          >
            <i
              class={
                `fi text-2xl mt-1 fi-rr-arrow-small-left ` +
                (value <= 0 ? "text-gray-300" : "text-gray-800")
              }
            ></i>
          </div>
          <div
            onClick={handlenext}
            className={
              `bg-gray-200 cursor-pointer rounded-full w-8 h-8 flex justify-center items-center ` +
              (value >= 315 ? "bg-gray-100" : "bg-gray-200")
            }
          >
            <i
              class={
                `fi text-2xl mt-1 fi-rr-arrow-small-right ` +
                (value >= 315 ? "text-gray-300" : "text-gray-800")
              }
            ></i>
          </div>
        </div>
      </div>

      <div
        style={{ translate: `-${value}%` }}
        className="flex mt-3  duration-300 gap-4  "
      >
        {data.map(
          (
            { info, cta:{link}} // destructure
          ) => (
           < RestaurantCard {...info} link={link}/>
           
          )
        )}
      </div>
      <hr className="border mt-10  " />
    </div>
  );
};

export default TopRestaurant;
