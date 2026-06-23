import React, { useState } from "react";

const Popupbox = ({betColore, onClose}) => {
    const [inputMoney, setInputMoney] = useState(1)
  
   const betApi = async () => {
  let payload;

  if (betColore.color === "red") {
    payload = {
      betRecoredID: betColore.id,
      userBetOnRed: Number(inputMoney),
    };
  } else if (betColore.color === "green") {
    payload = {
      betRecoredID: betColore.id,
      userBetOnGreen: Number(inputMoney),
    };
  }

  const res = await fetch("http://localhost:3000/api/userbet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log(data);
};
    // console.log(betColore, "betColorebetColore")
    const handelMoneyAdd = (money)=>{
       setInputMoney(money)
    }  
    const handelMoneyIncrease = ()=>{
        setInputMoney(pre=>pre+1)
    }
    const handelMoneyDecrease = ()=>{
        if(inputMoney <= 1) return
        setInputMoney(pre=>pre-1)
    }
    const submitBet = ()=>{
        betApi()
        alert(`bet is placed, inputMoney is ${inputMoney} and colore ${betColore.color}` )
        onClose()
    }
  return (
    <div>
      <div className=" w-[150%] text-black bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-red-500 text-white text-center py-4">
          <h2 className="text-xl font-bold tracking-wider">Join Red</h2>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6">
          {/* Contract Money */}
          <div>
            <p className="text-gray-700 font-medium mb-3">
              Contract Money (Base)
            </p>

            <div className="grid grid-cols-4 gap-3">
              {[10, 100, 1000, 10000].map((money) => (
                <button
                  key={money}
                  className="
              py-2
              rounded-lg
              border
              border-red-300
              hover:bg-red-500
              hover:text-white
              transition
              cursor-pointer
            "
            onClick={()=>handelMoneyAdd(money)}
                >
                  {money}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-gray-700 font-medium mb-3">Number (Count)</p>

            <div className="flex items-center gap-3">
              <button
                className="
            w-10
            h-10
            rounded-lg
            bg-gray-200
            text-xl
            font-bold
          "
          onClick={handelMoneyDecrease}

              >
                -
              </button>

              <input
                type="number"
                value={inputMoney}
               
                className="
            w-20
            text-center
            border
            rounded-lg
            py-2
          "
          onChange={(e)=>setInputMoney(e.target.value)}
              />

              <button
                className="
            w-10
            h-10
            rounded-lg
            bg-red-500
            text-white
            text-xl
            font-bold
          "
          onClick={handelMoneyIncrease}
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl">
            <p className="font-medium">Total Contract Money</p>

            <span className="text-xl font-bold text-red-500">₹{inputMoney}</span>
          </div>

          {/* Submit */}
          <button
            className="
        w-full
        bg-red-500
        text-white
        py-3
        rounded-xl
        font-semibold
        hover:bg-red-600
        transition
      "
      onClick={submitBet}
          >
            Confirm Bet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popupbox;
