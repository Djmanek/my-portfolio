import { useState, useEffect, useRef } from "react";

export default function TerminalOverlay({ isOpen, onClose }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "dev@portfolio:~$ booting system...",
    "Welcome to DevOS ⚡",
    "Type 'help' to begin",
  ]);

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [typing, setTyping] = useState(false);
  const [clearing, setClearing] = useState(false);

  const bottomRef = useRef(null);

  const [path, setPath] = useState("~");

  const files = {
    "~": ["about.txt", "projects/", "skills/", "contact.txt"],
    "projects": ["project1", "project2"],
    "skills": ["react", "node", "postgres"],
  };

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // ESC close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Typing animation
  const typeOutput = async (text) => {
    setTyping(true);
    let output = "";
    for (let char of text) {
      output += char;
      setHistory((prev) => [...prev.slice(0, -1), output]);
      await new Promise((res) => setTimeout(res, 10));
    }
    setTyping(false);
  };

  // Commands
  const runCommand = async (cmd) => {
    let output = "";

    switch (cmd) {
      case "help":
        output =
         "Commands: help, ls, cd <folder>, pwd, clear, exit, about, projects, skills, resume, contact";
        break;

      case "ls":
        output = files[path]?.join("  ") || "empty";
        break;

      case "pwd":
        output = `/home/${path}`;
        break;

      case "cd projects":
        setPath("projects");
        output = "moved to /projects";
        break;

      case "cd skills":
        setPath("skills");
        output = "moved to /skills";
        break;

      case "cd ..":
        setPath("~");
        output = "back to root";
        break;

      case "about":
      case "projects":
      case "skills":
      case "resume": // ✅ ADDED
      case "contact":
        document.getElementById(cmd)?.scrollIntoView({
          behavior: "smooth",
        });
        output = `Opening ${cmd}...`;
        break;

      case "clear":
        setClearing(true);
        setTimeout(() => {
          setHistory([]);
          setClearing(false);
        }, 300);
        return;

      case "exit":
        onClose();
        return;

      default:
        output = `command not found: ${cmd}`;
    }

    setHistory((prev) => [
      ...prev,
      `dev@portfolio:${path}$ ${cmd}`,
      "...",
    ]);

    await typeOutput(output);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setCommandHistory((prev) => [...prev, input]);
    setHistoryIndex(null);

    runCommand(input);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[999] flex items-center justify-center">
      <div className="w-[95%] max-w-3xl h-[500px] bg-[#0d0d0d] rounded-2xl shadow-2xl border border-orange-500/20 flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-gray-800">
          <div
            onClick={onClose}
            className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
          />
          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />

          <span className="ml-4 text-gray-400 text-sm font-mono">
            dev@portfolio:{path}
          </span>
        </div>

        {/* BODY */}
        <div
          className={`flex-1 p-4 overflow-y-auto font-mono text-sm text-gray-200 ${
            clearing ? "opacity-0 transition" : ""
          }`}
        >
          {history.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 py-3 border-t border-gray-800 bg-[#0d0d0d]"
        >
          <span className="text-orange-400 font-mono">
            dev@portfolio:{path}$
          </span>

          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                const newIndex =
                  historyIndex === null
                    ? commandHistory.length - 1
                    : Math.max(0, historyIndex - 1);

                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex] || "");
              }

              if (e.key === "ArrowDown") {
                e.preventDefault();
                if (historyIndex === null) return;

                const newIndex =
                  historyIndex + 1 >= commandHistory.length
                    ? null
                    : historyIndex + 1;

                setHistoryIndex(newIndex);
                setInput(
                  newIndex === null ? "" : commandHistory[newIndex]
                );
              }
            }}
            className="flex-1 bg-transparent outline-none text-white font-mono"
          />

          {/* Cursor */}
          <span className="w-2 h-5 bg-white animate-pulse"></span>
        </form>
      </div>
    </div>
  );
}