import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import DashboardBtn from "../components/Dashboard-btn";

const Home = () => {
  const [text] = useState("Welcome To System Admin...");
  const [writeText, setWriteText] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function loopText() {
      while (!isCancelled) {
        // Type forward
        for (let i = 0; i <= text.length; i++) {
          if (isCancelled) return;
          setWriteText(text.slice(0, i));
          await sleep(100);
        }

        await sleep(500);

        // Delete backward
        for (let i = text.length; i >= 0; i--) {
          if (isCancelled) return;
          setWriteText(text.slice(0, i));
          await sleep(50);
        }

        await sleep(300);
      }
    }

    loopText();

    return () => {
      isCancelled = true;
    };
  }, [text]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <>
      <div
        className="relative w-screen min-h-screen text-slate-100 font-medium bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://getwallpapers.com/wallpaper/full/d/1/6/141900.jpg')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

        {/* Actual content */}
        <div className="relative z-10">
          <Navbar />
          <div className="welcome text-lg md:text-2xl lg:text-4xl text-center my-[62px] font-bold">
            Hello, {writeText}
          </div>

          <div className="w-[70vw] h-[40vh] m-auto py-10 my-12 flex flex-col gap-[28px] lg:flex-row items-center justify-evenly">
            <Card title="Prisoner" description="Manage Prisoner Info..." />
            <Card title="Staff" description="Manage Staff Info..." />
            <Card title="Visitor" description="Manage Visitor Info..." />
          </div>

          <div className="w-[60vw] m-auto p-[70px_0_0_0] sm:py-10 my-12 flex items-center justify-center lg:justify-end">
            <DashboardBtn />
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;