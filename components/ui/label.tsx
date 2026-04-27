import * as React from 'react'
import { cn } from '@/lib/utils'

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'block font-lato text-[10px] tracking-[0.25em] uppercase text-white/35 mb-2',
      className
    )}
    {...props}
  />
))
Label.displayName = 'Label'

export { Label }
