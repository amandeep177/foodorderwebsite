import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext, Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../utils/cartSlice";
import toast from "react-hot-toast";

let nonveg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/768px-Non_veg_symbol.svg.png";
let veg =
  "https://www.shutterstock.com/image-illustration/pure-veg-icon-logo-symbol-260nw-2190482501.jpg";

const RestaurantMenu = () => {
  const { id } = useParams();
  // console.log(id.split("-").at(-1));   //-1 gives last wala index

  // console.log(id) // const mainId = id.split("-").at(-1);

  const [resInfo, setResInfo] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [discountData, setdiscountData] = useState([]);
  const [topPicksData, setTopPicksData] = useState({});
  const [value, setValue] = useState(false);
  const [curridx, setcurrIdx] = useState(0);

  const {
    coord: { lat, lng },
  } = useContext(Coordinates);
  // console.log(menuData);

  async function fetchMenu() {
    let data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
    );
    let res = await data.json();

    // console.log(res);

    // console.log(res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1].card?.card);
    setResInfo(res?.data?.cards[2]?.card?.card?.info);

    setdiscountData(
      res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    let actualMenu =
      (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      );

    console.log(
      (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data.card.card.title == "Top Picks"
      )[0]
    );

    setMenuData(actualMenu);
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  function handleprev() {
    value <= 0 ? "" : setValue((prev) => prev - 31);
  }
  function handlenext() {
    value >= 100 ? "" : setValue((prev) => prev + 31);
  }

  function toggleFun() {
    setcurrIdx(!curridx);
    // console.log(i);
  }

  return (
    <div className=" w-full">
      <div className="w-[95%]  md:w-[50%] mx-auto pt-6 ">
        <p className="text-[17px] text-slate-400">
          <Link to={"/"}>
            <span className="hover:cursor-pointer hover:text-slate-800">
              Home
            </span>{" "}
          </Link>
          /{" "}
          <Link to={"/"}>
            <span className="hover:cursor-pointer hover:text-slate-800">
              {resInfo.locality}{" "}
            </span>{" "}
          </Link>
          / <span className="text-slate-700"> {resInfo.name}</span>
        </p>
        <h1 className="font-bold pt-6 text-2xl ">{resInfo.name} </h1>
        <div className=" w-full  h-[240px] bg-gradient-to-t from-slate-200 px-4 pb-4 opacity-70   mt-3 rounded-[32px]">
          <div className="w-full p-4 border-slate-300 rounded-[30px] h-full bg-white ">
            <div className="flex items-center gap-2 font-semibold ">
              <i class="fi fi-sr-circle-star mt-1 pt-1 text-green-600 text-lg"></i>
              <span className="">{resInfo.avgRating}</span>
              <span>({resInfo.totalRatingsString}). </span>
              <span>{resInfo.costForTwoMessage}</span>
            </div>
            <p className="font-semibold underline text-orange-600 ">
              {resInfo?.cuisines?.join(", ")}
            </p>
            <div className="flex gap-2 mt-1 ">
              <div className="w-[7px] flex flex-col  items-center justify-center">
                <div className="w-[7px] h-[7px] bg-gray-500 rounded-full"></div>
                <div className="w-[1px] h-[25px] bg-gray-500 "></div>
                <div className="w-[7px] h-[7px] bg-gray-500 rounded-full"></div>
              </div>
              <div className="flex gap-2 text-sm font-semibold flex-col">
                <p>
                  {" "}
                  Outlet{" "}
                  <span className="text-gray-400 font-normal ">
                    {" "}
                    {resInfo.locality}
                  </span>{" "}
                </p>
                <p>{resInfo?.sla?.slaString}</p>
              </div>
            </div>
            <hr className="" />

            <div className=" w-full">
              <div className="flex items-center p-3 ">
                <img
                  className="w-7 "
                  src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/" +
                    resInfo.feeDetails?.icon
                  }
                  alt=""
                />
                <span className="text-sm ml-4 text-gray-400 font-normal">
                  {resInfo?.feeDetails?.message?.replace(/<[^>]*>/g, "") || ""}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex justify-between mt-8">
            <h1 className="font-bold text-xl"> Deals For You</h1>
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
            className="flex gap-3   mt-5 duration-300"
          >
            {discountData.map((data) => (
              <Discount data={data} />
            ))}
          </div>
        </div>
        <h2 className="text-center mt-5 leading-5">M E N U</h2>
        <div className="w-full mt-5 relative   ">
          <div className="w-full  h-12 flex items-center justify-center rounded-2xl text-lg font-semibold text-gray-500 cursor-pointer  bg-gray-100">
            {" "}
            Search for dishes
          </div>
          <i className="fi fi-rs-search absolute top-3 right-3 text-gray-500 text-xl"></i>
        </div>

        <div>
          {menuData.map(({ card: { card } }) => (
            <MenuCard card={card} resInfo={resInfo} />
          ))}
        </div>
      </div>
    </div>
  );
};

