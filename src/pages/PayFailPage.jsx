export default function PayFailPage({ nav }) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="w-44 h-44 rounded-full bg-red-500 flex items-center justify-center shadow-lg mb-6">
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
            <path d="M18 18L52 52M52 18L18 52" stroke="white" strokeWidth="7" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-lg font-semibold">ชำระเงินไม่สำเร็จ</p>
        <button onClick={() => nav({ name:"payment" })} className="mt-6 bg-gray-900 text-white px-8 py-2 rounded-xl text-sm">ลองอีกครั้ง</button>
      </div>
    );
  }