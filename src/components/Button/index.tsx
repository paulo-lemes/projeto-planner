import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  primaryStyle?: boolean;
}

export function Button({ children, primaryStyle, ...props }: ButtonProps) {
  const btnBg = primaryStyle ? "primary-400" : "neutral-800";
  const btnText = primaryStyle ? "neutral-950" : "neutral-200";

  return (
    <button
      {...props}
      className={twMerge(
        `flex-center min-w-max gap-2 px-2.5 py-2 sm:px-5 rounded-lg shadow-shape transition-all bg-${btnBg} text-${btnText}`,
        props.className,
        props.disabled
          ? `bg-${btnBg}/60`
          : `${primaryStyle ? "hover:bg-primary-500" : "hover:bg-neutral-700"} active:scale-95`
      )}
    >
      {children}
    </button>
  );
}
