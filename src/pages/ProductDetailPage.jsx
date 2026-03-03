import { useState } from "react";
import ProductImage from "../components/ProductImage";

export default function ProductDetailPage({ product, cart, setCart, nav, user }) {
  const [qty, setQty] = useState(1);
  const inCart    = cart.find(i => i.id === product.id);
  const cartTotal = cart.reduce((s,i) => s+i.qty, 0);
  const isAdmin   = user?.role === "admin";

  const addToCart = () => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty:i.qty+qty } : i);
      return [...prev, { ...product, qty }];
    });
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-4 pt-4">
      <div className="border border-gray-200 rounded-2xl p-4 mb-3 bg-white shadow-sm">
        <ProductImage size="lg"/>
        <h2 className="font-bold text-base mt-3">{product.name}</h2>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{product.desc}</p>
        <p className="font-bold text-sm mt-2">฿{product.price.toLocaleString()}</p>

        {/* ซ่อนทั้งบล็อกเมื่อเป็น admin */}
        {!isAdmin && (
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3 border border-gray-300 rounded-full px-3 py-1">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="font-bold text-gray-600 text-sm">−</button>
              <span className="text-sm min-w-[20px] text-center">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="font-bold text-gray-600 text-sm">+</button>
            </div>
            <div className="flex items-center gap-2">
              {inCart && (
                <span className="text-xs text-green-600 border border-green-400 px-3 py-1 rounded-full">
                  กดสั่งซื้อแล้ว {cartTotal} ชิ้น
                </span>
              )}
              <button onClick={addToCart} className="bg-gray-200 text-gray-800 px-4 py-1.5 rounded-xl text-sm hover:bg-gray-300 transition">
                {inCart ? "+ Add to cart" : "Add to cart"}
              </button>
            </div>
          </div>
        )}
      </div>

      {!isAdmin && cartTotal > 0 && (
        <button onClick={() => nav({ name: "cart" })} className="w-full border border-gray-300 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition">
          ยืนยันคำสั่งซื้อ ({cartTotal} รายการ)
        </button>
      )}
    </div>
  );
}