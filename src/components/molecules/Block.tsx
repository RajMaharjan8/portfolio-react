interface BlockProps {
  title: string;
  from: string;
  location: string;
  company?: string;
  isLast?: boolean;
}

const Block = ({ title, from, location, company, isLast }: BlockProps) => {
  return (
    <div className="relative pl-8 pb-8">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-2.75 top-6 bottom-0 w-px bg-gray-200 dark:bg-white/15" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-primary bg-white dark:bg-[#1a1a1a] flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-red-100 hover:shadow-md transition-all duration-300">
        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug mb-1">
          {title}
        </h4>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {from}
          {company && (
            <span className="text-primary font-semibold"> {company}</span>
          )}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-sfmono mt-2">
          📍 {location}
        </p>
      </div>
    </div>
  );
};

export default Block;
