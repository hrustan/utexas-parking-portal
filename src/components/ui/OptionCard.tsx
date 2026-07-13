import { cn } from '../../lib/cn';
import { CheckIcon } from '../icons';
import type { PurchaseOption } from '../../types/models';
import styles from './OptionCard.module.css';

interface OptionCardProps {
  option: PurchaseOption;
  selected: boolean;
  onSelect: () => void;
}

export function OptionCard({ option, selected, onSelect }: OptionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={cn(styles.card, selected && styles.selected)}
      onClick={onSelect}
    >
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.name}>{option.name}</div>
          <div className={styles.desc}>{option.desc}</div>
        </div>
        {selected ? (
          <span className={styles.radioOn}>
            <CheckIcon size={15} strokeWidth={3} />
          </span>
        ) : (
          <span className={styles.radioOff} />
        )}
      </div>
      <div className={styles.priceRow}>
        <span className={styles.price}>{option.priceMain}</span>
        <span className={styles.priceLabel}>{option.priceLabel}</span>
        {option.fee && <span className={styles.feeChip}>{option.fee}</span>}
      </div>
    </button>
  );
}
