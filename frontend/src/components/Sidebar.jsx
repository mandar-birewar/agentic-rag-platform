import {
  Plus,
  Upload,
  History,
  Settings
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col">

      <div className="p-6">

        <button className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl px-4 py-3">

          <Plus size={18} />

          New Chat

        </button>

      </div>

      <div className="px-6 space-y-3">

        <button className="flex items-center gap-3 text-zinc-300 hover:text-white transition">

          <Upload size={18} />

          Upload PDF

        </button>

        <button className="flex items-center gap-3 text-zinc-300 hover:text-white transition">

          <History size={18} />

          Chat History

        </button>

      </div>

      <div className="mt-auto p-6">

        <button className="flex items-center gap-3 text-zinc-400 hover:text-white transition">

          <Settings size={18} />

          Settings

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;