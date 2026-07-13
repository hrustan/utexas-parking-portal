import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './StatusPill.module.css';

type Tone = 'success' | 'neutral' | 'amber';

interface StatusPillProps {
  tone?: Tone;
  /** Show a leading dot (e.g. the "Active" pill). */
  dot?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function StatusPill({
  tone = 'success',
  dot,
  icon,
  children,
  className,
}: StatusPillProps) {
  return (
    <span className={cn(styles.pill, styles[tone], className)}>
      {dot && <span className={styles.dot} />}
      {icon}
      {children}
    </span>
  );
}
