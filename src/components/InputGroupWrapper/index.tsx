import { InputGroupWrapperProps } from "@/types";
import { twMerge } from "tailwind-merge";

export function InputGroupWrapper({
  children,
  classCSS = "",
  dataTest
}: InputGroupWrapperProps) {
  return (
    <section
      className={twMerge(
        "w-[760px] max-w-full min-h-16 py-3 px-6 rounded-xl shadow-shape flex flex-wrap gap-4 sm:gap-2 bg-neutral-900 items-stretch",
        classCSS
      )}
      data-test={dataTest}
    >
      {children}
    </section>
  );
}
