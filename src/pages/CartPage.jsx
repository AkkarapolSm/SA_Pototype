import ProductImage from "../components/ProductImage";

export default function CartPage({ cart, setCart, nav }) {
  const upd = (id, d) =>
    setCart(prev => prev.map(i => i.id===id ? { ...i, qty:Math.max(0,i.qty+d) } : i).filter(i => i.qty>0));
  const total = cart.reduce((s,i) => s+i.price*i.qty, 0);

  if (cart.length === 0)
    return <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">ตะกร้าว่างเปล่า</div>;

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-4 pt-4">
      {cart.map(item => (
        <div key={item.id} className="border border-gray-200 rounded-xl p-3 mb-3 bg-white shadow-sm">
          <div className="flex gap-3">
            <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0"><ProductImage size="sm"/></div>
            <div className="flex-1">
              <p className="font-bold text-sm">{item.name}</p>
              <p className="text-xs text-gray-400 line-clamp-2">{item.desc}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 border border-gray-300 rounded-full px-2 py-0.5">
                  <button onClick={() => upd(item.id,-1)} className="text-gray-700 font-bold text-sm w-4 text-center">−</button>
                  <span className="text-sm min-w-[18px] text-center">{item.qty}</span>
                  <button onClick={() => upd(item.id,1)} className="text-gray-700 font-bold text-sm w-4 text-center">+</button>
                </div>
                <span className="text-xs font-semibold">฿{(item.price*item.qty).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between px-1 mb-3 font-semibold text-sm">
        <span>รวม</span><span>฿{total.toLocaleString()}</span>
      </div>
      <button onClick={() => nav({ name:"payment" })}
        className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold text-sm mb-4 hover:bg-black transition">
        ยืนยันคำสั่งซื้อ
      </button>
    </div>
  );
}