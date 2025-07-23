import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm()

    const onsubmit = (data) => {
        
        axios.post(`http://localhost:3000/protected`, { password: data.password })
            .then((res) => {
                localStorage.setItem("token", `${res.data.token}`)
                alert("Logged in Successfully");
                navigate('/');
            })
            .catch((err) => {
                alert("Wrong Password!")
                console.log(err);
                resetField("password");
            });
    }

    return (
        <>
            <div className='bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900 min-h-screen flex justify-center items-center'>
                <form
                    onSubmit={handleSubmit(onsubmit)}
                    autoComplete='off'
                    className='card bg-white h-[250px] w-[320px] rounded-2xl flex items-center flex-col gap-6'>


                    <h1 className='font-bold text-2xl mt-[10px]'>Login</h1>

                    <div className='flex justify-center items-center gap-2'>
                        <label className="text-sm font-medium text-gray-700 mt-1">Password:</label>
                        <input
                            type='password'
                            {...register('password', { required: true })}
                            placeholder="Enter login password..."
                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-1"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">Password is required.</p>}
                    </div>

                    <div className='flex justify-start items-center gap-2 w-full ml-[60px]'>
                        <input
                            type='checkbox'
                            {...register('keepSignedIn')}
                        />
                        <p className='text-sm '>Keep signed in</p>
                    </div>

                    <button
                        type='submit'
                        className='bg-amber-600 cursor-pointer text-white font-semibold text-lg px-4 py-2 rounded-3xl'
                    >Submit</button>

                </form>
            </div>
        </>
    )
}

export default Login;
