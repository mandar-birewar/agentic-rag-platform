import { Bot, Wifi } from "lucide-react";

function Navbar() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 px-8 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <Bot
          className="text-blue-500"
          size={28}
        />

        <h1 className="text-xl font-semibold">
          Prodigy AI
        </h1>

      </div>

      <div className="flex items-center gap-2 text-green-500">

        <Wifi size={18} />

        <span className="text-sm">
          Connected
        </span>

      </div>

    </header>
  );
}

export default Navbar;