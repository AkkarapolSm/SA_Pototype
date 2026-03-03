import { useState } from "react";

export default function RegisterPage({ nav }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", username:"", password:"" });
  const change = (k, v) => setForm(p => ({ ...p, [k]:v }));
  const fields = [["name","Name-Surname"],["phone","Phone-Number"],["email","Email"],["username","User-name"],["password","Password"]];

  return (
    <div className="flex flex-col flex-1 px-4 pt-3 overflow-y-auto">
      <div className="bg-gray-100 rounded-2xl p-4">
        {fields.map(([k,l]) => (
          <div key={k} className="mb-3">
            <label className="text-xs text-gray-500 mb-1 block">{l}</label>
            <input value={form[k]} onChange={e => change(k, e.target.value)} placeholder="Value"
              type={k==="password"?"password":"text"}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"/>
          </div>
        ))}
        <button onClick={() => nav({ name:"login" })}
          className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-900 transition mt-1">
          Sign In
        </button>
        <button onClick={() => nav({ name:"forgot" })} className="text-xs underline text-gray-500 mt-3 block">
          Forgot password?
        </button>
      </div>
    </div>
  );
}