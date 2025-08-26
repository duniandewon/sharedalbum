import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "./button";

import { cn } from "@/core/utils/cn";

interface DropDownMenuContent {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface DropDownMenuBase {
  children: ReactNode;
}

interface DropDownMenu extends DropDownMenuBase {}

const DropDownmenuContext = createContext<DropDownMenuContent | undefined>(
  undefined
);

export function DropDownMenu({ children }: DropDownMenu) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropDownmenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={ref} className="relative inline-block">
        {children}
      </div>
    </DropDownmenuContext.Provider>
  );
}

interface DropdownTrigger
  extends VariantProps<typeof buttonVariants>,
    ComponentProps<"button"> {}

export function DropdownTrigger({
  className,
  variant,
  size,
  ...props
}: DropdownTrigger) {
  const context = useContext(DropDownmenuContext);
  if (!context) {
    throw new Error("DropdownTrigger must be used within DropdownMenu");
  }
  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={context.isOpen}
      onClick={() => context.setIsOpen((prev) => !prev)}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

interface IDropdownMenuContent extends ComponentProps<"ul"> {}

export function DropdownMenuContent({
  children,
  className,
  ...props
}: IDropdownMenuContent) {
  const context = useContext(DropDownmenuContext);

  if (!context) {
    throw new Error("DropdownMenuContent must be used within DropdownMenu");
  }

  if (!context.isOpen) return null;

  return (
    <ul
      role="menu"
      className={cn(
        "absolute left-0 z-50  rounded-md border bg-popover shadow-lg overflow-y-auto overflow-x-auto",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

interface DropdownMenuItem extends ComponentProps<"li"> {
  onClick?: () => void;
}

export function DropdownMenuItem({
  children,
  onClick,
  className,
}: DropdownMenuItem) {
  const context = useContext(DropDownmenuContext);

  if (!context) {
    throw new Error("DropdownMenuContent must be used within DropdownMenu");
  }

  const handleClick = () => {
    if (onClick) onClick();
    context.setIsOpen(false);
  };

  return (
    <li role="menu-item" className={cn("p-2 w-full", className)} onClick={handleClick}>
      {children}
    </li>
  );
}
