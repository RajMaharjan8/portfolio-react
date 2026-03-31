interface TerminalProps {
  dir: string;
  command: string;
  list: string[];
}

const Terminal = ({ dir, command, list }: TerminalProps) => {
  return (
    <div className="w-full bg-[#1E1E1E] overflow-hidden rounded-2xl font-sfmono text-sm shadow-2xl">
      {/* Title bar */}
      <div className="w-full bg-[#323232] py-3 px-4 flex items-center gap-2">
        <div className="rounded-full bg-[#F65C55] w-3.5 h-3.5"></div>
        <div className="rounded-full bg-[#F4B52E] w-3.5 h-3.5"></div>
        <div className="rounded-full bg-[#29C740] w-3.5 h-3.5"></div>
        <span className="ml-4 text-gray-400 text-xs tracking-wide">
          bash — zsh
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-1">
        {/* Prompt line */}
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-green-400">{dir}</span>
          <span className="text-white mx-1">%</span>
          <span className="text-yellow-300">{command}</span>
          <span className="cursor-blink text-white ml-0.5">▋</span>
        </div>

        {/* Output lines */}
        {list.map((item, index) => {
          if (item === "") return <div key={index} className="h-2" />;

          const isSuccess =
            item.startsWith("  ✓") ||
            item.includes('"healthy"') ||
            item.includes("true");
          const isInfo =
            item.startsWith("INFO") || item.startsWith("> ");
          const isComment =
            item.startsWith("//") || item.startsWith("#");
          const isCategory =
            item === item.toUpperCase() && item.length < 20 && item.trim().length > 0 && !item.includes("$");

          return (
            <div
              key={index}
              className={
                isSuccess
                  ? "text-green-400"
                  : isCategory
                  ? "text-primary font-bold mt-2"
                  : isInfo
                  ? "text-blue-300"
                  : isComment
                  ? "text-gray-500"
                  : "text-gray-300"
              }
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Terminal;
