import { useState } from "react";
import { PRODUCTS } from "../data";
import ProductImage from "../components/ProductImage";
import { IconSearch, IconMic, IconCart } from "../components/Icons";

export default function HomePage({ cart, setCart, nav, user, products }) {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");

  const categories = [
    "ทั้งหมด",
    "Products A-C",
    "Products D-F",
    "Products G-I",
    "Products J-L",
    "Products M-O",
  ];

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  ).filter((p) => {
    if (selectedCategory === "ทั้งหมด") return true;
    if (selectedCategory === "Products A-C")
      return ["Products A", "Products B", "Products C"].includes(p.name);
    if (selectedCategory === "Products D-F")
      return ["Products D", "Products E", "Products F"].includes(p.name);
    if (selectedCategory === "Products G-I")
      return ["Products G", "Products H", "Products I"].includes(p.name);
    if (selectedCategory === "Products J-L")
      return ["Products J", "Products K", "Products L"].includes(p.name);
    if (selectedCategory === "Products M-O")
      return ["Products M", "Products N", "Products O"].includes(p.name);
    return true;
  });

  const addToCart = (e, product) => {
    e.stopPropagation();
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      {/* Search bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
          <IconSearch />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-transparent flex-1 outline-none text-sm"
          />
          <IconMic />
        </div>
      </div>

      {/* Banner */}
      <div className="mx-4 mb-4 bg-purple-100 rounded-2xl h-24 flex items-center justify-center">
        <svg width="90" height="100" viewBox="0 0 90 58" fill="none">
          <polygon points="45,4 62,30 28,30" fill="#c4b5d0" />
          <circle cx="24" cy="43" r="10" fill="#b8a8c8" opacity="0.7" />
          <rect
            x="48"
            y="32"
            width="18"
            height="18"
            rx="3"
            fill="#a898b8"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Products header + hamburger */}
      <div className="px-4 relative">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-sm border-b-2 border-black pb-0.5">
            Products{" "}
            {selectedCategory !== "ทั้งหมด" && (
              <span className="text-gray-400 font-normal"></span>
            )}
          </span>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex flex-col gap-1 p-1 hover:bg-gray-100 rounded-md transition"
          >
            <span className="block w-5 h-0.5 bg-gray-700" />
            <span className="block w-5 h-0.5 bg-gray-700" />
            <span className="block w-5 h-0.5 bg-gray-700" />
          </button>
        </div>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute right-4 top-8 z-10 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden w-44">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-gray-50 ${
                  selectedCategory === cat
                    ? "font-semibold text-black bg-gray-50"
                    : "text-gray-600"
                }`}
              >
                {selectedCategory === cat && <span className="mr-2">✓</span>}
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Products grid */}
        <div className="grid grid-cols-3 gap-3 pb-4">
          {filtered.length === 0 ? (
            <p className="col-span-3 text-center text-gray-400 text-sm py-8">
              ไม่พบสินค้า
            </p>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className="flex flex-col cursor-pointer border border-gray-200 rounded-2xl"
                onClick={() => nav({ name: "detail", product: p })}
              >
                <div className="bg-gray-100 rounded-xl p-1.5 hover:bg-gray-200 transition">
                  <ProductImage size="sm" />
                </div>
                <p className="text-xs font-medium pl-2">{p.name}</p>
                {user?.role !== "admin" && (
                  <button
                    onClick={(e) => addToCart(e, p)}
                    className="mx-1 mt-1 flex items-center gap-1 text-xs bg-gray-800 text-white rounded-md px-1.5 mb-1.5 py-1 hover:bg-black transition"
                  >
                    <IconCart size={12} />
                    <span>Add to Cart</span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
