import * as React from 'react'
import { cn } from '@/lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex w-full min-h-[80px] bg-white/[0.03] border border-luxury-gold/15 px-4 py-3',
        'font-lato text-sm text-white placeholder:text-white/25',
        'outline-none transition-all duration-300 resize-none',
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
Textarea.displayName = 'Textarea'

export { Textarea }
