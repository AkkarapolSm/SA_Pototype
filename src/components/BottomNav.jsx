import { IconUser, IconHome, IconCart, IconBarChart } from "./Icons";

export default function BottomNav({ tab, setTab, isAdmin }) {
  const btn = (name, Icon) => (
    <button onClick={() => setTab(name)}
      className={`flex items-center justify-center p-2 transition ${tab===name ? "text-black" : "text-gray-400 hover:text-gray-600"}`}>
      <Icon />
    </button>
  );
  return (
    <div className="flex justify-around items-center py-3 bg-white flex-shrink-0">
      {btn("profile", IconUser)}
      {btn("home", IconHome)}
      {isAdmin ? btn("reports", IconBarChart) : btn("cart", IconCart)}
    </div>
  );
}