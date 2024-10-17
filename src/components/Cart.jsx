import React, { useContext, useState } from "react";
import { CartContext } from "../context/contextApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItem } from "../utils/cartSlice";
import toast from "react-hot-toast";
import { toggleLogin } from "../utils/toggleslice";

let nonveg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/768px-Non_veg_symbol.svg.png";
let veg =
  "https://www.shutterstock.com/image-illustration/pure-veg-icon-logo-symbol-260nw-2190482501.jpg";

const Cart = () => {
  // const { cartData, setCartData } = useContext(CartContext)
  // console.log(cartData);

  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);
  console.log(resInfo);

  const userData = useSelector((state) => state.authSlice.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // let totalPrice =0;
  // for(let i=0;i<cartData.length;i++){
  //    totalPrice = totalPrice+ cartData[i].price/100 || cartData[i].defaultPrice/100
  // }
  let totalPrice = cartData.reduce(function (acc, curval) {
    return acc + curval.price / 100 || curval.defaultPrice / 100;
  }, 0);

  function handleRemove(i) {
    if (cartData.length > 1) {
      let newArr = [...cartData];
      newArr.splice(i, 1);
      dispatch(deleteItem(newArr));
      toast.success("food removed");
    } else {
      handleclearcart();
    }
  }
  function handleclearcart() {
    // setCartData([]);
    dispatch(clearCart());
    toast.success("cart is clear");
  }

  function handlePlaceOrder() {
    if (!userData) {
      toast.error("login krle bhai");
      dispatch(toggleLogin());
      return;
    }
    toast.success("order Placed");
  }

  if (cartData.length === 0) {
    return (
      <div className="w-full">
        <div className="w-[50%] mx-auto">
          <h1> kuch order karle bhai</h1>
          <Link to="/" className=" underline inline-block text-blue-400">
            {" "}
            yha se order krle
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <div className=" w-[95%] md:w-[60%] mx-auto">
        <Link to={`/RestaurantMenu/${resInfo.id}`}>
          <div className="my-10 flex gap-2">
            <img
              className="rounded-xl  aspect-square"
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                resInfo.cloudinaryImageId
              }
              alt=""
            />
            <div>
              <p className=" text-3xl font-semibold border-b-2 pb-3 border-black">
                {resInfo.name}
              </p>
              <p className="mt-3 text-xl">{resInfo.areaName}</p>
            </div>
          </div>
        </Link>
        <hr className="my-5 border-2" />

        <div>
          {cartData.map(
            (
              {
                name,
                defaultPrice,
                price,
                description = "hello",
                imageId,
                itemAttribute: { vegClassifier },
                ratings: {
                  aggregatedRating: { rating, ratingCountV2 },
                },
              },
              i
            ) => {
              //   const [isMore, setIsMore] = useState(false);
              //   let trimdes = description.substring(0, 138) + "...";
              return (
                <>
                  <div className="flex w-full justify-between items-center ">
                    <div className= "w-[50%] md:w-[70%] min-h-[200px]">
                      <img
                        className="w-6 rounded-lg"
                        src={vegClassifier === "VEG" ? veg : nonveg}
                        alt=""
                      />

                      <h2 className="font-bold text-gray-700 text-lg">
                        {name}
                      </h2>
                      <p className="font-bold text-gray-700 text-lg">
                        ₹{defaultPrice / 100 || price / 100}
                      </p>

                      <div className="flex items-center gap-2 ">
                        {" "}
                        <i
                          className={"fi text-green-600 mt-1 fi-ss-star"}
                        ></i>{" "}
                        <span>
                          {rating} ({ratingCountV2})
                        </span>{" "}
                      </div>
                      <div className="line-clamp-2">{description}</div>

                      {/* {description.length > 138 ? (
                        <div>
                          <span className=" text-gray-500 ">
                            {" "}
                            {isMore ? description : trimdes}{" "}
                          </span>
                          <button
                            className="font-bold"
                            onClick={() => setIsMore(!isMore)}
                          >
                            {isMore ? "less" : "more"}
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500"> {description} </span>
                      )} */}
                    </div>
                    <div className= "w-[40%] md:w-[20%] relative h-full">
                      <img
                        className=" rounded-xl "
                        src={
                          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                          imageId
                        }
                        alt=""
                      />
                      <button
                        onClick={handleRemove}
                        className="rounded-xl absolute bottom-[-15px] left-1/2 -translate-x-1/2  bg-white border font-bold text-red-500 px-6 py-2 drop-shadow  "
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <hr className="my-5" />
                </>
              );
            }
          )}
        </div>
        <h1 className="text-2xl" > <span className="font-bold">Total- ₹{totalPrice}</span> </h1>
        <div className="flex justify-between">
          <button
            onClick={handleclearcart}
            className="p-3 border border-gray-600 font-bold text-red-400 bg-white rounded-xl"
          >
            {" "}
            Clear Cart
          </button>
          <button
            onClick={handlePlaceOrder}
            className="p-3 border border-gray-600 font-bold text-green-400 bg-white rounded-xl"
          >
            {" "}
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
