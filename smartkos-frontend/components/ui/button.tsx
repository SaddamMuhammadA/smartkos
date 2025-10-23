import * as React from 'react';
import { cn } from '@/lib/utils';


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
variant?: 'default' | 'outline' | 'ghost';
}


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
({ className, variant = 'default', ...props }, ref) => {
const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
const variants = {
default: 'bg-[#0d6efd] text-white hover:bg-[#0b5ed7] focus:ring-[#0d6efd]',
outline: 'border border-gray-600 text-gray-200 hover:bg-[#2c3034]',
ghost: 'text-gray-300 hover:bg-[#2c3034]'
};


return (
<button
ref={ref}
className={cn(base, variants[variant], className, 'px-3 py-2')}
{...props}
/>
);
}
);
Button.displayName = 'Button';