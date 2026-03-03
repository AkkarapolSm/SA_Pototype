import { useState } from "react";

export default function PaymentPage({ nav, setCart, cart, setOrders }) {
  const [method, setMethod] = useState("");

  const confirm = () => {
    if (!method) { alert("กรุณาเลือกวิธีชำระเงิน"); return; }

    const success = Math.random() > 0.3;

    if (success) {
      // สร้าง order จาก cart ปัจจุบัน
      const newOrders = cart.map((item) => ({
        id: Date.now() + item.id,
        orderId: `ORD-${Date.now()}`,
        name: item.name,
        desc: item.desc,
        qty: item.qty,
        price: item.price,
        status: "รอดำเนินการ",
        sc: "text-orange-500 border-orange-400",
        date: new Date().toLocaleDateString("th-TH"),
      }));
      setOrders((prev) => [...prev, ...newOrders]);
      setCart([]);
    }

    nav({ name: success ? "paySuccess" : "payFail" });
  };

  return (
    <div className="flex flex-col flex-1 px-4 pt-5">
      <div className="border border-gray-200 rounded-2xl p-4 mb-5 bg-white">
        {["เก็บเงินปลายทาง", "บัตรเดบิต/บัตรเครดิต", "Mobile Banking"].map((m) => (
          <label key={m} className="flex items-center gap-3 py-2.5 cursor-pointer">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === m ? "border-gray-800" : "border-gray-400"}`}>
              {method === m && <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />}
            </div>
            <span className="text-sm">{m}</span>
            <input type="radio" className="hidden" value={m} checked={method === m} onChange={(e) => setMethod(e.target.value)} />
          </label>
        ))}
      </div>
      <button className="w-full border border-gray-300 py-3 rounded-xl text-sm text-gray-600 mb-3 hover:bg-gray-50">
        Upload File
      </button>
      <button onClick={confirm} className="w-full border border-gray-300 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
        Cornfirm Payment
      </button>
    </div>
  );
}