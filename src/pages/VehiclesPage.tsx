import { useAppData } from '../context/AppDataContext';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { StatusPill } from '../components/ui/StatusPill';
import { InfoCard } from '../components/ui/InfoCard';
import { BicycleIcon, CarIcon, CheckIcon, MotorcycleIcon, PlusIcon } from '../components/icons';
import type { Vehicle } from '../types/models';
import styles from './VehiclesPage.module.css';

function VehicleTypeIcon({ kind }: { kind: Vehicle['kind'] }) {
  const props = { size: 23, strokeWidth: 1.8 } as const;
  if (kind === 'bicycle') return <BicycleIcon {...props} />;
  if (kind === 'motorcycle') return <MotorcycleIcon {...props} />;
  return <CarIcon {...props} />;
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const metaState = vehicle.kind === 'bicycle' ? 'Bicycle' : vehicle.state;
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <span className={styles.typeTile}>
          <VehicleTypeIcon kind={vehicle.kind} />
        </span>
        <div className={styles.cardInfo}>
          <div className={styles.vehicleName}>
            {vehicle.make} · {vehicle.color}
          </div>
          <div className={styles.plateRow}>
            <span className={styles.plateChip}>{vehicle.plate}</span>
            <span className={styles.plateMeta}>
              {metaState} · {vehicle.driverRole}
            </span>
          </div>
          {vehicle.kind === 'bicycle' ? (
            <StatusPill tone="neutral">Bicycle · no permit needed</StatusPill>
          ) : vehicle.attachedPermit ? (
            <StatusPill tone="success" icon={<CheckIcon size={12} strokeWidth={2.6} />}>
              Attached to {vehicle.attachedPermit}
            </StatusPill>
          ) : (
            <StatusPill tone="amber">Not attached to a permit</StatusPill>
          )}
        </div>
      </div>
    </div>
  );
}

export function VehiclesPage() {
  const { data, openAddVehicle, vehicleCount, vehicleLimit } = useAppData();
  if (!data) return null;

  const remaining = Math.max(vehicleLimit - vehicleCount, 0);
  const fillPct = vehicleLimit > 0 ? (vehicleCount / vehicleLimit) * 100 : 0;

  return (
    <PageShell maxWidth={860}>
      <div className={styles.header}>
        <h1 className={styles.title}>Vehicles</h1>
        <Button leftIcon={<PlusIcon size={18} />} onClick={openAddVehicle}>
          Add vehicle
        </Button>
      </div>

      <div className={styles.meterCard}>
        <div className={styles.meterHead}>
          <span className={styles.meterLabel}>Vehicles registered</span>
          <span className={styles.meterCount}>
            {vehicleCount} <span className={styles.meterMax}>/ {vehicleLimit}</span>
          </span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${fillPct}%` }} />
        </div>
        <div className={styles.meterHelper}>
          {remaining > 0
            ? `You can register ${remaining} more vehicle${remaining === 1 ? '' : 's'}.`
            : 'You have reached your vehicle limit.'}
        </div>
      </div>

      <div className={styles.grid}>
        {data.vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      <div className={styles.info}>
        <InfoCard heading="Enforcement is by license plate">
          Keep your vehicle information current, and remove rental or loaner
          plates when the vehicle is returned. Only vehicles attached to your
          permit are valid for parking.
        </InfoCard>
      </div>
    </PageShell>
  );
}
