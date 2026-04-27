'use client'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-4 select-none', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-3',
        caption: 'flex justify-center pt-1 relative items-center mb-1',
        caption_label: 'text-sm font-medium font-lato text-white',
        nav: 'space-x-1 flex items-center',
        nav_button:
          'absolute h-7 w-7 flex items-center justify-center border border-luxury-gold/15 text-white/40 hover:border-luxury-gold/40 hover:text-luxury-gold transition-all duration-200',
        nav_button_previous: 'left-1',
        nav_button_next: 'right-1',
        table: 'w-full border-collapse',
        head_row: 'flex',
        head_cell: 'text-white/25 w-9 font-normal text-[0.75rem] font-lato text-center',
        row: 'flex w-full mt-1',
        cell: 'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
        day: 'h-9 w-9 p-0 font-lato text-sm text-white/60 hover:text-white hover:bg-luxury-gold/15 transition-colors duration-150 flex items-center justify-center cursor-pointer',
        day_range_end: 'rounded-r-md',
        day_selected:
          'bg-luxury-gold text-luxury-black font-medium hover:bg-luxury-gold hover:text-luxury-black focus:bg-luxury-gold focus:text-luxury-black',
        day_today: '!text-luxury-gold font-semibold',
        day_outside: 'text-white/15 opacity-50',
        day_disabled: 'text-white/15 cursor-not-allowed hover:bg-transparent hover:text-white/15',
        day_range_middle: 'aria-selected:bg-luxury-gold/20 aria-selected:text-white',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
