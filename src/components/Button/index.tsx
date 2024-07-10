import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "flex gap-2 px-2.5 py-2 sm:px-5 rounded-lg shadow-shape bg-primary-400 text-neutral-950 transition-all hover:bg-primary-500 active:scale-95",
        props.className,
        props.disabled ? "" : ""
      )}
    >
      {children}
    </button>
  );
}
