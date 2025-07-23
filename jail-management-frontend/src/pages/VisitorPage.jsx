import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VisitorCard from '../VisitorComponents/VisitorCard';

const VisitorPage = () => {
    const navigate = useNavigate();
    const [visitors, setVisitors] = useState(null);
    const [filterType, setFilterType] = useState("default");
    const [inputVal, setInputVal] = useState("");
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [date, setDate] = useState(null);
    const [id, setID] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/visitor/all')
            .then(res => setVisitors(res.data))
            .catch(err => console.error("Error fetching visitors:", err));
    }, []);

    function handleInput(e) {
        setInputVal(e.target.value);
    }

    function handleFilters() {
        let url = "";
        if (filterType === "none") {
            url = "http://localhost:3000/visitor/all";
        }
        else if (filterType === "date") {
            url = `http://localhost:3000/visitor/filter/${year}/${month}/${date}`;
        }
        else if (filterType === "prisonerID") {
            url = `http://localhost:3000/visitor/filter/visitor/${id}`;
        }

        if (url) {
            axios.get(url)
                .then(res => setVisitors(res.data))
                .catch(err => console.error("Error fetching visitors:", err));
        }
    }

    return (
        <>

            {!visitors ? (
                <p className='text-black'>Loading...</p>
            )
                : (
                    <div className='bg-gradient-to-b from-gray-800 via-gray-900 to-slate-900 max-w-screen min-h-screen flex justify-center items-center relative'>
                        <button onClick={() => navigate('/')} className='border border-black px-4 py-1 md:px-8 md:py-2 bg-red-500 text-white rounded-3xl cursor-pointer font-semibold absolute left-2 top-10'>Go Back</button>

                        <div className='bg-gradient-to-b from-gray-800 via-gray-900 to-slate-900 mt-[20%] mb-[10%] lg:mt-[2%] lg:mb-[2%] w-[80%] min-h-[80%] rounded-xl flex flex-col gap-12'>
                            <div className='flex flex-col xl:flex-row justify-center items-center gap-[18px] mt-[5%]'>

                                <input onChange={handleInput} value={inputVal} type="text" placeholder='Search Visitor...' className='bg-white rounded-4xl px-5 py-2 w-full lg:w-1/3 xl:w-1/4' />

                                <select onChange={(e) => setFilterType(e.target.value)} value={filterType} name="filter" id="filter" className='bg-white p-2 rounded-3xl'>
                                    <option value="default" disabled>Choose Filter</option>
                                    <option value="none">None</option>
                                    <option value="date">Date</option>
                                    <option value="prisonerID">Prisoner ID</option>

                                </select>

                                {
                                    (filterType === "date") && (
                                        <>
                                            <input type="number" placeholder='Year...' value={year} onChange={(e) => setYear(e.target.value)} className='bg-white rounded-4xl px-5 py-2 w-full lg:w-1/12' />

                                            <input type="number" placeholder='Month...' value={month} onChange={(e) => setMonth(e.target.value)} className='bg-white rounded-4xl px-5 py-2 w-full lg:w-1/12' />

                                            <input type="number" placeholder='Date...' value={date} onChange={(e) => setDate(e.target.value)} className='bg-white rounded-4xl px-5 py-2 w-full lg:w-1/12' />

                                        </>
                                    )}

                                {
                                    (filterType === "prisonerID") && (
                                        <>
                                        <input type="text" placeholder='Enter Prisoner ID...' value={id} onChange={(e)=>setID(e.target.value)} className='bg-white rounded-4xl px-5 py-2 w-full lg:w-1/3 xl:w-1/4' />
                                        </>
                                    )
                                }

                                <button onClick={handleFilters} className='bg-amber-600 px-4 py-2 rounded-2xl cursor-pointer text-white font-semibold hover:bg-amber-700'>Apply Filter</button>

                                <button onClick={() => navigate('/visitor/add')} className='bg-amber-600 px-4 py-2 rounded-2xl cursor-pointer text-white font-semibold hover:bg-amber-700'>Add Visitor</button>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4 w-[90%]'>
                                {visitors.length === 0 ?
                                    <p className='text-white'>No visitors found.</p> :
                                    visitors.map(visitor => (
                                        (visitor.Visitor_Name.startsWith(inputVal.toUpperCase())) &&
                                        <VisitorCard
                                            key={visitor._id}
                                            id={visitor._id}
                                            visitorName={visitor.Visitor_Name}
                                            prisonerId={visitor.Prisoner_ID}
                                            visitCount={visitor.Visit_Count}
                                            relation={visitor.Relation_With_Prisoner}
                                            entryTime={visitor.Entry_Time}
                                            exitTime={visitor.Exit_Time}
                                            totalMeetTime={visitor.Total_Meet_Time}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
};

export default VisitorPage;
