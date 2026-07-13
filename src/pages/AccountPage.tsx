import { useAppData } from '../context/AppDataContext';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ChevronRightIcon } from '../components/icons';
import styles from './AccountPage.module.css';

const HELP_LINKS = [
  'Frequently Asked Questions',
  'Agreements for Permits & Passes',
  'Parking & Transportation Services',
  'Send a comment',
];

export function AccountPage() {
  const { data } = useAppData();
  if (!data) return null;

  const { user } = data;

  return (
    <PageShell maxWidth={860}>
      <h1 className={styles.title}>Account</h1>

      <button type="button" className={styles.profileCard}>
        <span className={styles.avatar}>{user.initials}</span>
        <span className={styles.profileText}>
          <span className={styles.name}>
            {user.firstName} {user.lastName}
          </span>
          <span className={styles.role}>{user.role}</span>
        </span>
        <ChevronRightIcon size={19} className={styles.chevron} />
      </button>

      <SectionLabel className={styles.sectionLabel}>Help &amp; info</SectionLabel>
      <div className={styles.list}>
        {HELP_LINKS.map((label) => (
          <button key={label} type="button" className={styles.row}>
            {label}
            <ChevronRightIcon size={18} className={styles.chevron} />
          </button>
        ))}
      </div>

      <Button variant="danger" fullWidth className={styles.signOut}>
        Sign out
      </Button>

      <div className={styles.footer}>
        Parking &amp; Transportation Services · The University of Texas at Austin
      </div>
    </PageShell>
  );
}
