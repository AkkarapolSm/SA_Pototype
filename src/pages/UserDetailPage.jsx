export default function UserDetailPage({ selectedUser, nav }) {
    const mockOrders = [
      { id: 1, name: "Products A", price: 299,  qty: 2, status: "จัดส่งแล้ว",  sc: "text-green-600 border-green-500" },
      { id: 2, name: "Products D", price: 899,  qty: 1, status: "รอดำเนินการ", sc: "text-orange-500 border-orange-400" },
      { id: 3, name: "Products B", price: 450,  qty: 3, status: "จัดส่งแล้ว",  sc: "text-green-600 border-green-500" },
    ];
  
    return (
      <div className="flex flex-col flex-1 overflow-y-auto px-4 pt-4">
        {/* Profile card */}
        <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm mb-4 flex flex-col items-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-3">
            <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
              <polygon points="24,4 34,20 14,20" fill="#c4b5d0"/>
              <circle cx="14" cy="32" r="7" fill="#b8a8c8" opacity="0.8"/>
              <rect x="26" y="24" width="12" height="12" rx="2" fill="#a898b8" opacity="0.8"/>
            </svg>
          </div>
          <p className="font-bold text-base">{selectedUser.name}</p>
          <span className={`mt-1 text-xs px-3 py-0.5 rounded-full border ${
            selectedUser.type === "Member"
              ? "text-purple-600 border-purple-300 bg-purple-50"
              : "text-gray-500 border-gray-300 bg-gray-50"
          }`}>
            {selectedUser.type}
          </span>
  
          {/* Info rows */}
          <div className="w-full mt-4 space-y-2">
            {[
              ["ID",    `USR-00${selectedUser.id}`],
              ["Email", `${selectedUser.name.toLowerCase().replace(" ", "")}@email.com`],
              ["เบอร์โทร", "08X-XXX-XXXX"],
              ["สมัครเมื่อ", "1 ม.ค. 2568"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                <span className="text-gray-400">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Order history */}
        <p className="text-xs text-gray-500 font-semibold mb-2 px-1">ประวัติการสั่งซื้อ</p>
        {mockOrders.map(o => (
          <div key={o.id} className="border border-gray-200 rounded-xl p-3 mb-2 bg-white shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold">{o.name}</p>
                <p className="text-xs text-gray-400">จำนวน {o.qty} ชิ้น · ฿{(o.price * o.qty).toLocaleString()}</p>
              </div>
              <span className={`text-xs border rounded-full px-2 py-0.5 flex-shrink-0 ${o.sc}`}>
                {o.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }