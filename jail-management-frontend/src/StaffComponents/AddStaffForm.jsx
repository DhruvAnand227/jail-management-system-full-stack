import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function StaffAddForm() {
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
            Designation: "",
            Shifting_Time: "",
            Contact_Number: "",
            Address: ""
        }
    });

    useEffect(() => {
        if (location.state) {
            const {
                Name, Age, Gender, Designation,
                Shifting_Time, Contact_Number, Address
            } = location.state;

            setValue("Name", Name || "");
            setValue("Age", Age || "");
            setValue("Gender", Gender || "");
            setValue("Designation", Designation || "");
            setValue("Shifting_Time", Shifting_Time || "");
            setValue("Contact_Number", Contact_Number || "");
            setValue("Address", Address || "");
        }
    }, [location, setValue]);

    const onSubmit = async (data) => {
        try {
            if (location.state && location.state._id) {
                await axios.put(`http://localhost:3000/staff/update/${location.state._id}`, data);
                alert("Staff info updated!");
            } else {
                await axios.post("http://localhost:3000/staff/hire", data);
                alert("Staff hired successfully!");
            }
            navigate('/staff');
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
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    {location.state ? "Update Staff Info" : "Hire New Staff"}
                </h2>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        {...register('Name', { required: true })}
                        placeholder="Enter name"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Name && <p className="text-red-500 text-sm mt-1">Name is required.</p>}
                </div>

                {/* Age */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                        type="number"
                        {...register('Age', { required: true, min: 18, max: 70 })}
                        placeholder="Enter age"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Age && <p className="text-red-500 text-sm mt-1">Age must be between 18 and 70.</p>}
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

                {/* Designation */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Designation</label>
                    <input
                        type="text"
                        {...register('Designation', { required: true })}
                        placeholder="Enter designation"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Designation && <p className="text-red-500 text-sm mt-1">Designation is required.</p>}
                </div>

                {/* Shifting Time */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Shifting Time</label>
                    <select
                        {...register('Shifting_Time', { required: true })}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    >
                        <option value="">Select Shift</option>
                        <option value="MORNING">Morning</option>
                        <option value="EVENING">Evening</option>
                        <option value="NIGHT">Night</option>
                    </select>
                    {errors.Shifting_Time && <p className="text-red-500 text-sm mt-1">Shift is required.</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input
                        type="text"
                        {...register('Contact_Number', {
                            required: true,
                            pattern: /^[0-9]{10}$/
                        })}
                        placeholder="Enter 10-digit contact number"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Contact_Number && <p className="text-red-500 text-sm mt-1">Enter valid 10-digit contact number.</p>}
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        {...register('Address', { required: true })}
                        placeholder="Enter address"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.Address && <p className="text-red-500 text-sm mt-1">Address is required.</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-2 mt-4 rounded-lg font-semibold hover:bg-amber-700 transition duration-200"
                >
                    {location.state ? "Update Staff" : "Hire Staff"}
                </button>
            </form>
        </div>
    );
}

export default StaffAddForm;
