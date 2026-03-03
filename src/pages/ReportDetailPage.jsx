import ProductImage from "../components/ProductImage";

export default function ReportDetailPage({ product, nav }) {
  const mockHistory = [
    { id: 1, buyer: "User 1",  date: "1 มี.ค. 2568",  qty: 2 },
    { id: 2, buyer: "User 5",  date: "28 ก.พ. 2568", qty: 1 },
    { id: 3, buyer: "User 9",  date: "25 ก.พ. 2568", qty: 3 },
    { id: 4, buyer: "User 3",  date: "20 ก.พ. 2568", qty: 1 },
    { id: 5, buyer: "User 11", date: "15 ก.พ. 2568", qty: 2 },
  ];

  const totalQty     = mockHistory.reduce((s, h) => s + h.qty, 0);
  const totalRevenue = totalQty * product.price;

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-4 pt-4 pb-6">
      {/* Product summary card */}
      <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm mb-4">
        <div className="flex gap-3 items-center">
          <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0">
            <ProductImage size="sm" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-base">{product.name}</p>
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{product.desc}</p>
            <p className="font-semibold text-sm mt-1">฿{product.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            ["ยอดขายรวม", `${product.sold} ชิ้น`],
            ["รายได้รวม",  `฿${(product.sold * product.price).toLocaleString()}`],
            ["ผู้ซื้อ",    `${mockHistory.length} คน`],
          ].map(([label, value]) => (
            <div key={label} className="bg-gray-50 rounded-xl p-2 text-center">
              <p className="text-xs text-gray-400">{label}</p>
              <p className="text-sm font-bold mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase history */}
      <p className="text-xs text-gray-500 font-semibold mb-2 px-1">ประวัติการซื้อ</p>
      {mockHistory.map(h => (
        <div key={h.id} className="border border-gray-200 rounded-xl p-3 mb-2 bg-white shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg width="18" height="18" fill="#a898b8" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">{h.buyer}</p>
                <p className="text-xs text-gray-400">{h.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{h.qty} ชิ้น</p>
              <p className="text-xs text-gray-400">฿{(h.qty * product.price).toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}