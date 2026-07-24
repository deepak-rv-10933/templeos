import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, leftIcon, rightSlot, className, id, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-caption font-medium text-muted">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3.5 text-muted">{leftIcon}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-11 w-full rounded-md border border-border bg-surface px-4 text-body text-text placeholder:text-muted',
            'transition-colors duration-200 focus:border-primary focus-visible:shadow-none',
            leftIcon && 'pl-10',
            rightSlot && 'pr-11',
            error && 'border-danger',
            className,
          )}
          aria-invalid={!!error}
          {...rest}
        />
        {rightSlot && <span className="absolute right-2">{rightSlot}</span>}
      </div>
      {error && <p className="mt-1.5 text-caption text-danger">{error}</p>}
    </div>
  );
});
