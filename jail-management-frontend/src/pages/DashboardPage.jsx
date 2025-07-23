import React, { useEffect, useState } from 'react';
import DashboardData from '../components/DashboardData';
import DashboardGoBack from '../components/DashboardGoBack';
import axios from 'axios';

const DashboardPage = () => {
  const [prisonerData, setPrisonerData] = useState(null);
  const [staffData, setStaffData] = useState(null);
  const [visitorData, setVisitorData] = useState(null);

  useEffect(() => {
    axios.post('http://localhost:3000/dashboard/prisonerCount', { password: 'admin' })
      .then((res) => {
        setPrisonerData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch prisonerData:", err);
      });

    axios.post('http://localhost:3000/dashboard/staffCount', { password: 'admin' })
      .then((res) => {
        setStaffData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch staffData:", err);
      });

    axios.post('http://localhost:3000/dashboard/visitorCount', { password: 'admin' })
      .then((res) => {
        setVisitorData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch visitorData:", err);
      });

  }, []);

  return (
    <div className="text-black py-8 w-screen h-screen" style={{
      backgroundImage: "radial-gradient(circle at 50% 50%, #7dd3fc, #1e3a8a)"
    }}>
      <div className='flex justify-center relative'>
        <DashboardGoBack/>
        <h1 className="text-lg font-bold lg:text-3xl">Dashboard</h1>
      </div>

      {(!prisonerData || !staffData || !visitorData) ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <div className='w-[95vw] lg:w-[80vw] xl:w-[70vw] h-[85vh] rounded-2xl bg-white m-auto my-8 overflow-auto'>

          {/* For Prisoner */}
          <div className="prisoner w-full h-1/3 p-4 lg:p-12 flex flex-col justify-center gap-5">
            <div className='text-sm font-extrabold lg:text-lg xl:text-lg 2xl:text-2xl flex flex-col gap-2 text-center'>Prisoners
              <div className='w-[150px] md:w-[300px] h-[1px] bg-black m-auto'></div>
            </div>
            <div className="prisonerData flex gap-3.5 lg:gap-12">
              <DashboardData title="Total Prisoners" value={prisonerData["Total Prisoners"]} />
              <DashboardData title="Active Prisoners" value={prisonerData["Active Prisoners"]} />
              <DashboardData title="Released Prisoners" value={prisonerData["Inactive Prisoners"]} />
              <DashboardData title="Male Prisoners" value={prisonerData["Male Prisoners"]} />
              <DashboardData title="Female Prisoners" value={prisonerData["Female Prisoners"]} />
            </div>
          </div>
          <div className='w-[90%] h-[1px] bg-black m-auto my-1 lg:my-4'></div>

          {/* For Staffs */}
          <div className="staff w-full h-1/4 p-4 lg:p-12 flex flex-col justify-center gap-5">
            <div className='text-sm font-extrabold lg:text-lg 2xl:text-2xl flex flex-col gap-2 text-center'>Staffs
              <div className='w-[150px] md:w-[300px] h-[1px] bg-black m-auto'></div>
            </div>
            <div className="staffData flex gap-3.5 lg:gap-12">
              <DashboardData title="Total staffs" value={staffData["Total Staffs"]} />
              <DashboardData title="Active staffs" value={staffData["Active Staffs"]} />
              <DashboardData title="Inactive staffs" value={staffData["Inactive Staffs"]} />
              <DashboardData title="Resigned staffs" value={staffData["Resigned Staffs"]} />
              <DashboardData title="Male staffs" value={staffData["Male Staffs"]} />
              <DashboardData title="Female staffs" value={staffData["Female Staffs"]} />
            </div>
          </div>
          <div className='w-[90%] h-[1px] bg-black m-auto my-4'></div>

          {/* For Visitors */}
          <div className="visitor w-full h-1/4 p-4 lg:p-12 flex flex-col justify-center gap-5">
            <div className='text-sm font-extrabold lg:text-lg 2xl:text-2xl flex flex-col gap-2 text-center'>Visitors
              <div className='w-[150px] md:w-[300px] h-[1px] bg-black m-auto'></div>
            </div>
            <div className="staffData flex gap-3.5 lg:gap-12">
              <DashboardData title="Total Visitors" value={visitorData["Total Visitors"]}/>
              <DashboardData title="Avearge Meet Time" value={visitorData["Average Time"]}/>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default DashboardPage;