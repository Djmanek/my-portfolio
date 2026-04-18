import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);

  // 🔥 FETCH MESSAGES
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      toast.error("Failed to load messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Messages</h2>

      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className="p-5 bg-white rounded-xl shadow border border-orange-100"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-[#FF6B00]">
                  {m.name}
                </h3>
                <span className="text-xs text-gray-400">
                  {new Date(m.created_at).toLocaleString()}
                </span>
              </div>

              <p className="text-sm text-gray-500">{m.email}</p>

              <p className="mt-3 text-gray-700">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}