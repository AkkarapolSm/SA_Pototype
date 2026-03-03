export default function PaySuccessPage({ nav }) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="w-44 h-44 rounded-full bg-green-400 flex items-center justify-center shadow-lg mb-6">
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <path d="M12 35L28 52L58 18" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="text-lg font-semibold">ชำระเงินสำเร็จ</p>
      <p className="text-sm text-gray-400 mt-1">ออเดอร์ของคุณได้รับการยืนยันแล้ว</p>

      <div className="flex flex-col gap-2 mt-6 w-48">
        <button
          onClick={() => nav({ name: "track" })}
          className="w-full border border-gray-300 text-gray-700 px-8 py-2 rounded-xl text-sm hover:bg-gray-50 transition"
        >
          ติดตามสินค้า
        </button>
        <button
          onClick={() => nav({ name: "home" })}
          className="w-full bg-gray-900 text-white px-8 py-2 rounded-xl text-sm hover:bg-black transition"
        >
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  );
}