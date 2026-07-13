import { useAppData } from '../context/AppDataContext';
import { CloseIcon } from './icons';
import styles from './AnnouncementBanner.module.css';

export function AnnouncementBanner() {
  const { data, announcementDismissed, dismissAnnouncement } = useAppData();
  const announcement = data?.announcement;

  if (!announcement || announcementDismissed) return null;

  return (
    <div className={styles.banner}>
      <span className={styles.chip}>{announcement.yearLabel}</span>
      <div className={styles.message}>
        {announcement.message}{' '}
        <a href="#" className={styles.link}>
          {announcement.linkLabel}
        </a>
      </div>
      <button
        type="button"
        className={styles.dismiss}
        onClick={dismissAnnouncement}
        aria-label="Dismiss announcement"
      >
        <CloseIcon size={16} />
      </button>
    </div>
  );
}
