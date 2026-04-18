import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-orange-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}