interface TagProps {
  text: string;
  variant?: "default" | "primary" | "dark";
}

const Tag = ({ text, variant = "default" }: TagProps) => {
  const styles = {
    default:
      "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/15",
    primary:
      "bg-red-50 dark:bg-primary/10 text-primary border border-red-200 dark:border-primary/30",
    dark: "bg-white/10 text-white border border-white/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-sfmono tracking-wide ${styles[variant]}`}
    >
      {text}
    </span>
  );
};

export default Tag;
