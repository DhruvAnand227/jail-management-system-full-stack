import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardBtn = () => {
    const navigate = useNavigate();

    function handleClick() {
        axios.get("http://localhost:3000/protected/login", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            .then((res) => {
                navigate('/dashboard');
            })
            .catch((err) => {
                navigate('/login');
                alert("Login Required")
            });
    }

    return (
        <div>
            <button onClick={handleClick} className='border border-white bg-gradient-to-r from-amber-500 to-orange-700 text-white font-bold px-4 py-2 rounded-full p-4 flex items-center justify-between gap-4 cursor-pointer hover:scale-105 text-sm lg:text-lg'>Access Dashboard <span className="material-symbols-outlined">
                analytics
            </span></button>
        </div>
    )
}

export default DashboardBtn;
