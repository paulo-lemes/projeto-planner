import { ReactNode } from "react";

interface InputGroupWrapperProps {
  children: ReactNode;
}

export function InputGroupWrapper({ children }: InputGroupWrapperProps) {
  return (
    <div className="w-[760px] max-w-full min-h-16 py-3 px-6 rounded-xl shadow-shape flex-center flex-wrap gap-4 sm:gap-2 bg-neutral-900">
      {children}
    </div>
  );
}
