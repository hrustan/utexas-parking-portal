import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'dark'
  | 'outline'
  | 'ghost'
  | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  fullWidth,
  leftIcon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        styles.btn,
        styles[variant],
        fullWidth && styles.fullWidth,
        className,
      )}
      {...rest}
    >
      {leftIcon}
      {children}
    </button>
  );
}
