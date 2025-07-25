import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PrisonerCard = (props) => {
    const navigate = useNavigate();

    async function handleDelete() {
        await axios.put(`http://localhost:3000/prisoner/delete/${props.id}`)
            .then((res) => {
                console.log(res.data);
                props.onRelease();
            })
            .catch((err) => {
                console.error("Failed to fetch prisonerData:", err);
            });
    }

    function handleUpdate() {
        navigate(`/prisoner/update/${props.id}`, {
            state: {
                _id: props.id,
                Name: props.name,          
                Age: props.age,
                Gender: props.gender,
                Crime: props.crime,
                Punishment_Time: props.punishmentTime
            }
        });
    }

    return (

        <div className="bg-white text-black rounded-2xl shadow-xl p-6 w-[250px] md:w-[300px] hover:scale-[1.03] transition-all duration-300">
            {/* Header: Name & Gender */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{props.name}</h2>
                <span className="bg-gray-200 text-sm font-medium px-2 py-1 rounded">{props.gender}</span>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold">ID:</span> {props.id}</p>
                <p><span className="font-semibold">Age:</span> {props.age}</p>
                <p><span className="font-semibold">Crime:</span> {props.crime}</p>
                <p><span className="font-semibold">Cell Number:</span> {props.cell}</p>
                <p><span className="font-semibold">Entry Date:</span> {new Date(props.entryDate).toLocaleDateString()}</p>
                <p><span className="font-semibold">Exit Date:</span> {new Date(props.exitDate).toLocaleDateString()}</p>
                <p><span className="font-semibold">Punishment Time:</span> {props.punishmentTime}</p>
                <p><span className="font-semibold">Status:</span> {props.isActive}</p>
            </div>

            {/* Action */}
            <div className="mt-4 text-right flex gap-2 items-center justify-between">
                <button onClick={handleUpdate} className='bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-2 py-2 rounded-xl'>Update</button>
                <button onClick={handleDelete} className='bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-2 py-2 rounded-xl'>Release</button>
            </div>
        </div>
    )
}

export default PrisonerCard;
