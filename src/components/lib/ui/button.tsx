import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const buttonVariants = cva(
  "flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out active:scale-95 font-medium",
  {
    variants: {
      variant: {
        default: "cursor-pointer hover:scale-105",
        outline:
          "border bg-transparent cursor-pointer hover:scale-105",
        destructive:
          "border border-red-500 text-red-500 bg-red-50 hover:bg-red-200 cursor-pointer hover:scale-105 font-bold",
        disabled:
          "bg-gray-400 text-gray-700 cursor-not-allowed opacity-70",
      },
      size: {
        default: "px-4 py-2 text-base",
        sm: "px-3 py-1.5 text-sm",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** warna background */
  color?: string;
  /** warna hover */
  hoverColor?: string;
  /** warna text */
  textColor?: string;
  /** font-size custom */
  fontSize?: string;
  /** font-family custom */
  fontFamily?: string;
}

export function Button({
  className,
  variant,
  size,
  children,

  // Default sesuai request kamu
  color = "#A33D23",
  hoverColor = "#5C1F12",
  textColor = "#FFFFFF",
  fontSize = "inherit",
  fontFamily = "var(--font-poppins)",

  ...props
}: ButtonProps) {
  const style = {
    backgroundColor: variant === "outline" ? "transparent" : color,
    color: textColor,
    fontSize,
    fontFamily,
    "--hover-bg": hoverColor,
  } as React.CSSProperties;

  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        // hover custom (CSS variable)
        "hover:[background-color:var(--hover-bg)]",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}

export { buttonVariants };