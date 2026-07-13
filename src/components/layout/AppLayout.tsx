import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { AddVehicleModal } from '../AddVehicleModal';
import styles from './AppLayout.module.css';

export function AppLayout() {
  return (
    <div className={styles.shell}>
      <TopNav />
      <main className={styles.content}>
        <Outlet />
      </main>
      <AddVehicleModal />
    </div>
  );
}
