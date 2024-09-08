import React from 'react'
import RestaurantCard from './RestaurantCard'

const OnlineFoodDel = ({data,title}) => {
  return (
    <div className='mt-8'>
        <p className='font-bold text-2xl '>
      {title}
        </p>
            
      <div className='grid grid-cols-4 gap-9'>

      {data.map(
          (
            { info, cta:{link}} // destructure
          ) => (
           < RestaurantCard {...info} link={link}/>
           
          )
        )}
        </div>
    </div>
  )
}

export default OnlineFoodDel
