import type { ReactNode } from 'react';
import type { PurchaseOption } from '../../types/models';
import { SectionLabel } from './SectionLabel';
import styles from './SummaryRail.module.css';

interface SummaryRailProps {
  option: PurchaseOption | null;
  /** The step's primary action button. */
  action: ReactNode;
}

export function SummaryRail({ option, action }: SummaryRailProps) {
  return (
    <aside className={styles.rail}>
      <SectionLabel className={styles.label}>Summary</SectionLabel>

      {option ? (
        <>
          <div className={styles.itemRow}>
            <div>
              <div className={styles.itemName}>{option.name}</div>
              <div className={styles.itemDates}>
                Eff {option.eff} · Exp {option.exp}
              </div>
            </div>
            <div className={styles.itemPrice}>{option.priceMain}</div>
          </div>

          {option.fee && (
            <div className={styles.feeRow}>
              <span>Entry fee</span>
              <span className={styles.feeValue}>{option.fee}</span>
            </div>
          )}

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total today</span>
            <span className={styles.totalValue}>{option.priceMain}</span>
          </div>
        </>
      ) : (
        <div className={styles.empty}>Select a permit or pass to continue.</div>
      )}

      <div className={styles.action}>{action}</div>
      <div className={styles.footnote}>
        Prorated pricing, if applicable, shown here.
      </div>
    </aside>
  );
}
