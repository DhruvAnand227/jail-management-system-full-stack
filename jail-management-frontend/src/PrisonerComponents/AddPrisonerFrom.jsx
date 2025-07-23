import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function PrisonerAddForm() {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            Name: "",
            Age: "",
            Gender: "",
            Crime: "",
            Punishment_Time: ""
        }
    });

    useEffect(() => {
        if (location.state && location.state._id) {
            const { Name, Age, Gender, Crime, Punishment_Time } = location.state;
            setValue("Name", Name || "");
            setValue("Age", Age || "");
            setValue("Gender", Gender || "");
            setValue("Crime", Crime || "");
            setValue("Punishment_Time", Punishment_Time || "");
        }
    }, [location, setValue]);


    const onSubmit = async (data) => {
        try {
            if (location.state && location.state._id) {
                await axios.put(`http://localhost:3000/prisoner/update/${location.state._id}`, data)
                alert("Data Updated");
            }
            else {
                await axios.post(`http://localhost:3000/prisoner/add`, data)
                alert("Data Added");
            }
            navigate('/prisoner');

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
                <h2 className="text-2xl font-bold text-center text-gray-800">Add New Prisoner</h2>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        {...register('Name', { required: true })}
                        placeholder="Enter name..."
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Name && <p className="text-red-500 text-sm mt-1">Name is required.</p>}
                </div>

                {/* Age */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                        type="number"
                        {...register('Age', { required: true, min: 18, max: 99 })}
                        placeholder="Enter age..."
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Age && <p className="text-red-500 text-sm mt-1">Age must be between 18 and 99.</p>}
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                        {...register('Gender', { required: true })}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                    {errors.Gender && <p className="text-red-500 text-sm mt-1">Gender is required.</p>}
                </div>

                {/* Crime */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Crime</label>
                    <input
                        type="text"
                        {...register('Crime', { required: true })}
                        placeholder="Enter crime..."
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Crime && <p className="text-red-500 text-sm mt-1">Crime is required.</p>}
                </div>

                {/* Punishment Time */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Punishment Time</label>
                    <input
                        type="text"
                        {...register('Punishment_Time', { required: true })}
                        placeholder='e.g. "5 years"'
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Punishment_Time && (
                        <p className="text-red-500 text-sm mt-1">Punishment time is required.</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-2 mt-4 rounded-lg font-semibold hover:bg-amber-700 transition duration-200"
                >
                    {location.state? "Update Prisoner": "Add Prisoner"}
                </button>
            </form>
        </div>
    );
}

export default PrisonerAddForm;
