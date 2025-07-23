import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const DashboardGoBack = () => {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/")
    }

    return (
        <div>
            <button onClick={handleClick} className='border border-black px-4 py-1 md:px-8 md:py-2 bg-red-500 text-white rounded-3xl cursor-pointer absolute left-2 font-semibold'>Go Back</button>
        </div>
    )
}

export default DashboardGoBack
