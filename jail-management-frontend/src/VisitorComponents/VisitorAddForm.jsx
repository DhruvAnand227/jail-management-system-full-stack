import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VisitorAddForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post(`http://localhost:3000/visitor/add/${data.Prisoner_ID}`, data)
            navigate('/visitor')

        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900 min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-xl rounded-2xl px-8 py-10 w-[90%] sm:w-[450px] flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Add New Visitor</h2>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        {...register('Visitor_Name', { required: true })}
                        placeholder="Enter name..."
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
                </div>

                {/* Prisoner ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Prisoner ID</label>
                    <input
                        type="text"
                        {...register('Prisoner_ID', { required: true })}
                        placeholder="Enter Prisoner ID..."
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Prisoner_ID && <p className="text-red-500 text-sm mt-1">Prisoner ID is required</p>}
                </div>

                {/* Relation */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Relation</label>
                    <input
                        type="text"
                        {...register('Relation_With_Prisoner', { required: true })}
                        placeholder="Enter relation..."
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Relation_With_Prisoner && <p className="text-red-500 text-sm mt-1">Relation is required</p>}
                </div>

                {/* Meeting Time */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Meeting Time</label>
                    <input
                        type="number"
                        {...register('Total_Meet_Time', { required: true, min: 0, max: 60 })}
                        placeholder='in minutes'
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Total_Meet_Time && (
                        <p className="text-red-500 text-sm mt-1">Meeting time is required</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-2 mt-4 rounded-lg font-semibold hover:bg-amber-700 transition duration-200"
                >
                    Add Visitor
                </button>
            </form>
        </div>
    );
}

export default VisitorAddForm;
