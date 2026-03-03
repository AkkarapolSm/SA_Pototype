import { IconPlay, IconChevronRight } from "../components/Icons";
import { useState } from "react";

export default function ReportPage({ products = [], nav }) {
  const sorted = [...products].sort((a, b) => b.sold - a.sold);

  const [exported, setExported] = useState(false);

  const Row = ({ p }) => (
    <button
      key={p.id}
      onClick={() => nav({ name: "reportDetail", product: p })}
      className="w-full flex items-center justify-between py-2.5 border-b border-gray-100 hover:bg-gray-50 transition"
    >
      <div className="flex items-center gap-2">
        <IconPlay />
        <span className="text-sm">{p.name}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm">{p.sold}</span>
        <IconChevronRight />
      </div>
    </button>
  );

  return (
    <div className="flex flex-col flex-1 px-4 pt-4 overflow-y-auto">
      <p className="text-xs text-gray-500 underline mb-1">ยอดขาย</p>
      {products.map((p) => (
        <Row key={p.id} p={p} />
      ))}

      <p className="text-xs text-gray-500 underline mt-4 mb-1">
        ประวัติการสั่งซื้อ
      </p>
      {sorted.map((p) => (
        <Row key={p.id} p={p} />
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
  );
}
