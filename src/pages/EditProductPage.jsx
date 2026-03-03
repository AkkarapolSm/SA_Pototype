import { useState } from "react";
import ProductImage from "../components/ProductImage";

export default function EditProductPage({ product, setProducts, nav }) {
  const [form, setForm] = useState({
    name:  product.name,
    price: product.price,
    desc:  product.desc,
    sold:  product.sold,
  });

  const change = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    setProducts(prev =>
      prev.map(p => p.id === product.id ? { ...p, ...form, price: Number(form.price) } : p)
    );
    nav({ name: "dashboard" });
  };

  const handleDelete = () => {
    if (!window.confirm(`ลบ "${product.name}" ใช่หรือไม่?`)) return;
    setProducts(prev => prev.filter(p => p.id !== product.id));
    nav({ name: "dashboard" });
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-4 pt-4 pb-6">
      {/* Product image */}
      <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm mb-4">
        <ProductImage size="lg" />
        <button className="mt-3 w-full border border-gray-300 rounded-xl py-2 text-sm text-gray-500 hover:bg-gray-50 transition">
          เปลี่ยนรูปภาพ
        </button>
      </div>

      {/* Form */}
      <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm space-y-4">
        {/* Name */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">ชื่อสินค้า</label>
          <input
            value={form.name}
            onChange={e => change("name", e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">ราคา (฿)</label>
          <input
            type="number"
            value={form.price}
            onChange={e => change("price", e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">รายละเอียด</label>
          <textarea
            value={form.desc}
            onChange={e => change("desc", e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-500 resize-none"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">ยอดขาย</label>
          <input
            type="number"
            value={form.sold}
            onChange={e => change("sold", e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={handleSave}
          className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-black transition"
        >
          บันทึก
        </button>
        <button
          onClick={handleDelete}
          className="w-full border border-red-300 text-red-500 py-3 rounded-xl text-sm hover:bg-red-50 transition"
        >
          ลบสินค้า
        </button>
      </div>
    </div>
  );
}