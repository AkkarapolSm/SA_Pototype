export default function ProfilePage({ user, setUser, nav }) {
    if (!user) return (
      <div className="flex flex-col flex-1 items-center justify-center gap-4 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <svg width="32" height="32" fill="#999" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>
        <p className="text-gray-500 text-sm">ยังไม่ได้เข้าสู่ระบบ</p>
        <button onClick={() => nav({ name: "login" })} className="w-full max-w-xs bg-gray-900 text-white py-2.5 rounded-xl text-sm">เข้าสู่ระบบ</button>
        <button onClick={() => nav({ name: "register" })} className="w-full max-w-xs border border-gray-300 py-2.5 rounded-xl text-sm">สมัครสมาชิก</button>
      </div>
    );
  
    return (
      <div className="flex flex-col flex-1 items-center px-4 pt-8 gap-3">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <svg width="32" height="32" fill="#666" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>
        <p className="font-semibold text-base">{user.name}</p>
        <p className="text-gray-400 text-xs">{user.role === "admin" ? "Administrator" : "Member"}</p>
  
        {user.role === "admin" ? (
          <>
            <button onClick={() => nav({ name: "dashboard" })}
              className="w-full max-w-xs border border-gray-300 py-2.5 rounded-xl text-sm mt-2">
              Dashboard
            </button>
            <button onClick={() => nav({ name: "customers" })}
              className="w-full max-w-xs border border-gray-300 py-2.5 rounded-xl text-sm">
              Customer Information
            </button>
          </>
        ) : (
          <button onClick={() => nav({ name: "track" })}
            className="w-full max-w-xs border border-gray-300 py-2.5 rounded-xl text-sm mt-2">
            Track Order
          </button>
        )}
  
        <button onClick={() => { setUser(null); nav({ name: "home" }); }}
          className="w-full max-w-xs bg-gray-900 text-white py-2.5 rounded-xl text-sm">
          ออกจากระบบ
        </button>
      </div>
    );
  }