import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Popupbox from "./Popupbox";

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const getNumberStyle = (i) => {
  if (i === 0) return "bg-gradient-to-br from-purple-600 to-red-500 text-white";

  if (i === 5)
    return "bg-gradient-to-br from-purple-600 to-green-400 text-white";

  if (i % 2 === 0) return "bg-red-600 text-white";

  return "bg-green-500 text-white";
};

const MainComponent = () => {
  const [time, setTime] = useState();
  const [parityRecord, setParityRecord] = useState([]);
  const [callapi, setCallApi] = useState(0);
  const [postColor, setPostColor] = useState({
    id:null,
    color:"",
    
  });
  const [pagination, setPagination] = useState(10)
  const [Prevpagination, setprevPagination] = useState(0)
  const [paginationPages, setPaginationPages] = useState(0)
  const [showPopup, setShowPopup] = useState(false)


  const socket = io("http://localhost:3000");

  const parityData = async () => {
    const data = await fetch("http://localhost:3000/api/totalrecords");
    const jsonData = await data.json();
    console.log(jsonData.totalRecords);
    setParityRecord(jsonData.totalRecords);
  };
  // console.log(parityRecord[0]._id)

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const handelGreen = () => {
    setPostColor({
      id:parityRecord[0]._id,
      color:"green"
    });
    setShowPopup(true)
  };
  const handelRed = () => {
    setPostColor({
      id:parityRecord[0]._id,
      color:"red"
    });
    setShowPopup(true)

  };

  const paginationLeft = ()=>{
    if(paginationPages<=0) return
      setprevPagination(pagination)
      setPagination(paginationPages*10)
      setPaginationPages(pre => pre-1)
  }
  const paginationRight = ()=>{
    if(parityRecord.length < pagination ) return
    setprevPagination(pagination)
      setPagination(paginationPages*10)
      setPaginationPages(pre => pre+1)
  }

  useEffect(() => {
    socket.on("timer", (value) => {
      setTime(value);
      let count = 0;
      if (value <= 0) {
        setCallApi((pre) => (pre += count + 1));
      }
    });

    return () => socket.off("timer");
  }, []);

  useEffect(() => {
    parityData();
    console.log(parityRecord, "parityRecordparityRecordparityRecord");
  }, [callapi]);

  return (
    <div className="min-h-screen bg-[#050B2E] p-3 sm:p-5 md:p-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Hero Card */}
        <div
          className="
            bg-[#17164A]
            rounded-3xl
            border
            border-[#2E3A75]
            shadow-lg
            p-5
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-6
          "
        >
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">Period</p>

            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mt-2 break-all">
             {parityRecord[0]?.totalReacore + 1}
            </h1>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
              <button className="px-5 py-2 rounded-xl bg-green-500/20 border border-green-500 text-green-400 font-semibold">
                🟢 Live
              </button>

              <button
                className=" hidden md:block px-5 py-2 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600"
                onClick={handelGreen}
              >
                Join Green
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">Countdown</p>

            <h1 className="text-4xl md:text-6xl font-bold text-white mt-2">
              <span>{String(minutes).padStart(2, "0")}:</span>
              <span>{String(seconds).padStart(2, "0")}</span>
            </h1>
            <div className="flex gap-5">
              <button
                className="mt-5 px-6 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600"
                onClick={handelRed}
              >
                Join Red
              </button>
              <button
                className=" md:hidden mt-5 px-5 py-2 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600"
                onClick={handelGreen}
              >
                Join Green
              </button>
            </div>
          </div>
        </div>

        {/* Numbers */}
        <div
          className="
            mt-5
            bg-[#17164A]
            border
            border-[#2E3A75]
            rounded-2xl
            p-3
          "
        >
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {numbers.map((num, i) => (
              <button
                key={i}
                className={`
                    h-[6vh]
                  rounded-xl
                  font-bold
                  text-lg
                  md:text-2xl
                  flex
                  items-center
                  justify-center
                  transition-all
                  hover:scale-105
                  ${getNumberStyle(i)}
                `}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="mt-5 overflow-x-auto">
          <div
            className="
              min-w-[650px]
              border
              border-gray-700
              rounded-2xl
              overflow-hidden
              bg-[#17164A]
            "
          >
            {/* Header */}
            <div
              className="
                grid
                grid-cols-4
                px-6
                py-3
                border-b
                border-gray-700
                text-gray-400
                font-medium
              "
            >
              <span>Period</span>
              <span>Price</span>
              <span>Number</span>
              <span>Result</span>
            </div>

            {/* Rows */}
            {parityRecord.slice(Prevpagination,pagination).map((rec, index) => (
              <div
                key={index}
                className="
                  grid
                  grid-cols-4
                  items-center
                  px-6
                  py-3
                  border-b
                  border-gray-700
                  last:border-b-0
                "
              >
                <p className="text-gray-300">{rec.totalReacore}</p>

                <p className="text-white">₹ {rec.price.toLocaleString()}</p>

                <div>
                  <span
                    className={`
                      w-8
                      h-8
                      rounded-full
                      flex
                      items-center
                      justify-center
                      font-bold
                      ${
                        rec.number % 2 === 0
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }
                    `}
                  >
                    {rec.number}
                  </span>
                </div>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-lg
                    w-fit
                    text-sm
                    ${
                      rec.result === "red"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }
                  `}
                >
                  {rec.result}
                </span>
              </div>
            ))}
            <div className="flex justify-end gap-5 text-xl text-white  pr-10">

            <p className="p-1 border rounded-[5px] cursor-pointer" onClick={paginationLeft}>{"<"}</p>
            <p>{paginationPages}</p>
            <p className="p-1 border rounded-[5px] cursor-pointer" onClick={paginationRight}>{">"}</p>
            </div>
          </div>
        </div>
      </div>
     {showPopup && (
  <div className="fixed inset-0 bg-black/50 z-50">
    <div className="absolute top-20 left-1/2 -translate-x-1/2">
      <Popupbox betColore={postColor} onClose={() => setShowPopup(false)} />
    </div>
  </div>
)}
    </div>
  );
};

export default MainComponent;
