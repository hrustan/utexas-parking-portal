import type { ReactNode } from 'react';
import { InfoIcon } from '../icons';
import styles from './InfoCard.module.css';

interface InfoCardProps {
  heading: ReactNode;
  children: ReactNode;
}

/** White contextual info card with a blue info icon + heading + body. */
export function InfoCard({ heading, children }: InfoCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        <InfoIcon size={16} />
        {heading}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
