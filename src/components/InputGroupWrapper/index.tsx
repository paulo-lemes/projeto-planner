import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface InputGroupWrapperProps {
  children: ReactNode;
  classCSS?: string;
}

export function InputGroupWrapper({
  children,
  classCSS = "",
}: InputGroupWrapperProps) {
  return (
    <section
      className={twMerge(
        "w-[760px] max-w-full min-h-16 py-3 px-6 rounded-xl shadow-shape flex flex-wrap gap-4 sm:gap-2 bg-neutral-900 items-stretch",
        classCSS
      )}
    >
      {children}
    </section>
  );
}
