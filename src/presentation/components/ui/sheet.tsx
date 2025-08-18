import { cn } from "@/core/utils/cn";
import type { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"div"> {
  side?: "top" | "right" | "bottom" | "left";
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export function Sheet({
  side = "bottom",
  className,
  children,
  open,
  onClose,
  ...props
}: Props) {
  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        open
          ? "animate-in fade-in duration-300"
          : "animate-out fade-out duration-200",
        className
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-background fixed z-50 flex flex-col gap-4 shadow-lg p-4",
          side === "right" &&
            cn(
              "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
              open
                ? "animate-in slide-in-from-right duration-500"
                : "animate-out slide-out-to-right duration-300"
            ),
          side === "left" &&
            cn(
              "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
              open
                ? "animate-in slide-in-from-left duration-500"
                : "animate-out slide-out-to-left duration-300"
            ),
          side === "top" &&
            cn(
              "inset-x-0 top-0 h-auto border-b rounded-b-3xl",
              open
                ? "animate-in slide-in-from-top duration-500"
                : "animate-out slide-out-to-top duration-300"
            ),
          side === "bottom" &&
            cn(
              "inset-x-0 bottom-0 h-auto border-t rounded-t-3xl",
              open
                ? "animate-in slide-in-from-bottom duration-500"
                : "animate-out slide-out-to-bottom duration-300"
            ),
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
