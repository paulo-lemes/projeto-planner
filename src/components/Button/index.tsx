import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "flex-center min-w-max gap-2 px-2.5 py-2 sm:px-5 rounded-lg shadow-shape transition-all enabled:active:scale-95",

  variants: {
    variant: {
      primary:
        "bg-primary-400 text-neutral-950 hover:bg-primary-600 disabled:bg-primary-400/60",
      secondary:
        "bg-neutral-800 text-neutral-200 hover:bg-neutral-700 disabled:bg-neutral-800/60",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({ children, variant, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonVariants({ variant }), props.className)}
    >
      {children}
    </button>
  );
}
