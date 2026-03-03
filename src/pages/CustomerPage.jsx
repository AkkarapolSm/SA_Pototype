import { useState } from "react";
import { USERS } from "../data";
import { IconSearch, IconMic } from "../components/Icons";

export default function CustomerPage( { nav } ) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const list = USERS
    .filter(u => filter === "all" ? true : u.type === (filter === "member" ? "Member" : "สมาชิกทั่วไป"))
    .filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      {/* Search bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
          <IconSearch />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-transparent flex-1 outline-none text-sm"
          />
          <IconMic />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 pt-1 mb-3">
          {[["all", "ทั้งหมด"], ["guest", "สมาชิกทั่วไป"], ["member", "Member"]].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`px-4 py-1.5 rounded-full text-sm border transition ${
              filter === k
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-300 text-gray-700"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* User grid */}
      <div className="grid grid-cols-3 gap-3 px-4 pb-4">
        {list.length === 0 ? (
          <p className="col-span-3 text-center text-gray-400 text-sm py-8">ไม่พบผู้ใช้</p>
        ) : (
          list.map(u => (
            <div key={u.id} className="flex flex-col items-center cursor-pointer"
            onClick={() => nav({ name: "userDetail", selectedUser: u })}>
              <div className="w-full aspect-square bg-purple-100 rounded-xl flex items-center justify-center mb-1">
                <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
                  <polygon points="24,4 34,20 14,20" fill="#c4b5d0"/>
                  <circle cx="14" cy="32" r="7" fill="#b8a8c8" opacity="0.8"/>
                  <rect x="26" y="24" width="12" height="12" rx="2" fill="#a898b8" opacity="0.8"/>
                </svg>
              </div>
              <p className="text-xs font-semibold">{u.name}</p>
              <p className="text-xs text-gray-400">{u.type}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}