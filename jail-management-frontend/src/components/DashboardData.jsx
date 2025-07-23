import React from 'react'

const DashboardData = (props) => {

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='font-bold text-[12px] lg:text-md 2xl:text-xl'>{props.title}</div>
      <div className='w-[52px] h-[52px] xl:w-[84px] xl:h-[84px] 2xl:w-[108px] 2xl:h-[108px] rounded-full bg-gradient-to-r from-pink-400 via-amber-400 to-pink-600 flex justify-center items-center cursor-pointer'>
        <div className='w-[40px] h-[40px] xl:w-[72px] xl:h-[72px] 2xl:w-[92px] 2xl:h-[92px] text-[12px] md:text-md xl:text-lg rounded-full bg-white flex items-center justify-center font-semibold overflow-auto'>{props.value}</div>
      </div>
    </div>
  )
}

export default DashboardData;
