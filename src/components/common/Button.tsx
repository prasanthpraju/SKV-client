import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

function Button({
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rounded-lg bg-secondary px-6 py-3 font-semibold text-white transition hover:opacity-90"
    >
      {children}
    </button>
  );
}

export default Button;