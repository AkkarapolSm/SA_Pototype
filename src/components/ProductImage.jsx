export default function ProductImage({ size = "sm" }) {
    const h = { sm:"h-20", md:"h-32", lg:"h-44" }[size] || "h-20";
    return (
      <div className={`w-full ${h} bg-gray-200 rounded-xl flex items-center justify-center`}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect width="44" height="44" rx="7" fill="#ddd"/>
          <circle cx="16" cy="16" r="5" fill="#ccc"/>
          <path d="M4 34 L14 22 L22 29 L29 20 L40 34" stroke="#ccc" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }