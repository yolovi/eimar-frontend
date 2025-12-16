import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { HeroButtonProps, HeroButtonSize } from "./HeroButton.types";

const heroButtonSizes: Record<HeroButtonSize, string> = {
  sm: "w-48 px-6 py-2 text-sm",
  md: "w-56 px-8 py-3 text-base", 
  lg: "w-64 px-10 py-4 text-lg",
};

const HeroButton = forwardRef<HTMLButtonElement, HeroButtonProps>(
  (
    {
      children,
      variant = "secondary",
      size = "md",
      className,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "group rounded-lg font-semibold cursor-pointer",
      "transition-all duration-300 backdrop-blur-sm",
      "border-2",
      "hover:scale-105 hover:shadow-xl",
      "focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
    );

    const primaryClasses = cn(
      baseClasses,
      "border-transparent hover:border-[var(--eimar-white-snow)]"
    );

    const secondaryClasses = cn(
      baseClasses,
      "border-[var(--eimar-gray-light)]",
      "hover:bg-[var(--eimar-white-snow)] hover:border-transparent"
    );

    const darkClasses = cn(
      baseClasses,
      "border-gray-600",
      "hover:bg-gray-700 hover:border-transparent"
    );

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === "secondary") {
        e.currentTarget.style.color = "var(--eimar-green)";
      } else if (variant === "dark") {
        e.currentTarget.style.color = "white";
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === "secondary") {
        e.currentTarget.style.color = "var(--eimar-white-snow)";
      } else if (variant === "dark") {
        e.currentTarget.style.color = "rgb(75, 85, 99)"; // gray-600
      }
      onMouseLeave?.(e);
    };

    if (variant === "primary") {
      return (
        <button
          ref={ref}
          className={cn(
            primaryClasses,
            heroButtonSizes[size],
            className
          )}
          style={{
            backgroundColor: "var(--eimar-green)",
            color: "var(--eimar-white-snow)"
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </button>
      );
    }

    if (variant === "dark") {
      return (
        <button
          ref={ref}
          className={cn(
            darkClasses,
            heroButtonSizes[size],
            className
          )}
          style={{
            color: "rgb(75, 85, 99)", // gray-600
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </button>
      );
    }

    // Secondary variant (default)
    return (
      <button
        ref={ref}
        className={cn(
          secondaryClasses,
          heroButtonSizes[size],
          className
        )}
        style={{
          color: "var(--eimar-white-snow)",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </button>
    );
  }
);

HeroButton.displayName = "HeroButton";

export { HeroButton };
export type { HeroButtonProps };