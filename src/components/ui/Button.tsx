import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Spinner } from './Spinner';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap rounded-md transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] focus-visible:outline-none';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm',
  secondary: 'bg-violet-light text-primary hover:bg-primary/15',
  ghost: 'text-text hover:bg-violet-light',
  outline: 'border border-border bg-surface text-text hover:bg-background',
  danger: 'bg-danger text-white hover:brightness-95 shadow-sm',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-caption',
  md: 'h-11 px-5 text-body',
  lg: 'h-13 px-7 text-body-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth,
    className,
    children,
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...rest}
    >
      {loading ? <Spinner className="h-4 w-4 text-current" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
});
