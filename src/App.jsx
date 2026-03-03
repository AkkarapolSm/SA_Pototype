import { useState } from "react";
import BottomNav          from "./components/BottomNav";
import HomePage           from "./pages/HomePage";
import LoginPage          from "./pages/LoginPage";
import RegisterPage       from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProductDetailPage  from "./pages/ProductDetailPage";
import CartPage           from "./pages/CartPage";
import PaymentPage        from "./pages/PaymentPage";
import PaySuccessPage     from "./pages/PaySuccessPage";
import PayFailPage        from "./pages/PayFailPage";
import TrackOrderPage     from "./pages/TrackOrderPage";
import ReportPage         from "./pages/ReportPage";
import CustomerPage       from "./pages/CustomerPage";
import ProfilePage        from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import UserDetailPage from "./pages/UserDetailPage";
import { IconCart }       from "./components/Icons";
import EditProductPage from "./pages/EditProductPage";
import ReportDetailPage from "./pages/ReportDetailPage";

import { PRODUCTS } from "./data";

const BACK_MAP = {
  login:"home", register:"home", forgot:"login",
  detail:"home", cart:"home", payment:"cart",
  paySuccess:"home", payFail:"payment",
  track:"profile", reports:"home", customers:"profile",
  dashboard: "home",
  userDetail: "customers",
  editProduct: "dashboard",
  reportDetail: "reports",
};
const TITLES = {
  login:"LOGIN", register:"REGISTER", forgot:"Forgot password?",
  cart:"Cart", detail:"Product Details", payment:"Payment",
  paySuccess:"SUCCESS", payFail:"UNSUCCESS",
  track:"Track Order", reports:"Report", customers:"Customer",
  dashboard: "Dashboard",
  userDetail: "User Detail",
  editProduct: "Edit Product",
  reportDetail: "Report Detail",
  
  
};

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState({ name:"home" });
  const [tab,  setTab]  = useState("home");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState(PRODUCTS);

  const isAdmin   = user?.role === "admin";
  const cartCount = cart.reduce((s,i) => s+i.qty, 0);

  const nav = (p) => {
    setPage(p);
    if (["home","cart","profile","reports"].includes(p.name)) setTab(p.name);
  };
  const handleTab = (t) => { setTab(t); setPage({ name:t }); };

  const showNav  = ["home","cart","profile","reports"].includes(page.name);
  const title    = TITLES[page.name];
  const backDest = BACK_MAP[page.name];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[420px] h-[880px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            {backDest && (
              <button onClick={() => nav({ name:backDest })}
                className="text-2xl leading-none text-gray-700 hover:text-black mr-1">‹</button>
            )}
            {title
              ? <div>
                  <h1 className="font-black text-xl tracking-tight">{title}</h1>
                  {page.name==="customers" && <p className="text-xs text-gray-400">information</p>}
                </div>
              : <h1 className="font-black text-2xl tracking-tight">C SHOP</h1>
            }
          </div>

          {page.name==="home" && !user && (
            <div className="flex gap-2 items-center">
              <button onClick={() => nav({ name:"register" })} className="text-sm text-gray-600 hover:text-black">สมัครสมาชิก</button>
              <button onClick={() => nav({ name:"login" })}
                className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded-full hover:bg-black transition">เข้าสู่ระบบ</button>
            </div>
          )}
          {page.name==="home" && user && (
            <div className="flex items-center gap-2">
              {!isAdmin && (
                <button onClick={() => nav({ name:"cart" })} className="relative">
                  <IconCart/>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}
              <button onClick={() => nav({ name:"profile" })}
                className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded-full hover:bg-black">
                {user.name}
              </button>
            </div>
          )}
        </div>
        <div className="h-px bg-gray-200 flex-shrink-0"/>

        {/* Page content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {page.name === "home" && (<HomePage cart={cart} setCart={setCart} nav={nav} user={user} products={products} />)}
          {page.name==="login"      && <LoginPage          setUser={setUser} nav={nav}/>}
          {page.name==="register"   && <RegisterPage       nav={nav}/>}
          {page.name==="forgot"     && <ForgotPasswordPage nav={nav}/>}
          {page.name === "detail" && (<ProductDetailPage product={page.product} cart={cart} setCart={setCart} nav={nav} user={user} />)}
          {page.name==="cart"       && <CartPage           cart={cart} setCart={setCart} nav={nav}/>}
          {page.name==="paySuccess" && <PaySuccessPage     nav={nav}/>}
          {page.name==="payFail"    && <PayFailPage        nav={nav}/>}
          {page.name==="reports"    && <ReportPage products={products} nav={nav} />}
          {page.name ==="customers" && <CustomerPage nav={nav} />}
          {page.name==="profile"    && <ProfilePage        user={user} setUser={setUser} nav={nav}/>}
          {page.name === "dashboard" && <DashboardPage nav={nav} products={products} />}
          {page.name === "payment" && (<PaymentPage nav={nav} setCart={setCart} cart={cart} setOrders={setOrders} />)}
          {page.name === "track" && <TrackOrderPage orders={orders} />}
          {page.name === "userDetail" && <UserDetailPage selectedUser={page.selectedUser} nav={nav} />}
          {page.name === "editProduct" && (<EditProductPage product={page.product} setProducts={setProducts} nav={nav} />)}
          {page.name === "reportDetail" && (<ReportDetailPage product={page.product} nav={nav} />)}
        </div>

        {/* Bottom nav */}
        {showNav && (
          <>
            <div className="h-px bg-gray-200 flex-shrink-0"/>
            <BottomNav tab={tab} setTab={handleTab} isAdmin={isAdmin}/>
          </>
        )}
      </div>
    </div>
  );
}