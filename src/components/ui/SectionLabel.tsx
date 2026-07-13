import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import styles from './SectionLabel.module.css';

/** Uppercase eyebrow label (e.g. "QUICK ACTIONS", "SUMMARY"). */
export function SectionLabel({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(styles.label, className)} {...rest}>
      {children}
    </div>
  );
}
