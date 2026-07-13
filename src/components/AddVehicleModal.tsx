import type { ReactNode } from 'react';
import { useAppData } from '../context/AppDataContext';
import { Modal } from './ui/Modal';
import { BicycleIcon, CarIcon, ChevronRightIcon, MotorcycleIcon } from './icons';
import styles from './AddVehicleModal.module.css';

interface Choice {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

const CHOICES: Choice[] = [
  {
    icon: <CarIcon size={24} />,
    title: 'Car or truck',
    subtitle: 'Standard vehicle · attaches to a permit',
  },
  {
    icon: <MotorcycleIcon size={24} />,
    title: 'Motorcycle or moped',
    subtitle: 'Two-wheel motor vehicle',
  },
  {
    icon: <BicycleIcon size={24} />,
    title: 'Bicycle or eScooter',
    subtitle: 'No parking permit required',
  },
];

export function AddVehicleModal() {
  const { addVehicleOpen, closeAddVehicle } = useAppData();

  return (
    <Modal
      open={addVehicleOpen}
      onClose={closeAddVehicle}
      title="Add a vehicle"
      subtitle="What are you registering?"
    >
      <div className={styles.list}>
        {CHOICES.map((choice) => (
          <button
            key={choice.title}
            type="button"
            className={styles.choice}
            onClick={closeAddVehicle}
          >
            <span className={styles.iconTile}>{choice.icon}</span>
            <span className={styles.text}>
              <span className={styles.title}>{choice.title}</span>
              <span className={styles.subtitle}>{choice.subtitle}</span>
            </span>
            <ChevronRightIcon size={19} className={styles.chevron} />
          </button>
        ))}
      </div>
    </Modal>
  );
}
