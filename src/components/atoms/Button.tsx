import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  href,
}) => {
  const base =
    "inline-flex items-center justify-center text-base rounded-3xl px-8 py-3 font-light cursor-pointer transition-all duration-300 ease-in-out";

  const styles = {
    primary:
      "bg-primary text-white shadow-lg hover:bg-black hover:shadow-none",
    outline:
      "border border-gray-300 text-gray-700 hover:border-primary hover:text-primary",
  };

  if (href) {
    return (
      <a href={href} className={`${base} ${styles[variant]}`}>
        {text}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {text}
    </button>
  );
};

export default Button;
