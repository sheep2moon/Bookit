import React from "react";
import clsx from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        className={clsx(
          "flex items-center justify-center gap-2 rounded-md px-4 py-2 text-light",
          {
            "bg-primary": variant === "primary",
            "bg-secondary shadow-md shadow-black/40": variant === "secondary",
            "border border-secondary": variant === "outline",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
