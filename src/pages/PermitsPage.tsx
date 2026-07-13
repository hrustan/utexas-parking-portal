import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusPill } from '../components/ui/StatusPill';
import { InfoCard } from '../components/ui/InfoCard';
import {
  CarIcon,
  CheckIcon,
  InfoIcon,
  PlusIcon,
  QrGlyphIcon,
  ReceiptIcon,
} from '../components/icons';
import type { Permit, Vehicle } from '../types/models';
import styles from './PermitsPage.module.css';

const DATE_FIELDS: Array<{ label: string; key: keyof Permit }> = [
  { label: 'Effective', key: 'effective' },
  { label: 'Expires', key: 'expires' },
  { label: 'Issued', key: 'issued' },
];

/** Vehicles that require a permit (i.e. not bicycles). */
function requiresPermit(v: Vehicle): boolean {
  return v.kind !== 'bicycle';
}

export function PermitsPage() {
  const navigate = useNavigate();
  const { data } = useAppData();
  if (!data) return null;

  const permit = data.permits[0];
  const unattached = data.vehicles.filter(
    (v) => requiresPermit(v) && !v.attachedPermit,
  );
  const attachedCount = permit?.attachedVehicleCount ?? 0;
  const covered = unattached.length === 0;

  return (
    <PageShell maxWidth={860}>
      <h1 className={styles.title}>Permits &amp; Passes</h1>

      {permit && (
        <Card elevated clip radius={18} className={styles.permitCard}>
          <div className={styles.body}>
            <div className={styles.headerRow}>
              <div>
                <div className={styles.permitName}>{permit.typeName}</div>
                <div className={styles.classLine}>
                  {permit.classLine} · Permit no.{' '}
                  <a href="#" className={styles.permitNo}>
                    {permit.permitNo}
                  </a>
                </div>
              </div>
              <StatusPill tone="success" dot>
                {permit.status}
              </StatusPill>
            </div>

            <div className={styles.dateGrid}>
              {DATE_FIELDS.map((field) => (
                <div key={field.label} className={styles.dateChip}>
                  <div className={styles.dateLabel}>{field.label}</div>
                  <div className={styles.dateValue}>{permit[field.key]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.actionBar}>
            <button type="button" className={styles.action}>
              <QrGlyphIcon size={18} />
              QR code
            </button>
            <button
              type="button"
              className={styles.action}
              onClick={() => navigate('/vehicles')}
            >
              <CarIcon size={18} strokeWidth={1.8} />
              Vehicles ({attachedCount})
            </button>
            <button type="button" className={styles.action}>
              <ReceiptIcon size={18} />
              Receipt
            </button>
          </div>

          {covered ? (
            <div className={styles.footerCovered}>
              <CheckIcon size={15} strokeWidth={2.2} />
              {attachedCount} vehicle{attachedCount === 1 ? '' : 's'} attached —
              you're covered for parking.
            </div>
          ) : (
            <div className={styles.footerAction}>
              <InfoIcon size={15} />
              {unattached.length} vehicle{unattached.length === 1 ? '' : 's'} not
              attached — attach {unattached.length === 1 ? 'it' : 'them'} to be
              covered.
            </div>
          )}
        </Card>
      )}

      <Button
        fullWidth
        leftIcon={<PlusIcon size={20} />}
        className={styles.cta}
        onClick={() => navigate('/permits/new')}
      >
        Get a new permit or pass
      </Button>

      <div className={styles.info}>
        <InfoCard heading="How enforcement works">
          Your license plate is your displayed credential and enforcement is by
          license plate only. Keep your vehicle information up to date. If you
          have a rental or loaner vehicle, add the plate and remove it when the
          vehicle is returned.
        </InfoCard>
      </div>

      <a href="#" className={styles.agreementLink}>
        Read the Agreements for Permits and Passes ›
      </a>
    </PageShell>
  );
}
