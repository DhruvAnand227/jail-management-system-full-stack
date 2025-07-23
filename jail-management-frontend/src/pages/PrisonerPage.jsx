import React, { useState, useEffect } from 'react'
import PrisonerCard from '../PrisonerComponents/PrisonerCard'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

const PrisonerPage = () => {
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [allPrisoner, setAllPrisoner] = useState("");
    const [searched, setSearched] = useState("");
    const [filterType, setFilterType] = useState("default");
    const [startAge, setStartAge] = useState("");
    const [endAge, setEndAge] = useState("");
    const [crimeType, setCrimeType] = useState("");
    const [prisonerID, setPrisonerID] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/prisoner/all')
            .then((res) => {
                setAllPrisoner(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch prisonerData:", err);
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
            url = "http://localhost:3000/prisoner/all";
        }
        else if (filterType === "active") {
            url = "http://localhost:3000/prisoner/filter/active";
        } else if (filterType === "age") {
            url = `http://localhost:3000/prisoner/filter/age/${startAge}/${endAge}`;
        } else if (filterType === "crime") {
            url = `http://localhost:3000/prisoner/filter/crime/${crimeType}`;
        } else if (filterType === "visitor") {
            url = `http://localhost:3000/prisoner/filter/visitor/${prisonerID}`;
        }

        if (url) {
            try {
                const res = await axios.get(url);
                setAllPrisoner(res.data);
                setFilterType("default");
            } catch (err) {
                console.error("Error fetching filter:", err);
            }
        }
    }

    return (
        <>
            {(!allPrisoner) ? (
                <p className='text-lg'>Loading...</p>
            ) : (
                <div className='bg-gradient-to-b from-gray-800 via-gray-900 to-slate-900 max-w-screen min-h-screen flex justify-center items-center relative'>
                    <button onClick={() => navigate('/')} className='border border-black px-4 py-1 md:px-8 md:py-2 bg-red-500 text-white rounded-3xl cursor-pointer font-semibold absolute left-2 top-10'>Go Back</button>

                    <div className='bg-gradient-to-b from-gray-800 via-gray-900 to-slate-900 mt-[20%] mb-[10%] lg:mt-[2%] lg:mb-[2%] w-[80%] min-h-[80%] rounded-xl flex flex-col gap-12'>
                        <div className='flex flex-col xl:flex-row justify-center items-center gap-[18px] mt-[5%]'>

                            <input onChange={handleInput} value={inputVal} type="text" placeholder='Search Prisoner...' className='bg-white rounded-4xl px-5 py-2 w-full lg:w-1/3 xl:w-1/4' />

                            <select onChange={(e) => setFilterType(e.target.value)} value={filterType} name="filter" id="filter" className='bg-white p-2 rounded-3xl'>
                                <option value="default" disabled>Choose Filter</option>
                                <option value="none">None</option>
                                <option value="active">Active Prisoners</option>
                                <option value="age">Age Range</option>
                                <option value="crime">Crime Type</option>
                                <option value="visitor">Visitor (by ID)</option>

                            </select>

                            {filterType === "age" && (
                                <>
                                    <input
                                        type="number"
                                        placeholder="Start Age"
                                        value={startAge}
                                        onChange={(e) => setStartAge(e.target.value)}
                                        className="bg-white px-5 py-2 rounded-4xl"
                                    />
                                    <input
                                        type="number"
                                        placeholder="End Age"
                                        value={endAge}
                                        onChange={(e) => setEndAge(e.target.value)}
                                        className="bg-white px-5 py-2 rounded-4xl"
                                    />
                                </>
                            )}

                            {filterType === "crime" && (
                                <input onChange={(e) => setCrimeType(e.target.value)} value={crimeType} type="text" placeholder='Enter crime type' className='bg-white px-5 py-2 rounded-4xl' />
                            )}

                            {filterType === "visitor" && (
                                <input
                                    type="text"
                                    placeholder="Enter Prisoner ID"
                                    value={prisonerID}
                                    onChange={(e) => setPrisonerID(e.target.value)}
                                    className="bg-white px-5 py-2 rounded-4xl"
                                />
                            )}


                            <button onClick={handleFilter} className='bg-amber-600 px-4 py-2 rounded-2xl cursor-pointer text-white font-semibold hover:bg-amber-700'>Apply Filter</button>

                            <button onClick={() => navigate('/prisoner/add')} className='bg-amber-600 px-4 py-2 rounded-2xl cursor-pointer text-white font-semibold hover:bg-amber-700'>Add Prisoner</button>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 justify-between w-[70%] ml-auto mr-auto mb-[2%]'>
                            {((allPrisoner.length === 0) ? <p className='text-white text-xl text-center'>No Data available</p> : allPrisoner.map(item => {
                                return (!searched || item.Name.startsWith(searched)) && <PrisonerCard key={item._id} id={item._id} name={item.Name} gender={item.Gender} age={item.Age} crime={item.Crime} cell={item.Cell_Number} entryDate={item.Date_Of_Entry} exitDate={item.Date_Of_Exit} punishmentTime={item.Punishment_Time} isActive={item.Is_Active ? "Active" : "Released"} onRelease={() => setRefresh(!refresh)} />
                            }))}
                        </div>
                    </div>

                </div>
            )
            }
        </>
    )
}

export default PrisonerPage;
