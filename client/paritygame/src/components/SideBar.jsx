import React from "react";

const SideBar = () => {
  const sidebarlist = [
    {
      icon: "🏠",
      name: "Dashboard",
    },
    {
      icon: "🎲",
      name: "Parity",
    },
    {
      icon: "📊",
      name: "Sapre",
    },
    {
      icon: "💎",
      name: "Bcone",
    },
    {
      icon: "⭐",
      name: "Emerd",
    },
  ];

  const wallet = [{
    icon:"",
    name:"My Bets"
  },
    {
        icon:"",
    name:"My Parity Record"
    },
    {
        icon:"",
    name:"Transactions"
    },{
        icon:"",
    name:"Wallet"
    },{
        icon:"",
    name:"Refer & Earn"
    },
]

  return (
    <div className="w-full rounded-2xl min-h-screen bg-[#050B2E] text-white p-4">
      <h2 className="text-xl font-bold mb-2">
        SHOP
      </h2>

      <div className="flex flex-col gap-1">
        {sidebarlist.map((item, index) => (
          <div
            key={index}
            className="
              flex
              text-[12px]
              items-center
              gap-3
              p-3
              rounded-xl
              cursor-pointer
              hover:bg-[#17164A]
              transition-all
            "
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="w-full h-[2px] bg-amber-200"></div>
      <div className="flex flex-col gap-1">
        {wallet.map((item, index) => (
          <div
            key={index}
            className="
              text-[12px]
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              cursor-pointer
              hover:bg-[#17164A]
              transition-all
            "
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;