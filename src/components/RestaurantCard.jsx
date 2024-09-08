import React from 'react'
import { Link } from 'react-router-dom'


const RestaurantCard = (info) => {
  // console.log(info.link.split("/").at(-1));
  
  
  return (
   <Link to={`/restaurantMenu/${info.id}`}>
    <div className="hover:scale-95 duration-300">
              <div className=" relative">
                <img
                  className=" min-w-[350px] h-44 rounded-2xl  object-cover "
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.cloudinaryImageId}`}
                  alt=""
                />
                

                <div className="bg-gradient-to-t from-black from-2% to -translate to-40%  rounded-2xl absolute top-0 w-full h-full "></div>
                <p className="absolute bottom-2 left-2 text-xl text-white font-bold">
                  {info?.aggregatedDiscountInfoV3?.header}{" "}
                  {info?.aggregatedDiscountInfoV3?.subHeader}{" "}
                </p>
              </div>
              <h2 className="font-semibold text-lg " > {info.name}</h2>
              <p className="flex items-center  gap-2 font-semibold text-base">
                
                
                  <i class="fi fi-ss-circle-star text-green-700 text-lg mt-2"></i>
              
                {info.avgRating}. <span> {info?.sla?.slaString}</span>
              </p>
              <p className="line-clamp-1 text-black/60 font-medium" >{info.cuisines.join(" , ")}</p>
              <p  className="line-clamp-1 text-black/60 font-medium" >{info.locality}</p>
            </div>
   </Link>
  )
}

export default RestaurantCard
