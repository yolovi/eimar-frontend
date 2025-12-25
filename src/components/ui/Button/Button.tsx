import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ButtonProps, ButtonVariant, ButtonSize } from "./Button.types";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary hover:bg-accent text-white hover:text-white font-medium",
  secondary: "bg-accent/20 hover:bg-accent text-primary hover:text-white",
  outline:
    "bg-transparent border-2 text-primary hover:bg-primary hover:text-white",
  ghost:
    "bg-transparent text-primary hover:bg-accent/20 hover:text-accent border-transparent",
  destructive: "bg-red-400 hover:bg-red-700 text-white",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-8 py-1.5 text-sm h-6",
  md: "px-10 py-2 text-base h-8",
  lg: "px-10 py-3 text-lg h-12",
  xl: "px-10 py-4 text-xl h-14",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      disabled,
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 rounded transition-all duration-200 disabled:pointer-events-none disabled:opacity-50";

    return (
      <button
        className={cn(
          baseClasses,
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {/* Left Icon */}
        {leftIcon && !isLoading && (
          <span className="shrink-0">{leftIcon}</span>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Text Content */}
        <span className="truncate">{children}</span>

        {/* Right Icon */}
        {rightIcon && !isLoading && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
