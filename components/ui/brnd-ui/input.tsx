"use client";

import React, { useState } from "react";
import { ControllerFieldState } from "react-hook-form";

import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldState?: ControllerFieldState;
  isLoading?: boolean;
  startAdornment?: React.JSX.Element;
  endAdornment?: React.JSX.Element;
  endButton?: React.JSX.Element;
  submitButton?: boolean;
  password?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      fieldState,
      isLoading,
      startAdornment,
      endAdornment,
      endButton,
      submitButton,
      password,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    return (
      // <div className="relative flex gap-2">
      <div className="relative flex gap-2">
        <input
          type={password ? (isVisible ? "text" : "password") : type}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            startAdornment && "pe-12 ps-12",
            fieldState?.error &&
              "focus-visible:ring-destructive border-destructive",
            className,
          )}
          ref={ref}
          {...props}
        />
        {startAdornment && (
          <div className="absolute inset-y-0 inset-s-0 flex items-center justify-center border-r pe-3 ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            {startAdornment}
          </div>
        )}
        {endAdornment && (
          <div className="absolute inset-y-0 inset-e-2 flex items-center justify-center border-l pe-3 ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            {endAdornment}
          </div>
        )}
        {password && (
          <button
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 inset-e-2 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isVisible ? (
              <HugeiconsIcon icon={ViewOffIcon} size={16} aria-hidden="true" />
            ) : (
              <HugeiconsIcon icon={ViewIcon} size={16} aria-hidden="true" />
            )}
          </button>
        )}
        {endButton && <div>{endButton}</div>}
        {submitButton && (
          <div
            className={cn(
              "transition-[width,opacity] duration-300 ease-in-out overflow-hidden flex items-center",
              fieldState?.isDirty && !fieldState.error
                ? "w-20 opacity-100"
                : "w-0 opacity-0",
            )}
          >
            <Button
              variant="default"
              className="w-full whitespace-nowrap h-8.5"
              type="submit"
              // disabled={isLoading}
            >
              {isLoading && <Spinner className="mr-1" />}
              Save
            </Button>
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
