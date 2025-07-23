import React from 'react'

const VisitorCard = (props) => {
    return (
        <div className="bg-white text-black rounded-2xl shadow-xl p-6 w-[250px] md:w-[280px] hover:scale-[1.03] transition-all duration-300">
            {/* Header: Visitor Name & Relation */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{props.visitorName}</h2>
                <span className="bg-gray-200 text-sm font-medium px-2 py-1 rounded">{props.relation}</span>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold">Visitor ID:</span> {props.id}</p>
                <p><span className="font-semibold">Prisoner ID:</span> {props.prisonerId}</p>
                <p><span className="font-semibold">Entry Time:</span> {new Date(props.entryTime).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'Asia/Kolkata'
                })}</p>
                <p><span className="font-semibold">Exit Time:</span> {new Date(props.exitTime).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'Asia/Kolkata'
                })}</p>
                <p><span className="font-semibold">Total Meet Time:</span> {props.totalMeetTime} mins</p>
                <p><span className="font-semibold">Visit Count:</span> {props.visitCount}</p>
            </div>
        </div>
    )
}

export default VisitorCard;
