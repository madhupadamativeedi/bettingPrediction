
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handelLogin = async () => {
    try {
        setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data)
      if(res.ok){
        navigate("/login")
      }
    } catch (err) {
      console.log(err);
    }finally{
        setLoading(false);
    }
  };
  return (
     <div className="min-h-screen flex items-center justify-center bg-[#050B2E] bg-gradient-to-br from-[#050B2E] via-[#0A1245] to-[#1A144B]">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white"> Register</h1>
          {/* <p className="text-gray-400 mt-3">Register</p> */}
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2">Name</label>

            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full bg-[#0F172A] border border-[#2A1D75] rounded-xl p-4 text-white outline-none focus:border-[#7C3AED] transition-all"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-[#0F172A] border border-[#2A1D75] rounded-xl p-4 text-white outline-none focus:border-[#7C3AED] transition-all"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-[#0F172A] border border-[#2A1D75] rounded-xl p-4 text-white outline-none focus:border-[#7C3AED] transition-all"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="
          w-full
          py-4
          rounded-xl
          text-white
          font-semibold
          bg-gradient-to-r
          from-[#7C3AED]
          to-[#2563EB]
          hover:scale-[1.02]
          transition-all
          duration-300
          shadow-lg
        "
            onClick={handelLogin}
          >
            SignUp{loading ? (<div>Loadding.....</div>):""}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Alredy an Account ?{" "}
            <span className="text-purple-400 cursor-pointer" onClick={()=>navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register