function MenuCard({ card, resInfo }) {
  // console.log(card);

  let flag = false;
  if (card["@type"]) {
    flag = true;
  }

  const [isOpen, setIsOpen] = useState(flag);

  function toggleDropDown() {
    setIsOpen((prev) => !prev);
  }

  if (card.itemCards) {
    const { title, itemCards } = card;

    return (
      <>
        <div className="mt-7">
          <div className="flex justify-between ">
            <h1 className={"font-bold text-" + (card["@type"] ? "xl" : "base")}>
              {title} ({itemCards.length}){" "}
            </h1>

            <i
              class={
                " text-2xl fi fi-rs-angle-small-" + (isOpen ? "up" : "down")
              }
              onClick={toggleDropDown}
            ></i>
          </div>
          {isOpen && <DetailMenu itemCards={itemCards} resInfo={resInfo} />}
        </div>
        <hr
          className={
            "my-5 rounded-xl border-" + (card["@type"] ? "[10px]" : "[4px]")
          }
        />
      </>
    );
  } else {
    const { categories, title } = card;
    return (
      <div className="mt-7">
        <h1 className="font-bold text-xl">{title} </h1>
        {categories.map((data) => (
          <MenuCard card={data} resInfo={resInfo} />
        ))}
      </div>
    );
  }
}

function DetailMenu({ itemCards, resInfo }) {
  return (
    <div className="my-5">
      {itemCards.map(({ card: { info } }) => (
        <DetailMenuCard info={info} resInfo={resInfo} />
      ))}
    </div>
  );
}

function DetailMenuCard({ info, resInfo }) {
  // destructure neeche kr lia so that we can access info later
  const {
    name,
    defaultPrice,
    price,
    description = "hello",
    imageId,
    itemAttribute: { vegClassifier },
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
  } = info;

  // const { cartData, setCartData } = useContext(CartContext)
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const [isDiffRes, setIsDiffRes] = useState(false);

  const getresInfoFromLocalStorage = useSelector(
    (state) => state.cartSlice.resInfo
  );
  const dispatch = useDispatch();
  function handleAddToCart() {
    // console.log(resInfo);

    const isAdded = cartData.find((data) => data.id === info.id);
    // let getresInfoFromLocalStorage = JSON.parse(localStorage.getItem("resInfo")) || []
    if (!isAdded) {
      if (
        getresInfoFromLocalStorage.name === resInfo.name ||
        getresInfoFromLocalStorage.length === 0
      ) {
        dispatch(addToCart({ info, resInfo }));
        toast.success("food added to the cart");
      } else {
        //  alert("diffrent restaurant item")
        // toast.error("diffrent restaurant")
        handleisDiffRes();
      }
    } else {
      // alert("already added")
      toast.error("already added");
    }
  }

  function handleisDiffRes() {
    setIsDiffRes((prev) => !prev);
  }
  function handleclearcart() {
    dispatch(clearCart());
    handleisDiffRes();
  }

  const [isMore, setIsMore] = useState(false);
  let trimdes = description.substring(0, 138) + "...";

  return (
    <>
      <div className="flex w-full justify-between items-center ">
        <div className="w-[50%] md:w-[70%] min-h-[200px]">
          <img
            className="w-6 rounded-lg"
            src={vegClassifier === "VEG" ? veg : nonveg}
            alt=""
          />

          <h2 className="font-bold text-gray-700 text-lg">{name}</h2>
          <p className="font-bold text-gray-700 text-lg">
            ₹{defaultPrice / 100 || price / 100}
          </p>

          <div className="flex items-center gap-2 ">
            {" "}
            <i className={"fi text-green-600 mt-1 fi-ss-star"}></i>{" "}
            <span>
              {rating} ({ratingCountV2})
            </span>{" "}
          </div>

          {description.length > 138 ? (
            <div>
              <span className=" line-clamp-2 md:line-clamp-none text-gray-500 ">
                {" "}
                {isMore ? description : trimdes}{" "}
              </span>
              <button className="hidden md:block font-bold" onClick={() => setIsMore(!isMore)}>
                {isMore ? "less" : "more"}
              </button>
            </div>
          ) : (
            <span className="text-gray-500"> {description} </span>
          )}
        </div>
        <div className="w-[40%] md:w-[20%] relative h-full">
          <img
            className=" rounded-xl "
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
              imageId
            }
            alt=""
          />
          <button
            onClick={handleAddToCart}
            className="rounded-xl absolute bottom-[-15px] left-1/2 -translate-x-1/2 bg-white border font-bold text-green-500 px-6 py-2 drop-shadow  "
          >
            Add
          </button>
        </div>
      </div>
      <hr className="my-5" />

      {isDiffRes && (
        <div className="w-[580px] h-[220px] border shadow-md fixed bottom-5 left-[31%] z-50 bg-white">
          <div className="my-4 mx-4 ">
            <h1 className="font-semibold text-xl mb-2">
              Items already in cart
            </h1>
            <p>
              Your cart contains items from other restaurant. Would you like to
              reset your cart for adding items from this restaurant?
            </p>
            <div className="flex justify-between mt-4 gap-2">
              <button
                onClick={handleisDiffRes}
                className="border border-green-500 h-10 text-green-500 w-1/2"
              >
                No
              </button>
              <button
                onClick={handleclearcart}
                className="border  border-green-500 h-10 bg-green-500 text-white w-1/2"
              >
                {" "}
                Yes, start fresh
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Discount({
  data: {
    info: { header, offerLogo, couponCode },
  },
}) {
  return (
    <div className="flex min-w-[350px] h-[100px] border rounded-xl gap-3 p-2 items-center  ">
      <div>
        <img
          className="w-16"
          src={
            "	https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" +
            offerLogo
          }
          alt=""
        />
      </div>
      <div>
        <p className="font-bold text-lg">{header} </p>
        <p className="font-semibold text-sm text-gray-400">{couponCode}</p>
      </div>
    </div>
  );
}

export default RestaurantMenu;
