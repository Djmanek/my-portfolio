export default function Topbar() {
  return (
    <div className="h-16 bg-white border-b border-orange-100 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="font-semibold">Admin Panel</h2>
        <span className="text-[#FF6B00] font-medium">Dev</span>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="text-red-500 text-sm"
      >
        Logout
      </button>
    </div>
  );
}