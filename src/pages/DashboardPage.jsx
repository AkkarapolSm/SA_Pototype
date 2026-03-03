import { useState } from "react";
import ProductImage from "../components/ProductImage";
import { IconSearch, IconMic } from "../components/Icons";

export default function DashboardPage({ nav, products = [] }) {
  const [activeTab, setActiveTab] = useState("Products");
  const [exported, setExported] = useState(false);
  const [search, setSearch] = useState("");

  const tabs = ["Orders", "Products", "Reports"];

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
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
      {/* Tabs */}
      <div className="flex gap-2 px-4 pt-4 mb-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              activeTab === t
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === "Orders" && (
        <div className="px-4 py-8 text-center text-gray-400 text-sm">
          ไม่มีคำสั่งซื้อ
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "Products" && (
        <div className="grid grid-cols-2 border-t border-l border-gray-200">
          {products.map((p) => (
            <div key={p.id} className="border-b border-r border-gray-200 p-3">
              <div className="bg-gray-100 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                <ProductImage size="md" />
              </div>
              <p className="font-bold text-sm mb-1">{p.name}</p>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-4">{p.desc}</p>
              <button
                onClick={() => nav({ name: "editProduct", product: p })}
                className="mt-3 border border-gray-300 rounded-full px-3 py-1 text-xs flex items-center gap-1.5 hover:bg-gray-50 transition"
              >
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 1.42L14.06 10.5l1.44 1.44-8.15 8.15H5.92v-1.42zM20.71 5.63l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a1 1 0 0 0 0-1.41z" />
                </svg>
                แก้ไข
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "Reports" && (
        <div className="px-4 pt-2">
          <p className="text-xs text-gray-500 underline mb-1">ยอดขาย</p>
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => nav({ name: "reportDetail", product: p })}
              className="w-full flex items-center justify-between py-2.5 border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#aaa" strokeWidth="1.5" fill="none" />
                  <path d="M10 8l6 4-6 4V8z" fill="#aaa" />
                </svg>
                <span className="text-sm">{p.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">{p.sold}</span>
                <svg width="12" height="12" fill="#aaa" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </div>
            </button>
          ))}
          {exported && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-300 rounded-xl px-4 py-3 mt-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#4ade80" />
            <path
              d="M7 12l3.5 3.5L17 8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm text-green-700 font-medium">Export สำเร็จ</p>
        </div>
      )}

      <button
        onClick={() => {
          setExported(true);
          setTimeout(() => setExported(false), 3000);
        }}
        className="w-full border border-gray-300 rounded-xl py-2.5 text-sm mt-3 hover:bg-gray-50 transition"
      >
        Export PDF / Excel
      </button>
        </div>
      )}
    </div>
  );
}