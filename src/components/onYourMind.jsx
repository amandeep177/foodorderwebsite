import React, { useEffect, useState } from "react";

const OnYourMind = ({data}) => {
  // const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  // async function fetchData() {
  //   const data = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.66500&lng=77.44770&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );
  //   const result = await data.json();

  //   // console.log(result?.data?.cards[0]?.card?.card);
  //   setData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  function handleprev() {
    value <= 0 ? "" : setValue((prev) => prev - 31);
  }
  function handlenext() {
    value >= 124 ? "" : setValue((prev) => prev + 31);
  }
  return (
    <div>
      <div className="flex justify-between mt-3">
        <h1 className="font-bold text-2xl"> What's in your mind?</h1>
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
              (value >= 124 ? "bg-gray-100" : "bg-gray-200")
            }
          >
            <i
              className={
                `fi text-2xl mt-1 fi-rr-arrow-small-right ` +
                (value >= 124 ? "text-gray-300" : "text-gray-800")
              }
            ></i>
          </div>
        </div>
      </div>

      <div
        style={{ translate: `-${value}%` }}
        className="flex mt-3  duration-300"
      >
        {data.map((item) => {
          // explicitly rerturn if we used curly braclet () -> implicitly return
          return (
            <img
              className="w-36"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
              alt=""
            />
          );
        })}
      </div>
      <hr className="border " />
    </div>
  );
};

export default OnYourMind;
