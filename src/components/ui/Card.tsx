import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'default' | 'dark';
  /** Adds the elevated card shadow. */
  elevated?: boolean;
  /** Radius scale: 14 | 16 | 18 (default 18). */
  radius?: 14 | 16 | 18;
  /** Clip children to the border radius. */
  clip?: boolean;
}

export function Card({
  tone = 'default',
  elevated,
  radius = 18,
  clip,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        styles.card,
        tone === 'dark' && styles.dark,
        elevated && styles.elevated,
        styles[`r${radius}`],
        clip && styles.clip,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
