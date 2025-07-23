import React, { useState, useEffect } from 'react'
import StaffCard from '../StaffComponents/StaffCard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const StaffPage = () => {
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [allStaff, setAllStaff] = useState("");
    const [searched, setSearched] = useState("");
    const [filterType, setFilterType] = useState("default");
    const [designation, setDesignation] = useState("");
    const [shiftingTime, setShiftingTime] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/staff/all')
            .then((res) => {
                setAllStaff(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch staff data:", err);
            });

    }, [refresh])

    useEffect(() => {
        setSearched(inputVal.toUpperCase());
    }, [inputVal])

    function handleInput(e) {
        setInputVal(e.target.value);
    }

    async function handleFilter() {
        let url = "";

        if (filterType === "none") {
            url = "http://localhost:3000/staff/all";
        }
        else if (filterType === "active") {
            url = "http://localhost:3000/staff/active";
        } else if (filterType === "designation") {
            url = `http://localhost:3000/staff/filter/designation/${designation}`;
        } else if (filterType === "shifting") {
            url = `http://localhost:3000/staff/filter/shiftingTime/${shiftingTime}`;
        }

        if (url) {
            try {
                const res = await axios.get(url);
                if (res.data) {
                    setAllStaff(res.data);
                }
                console.log("Error");
                setFilterType("default");
            } catch (err) {
                console.error("Error fetching filter:", err);
            }
        }
    }

    return (
        <>
            {(!allStaff) ? (
                <p className='text-lg'>Loading...</p>
            ) : (
                <div className='bg-gradient-to-b from-gray-800 via-gray-900 to-slate-900 max-w-screen min-h-screen flex justify-center items-center relative'>
                    <button onClick={() => navigate('/')} className='border border-black px-4 py-1 md:px-8 md:py-2 bg-red-500 text-white rounded-3xl cursor-pointer font-semibold absolute left-2 top-10'>Go Back</button>

                    <div className='bg-gradient-to-b from-gray-800 via-gray-900 to-slate-900 mt-[20%] mb-[10%] md:mt-[2%] md:mb-[2%] w-[80%] min-h-[80%] rounded-xl flex flex-col gap-12'>
                        <div className='flex flex-col xl:flex-row justify-center items-center gap-[18px] mt-[5%]'>

                            <input onChange={handleInput} value={inputVal} type="text" placeholder='Search Staff...' className='bg-white rounded-4xl px-5 py-2 w-full lg:w-1/3 xl:w-1/4' />

                            <select onChange={(e) => setFilterType(e.target.value)} value={filterType} name="filter" id="filter" className='bg-white p-2 rounded-3xl'>
                                <option value="default" disabled>Choose Filter</option>
                                <option value="none">None</option>
                                <option value="active">Active Staff</option>
                                <option value="designation">By Designation</option>
                                <option value="shifting">By Shifting Time</option>
                            </select>

                            {filterType === "designation" && (
                                <input onChange={(e) => setDesignation(e.target.value)} value={designation} type="text" placeholder='Enter Designation' className='bg-white px-5 py-2 rounded-4xl' />
                            )}

                            {filterType === "shifting" && (
                                <input onChange={(e) => setShiftingTime(e.target.value)} value={shiftingTime} type="text" placeholder='Enter Shifting Time' className='bg-white px-5 py-2 rounded-4xl' />
                            )}

                            <button onClick={handleFilter} className='bg-amber-600 px-4 py-2 rounded-2xl cursor-pointer text-white font-semibold hover:bg-amber-700'>Apply Filter</button>

                            <button onClick={() => navigate('/staff/add')} className='bg-amber-600 px-4 py-2 rounded-2xl cursor-pointer text-white font-semibold hover:bg-amber-700'>Hire Staff</button>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 justify-between w-[70%] ml-auto mr-auto mb-[2%]'>
                            {((allStaff.length === 0) ? <p className='text-white text-xl text-center'>No Data available</p> : allStaff.map(item => {
                                return (!searched || item.Name.startsWith(searched)) && <StaffCard
                                    key={item._id}
                                    id={item._id}
                                    name={item.Name}
                                    age={item.Age}
                                    gender={item.Gender}
                                    designation={item.Designation}
                                    shiftingTime={item.Shifting_Time}
                                    contactNo={item.Contact_Number}
                                    address={item.Address}
                                    isResigned={item.Resigned ? "Resigned" : "Working"}
                                    onFire={() => setRefresh(!refresh)}
                                />
                            }))}
                        </div>
                    </div>

                </div>
            )}
        </>
    )
}

export default StaffPage;
