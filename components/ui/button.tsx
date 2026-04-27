import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-lato text-xs tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-luxury-gold text-luxury-black hover:bg-luxury-gold-light',
        outline: 'border border-luxury-gold/40 text-luxury-gold hover:bg-luxury-gold/10',
        ghost: 'text-white/50 hover:text-white hover:bg-white/5',
        destructive: 'bg-red-500/80 text-white hover:bg-red-500',
      },
      size: {
        default: 'px-8 py-3.5',
        sm: 'px-5 py-2.5',
        lg: 'px-10 py-4',
        icon: 'w-10 h-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
