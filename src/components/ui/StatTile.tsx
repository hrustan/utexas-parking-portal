import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './StatTile.module.css';

interface StatTileProps {
  value: ReactNode;
  label: string;
  /** "fill" = tinted centered tile (Home); "card" = bordered left-aligned (Citations). */
  variant?: 'fill' | 'card';
  valueTone?: 'ink' | 'success' | 'danger';
  onClick?: () => void;
}

export function StatTile({
  value,
  label,
  variant = 'fill',
  valueTone = 'ink',
  onClick,
}: StatTileProps) {
  const interactive = Boolean(onClick);
  const Tag = interactive ? 'button' : 'div';
  return (
    <Tag
      className={cn(styles.tile, styles[variant])}
      {...(interactive ? { type: 'button', onClick } : {})}
    >
      <div className={cn(styles.value, styles[valueTone])}>{value}</div>
      <div className={styles.label}>{label}</div>
    </Tag>
  );
}
