import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// =====================================================
// Button Variants — Art Sannah's Sky Edition
// =====================================================

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Default system buttons
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-95",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:scale-95",
        link:
          "text-primary underline-offset-4 hover:underline active:scale-95",

        // =====================================================
        // Art Sannah’s Sky Custom Premium Variants
        // =====================================================

        /** 
         * Premium: Deep Sky Gradient with Subtle Shadow
         * Ideal for CTA buttons like “Shop Now” or “Explore Collection”
         */
        premium:
          "bg-gradient-to-r from-[#0b2149] via-[#1b3b75] to-[#3679d1] text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-300",

        /** 
         * Sky: Bright Aviation Blue Gradient
         * Used for positive or inspirational actions
         */
        sky:
          "bg-gradient-to-r from-[#2d9cdb] to-[#1565c0] text-white font-semibold shadow-sm hover:shadow-lg hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-300",

        /** 
         * Elegant: Transparent White Frosted Style
         * Ideal for overlay contexts, hero sections, or modals
         */
        elegant:
          "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300",
      },

      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// =====================================================
// Button Component
// =====================================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

// =====================================================
// Exports
// =====================================================
export { Button, buttonVariants }
