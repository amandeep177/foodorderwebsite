import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { useDispatch } from "react-redux";
import { setFilterValue } from "../utils/filterSlice";

const OnlineFoodDel = ({ data, title }) => {
  const filterOptions = [
    "Ratings 4.0+",
    "Offers",
    "Rs. 300-Rs.600",
    "Less than 400",
  ];
  const [activeBtn, setActiveBtn] = useState(null);

  const dispatch = useDispatch();

  function handleFilterBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? null : filterName);
  }
  dispatch(setFilterValue(activeBtn)); // dispatch ko bahar krege agr upar function mai dalege to vo activebtn ki purani value he le lega

  return (
    <div className="mt-8 ">
      <h1 className="font-bold my-7 text-2xl ">{title}</h1>

      <div className="my-7 flex flex-wrap gap-6 ">
        {filterOptions.map((filterName) => (
          <button
            onClick={() => handleFilterBtn(filterName)}
            className={
              "filterbtn flex gap-1 " +
              (activeBtn === filterName ? "active" : "")
            }
          >
            <p> {filterName} </p>
            <i className="fi mt-[3px] fi-rr-cross-small hidden"></i>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-9">
        {data.map(
          (
            { info, cta: { link } } // destructure
          ) => (
            <RestaurantCard {...info} link={link} />
          )
        )}
      </div>
    </div>
  );
};

export default OnlineFoodDel;
