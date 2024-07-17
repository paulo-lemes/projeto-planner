import { InputModalWrapperProps } from "@/types";

export function InputModalWrapper({ children }: InputModalWrapperProps) {
  return (
    <div className="h-14 px-4 py-2.5 bg-neutral-950 rounded-lg flex items-center gap-1">
      {children}
    </div>
  );
}
