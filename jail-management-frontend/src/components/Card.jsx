import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Card = (props) => {
  const navigate = useNavigate();

  function handleClick() {
    axios.get("http://localhost:3000/protected/login", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => {
        navigate(`/${props.title.toLowerCase()}`);
      })
      .catch((err) => {
        navigate('/login');
        alert("Login Required")
      });
  }

  function randomShadow() {
    return Math.floor(Math.random() * 255);
  }

  const r = randomShadow();
  const g = randomShadow();
  const b = randomShadow();

  const shadow = `0 0 30px 20px rgba(${r},${g},${b},0.7)`;

  return (
    <div onClick={handleClick} className='w-[80%] h-1/2 lg:w-1/4 lg:h-1/2 border border-white rounded-2xl text-center py-[10px] text-sm md:text-lg lg:text-xl xl:text-2xl font-bold  cursor-pointer flex items-center justify-center flex-col hover:scale-110' style={{ boxShadow: shadow, transition: 'box-shadow 1s ease-in-out' }}>{props.title}
      <div className='text-sm lg:text-md xl:text-lg font-semibold my-5'>{props.description}</div>
    </div>
  )
}

export default Card;
