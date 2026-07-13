import { useAppData } from '../context/AppDataContext';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { StatTile } from '../components/ui/StatTile';
import { FieldLabel, Input, Select } from '../components/ui/Field';
import { CheckIcon, InfoIcon } from '../components/icons';
import { formatCurrency } from '../lib/format';
import type { Citation } from '../types/models';
import styles from './CitationsPage.module.css';

function ClearState({ balance }: { balance: number }) {
  return (
    <div className={styles.clearCard}>
      <span className={styles.clearCircle}>
        <CheckIcon size={28} />
      </span>
      <div className={styles.clearTitle}>No active citations</div>
      <div className={styles.clearSub}>You're all clear.</div>
      <div className={styles.balancePill}>
        <span className={styles.balanceLabel}>Balance</span>
        <span className={styles.balanceValue}>{formatCurrency(balance)}</span>
      </div>
    </div>
  );
}

function CitationList({ citations }: { citations: Citation[] }) {
  return (
    <div className={styles.list}>
      {citations.map((c) => (
        <div key={c.id} className={styles.citationRow}>
          <div>
            <div className={styles.citationNumber}>{c.number}</div>
            <div className={styles.citationDate}>{c.date}</div>
          </div>
          <div className={styles.citationRight}>
            <span className={styles.citationAmount}>
              {formatCurrency(c.amount)}
            </span>
            <span className={styles.citationStatus}>{c.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CitationsPage() {
  const { data, balance } = useAppData();
  if (!data) return null;

  const hasCitations = data.citations.length > 0;

  return (
    <PageShell maxWidth={860}>
      <h1 className={styles.title}>Citations</h1>

      <div className={styles.grid}>
        <div className={styles.leftCol}>
          {hasCitations ? (
            <CitationList citations={data.citations} />
          ) : (
            <ClearState balance={balance} />
          )}

          <div className={styles.statRow}>
            <StatTile variant="card" value={data.appeals.length} label="Appeals" />
            <StatTile variant="card" value={data.letters.length} label="Letters" />
          </div>

          <div className={styles.note}>
            <InfoIcon size={15} className={styles.noteIcon} />
            <span>
              Citations cannot be paid via What I Owe (WIO) or Payroll Deduction.
            </span>
          </div>
        </div>

        <div className={styles.lookupCard}>
          <div className={styles.lookupTitle}>Look up a citation</div>
          <div className={styles.lookupHelp}>
            Enter the citation number, state, and plate it was issued to.
          </div>

          <FieldLabel>Citation number</FieldLabel>
          <div className={styles.field}>
            <Input placeholder="e.g. 100234567" />
          </div>

          <div className={styles.fieldRow}>
            <div>
              <FieldLabel>State</FieldLabel>
              <div className={styles.fieldInner}>
                <Select defaultValue="TEXAS">
                  <option>TEXAS</option>
                  <option>OKLAHOMA</option>
                  <option>CALIFORNIA</option>
                </Select>
              </div>
            </div>
            <div>
              <FieldLabel>Plate number</FieldLabel>
              <div className={styles.fieldInner}>
                <Input placeholder="ABC1234" />
              </div>
            </div>
          </div>

          <Button variant="dark" fullWidth className={styles.searchBtn}>
            Search citations
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
