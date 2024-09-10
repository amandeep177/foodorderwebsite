import React, { useContext } from 'react'
import { CartContext } from '../context/contextApi'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteItem } from '../utils/cartSlice';
import toast from 'react-hot-toast';


const Cart = () => {

    // const { cartData, setCartData } = useContext(CartContext)
    // console.log(cartData);
    
    const cartData = useSelector((state)=> state.cartSlice.cartItems)
    const dispatch = useDispatch()
    // let totalPrice =0;
    // for(let i=0;i<cartData.length;i++){
    //    totalPrice = totalPrice+ cartData[i].price/100 || cartData[i].defaultPrice/100
    // }
    let totalPrice = cartData.reduce(function (acc,curval){

       return acc+ curval.price/100 || curval.defaultPrice/100
    },0)

    function handleRemove(i) {
        if(cartData.length > 1){

            let newArr = [...cartData]
            newArr.splice(i, 1)
            dispatch(deleteItem(newArr))
            toast.success("food removed")
            
        }else{
            handleclearcart();
        }
    }
    function handleclearcart(){
        // setCartData([]);
        dispatch(clearCart())
        toast.success("cart is clear")
        
    }


    if (cartData.length === 0) {
        return (
            <div className='w-full' >
                <div className='w-[50%] mx-auto'>
                    <h1> kuch order karle bhai</h1>
                    <Link to="/" className=" underline inline-block text-blue-400"> yha se order krle</Link>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full p-6'>
            <div className='w-[60%] mx-auto'>
                {
                    cartData.map((data, i) => (
                        <div className='flex w-full  justify-between my-5 p-2 '>
                           <div className='w-[70%] '>
                            <h2 className='text-3xl'>{data.name}</h2>
                            <p className='mt-2'>₹{data.price/100 || data.defaultPrice/100} </p>
                           </div>
                            <div className='relative w-[20%] h-full'>

                                <img className='rounded-xl  aspect-square' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + data.imageId} alt="" />
                                <button onClick={() => handleRemove(i)} className='rounded-xl absolute bottom-[-15px] left-10  bg-white border font-bold text-green-500 px-6 py-2 drop-shadow  ' >Remove</button>
                            </div>
                        </div>
                    ))
                }
                <h1>Total- ₹{totalPrice}</h1>
                <button onClick={handleclearcart} className='p-3 border border-gray-600 font-bold text-green-400 bg-white rounded-xl' > Clear Cart</button>
            </div>
        </div>
    )
}

export default Cart







