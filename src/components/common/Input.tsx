import clsx from "clsx";
import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        {...props}
        ref={ref}
        className={clsx(
          "flex h-10 w-full rounded-md border py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
