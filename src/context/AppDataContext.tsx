import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  dismissAnnouncement as apiDismissAnnouncement,
  fetchBootstrap,
  isAnnouncementDismissed,
} from '../api/client';
import type { Bootstrap } from '../types/models';

type Status = 'loading' | 'ready' | 'error';

interface AppDataValue {
  status: Status;
  data: Bootstrap | null;

  // Derived conveniences (safe defaults while loading)
  hasActivePermit: boolean;
  permitCount: number;
  vehicleCount: number;
  vehicleLimit: number;
  /** Account balance: negative when the user owes money (citations). */
  balance: number;

  // Announcement
  announcementDismissed: boolean;
  dismissAnnouncement: () => void;

  // Add-vehicle modal (global so any surface can open it)
  addVehicleOpen: boolean;
  openAddVehicle: () => void;
  closeAddVehicle: () => void;
}

const AppDataContext = createContext<AppDataValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>('loading');
  const [data, setData] = useState<Bootstrap | null>(null);
  const [announcementDismissed, setAnnouncementDismissed] = useState(
    isAnnouncementDismissed(),
  );
  const [addVehicleOpen, setAddVehicleOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetchBootstrap()
      .then((bootstrap) => {
        if (!active) return;
        setData(bootstrap);
        setStatus('ready');
      })
      .catch(() => active && setStatus('error'));
    return () => {
      active = false;
    };
  }, []);

  const dismissAnnouncement = useCallback(() => {
    setAnnouncementDismissed(true);
    void apiDismissAnnouncement();
  }, []);

  const openAddVehicle = useCallback(() => setAddVehicleOpen(true), []);
  const closeAddVehicle = useCallback(() => setAddVehicleOpen(false), []);

  const value = useMemo<AppDataValue>(() => {
    const permits = data?.permits ?? [];
    const vehicles = data?.vehicles ?? [];
    const citations = data?.citations ?? [];
    // Citations are money owed, so they push the balance negative. Each citation
    // keeps a positive `amount` (a fine reads as $75.00 in the list); only the
    // aggregate balance goes negative.
    const owed = citations.reduce((sum, c) => sum + c.amount, 0);
    const balance = owed === 0 ? 0 : -owed;

    return {
      status,
      data,
      hasActivePermit: permits.some((p) => p.status === 'Active'),
      permitCount: permits.length,
      vehicleCount: vehicles.length,
      vehicleLimit: data?.vehicleLimit ?? 0,
      balance,
      announcementDismissed,
      dismissAnnouncement,
      addVehicleOpen,
      openAddVehicle,
      closeAddVehicle,
    };
  }, [
    status,
    data,
    announcementDismissed,
    dismissAnnouncement,
    addVehicleOpen,
    openAddVehicle,
    closeAddVehicle,
  ]);

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppData(): AppDataValue {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within an AppDataProvider');
  return ctx;
}
