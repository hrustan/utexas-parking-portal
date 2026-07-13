import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';
import { ChevronRightIcon } from '../icons';
import styles from './Field.module.css';

export function FieldLabel({ children }: { children: ReactNode }) {
  return <label className={styles.label}>{children}</label>;
}

export function Input({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(styles.control, className)} {...rest} />;
}

export function Select({
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={styles.selectWrap}>
      <select className={cn(styles.control, styles.select, className)} {...rest}>
        {children}
      </select>
      <ChevronRightIcon size={16} className={styles.chevron} />
    </div>
  );
}
