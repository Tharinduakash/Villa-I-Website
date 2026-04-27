import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex w-full bg-white/[0.03] border border-luxury-gold/15 px-4 py-3 font-lato text-sm text-white',
        'placeholder:text-white/25 outline-none transition-all duration-300',
        'focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/[0.15]',
        'hover:border-luxury-gold/25',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
