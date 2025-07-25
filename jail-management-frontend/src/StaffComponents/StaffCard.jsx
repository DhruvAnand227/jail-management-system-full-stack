import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StaffCard = (props) => {
    const navigate = useNavigate();

    async function handleDelete() {
        await axios.put(`http://localhost:3000/staff/fire/${props.id}`)
            .then((res) => {
                console.log(res.data);
                props.onFire();
            })
            .catch((err) => {
                console.error("Failed to fetch staffData:", err);
            });
        
    }

    function handleUpdate() {
        navigate(`/staff/update/${props.id}`, {
            state: {
                _id: props.id,
                Name: props.name,          
                Age: props.age,
                Designation: props.designation,
                Gender: props.gender,
                Shifting_Time: props.shiftingTime,
                Contact_Number: props.contactNo,
                Address: props.address
            }
        });
    }

    return (

        <div className="bg-white text-black rounded-2xl shadow-xl p-6 w-[220px] md:w-[300px] hover:scale-[1.03] transition-all duration-300">
            {/* Header: Name & Gender */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{props.name}</h2>
                <span className="bg-gray-200 text-sm font-medium px-2 py-1 rounded">{props.gender}</span>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold">Age:</span> {props.age}</p>
                <p><span className="font-semibold">Designation:</span> {props.designation}</p>
                <p><span className="font-semibold">Shifting Time:</span> {props.shiftingTime}</p>
                <p><span className="font-semibold">Contact Number:</span> {(props.contactNo)}</p>
                <p><span className="font-semibold">Address:</span> {props.address}</p>
                <p><span className="font-semibold">Status:</span> {props.isResigned}</p>
            </div>

            {/* Action */}
            <div className="mt-4 text-right flex gap-2 items-center justify-between">
                <button onClick={handleUpdate} className='bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-2 py-2 rounded-xl'>Update</button>
                <button onClick={handleDelete} className='bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-6 py-2 rounded-xl'>Fire</button>
            </div>
        </div>
    )
}

export default StaffCard;
