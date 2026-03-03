import { useState } from "react";

export default function LoginPage({ setUser, nav }) {
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !pass) { setError("กรุณากรอกข้อมูลให้ครบถ้วน"); return; }
    if (email === "admin@cshop.com" && pass === "admin") {
      setUser({ name:"Admin 1", role:"admin" });
    } else {
      setUser({ name:"User 1", role:"user" });
    }
    nav({ name:"home" });
  };

  return (
    <div className="flex flex-col flex-1 px-4 pt-5">
      <div className="border border-gray-200 rounded-2xl p-5 shadow-sm bg-white">
        <label className="text-sm text-gray-600 mb-1 block">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Value"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none mb-4 focus:border-gray-500"/>
        <label className="text-sm text-gray-600 mb-1 block">Password</label>
        <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Value"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none mb-4 focus:border-gray-500"/>
        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
        <button onClick={handleSubmit}
          className="w-full bg-gray-900 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-black transition">
          Sign In
        </button>
        <button onClick={() => nav({ name:"forgot" })} className="text-xs underline text-gray-500 mt-3 block">
          Forgot password?
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-3">
        ทดสอบ: email/password ใดก็ได้ | admin: admin@cshop.com / admin
      </p>
    </div>
  );
}