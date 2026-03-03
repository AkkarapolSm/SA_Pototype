import { useState } from "react";

export default function ForgotPasswordPage({ nav }) {
  const [email, setEmail] = useState("");
  const [sent,  setSent]  = useState(false);

  return (
    <div className="flex flex-col flex-1 px-4 pt-5">
      <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
        <label className="text-sm text-gray-700 mb-1 block">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Value"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none mb-4"/>
        {sent && <p className="text-green-600 text-xs mb-3">ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว กรุณาตรวจสอบอีเมล</p>}
        <div className="flex gap-3 justify-end items-center">
          <button onClick={() => nav({ name:"login" })} className="text-sm text-gray-500 px-3 py-2">Cancel</button>
          <button onClick={() => setSent(true)}
            className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm hover:bg-black transition">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}