import { useState } from "react";
import ProductImage from "../components/ProductImage";

export default function TrackOrderPage({ orders = [] }) {
  const [q, setQ] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (!q.trim()) {
      setResult(null);
      return;
    }
    const found = orders.filter(
      (o) =>
        o.orderId?.toLowerCase().includes(q.toLowerCase()) ||
        o.name?.toLowerCase().includes(q.toLowerCase())
    );
    setResult(found);
  };

  // แสดงทั้งหมดถ้ายังไม่ได้ค้นหา
  const displayOrders = result !== null ? result : orders;

  return (
    <div className="flex flex-col flex-1 px-4 pt-4 overflow-y-auto">
      {/* Search */}
      <div className="flex gap-2 mb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="กรอกเลขออเดอร์หรือชื่อสินค้า"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
        />
        <button
          onClick={handleSearch}
          className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
        >
          ตรวจสอบ
        </button>
      </div>

      {/* Empty state */}
      {displayOrders.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-2">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#ddd" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
          </svg>
          <p className="text-sm">
            {result !== null ? "ไม่พบออเดอร์ที่ค้นหา" : "ยังไม่มีคำสั่งซื้อ"}
          </p>
        </div>
      )}

      {/* Order list */}
      {displayOrders.map((o) => (
        <div key={o.id} className="border border-gray-200 rounded-xl p-3 mb-3 bg-white shadow-sm">
          <div className="flex gap-3">
            <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0">
              <ProductImage size="sm" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-sm">{o.name}</h3>
                  <p className="text-xs text-gray-400">{o.orderId}</p>
                </div>
                <span className={`text-xs border rounded-full px-2 py-0.5 flex-shrink-0 ${o.sc}`}>
                  {o.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">{o.desc}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-400">จำนวน: {o.qty}</p>
                <p className="text-xs font-semibold">฿{(o.price * o.qty).toLocaleString()}</p>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">{o.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}